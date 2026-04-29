import { Editor } from "@monaco-editor/react";
import "../css/index.css";
import reactSVG from "../../public/assets/React.svg";

export default function App() {
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
                    defaultLanguage="typescript"
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                    }}
                  />
                </div>
              </div>
              <div className="bg-white h-full w-1/2">
                <div className="h-1/2 w-full"></div>
                <div className="h-1/2 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
