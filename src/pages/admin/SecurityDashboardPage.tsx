import { SecurityDashboard } from '@/components/SecurityDashboard';
import Layout from '@/components/Layout';

export default function SecurityDashboardPage() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor security events and audit logs
          </p>
        </div>
        <SecurityDashboard />
      </div>
    </Layout>
  );
}