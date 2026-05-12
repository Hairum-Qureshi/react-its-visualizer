import { Editor, type Monaco } from "@monaco-editor/react";
import "../css/index.css";
import reactSVG from "../../public/assets/React.svg";
import TreeDiagram from "./TreeDiagram";
import { useState } from "react";
import TutorialContainer from "./TutorialContainer";
import type { ParsedComponent } from "../types";
import { parseReactComponents } from "../parser";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const defaultReactCode = `export default function App() { 
      return (
          <AuthGuard>
              <Navbar />
              <Profile profileData={profileData} />
          </AuthGuard>
      );
  }`;

  const [reactCode, setReactCode] = useState(defaultReactCode);

  function handleEditorChange(value: string | undefined) {
    if (value) setReactCode(value);
  }

  const handleEditorDidMount = (_editor: any, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  const [parsedReactStructure, setParsedReactStructure] = useState<
    ParsedComponent[]
  >([]);

  function generateTree() {
    const parsed = parseReactComponents(reactCode);
    setParsedReactStructure(parsed);
  }

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-gray-900">
      {/* Hero Section */}
      <div className="min-h-screen max-h-screen overflow-hidden text-white relative">
        <div className="p-20 space-y-4">
          <h1 className="text-8xl font-semibold">React ITS</h1>
          <h3 className="text-4xl">
            Visualize component hierarchies and props
          </h3>
          <p className="text-xl">A prototype by Hairum Qureshi</p>
        </div>
        <img
          src={reactSVG}
          alt="react logo"
          className="lg:w-240 md:w-220 w-160 rotate-180 lg:-translate-y-50 -translate-y-20 translate-x-30 ml-auto"
        />
      </div>

      {/* Info Section */}
      <div className="min-h-screen bg-gradient-to-bl from-cyan-900 to-gray-900 text-white">
        <div className="p-20 space-y-20">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold">What is it?</h2>
            <p className="text-xl">
              This ITS aims to be a tool that allows students to visualize the
              component hierarchy and props of their React applications.
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Workspace */}
      <div className="min-h-screen bg-gradient-to-bl from-cyan-900 to-gray-900 text-white p-20 flex flex-col">
        <h3 className="text-4xl font-semibold mb-10">Prototype</h3>
        <button
          className="border-2 rounded-md border-white p-2 w-fit mb-6 hover:bg-white hover:text-cyan-900 transition-colors"
          onClick={() => generateTree()}
        >
          Generate Tree
        </button>

        {/* Main Editor/Visualizer Container */}
        <div className="flex w-full h-[85vh] rounded-md overflow-hidden border border-gray-700 shadow-2xl">
          {/* Left Side: Code Editor */}
          <div className="w-1/2 h-full bg-[#1e1e1e] p-4">
            <Editor
              height="100%"
              path="index.tsx"
              language="typescript"
              theme="vs-dark"
              onMount={handleEditorDidMount}
              defaultValue={defaultReactCode}
              options={{
                minimap: { enabled: false },
                hover: { enabled: false },
                fontSize: 14,
              }}
              onChange={handleEditorChange}
            />
          </div>

          {/* Right Side: Tree and Tutorial Container */}
          <div className="w-1/2 h-full bg-white flex flex-col text-black">
            {/* Tree Section */}
            <div
              className={`w-full h-full overflow-hidden transition-all duration-500 ease-in-out ${
                collapsed ? "flex-1" : "flex-[1_1_50%]"
              }`}
            >
              <TreeDiagram treeData={parsedReactStructure} />
            </div>

            {/* Tutorial Section */}
            <div
              className={`transition-all duration-500 ease-in-out flex flex-col overflow-hidden border-t border-gray-200 ${
                collapsed ? "flex-none h-12" : "flex-[1_1_50%]"
              }`}
            >
              {collapsed ? (
                /* The Collapsed Bar */
                <div
                  className="h-full w-full bg-gray-50 text-gray-500 flex items-center justify-center border-t border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setCollapsed(false)}
                >
                  <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span>Expand Tutor Mode</span>
                    <span className="text-lg">↑</span>
                  </h3>
                </div>
              ) : (
                <div className="h-full w-full bg-white flex flex-col">
                  <div className="flex-1 overflow-auto">
                    <TutorialContainer setCollapsed={setCollapsed} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
