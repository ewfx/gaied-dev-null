import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EmailDetailsProps {
  data: any;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ data }) => {
  if (!data)
    return (
      <p className="text-center text-muted-foreground">No data available.</p>
    );

  const {
    subject,
    from,
    to,
    date,
    body,
    attachments,
    extractedFields,
    mlResults,
  } = data;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Email Header */}
      <Card className="border-neutral-400">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{subject}</CardTitle>
          <p className="text-sm font-semibold text-neutral-700">
            <span className="font-medium">From:</span> {from} &nbsp; | &nbsp;
            <span className="font-medium">To:</span> {to} &nbsp; | &nbsp;
            <span className="font-medium">Date:</span>{" "}
            {new Date(date).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-700">{body}</p>
        </CardContent>
      </Card>

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <Card className="border-neutral-400">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {attachments.map((file: any, index: number) => (
              <div
                key={index}
                className="flex justify-between p-2 border border-neutral-300 rounded-lg"
              >
                <span className="text-sm">{file.filename}</span>
                <Badge variant="default">{file.contentType}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Extracted Fields */}
      {extractedFields && Object.keys(extractedFields).length > 0 && (
        <Card className="border-neutral-400">
          <CardHeader>
            <CardTitle>Extracted Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="extracted_fields">
                <AccordionTrigger>Show Extracted Fields</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(extractedFields).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between p-2 border border-neutral-300 shadow-sm rounded-lg"
                      >
                        <span className="font-semibold text-neutral-600 capitalize">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="text-neutral-800">
                          {value !== null && value !== undefined
                            ? String(value) // Convert all values to strings
                            : "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Machine Learning Analysis */}
      {mlResults && (
        <Card className="border-neutral-400">
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Primary Intent */}
            <div>
              <p className="font-bold text-lg text-neutral-600">Primary Intent</p>
              <p className="text-black">{mlResults.primary_intent}</p>
            </div>

            <Separator />

            {/* Summary */}
            <div>
              <p className="font-bold text-lg text-neutral-600">Summary</p>
              <p className="text-black">{mlResults.summary}</p>
            </div>

            <Separator />

            {/* Request Types */}
            <Accordion type="single" collapsible>
              <AccordionItem value="request_types">
                <AccordionTrigger>Request Types</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {mlResults.request_types.map((req: any, index: number) => {
                      // Function to determine badge color based on confidence score
                      const getConfidenceBadge = (score: number | string) => {
                        console.log(score);
                        if (typeof score === "string") {
                          score = parseFloat(score.replace("%", ""));
                        }

                        if (score >= 80) return "bg-green-100 text-green-800";
                        if (score >= 50) return "bg-yellow-100 text-yellow-800";
                        return "bg-gray-100 text-black";
                      };

                      return (
                        <div
                          key={index}
                          className="p-3 border rounded-lg space-y-2"
                        >
                          <p className="text-sm font-semibold flex items-center gap-2">
                            {req.request_type}
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${getConfidenceBadge(
                                req.confidence_score
                              )}`}
                            >
                              {req.confidence_score} Confidence
                            </span>
                          </p>

                          {req.sub_request_type && (
                            <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                              Sub-Type: {req.sub_request_type}
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getConfidenceBadge(
                                  req.sub_confidence_score
                                )}`}
                              >
                                {req.sub_confidence_score} Confidence
                              </span>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailDetails;
