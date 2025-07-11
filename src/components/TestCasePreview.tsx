import { useTestCases } from "../hooks/useTestCases";

const TestCasePreview = () => {
  const { selectedTestCase } = useTestCases();

  if (!selectedTestCase) {
    return (
      <div className="h-full p-6 bg-white/50 backdrop-blur-md rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Preview Panel</h2>
        <p className="text-sm text-gray-500">
          Select a test case from the list to view or edit details here.
        </p>
      </div>
    );
  }

  const { title, steps, expected, tags, category, status } = selectedTestCase;

  return (
    <div className="h-full p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="text-sm text-gray-700 space-y-2">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Steps:</strong> {steps}</p>
        <p><strong>Expected:</strong> {expected}</p>
        <p><strong>Tags:</strong> {tags?.join(", ") || "None"}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>
    </div>
  );
};

export default TestCasePreview;
