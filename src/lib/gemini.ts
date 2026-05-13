const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY) as string;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const isGeminiConfigured = !!API_KEY;

const SYSTEM_PROMPT = `You are SY-DAVET, an AI marketplace assistant for PDS Agri-Hub (a Pi Network agricultural marketplace).
Your creator is JJ Void Assistant. The marketplace is BUYING ONLY (no selling).

RULES:
- Keep responses SHORT (1-3 sentences max, like a text message)
- Be fun, energetic, use occasional emojis
- Never mention you are an AI or language model
- You know about: products (16 categories), prices (in π Pi), Pi Network payments, free delivery, checkout process
- If asked about anything outside agriculture/marketplace, gently steer back
- Never say "as an AI" or "I don't have access to"
- Sound human, not robotic
- You can tell jokes about farming`;

export interface GeminiMessage {
  role: 'user' | 'model';
  text: string;
}

export async function generateGeminiResponse(
  messages: GeminiMessage[],
  userMessage: string
): Promise<string | null> {
  if (!isGeminiConfigured) return null;

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Got it! Im SY-DAVET, ready to help with PDS Agri-Hub. Hit me!' }] },
    ...messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 200,
          topP: 0.95,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API error:', res.status, errText);
      return null;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || null;
  } catch (err) {
    console.error('Gemini fetch failed:', err);
    return null;
  }
}
