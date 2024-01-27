import React, { useState, useEffect, useRef } from 'react';
import img from '../assets/sciastra.webp';
import { FaUserAlt } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const Chat = () => {
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [userMessageHistory, setUserMessageHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const storedLogger = JSON.parse(sessionStorage.getItem("logger")) || [];
  let loggeduser = storedLogger[0]?.username;

  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      return `Hi ${loggeduser? loggeduser : "there"} ! How can I help you?`;
    } else if (lowerCaseInput.includes('how are you')) {
      return "I'm just a bot, but thanks for asking!";
    } else if (lowerCaseInput.includes('bye')) {
      return 'Goodbye! Have a great day.';
    } else {
      return 'I did not understand that. Can you please rephrase?';
    }
  };



  const handleUserInput = async () => {
    setIsLoading(true);

    // Simulate API call or any asynchronous operation

    const botResponse = getBotResponse(userInput);
    setUserMessageHistory((prevHistory) => [...prevHistory, userInput]);
    setChatHistory([...chatHistory, { user: true, text: userInput }]);

    // Simulate loading for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { user: false, text: botResponse },
    ]);
    

    setUndoHistory([...undoHistory, { user: true, text: userInput }, { user: false, text: botResponse }]);
    setRedoHistory([]);

    setUserInput('');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  };

  useEffect(() => {
    // Scroll the chat container to the bottom when chatHistory changes
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [chatHistory]);

  const handleUndo = () => {
    if (undoHistory.length === 0) return;

    const lastMessage = undoHistory.pop();
    setChatHistory(chatHistory.slice(0, -1));
    setUserInput('');
  };
  const handleRedo = () => {
      if (userMessageHistory.length > 0) {
        const lastUserMessage = userMessageHistory.pop();
        setUserInput(lastUserMessage);
        setUserMessageHistory([...userMessageHistory]);
      }
    };

  return (
    <div className="fixed bottom-4 right-4">
      {isActive ? (
        <div className='border rounded-lg bg-white shadow-2xl p-4 w-96 overflow-auto h-[80vh]' ref={chatContainerRef}>
          <div className="headersection bg-gray-400 py-3 mb-2 rounded-xl font-bold">
            <header className='text-center'>Welcome to ImageBook</header>
          </div>
          <div className="flex flex-col space-y-4 mt-14 mb-28">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded ${message.user ? ' bg-[#7BD3EA] text-Black self-end' : 'bg-[#F6F7C4] text-black self-start'}`}
              >
                {message.user ? (<span className='flex items-center gap-2'><FaUserAlt style={{width:20, height:20}} />{message.text}</span>) :(
                <span className='flex items-center gap-2'><FaRobot style={{width:30, height:30}} />
                {message.text}</span>
                )}
              </div>
            ))}
 {isLoading && (
              <div className="p-2 rounded bg-gray-300 text-gray-600 self-start">
                {chatHistory.length % 2 === 1 && (
                  <>
                    {/* Skeleton loading animation for user message */}
                    <div className="animate-pulse h-4  w-80 bg-gray-400 mb-2"></div>
                    <div className="animate-pulse h-4 w-80 bg-gray-400"></div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="p-4 fixed bottom-[17px] w-[350px] bg-white">
            <div className="actionbutton flex items-center gap-40 mb-2">
            <button onClick={handleUndo} className="p-1 bg-cyan-500 text-white rounded">Undo</button>
              <button onClick={handleRedo} className="p-1 bg-cyan-500 text-white rounded"> Redo</button>
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
              <button onClick={handleUserInput} className="p-2 bg-blue-500 text-white rounded">
                Send
              </button>
              <div
                  className="flex items-center cursor-pointer ml-5"
                  onClick={ ()=>setIsActive(false)}
                >
                  <i className="uil uil-times text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full transition duration-300 hover:bg-gray-300">
                    <IoMdClose />
                  </i>
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="rounded-full bg-[#234eb0] p-2 cursor-pointer"
          onClick={() => setIsActive(true)}
        >
          <span className="text-white">
            <img src={img} alt="" className="w-10" />
          </span>
        </div>
      )}
    </div>
  );
};

export default Chat;
