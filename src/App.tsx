import { LucideGithub } from "lucide-react";
import StringShuffler from "./components/StringShuffler";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center overflow-hidden p-2">
      <header className="flex pb-2 pt-3">
        <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-400">
          FrameFlex
        </h1>
      </header>
      <StringShuffler />
      <div className="flex flex-col flex-grow justify-end pb-6 items-center gap-0.5">
        <Button size="icon" variant="link" className="p-0 m-0">
          <a href="https://github.com/sarkartanmay393" target="_blank">
            <LucideGithub />
          </a>
        </Button>
        <p className="text-sm text-gray-700 font-medium">
          Made with 🖤 in India
        </p>
        <p className="text-xs text-gray-700 font-[300]">Copyright @2024</p>
      </div>
    </div>
  );
}
