import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  return (
    <Editor
      height="90vh"
      width="60vw"
      defaultLanguage="javascript"
      defaultValue="// type your code here"
      theme="vs-dark"
    />
  );
}

export default CodeEditor;