// src/components/TestSuiteReview.tsx
import { useState } from "react";
import { useTestCases } from "../hooks/useTestCases";
import { callOpenAI } from "../services/aiHelper";

const TestSuiteReview = () => {
  const { testCases } = useTestCases();
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);

    const prompt = `
You are a QA expert. Given the following test cases, analyze and answer:

1. Are there any missing edge cases?
2. Are any redundant or too broad?
3. Suggest new useful test cases if needed.

Here are the test cases:\n\n${JSON.stringify(testCases, null, 2)}
    `;

    const response = await callOpenAI(prompt);
    setReview(response);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">🧠 AI Test Suite Review</h2>

      <button
        onClick={handleReview}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Analyzing..." : "🔍 Review Test Suite"}
      </button>

      {review && (
        <div className="bg-white/70 backdrop-blur-md p-4 rounded shadow-md whitespace-pre-wrap text-sm text-gray-800 max-h-[400px] overflow-y-auto">
          {review}
        </div>
      )}
    </div>
  );
};

export default TestSuiteReview;
