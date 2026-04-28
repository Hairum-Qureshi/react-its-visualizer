import { Editor } from "@monaco-editor/react";
import "../css/index.css";
import reactSVG from "../../public/assets/React.svg";

export default function App() {
  return (
    <>
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
                helps students understand the structure of their applications and
                how components interact with each other.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl font-semibold">How does it work?</h2>
              <p className="text-xl">
                The ITS gives basic instructions to the student such as writing a
                component, pass props, etc. Sometimes, it may ask the student to
                identify the component hierarchy or props in the application.
                Visually, the student will be able to see a tree structure
                generated as they write their code, which will show the component
                hierarchy and props. The ITS will also provide feedback and hints
                to help students understand the concepts better.
              </p>
            </div>
          </div>

          <div className="min-h-screen max-h-auto bg-gradient-to-bl from-cyan-900 to-gray-900 text-white">
            <div className="p-20"></div>
          </div>
        </div>
      </div>

      <div className="h-screen w-full">
        <div className="w-full p-5 bg-gray-900 text-white">
          <p className="mx-20">
            Welcome to the React ITS! To get started, please create a new React
            component called{" "}
            <code className="text-sky-500 text-sm">Greeting</code> that accepts a
            prop called <code className="text-sky-500 text-sm">name</code>. The
            component should render a simple message that says&nbsp;
            <code className="text-sky-400 text-sm">
              Hello, &#123;name&#125;!
            </code>
            . For example, if you pass the prop{" "}
            <code className="text-sky-400 text-sm">name="Alice"</code>, the
            component should render{" "}
            <code className="text-sky-400 text-sm">
              Hello, Alice!
            </code>
            . This exercise will help you understand how to create and use props
            in React components.
          </p>
        </div>

        <div className="flex">
          <div className="w-1/2 h-screen">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
            />
          </div>
          <div className="w-1/2 h-screen"></div>
        </div>
      </div>
    </>
  );
}
