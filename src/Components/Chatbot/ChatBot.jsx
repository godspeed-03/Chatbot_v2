import React, { useState } from "react";
import ChatbotAvator from "./ChatbotAvator";
import ChatBotMessage from "./ChatBotMessage";

const ChatBot = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {isActive ? (
        <ChatBotMessage setIsActive={setIsActive} />
      ) : (
        <ChatbotAvator setIsActive={setIsActive} />
      )}
    </div>
  );
};
export default ChatBot;
