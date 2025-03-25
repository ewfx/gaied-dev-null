"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import EmailDetails from "@/components/EmailDetails";
import { toast } from "react-hot-toast";
interface EmailProcessorProps {
  filePath: string;
  onError: (error: string) => void;
  knowledgeBase?: any;
  useDefaultKnowledgeBase: boolean;
}

export default function EmailProcessor({
  filePath,
  onError,
  knowledgeBase,
  useDefaultKnowledgeBase,
}: EmailProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailData, setEmailData] = useState<any | null>(null);
  const [duplicateEmail, setDuplicateEmail] = useState<string | null>(null);
  const processEmail = async () => {
    setIsProcessing(true);

    try {
      console.log("Processing with:", {
        useDefaultKB: useDefaultKnowledgeBase,
        hasCustomKB: !!knowledgeBase,
      });

      // Ensure knowledge base is sent if it has been modified
      const requestBody = useDefaultKnowledgeBase
        ? { filePath }
        : { filePath, knowledgeBase };

      const response = await fetch("http://localhost:3000/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process email");
      }

      const data = await response.json();
      setEmailData(data.email); // Extracting email data from response
      if (data.message) {
        setDuplicateEmail(data.message);
      }
      toast.success("Email processed successfully✅");
    } catch (error) {
      toast.error("Failed to process email ⚠️");
      onError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {!emailData ? (
        <div className="flex justify-center">
          <Button onClick={processEmail} disabled={isProcessing} size="lg">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Process Email"
            )}
          </Button>
        </div>
      ) : (
        <>
          {duplicateEmail && (
            <div className="bg-yellow-100  text-yellow-800 p-4 rounded-md">
              {duplicateEmail}
            </div>
          )}
          <EmailDetails data={emailData} />
        </>
      )}
    </div>
  );
}
