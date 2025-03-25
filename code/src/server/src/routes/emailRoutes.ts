import { Request, Response, Router } from "express";
import { parseEmlFile } from "../controllers/emailParser";
import ask from "../services/openAIService";
import EmailModel from "../models/Email";
import { defaultKnowledgeBase } from "../constants/knowledgeBase";
import { computeEmailHash } from "../utils/computeEmailHash";

const router = Router();

// Define request type
interface ParseEmailRequest extends Request {
  body: { filePath: string; knowledgeBase?: any };
}

router.post("/process", async (req: ParseEmailRequest, res: any) => {
  try {
    const { filePath, knowledgeBase } = req.body;

    if (!filePath)
      return res.status(400).json({ error: "File path is required." });

    const emailData = await parseEmlFile(filePath);
    if (!emailData)
      return res.status(500).json({ error: "Failed to parse email." });

    const emailHash = computeEmailHash(
      emailData.subject,
      emailData.body,
      emailData.date
    );

    const existingEmail = await EmailModel.findOne({ emailHash });

    if (existingEmail) {
      return res
        .status(200)
        .json({ message: "Duplicate email detected.", email: existingEmail });
    }

    const attachmentTexts = emailData.attachments
      .map(
        (att, index) =>
          `Attachment ${index + 1} (${att.filename}):\n${
            att.extractedText || "No text extracted."
          }`
      )
      .join("\n\n");

    const promptKnowledgeBase =
      knowledgeBase && Object.keys(knowledgeBase).length
        ? knowledgeBase
        : defaultKnowledgeBase;

    const prompt = `
      You have to act as an AI agent understanding Loan Servicing that can find the primary intent and summary of an email, and also assign request type and sub-request type to the email based on the specifications provided in the Knowledge Base.
      You will be provided the email body and the extracted email attachments as inputs.

      Knowledge Base:
      For the assignment of Request type and Sub Request type, you need to follow the specifications provided in the JSON format below.
      Each key is the Request type, and the value is the Sub Request types that are possible.
      You need to assign the Request type and Sub Request type based on the extracted data from the email body and the extracted attachment data provided.
      There could be that could have multiple request types and sub request types you need to add a confidence score for each of these in the output
      in a case where there are overlaps between the request type and sub request type of different categories, you need to give a confidence score in percentage for each of these in output following the output guidelines.

      ${JSON.stringify(promptKnowledgeBase, null, 2)}

      Knowledge base ends here.

      You need to output the following:
      1. The primary intent of the email body.
      2. The important details about the extracted file from the PDF and the email body such as deal name, deal amount, deal date,sender,account numbers, parties involved etc whatever is relevant all of this has to be a single flat object with no nesting and just string values.
      3. A brief Summary of the email body and the attachment's as per your analysis.
      4. Request types and Sub Request types as per the specifications provided in the Knowledge Base along with the confidence score for each in case of overlap, do note that this has to be an object called request_types which is an array of objects with keys request_type, confidence_score, sub_request_type,sub_confidence_score the confidence score should be be in percentage.

      All of the above needs to be in a well structured json format. inside a markdown json code block with triple backticks'
      Your output should only the json and nothing else.


      Here are your inputs:
      Email Body: ${emailData.body}
      Attachment Data: ${attachmentTexts}
    `;

    // Run LLM inference

    const aiResponse = await ask(prompt);

    if (!aiResponse.responseJSON)
      return res.status(500).json({ error: "AI response invalid." });

    const newEmail = new EmailModel({
      emailHash,
      ...emailData,
      extractedFields: aiResponse.responseJSON
        ? (aiResponse.responseJSON as Record<string, any>)[
            Object.keys(aiResponse.responseJSON)[1]
          ] || null
        : null,
      mlResults: aiResponse.responseJSON,
    });
    await newEmail.save();

    res.json({ message: "Email processed successfully", email: newEmail });

    // res.json({ aiResponse, emailData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
