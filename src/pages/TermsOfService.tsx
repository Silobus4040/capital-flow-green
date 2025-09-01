export default function TermsOfService() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using Commercial Capital & Investment Finance services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Services Description</h2>
            <p className="text-muted-foreground mb-4">
              Commercial Capital & Investment Finance provides asset-based commercial real estate lending services with 100% financing options, no credit requirements, and fast approval processes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              For questions regarding these Terms of Service, please contact us at admin@ccif-inc.com or 1-800-FINANCE.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}