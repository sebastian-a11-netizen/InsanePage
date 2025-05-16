export interface ChatMessage {
  id?: string;
  from: string;
  to: string;
  originalText: string;
  translatedText: string;
  timestamp: { seconds: number; nanoseconds: number }; // o Timestamp si estás usando ese tipo
  sourceLang: string;
  targetLang: string;
}
