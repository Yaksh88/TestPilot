import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AIGeneratorProps {
  onUseTestCase: (tc: Partial<any>) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ onUseTestCase }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! Describe your test scenario and I’ll generate a test case for you in JSON format."
    },
  ]);
  const [aiResponse, setAIResponse] = useState<Partial<any> | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiResponse]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a test case generator. Always respond ONLY with a JSON object using keys: title, steps, expected, tags, category, status. Do not include any explanation.",
            },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();
      const aiText = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a test case.";

      const tryParse = (text: string): Partial<any> | null => {
        try {
          const jsonStart = text.indexOf("{");
          const json = text.slice(jsonStart);
          return JSON.parse(json);
        } catch {
          return null;
        }
      };

      const structured = tryParse(aiText);
      if (structured) setAIResponse(structured);

      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error generating test case." }]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (msg: { sender: string; text: string }, index: number) => {
    const isUser = msg.sender === "user";
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        <div className="flex items-start gap-2 max-w-md">
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center text-xs font-bold">
              AI
            </div>
          )}
          <div
            className={`rounded-lg px-4 py-2 text-sm whitespace-pre-wrap shadow-sm ${
              isUser
                ? "bg-blue-500 text-white self-end"
                : "bg-white/90 text-gray-800 border border-gray-200"
            }`}
          >
            {msg.text}
          </div>
          {isUser && (
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              U
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Chat AI</h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => renderMessage(msg, idx))}
        {loading && (
          <div className="text-sm text-gray-500 italic animate-pulse px-4">AI is thinking...</div>
        )}

        {aiResponse && (
          <motion.div
            className="p-4 bg-slate-50 border border-slate-300 rounded-lg shadow-md space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SyntaxHighlighter language="json" style={materialLight}>
              {JSON.stringify(aiResponse, null, 2)}
            </SyntaxHighlighter>

            <button
              onClick={() => onUseTestCase(aiResponse)}
              className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Use this Test Case
            </button>
          </motion.div>
        )}

        <div ref={scrollRef} />
      </div>

      <div className="flex items-center gap-2 border rounded-lg px-4 py-2 mt-2 bg-white shadow">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI to generate test cases..."
          className="flex-1 focus:outline-none text-sm"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIGenerator;
