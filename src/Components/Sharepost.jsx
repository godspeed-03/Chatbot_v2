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
                  <i className=" text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full transition duration-300 hover:bg-gray-300">
                    <IoMdClose />
                  </i>
                </div>
              </header>
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
                <div className="field mt-2 relative flex justify-start items-center">
                  <i className=" text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full transition duration-300 hover:bg-gray-300 active:text-blue-600">
                    <FaLink onClick={() => copyToClipboard(url)} />
                  </i>
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
