import React, { useContext, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const RecommendedSongItem = (props) => {
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

  return (
    <div
      key={props.id}
      className={`song-item w-[100%] Para my-[2%] absolute transition-transform duration-1000 p-[3%] hover:transition-all hover:scale-[1.05]`}
      style={{ left: `${props.index * 100}%`, transform: `translate(-${props.currentIndex * 100}%)` }}
    >
      <div className={`song-image-container relative overflow-hidden rounded-full w-40 h-40 mx-auto ${props.isPlaying ? "pulsating-border" : ""}`}>
      <div className={`song-image-wrapper absolute inset-0 flex items-center justify-center ${props.isPlaying ? "scaling-image active" : "scaling-image"}`}>
          <img
            className={`song-image w-full h-auto object-cover ${props.isPlaying ? "glow-effect" : ""}`}
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="play-overlay">
          {!props.isPlaying ? (
            <FaPlay
              className="play-icon text-white cursor-pointer"
              onClick={() => {
                PlayPauseHandler();
              }}
            />
          ) : (
            <FaPause
              className="pause-icon text-white cursor-pointer"
              onClick={() => {
                PlayPauseHandler();
              }}
            />
          )}
        </div>
      </div>
      <div className="song-details text-center mt-2">
        <h3 className="song-title Para md:text-lg text-[0.8rem] text-white">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
};

export default RecommendedSongItem;
