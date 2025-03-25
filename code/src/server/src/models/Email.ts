import mongoose, { Schema, Document } from "mongoose";

export interface EmailDocument extends Document {
  emailHash: string;
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
  extractedFields?: any;
  mlResults?: any;
  createdAt: Date;
}

const EmailSchema = new Schema<EmailDocument>({
  emailHash: { type: String, required: true, unique: true },
  subject: String,
  from: String,
  to: String,
  date: String,
  body: String,
  attachments: [
    {
      filename: String,
      contentType: String,
      extractedText: String,
    },
  ],
  extractedFields: Object,
  mlResults: Object,
  createdAt: { type: Date, default: Date.now },
});

const EmailModel = mongoose.model<EmailDocument>("Email", EmailSchema);

export default EmailModel;
