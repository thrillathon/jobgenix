import pdfParse from "pdf-parse";

/**
 * Extracts text from a PDF file using pdf-parse
 * @param buffer - PDF file as Buffer
 * @returns Extracted text as a string
 */
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text.trim(); // Returns extracted text
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return "Error extracting text from PDF";
  }
}

export { extractTextFromPDF };
