import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Search, Facebook, Download, Loader2, Play, Users,
  Mail, Flame, UserCheck, AlertCircle, ExternalLink,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FBGroupLead {
  id: string;
  full_name: string | null;
  classification: string;
  email_address: string | null;
  profile_url: string | null;
  comment_text: string | null;
  original_post_text: string;
  original_post_url: string | null;
  group_url: string | null;
  created_at: string;
  email_drafted: boolean;
  email_sent: boolean;
}

interface ScrapeStats {
  postsScraped: number;
  commentsScraped: number;
  qualifiedLeads: number;
  withEmail: number;
  hotBorrowerPosted: number;
  hotBorrowerCommented: number;
  prospectiveClient: number;
}

export default function FBGroupScraper() {
  const [groupUrl, setGroupUrl] = useState("");
  const [maxPosts, setMaxPosts] = useState("10");
  const [sorting, setSorting] = useState("NEW_POSTS");
  const [postsNewerThan, setPostsNewerThan] = useState("");
  
  // Advanced Settings from Apify Screenshots
  const [searchByLetter, setSearchByLetter] = useState("");
  const [searchKeywordByYear, setSearchKeywordByYear] = useState("");
  const [targetComments, setTargetComments] = useState("-1");
  const [orderingMode, setOrderingMode] = useState("RANKED");
  const [includeReplies, setIncludeReplies] = useState("true");
  const [includeReactions, setIncludeReactions] = useState("true");

  const [isScraping, setIsScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState("");
  const [lastStats, setLastStats] = useState<ScrapeStats | null>(null);
  const [leads, setLeads] = useState<FBGroupLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<FBGroupLead | null>(null);
  const [rawPosts, setRawPosts] = useState<any[]>([]);
  const [rawComments, setRawComments] = useState<any[]>([]);
  const [isViewingPosts, setIsViewingPosts] = useState(false);

  // ── Fetch existing leads from Supabase ──────────────────────────────────
  const fetchLeads = useCallback(async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("fb_group_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error("Error fetching leads:", err);
      // Table might not exist yet — that's OK
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ── Start Scrape (Frontend Orchestrated) ──────────────────────────────
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const pollApifyRun = async (runId: string, stepLabel: string): Promise<any[]> => {
    let attempts = 0;
    while (attempts < 80) { // 80 * 5s = ~6 minutes max timeout
      await delay(5000);
      attempts++;
      setScrapeStatus(`${stepLabel} (Waiting for Apify... ${attempts * 5}s elapsed)`);
      
      const { data, error } = await supabase.functions.invoke("fb-group-scrape", {
        body: { action: "check_apify_run", payload: { runId } },
      });
      
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data.status === "SUCCEEDED") {
        return data.data || [];
      } else if (data.status === "FAILED" || data.status === "TIMED-OUT" || data.status === "ABORTED") {
        throw new Error(`Apify run failed with status: ${data.status}`);
      }
    }
    throw new Error("Local polling timed out after 6 minutes.");
  };

  const handleStartScrape = async () => {
    if (!groupUrl.trim() || !groupUrl.includes("facebook.com/groups/")) {
      toast.error("Please paste a valid Facebook group URL");
      return;
    }

    setIsScraping(true);
    setLastStats(null);
    setRawPosts([]);
    setRawComments([]);
    let currentLeads: typeof leads = [];

    try {
      // ── STAGE 1: Scrape Posts ──────────────────────────────────────────
      setScrapeStatus("Stage 1/4: Starting Apify Post Scraper...");
      const startRes = await supabase.functions.invoke("fb-group-scrape", {
        body: {
          action: "start_post_scrape",
          groupUrl: groupUrl.trim(),
          payload: {
            maxPosts: parseInt(maxPosts) || 100,
            sorting,
            onlyPostsNewerThan: postsNewerThan.trim() || undefined,
            search: searchByLetter.trim() || undefined,
            searchKeywordByYear: searchKeywordByYear.trim() || undefined,
          }
        },
      });

      if (startRes.error) throw startRes.error;
      if (startRes.data?.error) throw new Error(startRes.data.error);
      
      const postsRunId = startRes.data.runId;
      const postsData = await pollApifyRun(postsRunId, "Stage 1/4: Scraping Posts");
      
      if (!postsData || postsData.length === 0) {
        setScrapeStatus("Done: No posts found.");
        setIsScraping(false);
        return;
      }
      setRawPosts(postsData);
      setScrapeStatus(`Stage 1/4 complete: ${postsData.length} posts retrieved.`);

      // ── STAGE 2: Classify Posters ──────────────────────────────────────
      setScrapeStatus(`Stage 2/4: AI Classifying ${postsData.length} posters...`);
      const P_CHUNK = 100;
      for (let i = 0; i < postsData.length; i += P_CHUNK) {
        const postChunk = postsData.slice(i, i + P_CHUNK);
        setScrapeStatus(`Stage 2/4: AI Classifying posters ${i + 1} to ${Math.min(i + P_CHUNK, postsData.length)}...`);
        const classifyPostsRes = await supabase.functions.invoke("fb-group-scrape", {
          body: {
            action: "classify_posters",
            groupUrl: groupUrl.trim(),
            payload: { posts: postChunk }
          },
        });

        if (classifyPostsRes.error) throw classifyPostsRes.error;
        if (classifyPostsRes.data?.error) throw new Error(classifyPostsRes.data.error);
        
        if (classifyPostsRes.data.leads) {
          currentLeads = [...currentLeads, ...classifyPostsRes.data.leads];
          setLeads((prev) => {
            const ids = new Set(prev.map((l) => l.id));
            return [...classifyPostsRes.data.leads.filter((l: any) => !ids.has(l.id)), ...prev];
          });
        }
      }

      // ── STAGE 3: Scrape Comments ───────────────────────────────────────
      // Extract valid URLs
      const getCommentCount = (p: any): number => {
        const val = p.commentsCount ?? p.comments_count ?? p.commentCount ?? p.comments;
        if (typeof val === "number") return val;
        if (typeof val === "string") return parseInt(val.replace(/[^0-9]/g, ""), 10) || 0;
        if (Array.isArray(val)) return val.length;
        return 0;
      };
      
      const postUrls = postsData.filter((p: any) => getCommentCount(p) > 0).map((p: any) => p.url || p.postUrl).filter(Boolean);
      
      if (postUrls.length > 0) {
        setScrapeStatus("Stage 3/4: Starting Apify Comment Scraper...");
        const startCommentsRes = await supabase.functions.invoke("fb-group-scrape", {
          body: {
            action: "start_comment_scrape",
            payload: {
              postUrls,
              targetComments: parseInt(targetComments) || -1,
              orderingMode,
              includeReplies: includeReplies === "true",
              includeReactions: includeReactions === "true",
            }
          },
        });

        if (startCommentsRes.error) throw startCommentsRes.error;
        if (startCommentsRes.data?.error) throw new Error(startCommentsRes.data.error);
        if (startCommentsRes.data.runId) {
           const commentsRunId = startCommentsRes.data.runId;
           const commentsData = await pollApifyRun(commentsRunId, "Stage 3/4: Scraping Comments");
           setRawComments(commentsData || []);

           if (commentsData && commentsData.length > 0) {
              // ── STAGE 4: Classify Comments ────────────────────────────────
              setScrapeStatus(`Stage 4/4: AI Classifying ${commentsData.length} comments...`);
              const C_CHUNK = 200;
              for (let i = 0; i < commentsData.length; i += C_CHUNK) {
                const commentChunk = commentsData.slice(i, i + C_CHUNK);
                setScrapeStatus(`Stage 4/4: AI Classifying comments ${i + 1} to ${Math.min(i + C_CHUNK, commentsData.length)}...`);
                // Send up chunk of comments to Edge Function. Note we send context for resolving parent URLs, keeping it intact
                const classifyCommentsRes = await supabase.functions.invoke("fb-group-scrape", {
                  body: {
                    action: "classify_commenters",
                    groupUrl: groupUrl.trim(),
                    payload: { comments: commentChunk, postsContext: postsData }
                  },
                });

                if (classifyCommentsRes.error) throw classifyCommentsRes.error;
                if (classifyCommentsRes.data?.error) throw new Error(classifyCommentsRes.data.error);
                
                if (classifyCommentsRes.data.leads) {
                  currentLeads = [...currentLeads, ...classifyCommentsRes.data.leads];
                  setLeads((prev) => {
                    const ids = new Set(prev.map((l) => l.id));
                    return [...classifyCommentsRes.data.leads.filter((l: any) => !ids.has(l.id)), ...prev];
                  });
                }
              }
           }
        }
      }

      // ── DONE ──────────────────────────────────────────────────────────
      setScrapeStatus("Scrape entirely complete!");
      toast.success(`Pipeline finished! Extracted ${currentLeads.length} new leads.`);
      
      setLastStats({
        postsScraped: postsData.length,
        commentsScraped: rawComments.length,
        qualifiedLeads: currentLeads.length,
        withEmail: currentLeads.filter((l) => l.email_address).length,
        hotBorrowerPosted: currentLeads.filter((l) => l.classification === "Hot Borrower (Posted)").length,
        hotBorrowerCommented: currentLeads.filter((l) => l.classification === "Hot Borrower (Commented)").length,
        prospectiveClient: currentLeads.filter((l) => l.classification === "Prospective Client").length,
      });

      await fetchLeads();
      
    } catch (err: any) {
      console.error("Scraper pipeline error:", err);
      toast.error(err.message || "Scrape pipeline failed");
      setScrapeStatus(`Error: ${err.message}`);
    } finally {
      setIsScraping(false);
    }
  };

  // ── Filters ─────────────────────────────────────────────────────────────
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email_address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.comment_text?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      classFilter === "all" || lead.classification === classFilter;
    return matchesSearch && matchesClass;
  });

  // ── Classification Badge ───────────────────────────────────────────────
  const getClassBadge = (classification: string) => {
    switch (classification) {
      case "Hot Borrower (Posted)":
        return (
          <Badge className="bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/20">
            <Flame className="w-3 h-3 mr-1" />
            Hot Borrower (Posted)
          </Badge>
        );
      case "Hot Borrower (Commented)":
        return (
          <Badge className="bg-orange-500/15 text-orange-400 border-orange-500/30 hover:bg-orange-500/20">
            <Flame className="w-3 h-3 mr-1" />
            Hot Borrower (Commented)
          </Badge>
        );
      case "Prospective Client":
        return (
          <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
            <UserCheck className="w-3 h-3 mr-1" />
            Prospective Client
          </Badge>
        );
      default:
        return <Badge variant="secondary">{classification}</Badge>;
    }
  };

  // ── CSV Export ──────────────────────────────────────────────────────────
  const handleDownloadCSV = () => {
    if (filteredLeads.length === 0) {
      toast.error("No leads to download");
      return;
    }
    const headers = [
      "Full Name",
      "Classification",
      "Email",
      "Profile URL",
      "Comment",
      "Original Post",
      "Group URL",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${(lead.full_name || "").replace(/"/g, '""')}"`,
          `"${lead.classification}"`,
          `"${(lead.email_address || "").replace(/"/g, '""')}"`,
          `"${(lead.profile_url || "").replace(/"/g, '""')}"`,
          `"${(lead.comment_text || "").replace(/"/g, '""').substring(0, 200)}"`,
          `"${(lead.original_post_text || "").replace(/"/g, '""').substring(0, 300)}"`,
          `"${(lead.group_url || "").replace(/"/g, '""')}"`,
          `"${lead.created_at}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fb-group-leads-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded!");
  };

  const handleDownloadRawPostsCSV = () => {
    if (rawPosts.length === 0) {
      toast.error("No posts to download");
      return;
    }
    const headers = ["Group URL", "Group Title", "Post text", "Post-Url", "Author", "Number of comments"];

    const csvContent = [
      headers.join(","),
      ...rawPosts.map((post) =>
        [
          `"${(groupUrl || post.groupUrl || "").replace(/"/g, '""')}"`,
          `"${(post.groupTitle || post.groupName || "").replace(/"/g, '""')}"`,
          `"${(post.text || "").replace(/"/g, '""').substring(0, 1000)}"`,
          `"${(post.url || post.postUrl || "").replace(/"/g, '""')}"`,
          `"${(post.user?.name || post.author?.name || post.userName || post.authorName || post.name || "").replace(/"/g, '""')}"`,
          post.commentsCount || 0,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fb-group-raw-posts-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Raw Posts CSV downloaded!");
  };

  const handleDownloadRawCommentsCSV = () => {
    if (rawComments.length === 0) {
      toast.error("No comments to download");
      return;
    }
    const headers = ["Post URL", "Comment", "Author", "Author Profile URL"];

    const csvContent = [
      headers.join(","),
      ...rawComments.map((comment) =>
        [
          `"${(comment.postUrl || comment.parentUrl || comment.url || "").replace(/"/g, '""')}"`,
          `"${(comment.text || "").replace(/"/g, '""').substring(0, 1000)}"`,
          `"${(comment.user?.name || comment.author?.name || comment.userName || comment.authorName || comment.name || "").replace(/"/g, '""')}"`,
          `"${(comment.userUrl || comment.authorUrl || comment.profileUrl || "").replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fb-group-raw-comments-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Raw Comments CSV downloaded!");
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1877F2] to-[#42B72A] flex items-center justify-center shadow-lg shadow-[#1877F2]/20">
            <Facebook className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">
              FB Group Scraper
            </h1>
            <p className="text-sm text-muted-foreground">
              Paste a group URL → Extract leads → Classify intent
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scrape Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-[#1877F2]/20 bg-gradient-to-r from-[#1877F2]/5 to-transparent">
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="groupUrl" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Facebook Group URL
                  </Label>
                  <Input
                    id="groupUrl"
                    placeholder="https://www.facebook.com/groups/..."
                    value={groupUrl}
                    onChange={(e) => setGroupUrl(e.target.value)}
                    disabled={isScraping}
                    className="bg-background/60"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <Label htmlFor="maxPosts" className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    ✍️ Number of posts
                  </Label>
                  <Input
                    id="maxPosts"
                    type="number"
                    min="1"
                    value={maxPosts}
                    onChange={(e) => setMaxPosts(e.target.value)}
                    disabled={isScraping}
                    className="bg-background/60"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <Label htmlFor="sorting" className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    📜 Sorting order
                  </Label>
                  <Select value={sorting} onValueChange={setSorting} disabled={isScraping}>
                    <SelectTrigger id="sorting" className="bg-background/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW_POSTS">New posts</SelectItem>
                      <SelectItem value="NEW_ACTIVITY">Newest activity</SelectItem>
                      <SelectItem value="MOST_RELEVANT">Most relevant</SelectItem>
                      <SelectItem value="BUY_SELL_ITEMS">BuySell items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-48">
                  <Label htmlFor="newerThan" className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Posts newer than
                  </Label>
                  <Input
                    id="newerThan"
                    type="date"
                    value={postsNewerThan}
                    onChange={(e) => setPostsNewerThan(e.target.value)}
                    disabled={isScraping}
                    className="bg-background/60"
                  />
                </div>
              </div>

              {/* Advanced Apify Inputs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 mt-1 border-t border-white/5">
                <div className="col-span-2">
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Search by letter (words are allowed, but will not return any results in most cases)</Label>
                  <Input value={searchByLetter} onChange={(e) => setSearchByLetter(e.target.value)} disabled={isScraping} className="bg-background/60" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Search keyword by year</Label>
                  <Input value={searchKeywordByYear} onChange={(e) => setSearchKeywordByYear(e.target.value)} disabled={isScraping} className="bg-background/60" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Number of comments to scrape per URL (-1 for all)</Label>
                  <Input type="number" value={targetComments} onChange={(e) => setTargetComments(e.target.value)} disabled={isScraping} className="bg-background/60" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Ordering Mode</Label>
                  <Select value={orderingMode} onValueChange={setOrderingMode} disabled={isScraping}>
                    <SelectTrigger className="bg-background/60"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RANKED">Ranked</SelectItem>
                      <SelectItem value="CHRONOLOGICAL">Chronological</SelectItem>
                      <SelectItem value="REVERSE_CHRONOLOGICAL">Reverse Chrono</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Replies</Label>
                  <Select value={includeReplies} onValueChange={setIncludeReplies} disabled={isScraping}>
                    <SelectTrigger className="bg-background/60"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Include</SelectItem>
                      <SelectItem value="false">Exclude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Reactions</Label>
                  <Select value={includeReactions} onValueChange={setIncludeReactions} disabled={isScraping}>
                    <SelectTrigger className="bg-background/60"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Include</SelectItem>
                      <SelectItem value="false">Exclude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleStartScrape}
                    disabled={isScraping || !groupUrl.trim()}
                    className="bg-gradient-to-r from-[#1877F2] to-[#42B72A] hover:opacity-90 text-white w-full sm:w-auto"
                    size="lg"
                  >
                    {isScraping ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Start Scraping
                      </>
                    )}
                  </Button>
                </div>

              {/* Status */}
              <AnimatePresence>
                {scrapeStatus && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    {isScraping ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#1877F2]" />
                    ) : scrapeStatus.startsWith("Error") ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <Users className="w-4 h-4 text-[#42B72A]" />
                    )}
                    <span className="text-muted-foreground">{scrapeStatus}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <AnimatePresence>
        {lastStats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { label: "Posts Scraped", value: lastStats.postsScraped, color: "text-[#1877F2]", onClick: () => setIsViewingPosts(true) },
              { label: "Comments Scraped", value: lastStats.commentsScraped, color: "text-purple-400" },
              { label: "Qualified Leads", value: lastStats.qualifiedLeads, color: "text-[#42B72A]" },
              { label: "With Email", value: lastStats.withEmail, color: "text-amber-400" },
            ].map((stat) => (
              <Card 
                key={stat.label} 
                className={`border-border/50 ${stat.onClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}`}
                onClick={stat.onClick}
              >
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    {stat.label}
                    {stat.onClick && <ExternalLink className="w-3 h-3 text-[#1877F2]" />}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters + Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or comment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full sm:w-52">
                  <SelectValue placeholder="Classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classifications</SelectItem>
                  <SelectItem value="Hot Borrower (Posted)">🔥 Hot Borrower (Posted)</SelectItem>
                  <SelectItem value="Hot Borrower (Commented)">🔥 Hot Borrower (Commented)</SelectItem>
                  <SelectItem value="Prospective Client">👤 Prospective Client</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button onClick={fetchLeads} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button onClick={handleDownloadCSV} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Classification</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden lg:table-cell">Post</TableHead>
                    <TableHead className="hidden md:table-cell">Comment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{lead.full_name || "Unknown"}</p>
                          {lead.profile_url && (
                            <a
                              href={lead.profile_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-[#1877F2] transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getClassBadge(lead.classification)}</TableCell>
                      <TableCell>
                        {lead.email_address ? (
                          <span className="text-sm text-[#42B72A] flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.email_address}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell max-w-[250px]">
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.original_post_text?.substring(0, 120) || "—"}
                        </p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[250px]">
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.comment_text || "—"}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredLeads.length === 0 && (
              <div className="text-center py-16">
                <Facebook className="w-12 h-12 mx-auto text-muted-foreground/20 mb-3" />
                <p className="text-muted-foreground text-sm">
                  {leads.length === 0
                    ? "No leads yet. Paste a Facebook group URL above and hit Start Scraping."
                    : "No leads match your filters."}
                </p>
              </div>
            )}
            {filteredLeads.length > 0 && (
              <div className="px-4 py-3 border-t border-border/50 text-xs text-muted-foreground">
                Showing {filteredLeads.length} of {leads.length} total leads
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Lead Detail Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <SheetTitle className="font-heading flex items-center gap-2">
                  {selectedLead.full_name || "Unknown"}
                  {selectedLead.profile_url && (
                    <a
                      href={selectedLead.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1877F2]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </SheetTitle>
                <SheetDescription>
                  {getClassBadge(selectedLead.classification)}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                {selectedLead.email_address && (
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                    <p className="text-sm text-[#42B72A] mt-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {selectedLead.email_address}
                    </p>
                  </div>
                )}

                {selectedLead.comment_text && (
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Their Comment</Label>
                    <div className="mt-1 p-3 rounded-lg bg-muted/50 text-sm">
                      {selectedLead.comment_text}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Original Post</Label>
                  <div className="mt-1 p-3 rounded-lg bg-muted/30 text-sm text-muted-foreground max-h-[300px] overflow-y-auto">
                    {selectedLead.original_post_text}
                  </div>
                </div>

                {selectedLead.original_post_url && (
                  <a
                    href={selectedLead.original_post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#1877F2] hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Original Post on Facebook
                  </a>
                )}

                <div className="text-xs text-muted-foreground">
                  Scraped: {new Date(selectedLead.created_at).toLocaleString()}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Raw Posts Sheet */}
      <Sheet open={isViewingPosts} onOpenChange={setIsViewingPosts}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between mt-4">
              <div>
                <SheetTitle className="font-heading text-xl">Raw Posts Data</SheetTitle>
                <SheetDescription>
                  {rawPosts.length} posts successfully extracted
                </SheetDescription>
              </div>
              <Button onClick={handleDownloadRawPostsCSV} variant="outline" size="sm" className="hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Export Raw Posts
              </Button>
              <Button onClick={handleDownloadRawCommentsCSV} variant="outline" size="sm" className="hidden sm:flex ml-2">
                <Download className="w-4 h-4 mr-2" />
                Export Raw Comments
              </Button>
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-2 mb-6 sm:hidden">
            <Button onClick={handleDownloadRawPostsCSV} variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Raw Posts
            </Button>
            <Button onClick={handleDownloadRawCommentsCSV} variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Raw Comments
            </Button>
          </div>

          <div className="space-y-4">
            {rawPosts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 opacity-20" />
                <p>No raw posts currently stored in memory.</p>
              </div>
            ) : (
              rawPosts.map((post, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-muted/20 border border-border/50 text-sm">
                  <div className="flex justify-between items-start mb-2 border-b border-border/50 pb-2">
                    <span className="font-semibold text-foreground">{post.user?.name || post.author?.name || post.userName || post.authorName || post.name || "Unknown Author"}</span>
                    <span className="text-xs text-muted-foreground">{post.time ? new Date(post.time).toLocaleDateString() : ""}</span>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {post.text?.substring(0, 300)}
                    {post.text?.length > 300 ? "..." : ""}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/10 flex flex-col gap-2 text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="w-3.5 h-3.5 text-blue-400" /> Group Name: {post.groupTitle || post.groupName || "N/A"}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      💬 Comments: {post.commentsCount ?? post.comments_count ?? post.commentCount ?? post.comments ?? 0}
                    </span>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#1877F2] hover:underline font-medium">
                       <ExternalLink className="w-3.5 h-3.5" /> Post-Url
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
