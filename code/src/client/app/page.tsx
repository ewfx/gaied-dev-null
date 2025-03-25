"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import FileUpload from "@/components/file-upload";
import EmailProcessor from "@/components/email-processor";
import KnowledgeBaseEditor from "@/components/knowledge-base-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "react-hot-toast";
export default function Home() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useDefaultKnowledgeBase, setUseDefaultKnowledgeBase] = useState(true);
  const [customKnowledgeBase, setCustomKnowledgeBase] = useState<any>(null);

  const handleUploadSuccess = (path: string) => {
    setFilePath(path);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleKnowledgeBaseChange = (
    useDefault: boolean,
    knowledgeBase?: any
  ) => {
    console.log("Knowledge base changed:", useDefault, knowledgeBase);
    setUseDefaultKnowledgeBase(useDefault);
    if (!useDefault && knowledgeBase) {
      setCustomKnowledgeBase(knowledgeBase);
    } else {
      setCustomKnowledgeBase(null);
    }
  };

  // Add a useEffect to log state changes for debugging
  useEffect(() => {
    console.log("Current state:", {
      useDefaultKnowledgeBase,
      hasCustomKB: !!customKnowledgeBase,
    });
  }, [useDefaultKnowledgeBase, customKnowledgeBase]);

  return (
    <main className="container mx-auto  px-4 md:px-0">
      <nav className="bg-[#d71e28] font-light text-white px-6 py-4 flex justify-between items-center shadow-md  border-b-[4px] border-[#ffcd41]">
        <Image src="wf_logo.webp" width={200} height={20} alt="wF-LOGO" />

        <div className="hidden md:block">
          <h1 className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition">
            DEV/NULL
          </h1>
        </div>
      </nav>

      <h1 className="text-2xl font-semibold text-black text-center mt-5 mb-10">
        Gen AI Orchestrator: Smart Email & Document Triage
      </h1>

      <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload & Process</TabsTrigger>
          <TabsTrigger value="knowledge-base">Configure Request Types</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload EML File</CardTitle>
                <CardDescription>
                  Upload an .eml file to process and extract its contents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onUploadSuccess={handleUploadSuccess}
                  onError={handleError}
                />
              </CardContent>
            </Card>

            {error && (
              <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                {error}
              </div>
            )}

            {filePath && (
              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Process Email</CardTitle>
                  <CardDescription>
                    Extract information from the uploaded EML file
                    {!useDefaultKnowledgeBase && customKnowledgeBase && (
                      <span className="block mt-1 text-xs font-medium text-primary">
                        Using custom knowledge base
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmailProcessor
                    filePath={filePath}
                    onError={handleError}
                    knowledgeBase={customKnowledgeBase}
                    useDefaultKnowledgeBase={useDefaultKnowledgeBase}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="knowledge-base" className="mt-6">
          <KnowledgeBaseEditor
            onKnowledgeBaseChange={handleKnowledgeBaseChange}
          />
        </TabsContent>
      </Tabs>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
