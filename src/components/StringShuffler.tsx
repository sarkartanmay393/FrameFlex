import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Camera, Clapperboard } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Terminal from "./Terminal";

export default function StringShuffler() {
  const outputTextRef = useRef("");
  const [inputString, setInputString] = useState("");
  const [currentString, setCurrentString] = useState("");
  const [outputString, setOutputString] = useState("");
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const syncInputString = async () => {
    const progressivelySetCharacter = (targetChar: string, index: number) => {
      return new Promise((resolve) => {
        let currentCharIndex = 0;
        const interval = setInterval(() => {
          setCurrentString((prev) => {
            const newString =
              prev.substring(0, index) +
              alphabet[currentCharIndex] +
              prev.substring(index + 1);
            return newString;
          });

          if (alphabet[currentCharIndex] === targetChar) {
            clearInterval(interval);
            resolve(true);
          } else {
            currentCharIndex++;
            if (currentCharIndex >= alphabet.length) {
              currentCharIndex = 0;
            }
          }
        }, 100);
      });
    };

    for (let i = 0; i < inputString.length; i++) {
      await progressivelySetCharacter(inputString.charAt(i), i);
    }
    setOutputString(
      "Full Stack Web Developer, DevOps Student, love the Open Source community."
    );
    setDone(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (step === 1) {
      setInputString(event.target.value);
    } else {
      outputTextRef.current = event.target.value;
    }
  };

  const captureTerminal = async () => {
    const terminalEle = document.getElementById("terminal");
    if (terminalEle) {
      const canvas = await html2canvas(terminalEle, {});
      const link = document.createElement("a");
      link.download = "terminal.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // const downloadGif = () => {
  //   const gif = new GIF({
  //     workers: 2,
  //     quality: 10,
  //   });
  // };

  const handleSubmit = () => {
    if (step === 1) {
      if (inputString.length) setStep(2);
    } else {
      syncInputString();
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 max-w-2xl p-2">
      <div className="w-full flex justify-between">
        <div className="flex gap-2 flex-1 max-w-[80%]">
          {step === 1 ? (
            <Input
              placeholder="Enter your command text"
              value={inputString}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-md px-3 py-2"
            />
          ) : (
            <Input
              placeholder="Enter your output text"
              value={outputTextRef.current}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-md px-3 py-2"
            />
          )}
          <Button
            disabled={done}
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {step === 1 ? "Next" : "Shuffle"}
          </Button>
        </div>
        <div className="w-fit flex gap-2">
          <Button
            disabled={!done}
            onClick={captureTerminal}
            size="icon"
            variant="secondary"
          >
            <Camera />
          </Button>
          <Button disabled={!done} size="icon" variant="secondary">
            <Clapperboard />
          </Button>
        </div>
      </div>
      <div className="centered rounded-md w-full border-slate-400 ">
        <Terminal command={currentString} output={outputString} />
      </div>
    </div>
  );
}
