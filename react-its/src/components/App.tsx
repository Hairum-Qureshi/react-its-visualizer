import { Editor, type Monaco } from "@monaco-editor/react";
import "../css/index.css";
import reactSVG from "../../public/assets/React.svg";
import babelParser from "@babel/parser";
import TreeDiagram from "./TreeDiagram";

export default function App() {
  const reactAST = babelParser.parse(
    "export default function App() { return (<AuthGuard><Profile profileData={profileData} /></AuthGuard>); }",
    {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    },
  );

  // 1 - get the opening element that will be the second root node (the first root node is the App component)
  // 2 - get the name of the opening element and its props (if it has any)
  // 3 - get the children of the opening element and repeat steps 1-3 for each child until there are no more children
  const reactASTBody = reactAST.program.body[0]["declaration"].body;
  const openingElement = reactASTBody.body[0].argument.openingElement.name;
  const openingElementName = openingElement.name;
  const openingElementProps =
    reactASTBody.body[0].argument.openingElement.attributes.map((attr) => ({
      name: attr.name.name,
      value: attr.value.expression.name,
    }));
  const openingElementChildren = reactASTBody.body[0].argument.children;

  console.log("Opening element name:", openingElementName);
  console.log("Opening element props:", openingElementProps);
  console.log("Opening element children:", openingElementChildren);

  // reactAST.program.body[0]["declaration"].body.body[0].argument
  // console.log(
  //   JSON.stringify(
  //     reactAST.program.body[0]["declaration"].body.body[0].argument.children,
  //     null,
  //     2,
  //   ),
  // );

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
                    
                  />
                </div>
              </div>
              <div className="bg-white h-full w-1/2">
                {/* <div className="h-1/2 w-full"> */}
                <div className="flex justify-center h-full w-full">
                  <TreeDiagram />
                </div>
                {/* <div className="h-1/2 w-full"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
