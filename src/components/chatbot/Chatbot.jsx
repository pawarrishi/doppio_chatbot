import React from "react";
import { Button } from "../ui/button";
import { RiRobot2Fill } from "react-icons/ri";

const Chatbot = () => {
  return (
    <div className=" w-80 bg-white border-0 rounded-xl fixed right-16 bottom-16 overflow-hidden">
      <header className="text-center bg-cyan-500 p-2 border-0 rounded-t-md">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          ChatBot
        </h3>
      </header>
      <ul className="h-96 p-2 text-sm">
        <li className="flex">
          <span className="w-6 h-6 bg-cyan-500 text-white border rounded-full flex items-center justify-center self-end mr-1">
            <RiRobot2Fill />
          </span>
          <p className="max-w-56 px-2 py-1 bg-gray-300 border rounded-t-xl rounded-br-xl">
            hi there👋
            <br />
            How can i help you
          </p>
        </li>
        <li className="flex justify-end m-3">
          <p className="max-w-56 px-2 py-1 bg-cyan-500 border rounded-t-xl rounded-bl-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </li>
      </ul>
      <div className="flex justify-between gap-1 p-1 border-t-[1px]">
        <textarea
          placeholder="Enter message..."
          className="border rounded-full border-gray-400 h-10 w-full px-4 py-2 outline-none resize-none overflow-hidden"
        ></textarea>
        <Button varient="default">Send</Button>
      </div>
    </div>
  );
};

export default Chatbot;
