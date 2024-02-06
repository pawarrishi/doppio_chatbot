"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { RiRobot2Fill } from "react-icons/ri";
import { GrSend } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { FiMaximize2 } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FiMinimize2 } from "react-icons/fi";

const Chatbot = () => {
  const [enterMessage, setEnterMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [isMaximize, setMaximize] = useState(false);

  const handleMessageSend = () => {
    console.log("Entered message :", messageText);
  };

  const handleTextChange = (event) => {
    setMessageText(event.target.value);
    setEnterMessage(!!event.target.value.trim());
  };

  const toggleChatBot = () => {
    setChatbotOpen(!isChatbotOpen);
    if (!isChatbotOpen && isMaximize) {
      setMaximize(false);
    }
  };
  const toggleMaximize = () => {
    setMaximize(!isMaximize);
  };

  const chatbotStyle = {
    width: isMaximize ? "90%" : "320px",
    height: isMaximize ? "85%" : "488px",
    transition: "all 0.4s ease-in-out",
  };

  const chatboxContentStyle = {
    height: isMaximize ? "calc(100% - 100px)" : "calc(100% - 100px)",
  };

  return (
    <div>
      <Button
        variant="default"
        onClick={toggleChatBot}
        className={`bg-blue-500 h-14 border-0 rounded-full fixed right-10 bottom-10 ${
          isChatbotOpen ? "animate-none" : "animate-bounce"
        }`}
      >
        <span>
          {isChatbotOpen ? <GrClose size={24} /> : <RiRobot2Fill size={24} />}
        </span>
      </Button>
      {isChatbotOpen && (
        <div
          style={chatbotStyle}
          className={`w-80 bg-white border border-gray-200 rounded-md fixed right-[80px] bottom-[100px] overflow-hidden shadow-xl`}
        >
          <header className="text-center p-2 border-b-2 rounded-t-md flex justify-between items-center">
            <div className="relative flex justify-start items-center gap-2">
              <span className="w-9 h-9 bg-blue-500 text-white border rounded-full flex items-center justify-center self-end mr-1">
                <RiRobot2Fill size={20} />
              </span>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                ChatBot
              </h3>
            </div>

            <div className="flex justify-center items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                className="bg-gray-200 border-0 rounded-md hover:bg-blue-600 hover:text-white transition-all"
                onClick={toggleMaximize}
              >
                <span className="relative cursor-pointer">
                  {isMaximize ? (
                    <FiMinimize2 size={20} />
                  ) : (
                    <FiMaximize2 size={20} />
                  )}
                </span>{" "}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-gray-200 border-0 rounded-md hover:bg-blue-600 hover:text-white"
                onClick={toggleChatBot}
              >
                <span className="relative cursor-pointer">
                  {isChatbotOpen && <GrClose size={20} />}
                </span>
              </Button>
            </div>
          </header>
          <div style={chatboxContentStyle}>
            <ul className="p-2 text-sm">
              <li className="flex">
                <span className="w-[25px] h-[25px] bg-blue-500 text-white border rounded-full flex items-center justify-center self-end mr-1">
                  <RiRobot2Fill />
                </span>
                <p className="px-2 py-1 bg-blue-500 text-white border rounded-t-xl rounded-br-xl">
                  hi there👋
                  <br />
                  How can i help you
                </p>
              </li>
              <li className="flex justify-end m-3">
                <p className="max-w-56 px-2 py-1 border  bg-gray-200 rounded-t-xl rounded-bl-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </li>
            </ul>
          </div>

          <div className="relative bottom-[10px] flex justify-between gap-1 p-2 border-t-[1px]">
            <textarea
              placeholder="Enter message..."
              onChange={handleTextChange}
              value={messageText}
              className="border rounded-full bg-gray-200 border-gray-400 h-10 w-full px-4 py-[6px] outline-none resize-none overflow-hidden transition-all"
            ></textarea>
            {/* {enterMessage && ( */}
            <Button
              variant="default"
              size="icon"
              onClick={handleMessageSend}
              className={`bg-blue-500 border-0 rounded-full ${
                isMaximize ? "w-12 h-12 relative bottom-1" : "w-12 h-10"
              } transition-all`}
            >
              <span>
                {" "}
                <GrSend size={20} />{" "}
              </span>
            </Button>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
