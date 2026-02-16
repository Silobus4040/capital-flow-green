import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface LoanOfficerMessagingProps {
  clientId: string;
  clientName: string;
  clientEmail: string;
}

export default function LoanOfficerMessaging({ clientId, clientName, clientEmail }: LoanOfficerMessagingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Communication with {clientName}
        </CardTitle>
        <CardDescription>{clientEmail}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Messaging feature coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}
