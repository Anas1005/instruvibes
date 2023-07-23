import React, { useState } from "react";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const SearchedItem = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    createPlayerRefID,
    triggerYouTubePlayPause,
    triggerPlayPauseIcon,
    CurrentVideoPlayerID,
  } = useContext(AppContext);

  function PlayPauseHandler() {
    if (props.videoPlayerID !== CurrentVideoPlayerID) {
      createPlayerRefID(props);
      triggerPlayPauseIcon(props.videoPlayerID);
    } else {
      triggerYouTubePlayPause();
      triggerPlayPauseIcon(props.videoPlayerID);
    }
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <div className="flex items-center Para space-x-4 py-2 px-4 bg-transparent">
        {!props.isPlaying ? (
          <FaPlay
            className=" play-icon text-[#E55857] text-xl cursor-pointer"
            onClick={PlayPauseHandler}
          />
        ) : (
          <FaPause
            className=" pause-icon text-[#e55857] text-xl"
            onClick={PlayPauseHandler}
          />
        )}
        <div className="flex-grow">
          <h3 className="text-white font-semibold opacity-[0.8]">
            {props.title}
          </h3>
          <p className="text-gray-300  opacity-[0.4]">{props.duration}</p>
        </div>
        <FaHeart
          className={`text-xl cursor-pointer ${
            isFavorite ? "text-red-600 fill-current" : "text-white fill-current"
          }`}
          onClick={handleFavoriteClick}
        />
      </div>
      <div>
      <hr className="border border-[#E55857] opacity-10" />
      {props.children}
      </div>
    </div>
  );
};

export default SearchedItem;


