import { useState } from "react";
import { useApiData } from "../Utils/Context";
import Search from "./Search";
import { FaEye } from "react-icons/fa";
import Sharepost from "../Components/Sharepost";
import Header from "../Components/Header";
import Chat from "../Components/Chatbot/Chat";

const Homepage = () => {
  const { photo } = useApiData();

  return (
    <>
      <Header />
      <Search />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 object-contain md:mx-32 sm:mx-28 mx-24 py-20">
        {photo.map((item) => {
          const { alt, url, src, photographer, id } = item;
          return (
            <div
              key={id}
              className="border-sky-700 border-2 p-3 rounded-3xl flex flex-col justify-between"
            >
              <a href={url}>
                <img
                  src={src.original}
                  alt={alt}
                  className="w-full h-56 rounded-3xl"
                />
              </a>
              <p className="font-mono pt-5 text-center ">
                Clicked by <strong>{photographer}</strong>
              </p>

              <div className="buttons flex items-center justify-between pt-3 px-3">
                <span className="share">
                  <Sharepost url={url} author={photographer} />
                </span>
                <a href={url} target="_blank">
                  <span className="delete">
                    <FaEye />
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <Chat />
    </>
  );
};

export default Homepage;
