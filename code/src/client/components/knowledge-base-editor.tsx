"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit, X, RotateCcw } from "lucide-react";

// Define the knowledge base structure
interface KnowledgeBaseItem {
  sub_request_types: string[];
  description: string;
  keywords: string[];
}

interface KnowledgeBase {
  [key: string]: KnowledgeBaseItem;
}

// Default knowledge base
const defaultKnowledgeBase = {
  Adjustment: {
    sub_request_types: [
      "AU Transfer",
      "Closing Notice",
      "Reallocation Fees",
      "Amendment Fees",
      "Reallocation Principal",
    ],
    description: "Requests related to adjustments to loan accounts",
    keywords: ["adjust", "transfer", "reallocate", "amend", "close"],
  },
  "AU Transfer": {
    sub_request_types: [],
    description: "Requests related to account unit transfers",
    keywords: ["transfer", "AU", "account movement"],
  },
  "Closing Notice": {
    sub_request_types: [
      "Reallocation Fees",
      "Amendment Fees",
      "Reallocation Principal",
    ],
    description: "Requests for loan closing notices",
    keywords: ["closing", "notice", "finalize"],
  },
  "Commitment Change": {
    sub_request_types: ["Cashless Roll", "Decrease", "Increase"],
    description: "Requests to modify loan commitment amounts",
    keywords: ["commitment", "increase", "decrease", "roll", "change"],
  },
  "Fee Payment": {
    sub_request_types: ["Ongoing Fee", "Letter of Credit Fee"],
    description: "Requests related to fee payments",
    keywords: ["fee", "payment", "charge", "credit fee"],
  },
  "Money Movement - Inbound": {
    sub_request_types: [
      "Principal",
      "Interest",
      "Principal + Interest",
      "Principal + Interest + Fees",
    ],
    description: "Requests for incoming fund transfers",
    keywords: ["deposit", "transfer in", "funding", "inbound", "payment"],
  },
  "Money Movement - Outbound": {
    sub_request_types: ["Timebound", "Foreign Currency"],
    description: "Requests for outgoing fund transfers",
    keywords: ["withdraw", "transfer out", "outbound", "payment out"],
  },
  "Payment Processing": {
    sub_request_types: ["Payment Posting", "Payment Reversal"],
    description: "Requests related to processing loan payments",
    keywords: ["payment", "processing", "reversal", "posting"],
  },
  "Escrow Management": {
    sub_request_types: ["Tax Payment", "Insurance Payment", "Escrow Analysis"],
    description: "Requests related to escrow account management",
    keywords: ["escrow", "tax", "insurance", "analysis"],
  },
  "Loan Modification": {
    sub_request_types: [
      "Interest Rate Adjustment",
      "Term Extension",
      "Principal Forbearance",
    ],
    description: "Requests for loan modifications",
    keywords: ["loan", "modification", "rate", "extension", "forbearance"],
  },
  "Default Management": {
    sub_request_types: ["Collections", "Loss Mitigation", "Foreclosure"],
    description: "Requests related to managing defaulted loans",
    keywords: ["default", "collections", "foreclosure", "mitigation"],
  },
  "Customer Service": {
    sub_request_types: [
      "Account Inquiry",
      "Statement Request",
      "Complaint Resolution",
    ],
    description: "General customer service requests",
    keywords: ["customer", "service", "inquiry", "statement", "complaint"],
  },
  "Investor Reporting": {
    sub_request_types: ["Remittance Reporting", "Delinquency Reporting"],
    description: "Requests related to investor reporting",
    keywords: ["investor", "reporting", "remittance", "delinquency"],
  },
};

interface KnowledgeBaseEditorProps {
  onKnowledgeBaseChange: (
    useDefault: boolean,
    knowledgeBase?: KnowledgeBase
  ) => void;
}

