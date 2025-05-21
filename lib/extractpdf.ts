import { Buffer } from "buffer";
import { inflateRaw } from "zlib";
import { promisify } from "util";

const inflateRawAsync = promisify(inflateRaw);

/**
 * Extracts text from a PDF file (Basic method)
 * @param buffer - PDF file as Buffer
 * @returns Extracted text as string
 */
function extractTextFromPDF(buffer: Buffer): string {
    let text = "";
    let isTextBlock = false;
  
    for (let i = 0; i < buffer.length; i++) {
      const char = buffer[i];
  
      // Detect the start of a text block in PDF (heuristic method)
      if (char === 40) {
        isTextBlock = true;
        continue;
      }
      if (char === 41) {
        isTextBlock = false;
        continue;
      }
  
      // Extract only readable ASCII text
      if (isTextBlock && char >= 32 && char <= 126) {
        text += String.fromCharCode(char);
      }
    }
  
    return text.replace(/\s+/g, " ").trim();
  }
  

/**
 * Extracts text from a DOCX file (Manual parsing)
 * @param buffer - DOCX file as Buffer
 * @returns Extracted text as string
 */
async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    // DOCX is a ZIP archive, locate XML data
    const zipEnd = buffer.lastIndexOf("PK\u0005\u0006");
    if (zipEnd === -1) throw new Error("Invalid DOCX file");

    const zipStart = buffer.indexOf("PK\u0003\u0004");
    if (zipStart === -1) throw new Error("Invalid DOCX file");

    // Locate document.xml inside the ZIP archive
    const xmlStart = buffer.indexOf("<w:document");
    if (xmlStart === -1) throw new Error("Invalid DOCX XML structure");

    const xmlEnd = buffer.lastIndexOf("</w:document>");
    if (xmlEnd === -1) throw new Error("Invalid DOCX XML structure");

    // Extract raw XML text
    const compressedXml = buffer.subarray(xmlStart, xmlEnd + 13);
    const xmlData = await inflateRawAsync(compressedXml);
    const xmlText = new TextDecoder().decode(xmlData);

    // Remove XML tags to extract only readable text
    return xmlText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  } catch (error) {
    console.error("Error extracting DOCX text:", error);
    return "Error extracting text from DOCX";
  }
}

export { extractTextFromPDF, extractTextFromDOCX };
