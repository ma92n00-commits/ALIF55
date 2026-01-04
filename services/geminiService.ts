import { GoogleGenAI } from "@google/genai";
import { EXTRACTION_PROMPT, FORMATTING_PROMPT } from '../constants';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const generateExamHtml = async (file: File): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Data = await fileToBase64(file);

  try {
    // الخطوة 1: استخراج النص فقط
    // Step 1: Extract Text Only
    // Using gemini-3-flash-preview as it is a multimodal model capable of accurate text extraction from images.
    const extractResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data,
            },
          },
          {
            text: EXTRACTION_PROMPT,
          },
        ],
      },
      config: {
        temperature: 0.1, // Very low temperature for accurate extraction
      }
    });

    const extractedText = extractResponse.text;
    
    if (!extractedText) {
      throw new Error("لم يتمكن النظام من قراءة النص من الصورة.");
    }

    console.log("Extracted Text:", extractedText);

    // الخطوة 2: تنسيق النص إلى HTML
    // Step 2: Format Text to HTML
    const formattingPromptWithText = `${FORMATTING_PROMPT}\n\n${extractedText}`;

    const formatResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            text: formattingPromptWithText,
          },
        ],
      },
      config: {
        temperature: 0.3, // Slightly higher for creative formatting but keeping structure
      }
    });

    let html = formatResponse.text || "";

    // Cleanup formatting if the model adds markdown code blocks despite instructions
    html = html.replace(/```html/g, '').replace(/```/g, '');

    return html;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("فشل في معالجة الملف. يرجى المحاولة مرة أخرى.");
  }
};