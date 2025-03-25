import fs from "fs/promises";
import { simpleParser, AddressObject } from "mailparser";
import textract from "textract";
import crypto from "crypto";
import { LRUCache } from "lru-cache";
import path from "path";

// Cache settings
const cache = new LRUCache<string, ParsedEmailData>({
  max: 100, // Store up to 100 items
  ttl: 1000 * 60 * 10, // Cache for 10 minutes
});

// Deduplication toggle
const enableDeduplication = process.env.ENABLE_DEDUPLICATION === "true";

// Type for parsed email data
interface ParsedEmailData {
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
  attachments: {
    filename: string;
    contentType: string;
    extractedText: string;
  }[];
}

// Compute hash for deduplication
const computeEmailHash = (
  subject: string,
  body: string,
  date: string
): string => {
  return crypto
    .createHash("sha256")
    .update(subject + body + date)
    .digest("hex");
};

// Extract email addresses from AddressObject
const extractEmail = (address: AddressObject | AddressObject[]): string => {
  if (Array.isArray(address)) {
    return address
      .flatMap((addr) => addr.value.map((v) => v.address))
      .join("; ");
  }
  return address.value.map((v) => v.address).join(", ");
};

// Extract text from attachments
const extractTextFromAttachment = async (attachment: any): Promise<string> => {
  return new Promise((resolve) => {
    textract.fromBufferWithName(
      attachment.filename,
      attachment.content,
      (error, text) => {
        resolve(error ? "" : text || "");
      }
    );
  });
};

// Parse .eml file
export const parseEmlFile = async (
  filePath: string
): Promise<ParsedEmailData> => {
  try {
    const absoluteFilePath = path.join(process.cwd(), filePath);
    console.log(absoluteFilePath);

    const data = await fs.readFile(absoluteFilePath);
    console.log("File read successfully.", data);

    const parsed = await simpleParser(data);

    const emailHash = computeEmailHash(
      parsed.subject || "No Subject",
      parsed.text || "No Body",
      parsed.date?.toISOString() || ""
    );

    // Check for duplicate emails in cache
    if (enableDeduplication && cache.has(emailHash)) {
      console.log("Duplicate email detected, returning cached result.");
      return cache.get(emailHash)!;
    }

    // Construct parsed email data
    const emailData: ParsedEmailData = {
      subject: parsed.subject || "No Subject",
      from: parsed.from ? extractEmail(parsed.from) : "Unknown Sender",
      to: parsed.to ? extractEmail(parsed.to) : "Unknown Recipient",
      date: parsed.date?.toISOString() || "Unknown Date",
      body: parsed.text || "No Body",
      attachments: [],
    };

    // Process attachments
    for (const attachment of parsed.attachments || []) {
      const extractedText = await extractTextFromAttachment(attachment);
      emailData.attachments.push({
        filename: attachment.filename || "Unknown File",
        contentType: attachment.contentType || "Unknown Type",
        extractedText,
      });
    }

    // Store in cache if deduplication is enabled
    if (enableDeduplication) cache.set(emailHash, emailData);

    console.info("Email parsed successfully:", emailData);
    return emailData;
  } catch (error) {
    console.error("Error parsing EML file:", error);
    throw new Error("Failed to parse email.");
  }
};
