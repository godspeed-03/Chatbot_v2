import React, { useState, useEffect, useRef } from "react";
import { FaUserAlt, FaRobot, FaRegCopy } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ChatBotHeader from "./ChatBotHeader";

const ChatBotMessage = ({ setIsActive }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [userMessageHistory, setUserMessageHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [messageCount, setMessageCount] = useState(0);

  //get data of user from session storage
  const storedLogger = JSON.parse(sessionStorage.getItem("logger")) || [];
  let loggeduser = storedLogger[0]?.username;

  //bot response on the basis of user input
  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
      return `Hi ${loggeduser ? loggeduser : "there"} ! How can I help you?`;
    } else if (lowerCaseInput.includes("how are you")) {
      return "I'm just a bot, but thanks for asking!";
    } else if (lowerCaseInput.includes("bye")) {
      return "Goodbye! Have a great day.";
    } else {
      return "I did not understand that. Can you please rephrase?";
    }
  };

  //handle user's input and do async way to add a timelapse
  const handleUserInput = async () => {
    setIsLoading(true);

    //check the message is more than 5 times or not when user is not signed in
    if (!loggeduser && messageCount >= 5) {
      alert("You can only send 5 messages as a guest user.");
      return;
    }

    // response given by bot
    const botResponse = getBotResponse(userInput);

    // increment of prevcount
    if (!loggeduser) {
      setMessageCount((prevCount) => prevCount + 1);
    }
    setUserMessageHistory((prevHistory) => [...prevHistory, userInput]);
    setChatHistory([...chatHistory, { user: true, text: userInput }]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { user: false, text: botResponse },
    ]);
    setUndoHistory([
      ...undoHistory,
      { user: true, text: userInput },
      { user: false, text: botResponse },
    ]);
    setUserInput("");
    setIsLoading(false);
  };

  //add enter key to send msg
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  };

  // add stickyness of chat to bottom of page
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [chatHistory]);

  // logic for undo btn
  const handleUndo = () => {
    if (undoHistory.length === 0) return;

    const lastMessage = undoHistory.pop();
    setChatHistory(chatHistory.slice(0, -1));
    setUserInput("");
  };

  //logic for redo btn
  const handleRedo = () => {
    if (userMessageHistory.length > 0) {
      const lastUserMessage = userMessageHistory.pop();
      setUserInput(lastUserMessage);
      setUserMessageHistory([...userMessageHistory]);
    }
  };

  //copy the given text by user
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  return (
    <div
      className="border rounded-lg bg-white shadow-2xl p-4 w-96 overflow-auto h-[80vh]"
      ref={chatContainerRef}
    >
      <ChatBotHeader />
      <div className="flex flex-col space-y-4 mt-14 mb-28">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.user
                ? " bg-[#7BD3EA] text-Black self-end"
                : "bg-[#F6F7C4] text-black self-start"
            }`}
          >
            {message.user ? (
              <span className="flex items-center gap-2">
                <FaUserAlt style={{ width: 20, height: 20 }} />
                {message.text}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FaRobot style={{ width: 30, height: 30 }} />
                {message.text}
                <FaRegCopy onClick={() => copyToClipboard(message.text)} />
              </span>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 rounded bg-gray-300 text-gray-600 self-start">
            {chatHistory.length % 2 === 1 && (
              <>
                <div className="animate-pulse h-4  w-80 bg-gray-400 mb-2"></div>
                <div className="animate-pulse h-4 w-80 bg-gray-400"></div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="p-4 fixed bottom-[17px] w-[350px] bg-white">
        <div className="actionbutton flex items-center gap-40 mb-2">
          <button
            onClick={handleUndo}
            className="p-1 bg-cyan-500 text-white rounded"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            className="p-1 bg-cyan-500 text-white rounded"
          >
            {" "}
            Redo
          </button>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="p-2 border border-gray-300 mr-2"
          />
          <button
            onClick={handleUserInput}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
          <div
            className="flex items-center cursor-pointer ml-5"
            onClick={() => setIsActive(false)}
          >
            <i className="uil uil-times text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full transition duration-300 hover:bg-gray-300">
              <IoMdClose />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotMessage;
