import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SecurityProvider } from "./components/SecurityProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import ApplicantLayout from "./components/ApplicantLayout";
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

// Applicant Portal Pages
import ApplicantSignup from "./pages/applicant/ApplicantSignup";
import ApplicantLogin from "./pages/applicant/ApplicantLogin";
import ResetPassword from "./pages/applicant/ResetPassword";
import ApplicantDashboard from "./pages/applicant/ApplicantDashboard";
import ApplicantMessages from "./pages/applicant/ApplicantMessages";
import ApplicantDocuments from "./pages/applicant/ApplicantDocuments";
import ApplicantApplications from "./pages/applicant/ApplicantApplications";

// Admin Portal Pages
import AdminPortalLogin from "./pages/admin/AdminPortalLogin";
import AdminTestLogin from "./pages/admin/AdminTestLogin";
import LoanOfficerLogin from "./pages/admin/LoanOfficerLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoanOfficerDashboard from "./pages/admin/LoanOfficerDashboard";
import TTSTest from "./pages/TTSTest";

const queryClient = new QueryClient();

const App = () => {
  console.log('🚀 App component loaded, routes configured');
  return (
    <QueryClientProvider client={queryClient}>
      <SecurityProvider>
        <AuthProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/loan-programs" element={<Layout><LoanPrograms /></Layout>} />
            <Route path="/investors-portal" element={<Layout><InvestorsPortal /></Layout>} />
            <Route path="/referral-program" element={<Layout><ReferralProgram /></Layout>} />
            <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
            <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
            <Route path="/draw-request" element={<Layout><DrawRequest /></Layout>} />
            <Route path="/document-submission" element={<Layout><DocumentSubmission /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
            
            {/* Applicant Portal Auth Routes */}
            <Route path="/applicant-signup" element={<ApplicantSignup />} />
            <Route path="/applicant-login" element={<ApplicantLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected Applicant Portal Routes */}
            <Route path="/applicant-dashboard" element={
              <ProtectedRoute allowedRoles={['borrower', 'loan_officer', 'admin']}>
                <ApplicantLayout><ApplicantDashboard /></ApplicantLayout>
              </ProtectedRoute>
            } />
            <Route path="/applicant-messages" element={
              <ProtectedRoute allowedRoles={['borrower', 'loan_officer', 'admin']}>
                <ApplicantLayout><ApplicantMessages /></ApplicantLayout>
              </ProtectedRoute>
            } />
            <Route path="/applicant-documents" element={
              <ProtectedRoute allowedRoles={['borrower', 'loan_officer', 'admin']}>
                <ApplicantLayout><ApplicantDocuments /></ApplicantLayout>
              </ProtectedRoute>
            } />
            <Route path="/applicant-applications" element={
              <ProtectedRoute allowedRoles={['borrower', 'loan_officer', 'admin']}>
                <ApplicantLayout><ApplicantApplications /></ApplicantLayout>
              </ProtectedRoute>
            } />
            <Route path="/applicant-profile" element={
              <ProtectedRoute allowedRoles={['borrower', 'loan_officer', 'admin']}>
                <ApplicantLayout><div className="p-6"><h1>Profile - Coming Soon</h1></div></ApplicantLayout>
              </ProtectedRoute>
            } />
            
            {/* Hidden Admin Portal Routes */}
            <Route path="/admin-portal-login" element={<AdminPortalLogin />} />
            <Route path="/admin-test-login" element={<AdminTestLogin />} />
            <Route path="/loan-officer-login" element={<LoanOfficerLogin />} />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin-portal-login">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/loan-officer-dashboard" element={
              <ProtectedRoute allowedRoles={['loan_officer', 'admin']} redirectTo="/loan-officer-login">
                <LoanOfficerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/tts-test" element={
              <ProtectedRoute allowedRoles={['admin', 'loan_officer']} redirectTo="/admin-portal-login">
                <TTSTest />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
      </SecurityProvider>
    </QueryClientProvider>
  );
};

export default App;
