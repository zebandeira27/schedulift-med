import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, FileText, Clock } from "lucide-react";

interface PatientRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  visitType: string;
  diagnosis: string;
  status: "completed" | "pending" | "follow-up";
  doctor: string;
}

const mockPatientData: PatientRecord[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientId: "P-2024-001",
    date: "2024-12-28",
    visitType: "Annual Checkup",
    diagnosis: "Routine examination - healthy",
    status: "completed",
    doctor: "Dr. Smith"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientId: "P-2024-002",
    date: "2024-12-27",
    visitType: "Consultation",
    diagnosis: "Seasonal allergies",
    status: "follow-up",
    doctor: "Dr. Williams"
  },
  {
    id: "3",
    patientName: "Emma Davis",
    patientId: "P-2024-003",
    date: "2024-12-26",
    visitType: "Follow-up",
    diagnosis: "Post-surgery recovery",
    status: "completed",
    doctor: "Dr. Smith"
  },
  {
    id: "4",
    patientName: "James Wilson",
    patientId: "P-2024-004",
    date: "2024-12-25",
    visitType: "Emergency",
    diagnosis: "Minor injury - treated",
    status: "completed",
    doctor: "Dr. Johnson"
  },
  {
    id: "5",
    patientName: "Olivia Brown",
    patientId: "P-2024-005",
    date: "2024-12-24",
    visitType: "Consultation",
    diagnosis: "Prescription refill",
    status: "pending",
    doctor: "Dr. Williams"
  }
];

const PatientHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients] = useState<PatientRecord[]>(mockPatientData);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent text-accent-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "follow-up":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Patient History</h1>
              <p className="text-muted-foreground">View and manage patient records</p>
            </div>
            <Button className="shadow-medium">
              <FileText className="mr-2 h-4 w-4" />
              New Record
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, ID, or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 shadow-soft"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="pb-3">
              <CardDescription>Total Patients</CardDescription>
              <CardTitle className="text-3xl text-primary">{patients.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="pb-3">
              <CardDescription>Completed Visits</CardDescription>
              <CardTitle className="text-3xl text-accent">
                {patients.filter((p) => p.status === "completed").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="pb-3">
              <CardDescription>Follow-ups Required</CardDescription>
              <CardTitle className="text-3xl text-primary">
                {patients.filter((p) => p.status === "follow-up").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Patient Records */}
        <div className="space-y-4 animate-scale-in">
          {filteredPatients.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No patient records found</p>
              </CardContent>
            </Card>
          ) : (
            filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="shadow-soft hover:shadow-medium transition-all cursor-pointer"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{patient.patientName}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {patient.patientId}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {patient.diagnosis}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(patient.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{patient.visitType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{patient.doctor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientHistory;
