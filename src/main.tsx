import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TestCaseProvider } from "./hooks/useTestCases";
import { Toaster } from 'react-hot-toast';
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <TestCaseProvider>
    <App />
    <Toaster position="top-right" />
  </TestCaseProvider>
</React.StrictMode>
)