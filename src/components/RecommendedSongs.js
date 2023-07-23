import React, { useState } from "react";
import {FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import RecommendedSongItem from "./RecommendedSongItem";
import { useContext } from "react";

const RecommendedSongs = () => {
  const { songs } = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
  };

  const playPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
  };

  return (
    <div className="recommendations">
      <h2 className="min-[380px]:text-[2.125rem] md:text-[3.125rem] text-[1.6rem] font-bold mb-4 text-center p-[8%] text-white Heading">Recommended Instrumentals</h2>
      <div className="relative w-[80vw] h-[51vh] mx-[auto] overflow-hidden UserInfo">
        {songs.map((song, index) => (
          <RecommendedSongItem
            key={song.id}
            index={index}
            id={song.id}
            image={song.image}
            title={song.title}
            videoID={song.videoID}
            videoPlayerID={song.videoPlayerID}
            isPlaying={song.isPlaying}
            recommended={song.recommended}
            currentIndex={currentIndex}
            active={index === currentIndex}
          >
            <div id={song.videoPlayerID} className="hidden"></div>
          </RecommendedSongItem>
        ))}
      </div>
      <div className="flex flex-col items-center space-y-[2%]">
      <div className="flex mt-[24px]">
        <FaChevronLeft className="text-white text-3xl cursor-pointer" onClick={playPrevious} />
        <FaChevronRight className="text-white text-3xl cursor-pointer" onClick={playNext} />
        </div>
        <div className="flex items-center">
          {songs.map((song, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-white" : "bg-transparent border border-white"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSongs;
