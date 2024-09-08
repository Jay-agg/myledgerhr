"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  Briefcase,
  Calendar,
  Code,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface VerificationRequest {
  id: number;
  name: string;
  jobRole: string;
  company: string;
  duration: string;
  skills: string[];
}

interface AlertState {
  type: "success" | "error";
  message: string;
}

const defaultRequests: VerificationRequest[] = [
  {
    id: 1,
    name: "John Doe",
    jobRole: "Software Engineer",
    company: "TechCorp",
    duration: "2020-2023",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Jane Smith",
    jobRole: "Product Manager",
    company: "InnovateCo",
    duration: "2018-2022",
    skills: ["Agile", "Scrum", "Product Strategy"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    jobRole: "UX Designer",
    company: "DesignHub",
    duration: "2019-2024",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 4,
    name: "Bob Williams",
    jobRole: "Data Scientist",
    company: "DataTech",
    duration: "2021-2024",
    skills: ["Python", "Machine Learning", "SQL"],
  },
];

const MyLedger = () => {
  const [verificationRequests] =
    useState<VerificationRequest[]>(defaultRequests);
  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const handleCardClick = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      setAlert({
        type: "success",
        message: `Verification for ${selectedRequest.name} approved.`,
      });
      setIsDialogOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedRequest) {
      setAlert({
        type: "error",
        message: `Verification for ${selectedRequest.name} rejected.`,
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="p-4 bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        MyLedger - Verification Requests
      </h1>

      {alert && (
        <Alert
          className="mb-6 max-w-md mx-auto text-white"
          variant={alert.type === "success" ? "default" : "destructive"}
        >
          {alert.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verificationRequests.map((request) => (
          <Card
            key={request.id}
            className="cursor-pointer hover:shadow-lg transition-shadow bg-slate-800 border-slate-700 text-slate-200 rounded-lg"
          >
            <CardHeader className="bg-slate-700 rounded-t-lg">
              <CardTitle className="flex items-center text-blue-300">
                <User className="mr-2" />
                {request.name}
              </CardTitle>
              <CardDescription className="text-slate-300">
                {request.jobRole} at {request.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="flex items-center mb-2 text-slate-300">
                <Briefcase className="mr-2 h-4 w-4" /> {request.company}
              </p>
              <p className="flex items-center mb-2 text-slate-300">
                <Calendar className="mr-2 h-4 w-4" /> {request.duration}
              </p>
              <div className="flex items-center">
                <Code className="mr-2 h-4 w-4 text-slate-300" />
                <div className="flex flex-wrap gap-1">
                  {request.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600 text-slate-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleCardClick(request)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-slate-200"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-800 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-blue-400">
              {selectedRequest?.name} - Verification Details
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Review and verify the following information:
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="mt-4 space-y-2">
              <p className="flex items-center">
                <User className="mr-2 h-4 w-4 text-blue-400" />{" "}
                <strong>Job Role:</strong> {selectedRequest.jobRole}
              </p>
              <p className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-blue-400" />{" "}
                <strong>Company:</strong> {selectedRequest.company}
              </p>
              <p className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-400" />{" "}
                <strong>Duration:</strong> {selectedRequest.duration}
              </p>
              <div className="flex items-center">
                <Code className="mr-2 h-4 w-4 text-blue-400" />{" "}
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-1 ml-2">
                  {selectedRequest.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600 text-slate-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="text-slate-200 border-slate-600 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyLedger;
