import React, { useState } from "react";
import { FaRegShareSquare, FaEye, FaLink } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

const Sharepost = ({ url, author }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(url);
  const postInfo = `${author}'s post: ${url}`;

  const copyToClipboard = () => {
    const input = document.getElementById("urlInput");
    input.select();
    document.execCommand("copy");

    input.classList.add("active");
    setTimeout(() => {
      input.classList.remove("active");
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen ? (
        <>
          <div className="flex absolute justify-center items-center">
            <div className="absolute sm:w-72 w-60 bg-white p-4 rounded-lg shadow-lg">
              <header className="flex items-center justify-between pb-4 border-b border-gray-300">
                <span className="text-xl font-semibold">Share Post</span>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={closeModal}
                >
                  <i className="uil uil-times text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full transition duration-300 hover:bg-gray-300">
                    <IoMdClose />
                  </i>
                </div>
              </header>
              {/* Content */}
              <div className="content mt-5">
                <p className="text-base">Share this post via</p>
                <ul className="icons flex gap-3 my-2">
                  <FacebookShareButton url={url} quote={postInfo}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <WhatsappShareButton url={url} quote={postInfo}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                  <TelegramShareButton url={url} quote={postInfo}>
                    <TelegramIcon size={32} round={true} />
                  </TelegramShareButton>
                  <TwitterShareButton url={url} title={postInfo}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={url}
                    title={postInfo}
                    summary={postInfo}
                  >
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                </ul>
                <p className="text-base">Or copy link</p>
                <div className="field mt-2 relative flex justify-center items-center">
                  <i className="url-icon uil uil-link absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 pl-2">
                    <FaLink />
                  </i>
                  <input
                    id="urlInput"
                    type="text"
                    readOnly
                    value={inputValue}
                    className="w-full h-full border-2 border-gray-400 pl-8 rounded-md "
                  />
                  <button
                    onClick={copyToClipboard}
                    className="text-white px-2 py-1 text-center bg-purple-700 rounded-md ml-2"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <span className="share">
          <FaRegShareSquare onClick={() => setIsModalOpen(true)} />
        </span>
      )}
    </div>
  );
};

export default Sharepost;
