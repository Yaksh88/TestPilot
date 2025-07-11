import React from 'react';
import TestCaseCard from '../components/TestCaseCard';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">FocusCase</h1>
      <TestCaseCard />
    </div>
  );
};

export default App;
