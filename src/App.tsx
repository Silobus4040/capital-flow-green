import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoanPrograms from "./pages/LoanPrograms";
import InvestorsPortal from "./pages/InvestorsPortal";
import ContactUs from "./pages/ContactUs";
import DocumentSubmission from "./pages/DocumentSubmission";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loan-programs" element={<LoanPrograms />} />
            {/* Placeholder routes - will be implemented */}
            <Route path="/investors-portal" element={<InvestorsPortal />} />
            <Route path="/referral-program" element={<div className="p-8 text-center">Referral Program - Coming Soon</div>} />
            <Route path="/about-us" element={<div className="p-8 text-center">About Us - Coming Soon</div>} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/draw-request" element={<div className="p-8 text-center">Draw Request - Coming Soon</div>} />
            <Route path="/document-submission" element={<DocumentSubmission />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
