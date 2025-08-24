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
import ReferralProgram from "./pages/ReferralProgram";
import AboutUs from "./pages/AboutUs";
import DrawRequest from "./pages/DrawRequest";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

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
            <Route path="/referral-program" element={<ReferralProgram />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/draw-request" element={<DrawRequest />} />
            <Route path="/document-submission" element={<DocumentSubmission />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
