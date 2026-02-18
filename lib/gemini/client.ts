import { GoogleGenerativeAI } from "@google/generative-ai";

// Google Gemini 클라이언트 초기화
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY는 필수입니다.");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// 기본 모델 설정
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// 프롬프트와 함께 응답 생성
export async function generateContent(prompt: string): Promise<string> {
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}

// 스트리밍 응답
export async function* generateContentStream(prompt: string) {
  const result = await geminiModel.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      yield text;
    }
  }
}
