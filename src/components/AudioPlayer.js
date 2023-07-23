import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import musicAnimation from './Muisc.json'; 
import {
  FaHeart,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline';

import { AppContext } from "../context/AppContext";
import { useContext} from "react";

const AudioPlayer = () => {
  const {
    isAudioPlayerActive,
    isAudioPlaying,
    GlobalSongs,
    CurrentSongID,
    triggerYouTubePlayPause,
    createPlayerRefID,
    timeElapsed,
    togglePlaylist,
    // triggerMusicAnimation,
  } = useContext(AppContext);
  const MinutesElapsed = timeElapsed.minutes;
  const SecondsElapsed = timeElapsed.seconds;
  const TotalTimeElapsedInSeconds = +MinutesElapsed * 60 + (+SecondsElapsed);
  let Progress = 0;
  let TotalDurationInSeconds = 0;
  if (CurrentSongID !== 0 && typeof CurrentSongID !== "string") {
    TotalDurationInSeconds = +GlobalSongs[CurrentSongID - 1].duration.substring(0, 2) * 60 + (+GlobalSongs[CurrentSongID - 1].duration.substring(3));
    Progress = (TotalTimeElapsedInSeconds / TotalDurationInSeconds) * 100;
  }


  // Create a ref for the animation container
  const animationContainerRef = useRef(null);
  let animationInstance;

  useEffect(() => {
    // Set up the Lottie animation when the component mounts
    animationInstance = lottie.loadAnimation({
      container: animationContainerRef.current,
      animationData: musicAnimation,
      renderer: 'svg',
      loop: true,
      autoplay: isAudioPlaying,
    });

    // Cleanup animation when the component unmounts
    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, [isAudioPlaying]);

  function PlayPauseHandler() {
    triggerYouTubePlayPause();
    // triggerMusicAnimation(CurrentSongID);
  }

  function PlayNextHandler() {
    createPlayerRefID(GlobalSongs[CurrentSongID % GlobalSongs.length]);
    // triggerMusicAnimation(CurrentSongID+1);
  }

  function PlayPreviousHandler() {
    if (CurrentSongID === 1) {
      return;
    }
     else {
      createPlayerRefID(GlobalSongs[CurrentSongID - 2]);
      // triggerMusicAnimation(CurrentSongID-1);
    }
    
  }

  function PlaylistHandler() {
    togglePlaylist(GlobalSongs[CurrentSongID - 1])
  }

  return (
    <div>
      {(isAudioPlayerActive && typeof CurrentSongID !== "string") ? (
        <div className="rounded-[0.25rem] bg-transparent Para shadow-[0px_0px_6px_0px_#E55857]">
          <div className="mr-4 flex px-[1%] p-[1%] space-x-4">
            {/* Render the animation container */}
            <div className="w-16 h-16 rounded" ref={animationContainerRef}></div>
            <div className="space-y-[2%]">
              <h3 className="text-white opacity-[0.8] font-semibold">
                {GlobalSongs[CurrentSongID - 1].title}
              </h3>
              <div className="flex items-center space-x-2">
                {GlobalSongs[CurrentSongID - 1].isAddedToPlaylist ? (
                  <div className="flex space-x-3"> <MinusCircleIcon className="text-white w-6 h-6 cursor-pointer" onClick={PlaylistHandler} /> <p className="text-white">Remove from Playlist</p></div>
                ) : (
                  <div className="flex space-x-3"> <PlusCircleIcon className="text-white w-6 h-6 cursor-pointer" onClick={PlaylistHandler} /> <p className="text-white">Add to Playlist</p></div>
                )}
              </div>
            </div>
          </div>
          <hr className="border border-gray-300 opacity-10" />
          <div className="flex items-center h-24 px-4">
            <div className="flex-1">
              <div className="flex items-center justify-center space-x-8">
                <FaStepBackward
                  className="text-white text-xl cursor-pointer"
                  onClick={PlayPreviousHandler}
                />
                {!isAudioPlaying ? (
                  <div
                    className="w-[2.2rem] h-[2.2rem] bg-[#e55857] flex items-center justify-center rounded-full"
                    onClick={PlayPauseHandler}
                  >
                    <FaPlay className="text-black text-[0.8rem] cursor-pointer" />
                  </div>
                ) : (
                  <div
                    className="w-[2.2rem] h-[2.2rem] bg-[#e55857] flex items-center cursor-pointer justify-center rounded-full"
                    onClick={PlayPauseHandler}
                  >
                    <FaPause className="text-black text-[0.8rem] cursor-pointer" />
                  </div>
                )}
                <FaStepForward
                  className="text-white text-xl cursor-pointer"
                  onClick={PlayNextHandler}
                />
              </div>

              <div className="flex items-center mt-2">
                <span className="text-white opacity-[0.8] text-sm">{`${MinutesElapsed}:${SecondsElapsed}`}</span>
                <div className="flex-1 h-3 mx-4 rounded-full relative bg-[#181818]">
                  <div
                    className="h-full bg-[#E55857] rounded-full"
                    style={{ width: `${Progress}%` }}
                  ></div>
                </div>
                <span className="text-white opacity-[0.8] text-sm">
                  {GlobalSongs[CurrentSongID - 1].duration}
                </span>
              </div>
            </div>
            <div className="flex items-center ml-4 hidden">
              <input type="range" className="w-16 h-3 bg-white opacity-[0.8]" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AudioPlayer;
