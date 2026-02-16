import ApplicantLayout from '@/components/ApplicantLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function ApplicantMessages() {
  return (
    <ApplicantLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Message Center</h1>
            <p className="text-muted-foreground">Communicate with your loan team</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Messages with Loan Team</CardTitle>
            <CardDescription>Send messages and get updates about your loan application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Messaging Coming Soon</p>
              <p>Direct messaging with your loan team will be available here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ApplicantLayout>
  );
}
