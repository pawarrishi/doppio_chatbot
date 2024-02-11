"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { RiRobot2Fill } from "react-icons/ri";
import { GrSend } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import { FiMaximize2 } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FiMinimize2 } from "react-icons/fi";
import Messages from "../messages/Messages";
import OpenAI from "openai";
import { Skeleton } from "../ui/skeleton";
import SkeletonLoader from "../skeleton/SkeletonLoader";

const openAI = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const AIChatBot = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [isMaximize, setMaximize] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, isLoading] = useState(false);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleUserInput = async () => {
    try {
      isLoading(true);
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: "user", content: userInput },
      ]);

      let chatCompletion = await openAI.chat.completions.create({
        messages: [...chatHistory, { role: "assistant", content: userInput }],
        model: "gpt-3.5-turbo",
      });

      setChatHistory((prevChat) => [
        ...prevChat,
        {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        },
      ]);

      isLoading(false);
      setUserInput("");
    } catch (error) {
      isLoading(false);
      console.error("Error during chat completion:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
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
    width: isMaximize ? "90%" : "350px",
    height: isMaximize ? "85%" : "488px",
    transition: "all 0.4s ease",
  };

  const chatboxContentStyle = {
    height: isMaximize ? "calc(100% - 100px)" : "calc(100% - 100px)",
    fontSize: isMaximize ? "18px" : "13px",
    transition: "all 0.4s ease",
    overflowY: "auto",
  };

  return (
    <div>
      <div>
        <Button
          variant="default"
          onClick={toggleChatBot}
          className={`bg-blue-500 h-14 border-0 rounded-full fixed right-10 bottom-10 ${
            isChatbotOpen ? "animate-none" : "animate-pulse"
          }`}
        >
          <span
            className={`duration-300 ${
              isChatbotOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            {isChatbotOpen ? <GrClose size={24} /> : <RiRobot2Fill size={24} />}
          </span>
        </Button>
      </div>

      {isChatbotOpen && (
        <div
          className={`bg-white border border-gray-200 rounded-md fixed right-[80px] bottom-[100px] overflow-hidden shadow-xl transition-all transform origin-top-right`}
          style={chatbotStyle}
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

          <div style={chatboxContentStyle} ref={chatContainerRef}>
            <ul className="p-2">
              {chatHistory.map((message, index) => (
                <li
                  key={index}
                  className={`flex ${
                    message.role == "user" ? "justify-end" : "justify-start"
                  } p-1`}
                >
                  {message.role === "user" ? (
                    <>
                      <p
                        className={`p-2 whitespace-normal bg-blue-500 text-white rounded-t-xl rounded-bl-xl break-all hyphens-auto ${
                          isMaximize ? "max-w-[700px] p-4" : "max-w-56"
                        }`}
                      >
                        {message.content}
                      </p>
                      <span
                        className={`min-w-[25px] min-h-[25px] bg-gray-200 text-gray-500 border rounded-full flex items-center justify-center self-end ml-1 ${
                          isMaximize
                            ? "min-w-[35px] min-h-[35px]"
                            : "min-w-[26px] min-h-[25px]"
                        }`}
                      >
                        <CgProfile size={18}/>
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className={` bg-blue-500 text-white border rounded-full flex items-center justify-center self-end mr-1 ${
                          isMaximize
                            ? "min-w-[35px] min-h-[35px]"
                            : "min-w-[26px] min-h-[25px]"
                        }`}
                      >
                        <RiRobot2Fill size={16}/>
                      </span>
                      <p
                        className={`p-2 whitespace-normal border bg-gray-200 rounded-t-xl rounded-br-xl hyphens-auto ${
                          isMaximize ? "max-w-[700px] p-4" : "max-w-56"
                        }`}
                      >
                        {message.content}
                      </p>
                    </>
                  )}
                </li>
              ))}
              {loading && (
                <div key={chatHistory.length}>
                  <SkeletonLoader />
                </div>
              )}
            </ul>
          </div>

          <div className="relative bottom-[10px] flex justify-between gap-1 p-2 border-t-[1px] bg-white">
            <input
              type="text"
              placeholder="Enter message..."
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={userInput}
              className="border rounded-full bg-gray-200 border-gray-400 h-10 w-full px-4 py-[6px] outline-none resize-none overflow-hidden transition-all"
            ></input>
            {/* {enterMessage && ( */}
            <Button
              variant="default"
              size="icon"
              onClick={handleUserInput}
              className={`bg-blue-500 border-2 rounded-full ${
                isMaximize ? "w-[52px] h-12 relative bottom-1" : "w-12 h-10"
              } transition-all`}
            >
              <span>
                {" "}
                <GrSend size={20} style={{ fontWeight: "900" }} />{" "}
              </span>
            </Button>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
