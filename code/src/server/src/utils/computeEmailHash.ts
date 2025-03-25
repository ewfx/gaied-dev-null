import crypto from "crypto";

export const computeEmailHash = (
  subject: string,
  body: string,
  date: string
): string => {
  return crypto
    .createHash("sha256")
    .update(subject + body + date)
    .digest("hex");
};
