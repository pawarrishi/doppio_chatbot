import React from "react";
import { RiRobot2Fill } from "react-icons/ri";

const Messages = ({ isBot, text }) => {
  return (
    <div>
      <li className={`flex ${isBot ? "" : "justify-end"} p-1`}>
        {isBot ? (
          <span className="min-w-[25px] min-h-[25px] bg-blue-500 text-white border rounded-full flex items-center justify-center self-end mr-1">
            <RiRobot2Fill />
          </span>
        ) : null}
        <p
          className={`px-2 py-1 whitespace-normal ${
            isBot
              ? "bg-blue-500 text-white rounded-t-xl rounded-br-xl"
              : "border bg-gray-200 rounded-t-xl rounded-bl-xl"
          }`}
        >
          {text}
        </p>
      </li>
    </div>
  );
};


export default Messages;

{
  /* <li className="flex">
        <span className="w-[25px] h-[25px] bg-blue-500 text-white border rounded-full flex items-center justify-center self-end mr-1">
          <RiRobot2Fill />
        </span>
        <p className="px-2 py-1 bg-blue-500 text-white border rounded-t-xl rounded-br-xl">
          hi there👋
          <br />
          How can i help you
        </p>
      </li> */
}
