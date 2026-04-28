import "../css/index.css"; // this assumes you have the index.css file in a 'css' folder
import reactSVG from "../../public/assets/React.svg";

export default function App() {
  return (
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
      <div className="min-h-screen max-h-auto text-white"></div>
    </div>
  );
}
