import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ROLE_PREPROMPT = `
You are AthleteChatbot, a supportive and knowledgeable AI assistant for athletes of all levels. 
Your role is to:
- Give clear, practical advice on training, recovery, nutrition, mindset, and sports science.  
- Motivate athletes with encouraging words and actionable tips that build discipline and confidence.  
- Adapt your responses to the athlete’s context (beginner, intermediate, advanced, or adaptive/disabled athletes).  
- Provide safe, evidence-based guidance, avoiding medical diagnosis or dangerous recommendations.  
- Keep your tone friendly, inspiring, and easy to understand, like a caring coach or mentor.  
- Where possible, give step-by-step guidance, examples, or small routines athletes can follow.  
- If a question is outside your expertise (e.g., serious injury or medical concern), politely advise the athlete to consult a qualified professional.

Always respond as a trusted sports guide, combining practical knowledge with motivation.
`;

const AthleteChatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<
    { type: "question" | "answer"; content: string }[]
  >([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              role: "user",
              parts: [{ text: `${ROLE_PREPROMPT}\n${currentQuestion}` }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": process.env
              .NEXT_PUBLIC_GEMINI_API_KEY as string,
          },
        }
      );

      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response.";
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry - Something went wrong. Please try again!",
        },
      ]);
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-4">
        {/* Header */}
        <header className="flex items-center justify-between py-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-blue-600">
              <img src="/talent-track-logo.png" alt="Talent Track Logo" className="w-8 h-8 object-cover rounded-full" />
            </div>
            <h1 className="text-xl font-bold text-white">TalentTrack AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
        </header>

        {/* Chat Window */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-xl bg-slate-850 border border-slate-700 p-4 hide-scrollbar"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl border border-slate-700">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white border-4 border-blue-600">
                  <img src="/talent-track-logo.png" alt="Talent Track Logo" className="w-12 h-12 object-cover rounded-full" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to TalentTrack AI! 🏆
                </h2>
                <p className="text-gray-300 mb-4">
                  I'm here to help with training, nutrition, motivation, and sports performance.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    "How can I improve my endurance?",
                    "Best pre-workout meals?",
                    "Recovery techniques for athletes",
                    "Mental preparation tips"
                  ].map((faq) => (
                    <button
                      key={faq}
                      type="button"
                      className="bg-slate-800 p-3 rounded-lg text-sm text-gray-300 hover:bg-blue-700 hover:text-white transition-colors text-left"
                      onClick={() => {
                        setQuestion(faq);
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) {
                            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                          }
                        }, 0);
                      }}
                    >
                      {faq}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-6 flex ${chat.type === "question" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${chat.type === "question"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
                      : "bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-md"
                      }`}
                  >
                    {chat.type === "answer" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-blue-600">
                          <img src="/talent-track-logo.png" alt="Talent Track Logo" className="w-8 h-8 object-cover rounded-full" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">TalentTrack AI</span>
                      </div>
                    )}
                    <div className={`${chat.type === "answer" ? "ml-8" : ""}`}>
                      <ReactMarkdown>{chat.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {generatingAnswer && (
            <div className="flex justify-start mb-6">
              <div className="max-w-[85%] rounded-2xl p-4 bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-400">TalentTrack AI</span>
                </div>
                <div className="ml-8 flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <form
          onSubmit={generateAnswer}
          className="bg-slate-900 rounded-xl border border-slate-700 p-3"
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                required
                className="w-full bg-slate-800 text-gray-200 border border-slate-700 rounded-xl p-3 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none hide-scrollbar"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Message TalentTrack AI..."
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    generateAnswer(e as any);
                  }
                }}
              ></textarea>
              <div className="absolute right-3 bottom-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className={`self-end px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg ${generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={generatingAnswer}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            TalentTrack AI can make mistakes. Consider checking important information.
          </div>
        </form>
      </div>
    </div>
  );
};

export default AthleteChatbot;