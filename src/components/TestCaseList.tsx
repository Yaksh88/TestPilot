
import React, { useState } from "react";
import { useTestCases } from "../hooks/useTestCases";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiEdit, FiTrash } from "react-icons/fi";

const statusColors: Record<"Draft" | "Ready" | "Blocked", string> = {
  Draft: "bg-yellow-100 text-yellow-800",
  Ready: "bg-green-100 text-green-800",
  Blocked: "bg-red-100 text-red-800",
};

interface TestCaseListProps {
  onRegenerate: (tc: any) => void;
  onEdit: (tc: any) => void;
  onDelete: (testCase: any) => Promise<void>;
}

const TestCaseList: React.FC<TestCaseListProps> = ({ onRegenerate, onEdit }) => {
  const {
    testCases,
    loading,
    setSelectedTestCase,
    selectedTestCase,
    deleteTestCase,
  } = useTestCases();

  const [showAll, setShowAll] = useState(false);
  const visibleCases = showAll ? testCases : testCases.slice(0, 1);

  if (loading) return <p className="text-gray-600">Loading test cases...</p>;

  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="space-y-4 overflow-y-auto max-h-[70vh] pr-2"
>

      {visibleCases.map((tc) => (
        <div
          key={tc.id}
          onClick={() => setSelectedTestCase(tc)}
          className={`p-4 cursor-pointer bg-white border rounded-lg shadow-sm hover:shadow-md transition ${
            selectedTestCase?.id === tc.id ? "border-blue-400" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{tc.title}</h2>
              <span
                className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                  statusColors[tc.status as keyof typeof statusColors] || "bg-gray-200 text-gray-800"
                }`}
              >
                {tc.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(tc);
                }}
              >
                <FiEdit className="text-blue-600 hover:text-blue-800" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTestCase(tc.id);
                }}
              >
                <FiTrash className="text-red-500 hover:text-red-700" />
              </button>
              <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    onRegenerate(tc);
  }}
  className="text-purple-600 hover:text-purple-800"
>
  
</button>

            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">{tc.steps}</p>
          <p className="text-sm text-gray-500 italic">Expected: {tc.expected}</p>
          <div className="mt-2 text-xs text-blue-600">
            Tags: {tc.tags?.join(", ") || "None"} | Category: {tc.category || "General"}
          </div>
        </div>
      ))}

      {testCases.length > 1 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            {showAll ? (
              <>
                Show Less <FiChevronUp />
              </>
            ) : (
              <>
                Show All <FiChevronDown />
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TestCaseList;