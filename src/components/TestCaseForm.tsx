import React, { useState, useEffect } from 'react';
import { useTestCases } from '../hooks/useTestCases';
import toast from 'react-hot-toast';

interface TestCaseFormProps {
  prefillData: any;
  isEditing: boolean;
  onDone: () => void;
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({ prefillData, isEditing, onDone }) => {
  const { addTestCase, updateTestCase } = useTestCases();

  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState('');
  const [expected, setExpected] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Draft');

  useEffect(() => {
    if (prefillData) {
      setTitle(prefillData.title || '');
      setSteps(prefillData.steps || '');
      setExpected(prefillData.expected || '');
      setTags(prefillData.tags?.join(', ') || '');
      setCategory(prefillData.category || '');
      setStatus(prefillData.status || 'Draft');
    }
  }, [prefillData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTestCase = {
      title,
      steps,
      expected,
      tags: tags.split(',').map((t) => t.trim()),
      category,
      status,
    };

    if (isEditing && prefillData?.id) {
      await updateTestCase(prefillData.id, newTestCase);
      toast.success(' Test case updated');
    } else {
      await addTestCase(newTestCase);
      toast.success(' Test case added');
    }

    setTitle('');
    setSteps('');
    setExpected('');
    setTags('');
    setCategory('');
    setStatus('Draft');
    onDone();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {isEditing ? 'Update Test Case' : 'Create New Test Case'}
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 rounded border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Steps"
        className="w-full p-2 rounded border"
        rows={3}
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      ></textarea>
      <textarea
        placeholder="Expected Result"
        className="w-full p-2 rounded border"
        rows={2}
        value={expected}
        onChange={(e) => setExpected(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 rounded border"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        className="w-full p-2 rounded border"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <select
        className="w-full p-2 rounded border"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Draft">Draft</option>
        <option value="Ready">Ready</option>
        <option value="Blocked">Blocked</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {isEditing ? 'Update' : 'Create'} Test Case
      </button>
    </form>
  );
};

export default TestCaseForm;
