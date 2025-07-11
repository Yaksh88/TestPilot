import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";

export interface TestCase {
  id: string;
  title: string;
  steps: string;
  expected: string;
  tags: string[];
  category: string;
  status: string;
  created_at: string;
}

interface TestCaseContextType {
  testCases: TestCase[];
  loading: boolean;
  addTestCase: (test: Omit<TestCase, "id" | "created_at">) => Promise<void>;
  updateTestCase: (id: string, updatedData: Partial<TestCase>) => Promise<void>;
  deleteTestCase: (id: string) => Promise<void>;
  selectedTestCase: TestCase | null;
  setSelectedTestCase: (tc: TestCase | null) => void;
  refetchTestCases: () => Promise<void>;
}

const TestCaseContext = createContext<TestCaseContextType | undefined>(undefined);

export const TestCaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  const fetchTestCases = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("test_cases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setTestCases(data || []);
    }
    setLoading(false);
  };

  const addTestCase = async (test: Omit<TestCase, "id" | "created_at">) => {
    const { error } = await supabase.from("test_cases").insert([test]);
    if (error) {
      console.error("Add error:", error);
    } else {
      await fetchTestCases();
    }
  };

  const updateTestCase = async (id: string, updatedData: Partial<TestCase>) => {
    const { error } = await supabase
      .from("test_cases")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
    } else {
      await fetchTestCases();
    }
  };

  const deleteTestCase = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this test case?");
    if (!confirmed) return;

    const { error } = await supabase.from("test_cases").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      setTestCases((prev) => prev.filter((tc) => tc.id !== id));
      if (selectedTestCase?.id === id) setSelectedTestCase(null);
    }
  };

  useEffect(() => {
    fetchTestCases();
  }, []);

  return (
    <TestCaseContext.Provider
      value={{
        testCases,
        loading,
        addTestCase,
        updateTestCase,
        deleteTestCase,
        selectedTestCase,
        setSelectedTestCase,
        refetchTestCases: fetchTestCases,
      }}
    >
      {children}
    </TestCaseContext.Provider>
  );
};

export const useTestCases = (): TestCaseContextType => {
  const context = useContext(TestCaseContext);
  if (!context) {
    throw new Error("useTestCases must be used within a TestCaseProvider");
  }
  return context;
};
