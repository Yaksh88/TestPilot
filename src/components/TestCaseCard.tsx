
const TestCaseCard = ({ testCase }: any) => {
  const { title, steps, expected, tags, category, status } = testCase;

  const renderSteps = () => {
    if (typeof steps === "string") return steps;
    if (Array.isArray(steps)) return steps.join(" → ");
    return "";
  };

  return (
    <div className="bg-white rounded-xl border shadow p-4 space-y-3 hover:shadow-md transition duration-200 ease-in-out cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded-full capitalize">
          {status || "Draft"}
        </span>
      </div>

      {/* Steps */}
      <div className="text-sm text-gray-700 whitespace-pre-line">
        {renderSteps()}
      </div>

      {/* Expected Result */}
      <div className="text-sm text-gray-500 italic">
        <strong>Expected:</strong> {expected}
      </div>

      {/* Tags & Category */}
      <div className="flex flex-wrap text-xs gap-2 text-gray-600 pt-1">
        {tags?.length > 0 && (
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            <strong>Tags:</strong> {tags.join(", ")}
          </span>
        )}
        {category && (
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            <strong>Category:</strong> {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default TestCaseCard;
