import { RecoilRoot } from "recoil";
import Input from "./components/Input";
import Output from "./components/Output";
import Notification from "./components/Notification";

export default function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Shrtn
        </h1>
        <div className="w-full max-w-md">
          <Input />
          <Output />
        </div>
        <div className="mt-8 hidden md:block">
          <h2 className="text-xl font-semibold mb-4 text-center">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: "Enter", action: "Shorten URL" },
              { key: "Ctrl + Enter", action: "Copy Short URL" },
              { key: "/", action: "Focus Input" }
            ].map((shortcut, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-3 text-center">
                <kbd className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm font-mono">{shortcut.key}</kbd>
                <p className="mt-2 text-sm text-gray-400">{shortcut.action}</p>
              </div>
            ))}
          </div>
        </div>
        <Notification />
      </div>
    </RecoilRoot>
  );
}