export default function KnowledgeBaseEditor({
  onKnowledgeBaseChange,
}: KnowledgeBaseEditorProps) {
  const [useDefaultKnowledgeBase, setUseDefaultKnowledgeBase] = useState(true);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>({
    ...defaultKnowledgeBase,
  });
  const [isAddRequestTypeOpen, setIsAddRequestTypeOpen] = useState(false);
  const [isAddSubRequestTypeOpen, setIsAddSubRequestTypeOpen] = useState(false);
  const [isEditRequestTypeOpen, setIsEditRequestTypeOpen] = useState(false);
  const [currentRequestType, setCurrentRequestType] = useState("");
  const [newRequestType, setNewRequestType] = useState({
    name: "",
    description: "",
    keywords: "",
  });
  const [newSubRequestType, setNewSubRequestType] = useState("");
  const [editRequestType, setEditRequestType] = useState({
    originalName: "",
    name: "",
    description: "",
    keywords: "",
  });

  // Update parent component when knowledge base changes
  useEffect(() => {
    if (useDefaultKnowledgeBase) {
      onKnowledgeBaseChange(true);
    } else {
      onKnowledgeBaseChange(false, knowledgeBase);
    }
  }, [useDefaultKnowledgeBase, knowledgeBase, onKnowledgeBaseChange]);

  // Reset to default knowledge base
  const resetToDefault = () => {
    setKnowledgeBase({ ...defaultKnowledgeBase });
    // Don't call onKnowledgeBaseChange here, let the useEffect handle it
  };

  // Toggle between default and custom knowledge base
  const handleToggleDefault = (checked: boolean) => {
    setUseDefaultKnowledgeBase(checked);
    if (checked) {
      // Reset to default when switching to default mode
      setKnowledgeBase({ ...defaultKnowledgeBase });
    }
  };

  // Add a new request type
  const handleAddRequestType = () => {
    if (!newRequestType.name.trim()) return;

    const updatedKnowledgeBase = { ...knowledgeBase };
    updatedKnowledgeBase[newRequestType.name] = {
      sub_request_types: [],
      description: newRequestType.description,
      keywords: newRequestType.keywords
        .split(",")
        .map((k: any) => k.trim())
        .filter((k: any) => k),
    };

    setKnowledgeBase(updatedKnowledgeBase);
    setNewRequestType({ name: "", description: "", keywords: "" });
    setIsAddRequestTypeOpen(false);
  };

  // Add a new sub-request type
  const handleAddSubRequestType = () => {
    if (!newSubRequestType.trim() || !currentRequestType) return;

    const updatedKnowledgeBase = { ...knowledgeBase };
    if (
      !updatedKnowledgeBase[currentRequestType].sub_request_types.includes(
        newSubRequestType
      )
    ) {
      updatedKnowledgeBase[currentRequestType].sub_request_types.push(
        newSubRequestType
      );
    }

    setKnowledgeBase(updatedKnowledgeBase);
    setNewSubRequestType("");
    setIsAddSubRequestTypeOpen(false);
  };

  // Edit a request type
  const handleEditRequestType = () => {
    if (!editRequestType.name.trim()) return;

    const updatedKnowledgeBase = { ...knowledgeBase };

    // If name changed, create a new entry and delete the old one
    if (editRequestType.originalName !== editRequestType.name) {
      updatedKnowledgeBase[editRequestType.name] = {
        sub_request_types: [
          ...updatedKnowledgeBase[editRequestType.originalName]
            .sub_request_types,
        ],
        description: editRequestType.description,
        keywords: editRequestType.keywords
          .split(",")
          .map((k: any) => k.trim())
          .filter((k: any) => k),
      };
      delete updatedKnowledgeBase[editRequestType.originalName];
    } else {
      // Just update the existing entry
      updatedKnowledgeBase[editRequestType.name] = {
        sub_request_types:
          updatedKnowledgeBase[editRequestType.name].sub_request_types,
        description: editRequestType.description,
        keywords: editRequestType.keywords
          .split(",")
          .map((k: any) => k.trim())
          .filter((k: any) => k),
      };
    }

    setKnowledgeBase(updatedKnowledgeBase);
    setIsEditRequestTypeOpen(false);
  };

  // Delete a request type
  const handleDeleteRequestType = (requestType: string) => {
    const updatedKnowledgeBase = { ...knowledgeBase };
    delete updatedKnowledgeBase[requestType];
    setKnowledgeBase(updatedKnowledgeBase);
  };

  // Delete a sub-request type
  const handleDeleteSubRequestType = (
    requestType: string,
    subRequestType: string
  ) => {
    const updatedKnowledgeBase = { ...knowledgeBase };
    updatedKnowledgeBase[requestType].sub_request_types = updatedKnowledgeBase[
      requestType
    ].sub_request_types.filter((item: any) => item !== subRequestType);
    setKnowledgeBase(updatedKnowledgeBase);
  };

  // Open edit dialog for a request type
  const openEditRequestType = (requestType: string) => {
    setEditRequestType({
      originalName: requestType,
      name: requestType,
      description: knowledgeBase[requestType].description,
      keywords: knowledgeBase[requestType].keywords.join(", "),
    });
    setIsEditRequestTypeOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request Type Configurations</CardTitle>
        <CardDescription>
          Configure the Request Types used for email processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="use-default">Use Default Presets</Label>
            <p className="text-sm text-muted-foreground">
              Toggle to use the default Default Presets or Create Custom
              Configurations.
            </p>
          </div>
          <Switch
            id="use-default"
            checked={useDefaultKnowledgeBase}
            onCheckedChange={handleToggleDefault}
          />
        </div>

        {!useDefaultKnowledgeBase && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Request Types</h3>
              <Dialog
                open={isAddRequestTypeOpen}
                onOpenChange={setIsAddRequestTypeOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> Add Request Type
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Request Type</DialogTitle>
                    <DialogDescription>
                      Create a new request type with description and keywords
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="request-type-name">Name</Label>
                      <Input
                        id="request-type-name"
                        value={newRequestType.name}
                        onChange={(e) =>
                          setNewRequestType({
                            ...newRequestType,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g., Loan Application"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-type-description">
                        Description
                      </Label>
                      <Textarea
                        id="request-type-description"
                        value={newRequestType.description}
                        onChange={(e) =>
                          setNewRequestType({
                            ...newRequestType,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe this request type..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-type-keywords">
                        Keywords to Target (comma separated)
                      </Label>
                      <Input
                        id="request-type-keywords"
                        value={newRequestType.keywords}
                        onChange={(e) =>
                          setNewRequestType({
                            ...newRequestType,
                            keywords: e.target.value,
                          })
                        }
                        placeholder="e.g., loan, application, apply"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddRequestTypeOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddRequestType}>
                      Add Request Type
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Accordion type="multiple" className="w-full">
              {Object.keys(knowledgeBase).map((requestType) => (
                <AccordionItem key={requestType} value={requestType}>
                  <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{requestType}</span>
                      <div
                        className="flex items-center gap-2"
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        <div
                          className="hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-center"
                          onClick={() => openEditRequestType(requestType)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div className="hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-center">
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Delete</span>
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Request Type
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{requestType}"?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() =>
                                  handleDeleteRequestType(requestType)
                                }
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Description
                        </Label>
                        <p className="text-sm mt-1">
                          {knowledgeBase[requestType].description}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Keywords
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {knowledgeBase[requestType].keywords.map(
                            (keyword, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-amber-300"
                              >
                                {keyword}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm text-muted-foreground">
                            Sub-Request Types
                          </Label>
                          <Dialog
                            open={
                              isAddSubRequestTypeOpen &&
                              currentRequestType === requestType
                            }
                            onOpenChange={(open) => {
                              setIsAddSubRequestTypeOpen(open);
                              if (open) setCurrentRequestType(requestType);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1"
                              >
                                <Plus className="h-3 w-3" /> Add
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Sub-Request Type</DialogTitle>
                                <DialogDescription>
                                  Add a new sub-request type to "{requestType}"
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <Label htmlFor="sub-request-type-name">
                                  Name
                                </Label>
                                <Input
                                  id="sub-request-type-name"
                                  value={newSubRequestType}
                                  onChange={(e) =>
                                    setNewSubRequestType(e.target.value)
                                  }
                                  placeholder="e.g., Refinance"
                                  className="mt-2"
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setIsAddSubRequestTypeOpen(false)
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleAddSubRequestType}>
                                  Add
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {knowledgeBase[requestType].sub_request_types.length >
                        0 ? (
                          <div className="space-y-2">
                            {knowledgeBase[requestType].sub_request_types.map(
                              (subType, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                                >
                                  <span className="text-sm">{subType}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() =>
                                      handleDeleteSubRequestType(
                                        requestType,
                                        subType
                                      )
                                    }
                                  >
                                    <X className="h-3 w-3 text-destructive" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No sub-request types
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Edit Request Type Dialog */}
        <Dialog
          open={isEditRequestTypeOpen}
          onOpenChange={setIsEditRequestTypeOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Request Type</DialogTitle>
              <DialogDescription>
                Modify the details of this request type
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-request-type-name">Name</Label>
                <Input
                  id="edit-request-type-name"
                  value={editRequestType.name}
                  onChange={(e) =>
                    setEditRequestType({
                      ...editRequestType,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-request-type-description">
                  Description
                </Label>
                <Textarea
                  id="edit-request-type-description"
                  value={editRequestType.description}
                  onChange={(e) =>
                    setEditRequestType({
                      ...editRequestType,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-request-type-keywords">
                  Keywords (comma separated)
                </Label>
                <Input
                  id="edit-request-type-keywords"
                  value={editRequestType.keywords}
                  onChange={(e) =>
                    setEditRequestType({
                      ...editRequestType,
                      keywords: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditRequestTypeOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditRequestType}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!useDefaultKnowledgeBase && (
          <Button variant="default" onClick={resetToDefault}>
            <RotateCcw /> Reset to Default
          </Button>
        )}
        <div className="flex-1"></div>
      </CardFooter>
    </Card>
  );
}
