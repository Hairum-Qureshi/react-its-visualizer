import { Editor } from "@monaco-editor/react";
import "../css/index.css";

export default function App() {
  return (
    <div className="h-screen w-full">
      <div className="w-full p-5 bg-gray-900 text-white">
        <p className="mx-20">
          {/* add some text that an ITS tutor would tell a student to write to see their understanding on React component hierarchy and props */}
          Welcome to the React ITS! To get started, please create a new React
          component called{" "}
          <code className="text-sky-500 text-sm">Greeting</code> that accepts a
          prop called <code className="text-sky-500 text-sm">name</code>. The
          component should render a simple message that says&nbsp;
          <code className="text-sky-400 text-sm">Hello, &#123;name&#125;!</code>
          . For example, if you pass the prop{" "}
          <code className="text-sky-400 text-sm">name="Alice"</code>, the
          component should render{" "}
          <code className="text-sky-400 text-sm">Hello, Alice!</code>. This
          exercise will help you understand how to create and use props in React
          components.
        </p>
      </div>
      <div className="flex">
        <div className="w-1/2 h-screen">
          <Editor height="100%" defaultLanguage="typescript" theme="vs-dark" />
        </div>
        <div className="w-1/2 h-screen"></div>
      </div>
    </div>
  );
}
