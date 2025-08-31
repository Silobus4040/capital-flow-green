import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProgramApplications } from '@/hooks/useProgramApplications';
import { FileText, Calendar, DollarSign, MapPin } from 'lucide-react';
import ApplicantLayout from '@/components/ApplicantLayout';

interface Application {
  id: string;
  program_name: string;
  status: string;
  requested_amount: number | null;
  property_address: string | null;
  property_city: string | null;
  property_state: string | null;
  created_at: string;
  admin_notes: string | null;
  program_specific_data: any;
}

export default function ApplicantApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const { getApplications } = useProgramApplications();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'needs_info':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <ApplicantLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </ApplicantLayout>
    );
  }

  return (
    <ApplicantLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground mt-2">
            Track the status of your loan applications and view details.
          </p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                You haven't submitted any loan applications yet. Start by exploring our loan programs.
              </p>
              <Button asChild>
                <a href="/loan-programs">Browse Loan Programs</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{application.program_name}</CardTitle>
                    <Badge className={getStatusColor(application.status)}>
                      {formatStatus(application.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Submitted: {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {application.requested_amount && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Amount: ${application.requested_amount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {(application.property_address || application.property_city) && (
                      <div className="flex items-center gap-2 md:col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {application.property_address && `${application.property_address}, `}
                          {application.property_city}
                          {application.property_state && `, ${application.property_state}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {application.admin_notes && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Note from Loan Officer:</p>
                      <p className="text-sm text-blue-800">{application.admin_notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{application.program_name} - Application Details</DialogTitle>
                        </DialogHeader>
                        
                        {selectedApplication && (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Application Status</h3>
                              <Badge className={getStatusColor(selectedApplication.status)}>
                                {formatStatus(selectedApplication.status)}
                              </Badge>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Program:</span>
                                  <p>{selectedApplication.program_name}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Submitted:</span>
                                  <p>{new Date(selectedApplication.created_at).toLocaleString()}</p>
                                </div>
                                {selectedApplication.requested_amount && (
                                  <div>
                                    <span className="font-medium">Requested Amount:</span>
                                    <p>${selectedApplication.requested_amount.toLocaleString()}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {(selectedApplication.property_address || selectedApplication.property_city) && (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Property Information</h3>
                                <div className="text-sm space-y-1">
                                  {selectedApplication.property_address && (
                                    <p><span className="font-medium">Address:</span> {selectedApplication.property_address}</p>
                                  )}
                                  {selectedApplication.property_city && (
                                    <p><span className="font-medium">City:</span> {selectedApplication.property_city}</p>
                                  )}
                                  {selectedApplication.property_state && (
                                    <p><span className="font-medium">State:</span> {selectedApplication.property_state}</p>
                                  )}
                                </div>
                              </div>
                            )}

                            {selectedApplication.program_specific_data && Object.keys(selectedApplication.program_specific_data).length > 0 && (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Program-Specific Details</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <pre className="text-sm whitespace-pre-wrap">
                                    {JSON.stringify(selectedApplication.program_specific_data, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            )}

                            {selectedApplication.admin_notes && (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Notes from Loan Officer</h3>
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                  <p className="text-sm">{selectedApplication.admin_notes}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ApplicantLayout>
  );
}