import { forwardRef } from "react";

interface Props {
  command: string;
  output: string;
}

const defaulted = {
  command: "npm install next",
  output: "+ next@10.2.3 added 1 package, and audited 2 packages in 3s",
};

const Terminal = forwardRef<HTMLDivElement, Props>(
  ({ command = defaulted.command, output = defaulted.output }, ref) => {
    return (
      <aside
        id="terminal"
        className="bg-black text-white p-4 rounded-lg w-full"
        ref={ref}
      >
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-sm">bash</p>
        </div>
        <div className="mt-4">
          <p className="text-green-400">$ {command}</p>
          <p
            className={`text-white ${
              !output && "hidden"
            }  text-wrap transition-all duration-500`}
          >
            {output}
          </p>
          <p className={`text-green-400 ${!output && "hidden"}`}>$</p>
        </div>
      </aside>
    );
  }
);

export default Terminal;
