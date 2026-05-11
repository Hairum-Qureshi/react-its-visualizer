import { Editor, type Monaco } from "@monaco-editor/react";
import "../css/index.css";
import reactSVG from "../../public/assets/React.svg";
import TreeDiagram from "./TreeDiagram";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [collapsed, setCollapsed] = useState(true);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const defaultReactCode = `export default function App() { 
      return (
          <AuthGuard>
              <Navbar />
              <Profile profileData={profileData} />
          </AuthGuard>
      );
  }`;

  const [reactCode, setReactCode] = useState(defaultReactCode);

  function handleEditorChange(value: string) {
    setReactCode(value);
  }

  const handleEditorDidMount = (editor, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    });

    // This ensures no red squiggly lines appear if types are missing
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [generatingResponse, setGeneratingResponse] = useState(false);

  const getResponseForGivenPrompt = async () => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });
      setGeneratingResponse(true);
      const result = await model.generateContent(
        `Given the following React code, create a tree diagram utilizing React Flow syntax of the components and their relationships. DO NOT include any additional information or filler text. The code is: ${reactCode}. Give me the data for the following JSON:
        {
          nodes: [
            { id: "n1", position: { x: 250, y: 50 }, data: { label: "App" } },
            {
              id: "n2",
              position: { x: 400, y: 150 },
              data: { label: "AuthGuard" },
            },
            {
              id: "n3",
              position: { x: 100, y: 150 },
              data: { label: "Navbar" },
            },
            {
              id: "n4",
              position: { x: 400, y: 250 },
              data: { label: "Profile" },
            },
          ],
          edges: [
            { id: "n1-n2", source: "n1", target: "n2" },
            { id: "n1-n3", source: "n1", target: "n3" },
            { id: "n2-n4", source: "n2", target: "n4", label: "profileData" },
          ]
        }
        `,
      );
      const response = await result.response;
      const text = await response.text();
      setResult(text);
      setGeneratingResponse(false);
    } catch (error: unknown) {
      setError(
        "There was a problem generating the tree diagram. Please try again.",
      );

      if (error instanceof Error) {
        console.log("Something Went Wrong:", error.message);
        setGeneratingResponse(false);
      } else {
        console.log("Something Went Wrong");
        setGeneratingResponse(false);
      }
    }
  };

  async function generateTree() {
    await getResponseForGivenPrompt();
  }

  return (
    <div>
      <div className="min-h-screen max-h-auto bg-gradient-to-tl from-cyan-900 to-gray-900">
        <div className="text-white min-h-screen max-h-screen overflow-hidden">
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
        <div className="min-h-screen max-h-auto bg-gradient-to-bl from-cyan-900 to-gray-900 text-white">
          <div className="p-20 space-y-20">
            <div className="space-y-3">
              <h2 className="text-4xl font-semibold">What is it?</h2>
              <p className="text-xl">
                This ITS aims to be a tool that allows students to visualize the
                component hierarchy and props of their React applications. It
                helps students understand the structure of their applications
                and how components interact with each other.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl font-semibold">How does it work?</h2>
              <p className="text-xl">
                The ITS gives basic instructions to the student such as writing
                a component, pass props, etc. Sometimes, it may ask the student
                to identify the component hierarchy or props in the application.
                Visually, the student will be able to see a tree structure
                generated as they write their code, which will show the
                component hierarchy and props. The ITS will also provide
                feedback and hints to help students understand the concepts
                better.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen max-h-auto bg-gradient-to-bl from-cyan-900 to-gray-900 text-white">
        <div className="p-20 space-y-10">
          <h3 className="text-4xl font-semibold">Prototype</h3>
          <button
            className="border-2 rounded-md border-white p-2"
            onClick={() => generateTree()}
          >
            Generate Tree
          </button>
          <div className="">
            <div className="w-full h-screen flex">
              <div className="h-full w-1/2">
                <div className="bg-[#1e1e1e] rounded-md p-4 h-full">
                  <Editor
                    height="100%"
                    path="index.tsx" // Keep this to signal TSX
                    language="typescript"
                    theme="vs-dark"
                    onMount={handleEditorDidMount} // Add this line
                    defaultValue={`export default function App() { 
    return (
        <AuthGuard>
            <Navbar />
            <Profile profileData={profileData} />
        </AuthGuard>
    );
}`}
                    options={{
                      minimap: { enabled: false },
                      hover: { enabled: false }, // Optional: hides the popups on hover
                    }}
                    onChange={handleEditorChange}
                    readOnly={generatingResponse}
                  />
                </div>
              </div>
              <div className="bg-white h-full w-1/2 relative">
                <div className="h-1/2 w-full">
                  <div className="flex justify-center h-full w-full">
                    {error ? (
                      <p className="text-2xl font-semibold text-red-500 flex items-center justify-center w-3/4 text-center">
                        {error}
                      </p>
                    ) : generatingResponse ? (
                      <p className="text-2xl font-semibold text-gray-500 self-center">
                        Generating Tree Diagram...
                      </p>
                    ) : (
                      <TreeDiagram treeData={result} />
                    )}
                  </div>
                </div>
                <div
                  className={`${collapsed ? "absolute bottom-0 w-full" : "w-full h-full"}`}
                >
                  {collapsed ? (
                    <div
                      className="h-10 w-full bg-gray-200 text-gray-500 text-center p-2"
                      onClick={() => setCollapsed(false)}
                    >
                      Tutorial Mode
                    </div>
                  ) : (
                    <div
                      className="h-1/2 w-full bg-gray-200 flex items-center justify-center"
                      onClick={() => setCollapsed(true)}
                    >
                      <h3 className="text-center text-gray-500">Tutor Mode</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
