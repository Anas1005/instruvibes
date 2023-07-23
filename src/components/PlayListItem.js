
import React, { useContext, useEffect, useRef} from 'react';
import { FiMusic } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import {MinusCircleIcon } from '@heroicons/react/outline';

export const PlayListItem = (props) => {
  const{GlobalSongs,togglePlaylist,createPlayerRefID,isAudioPlaying}=useContext(AppContext);
  
  function PlaylistHandler(e){
    e.stopPropagation();
    togglePlaylist(GlobalSongs[props.item.id-1])
  }
  function PlayPauseHandler() {
      createPlayerRefID(props.item);
  }

  return (
    <div className="mr-4 flex p-[2%] Para min-h-[36%] space-x-4 shadow-[0px_0px_6px_0px_#E55857] rounded-[0.125rem] hover:transition-all hover:scale-[1.1] cursor-pointer" onClick={PlayPauseHandler}>

    <FiMusic
        className="w-[2.5rem] h-[2.5rem] rounded my-[auto] text-[#E55857]"
      ></FiMusic>



    <div className="space-y-[2%]">
      <h3 className="text-white opacity-[0.8] font-semibold text-[79%]">
        {props.item.title}
      </h3>
      <MinusCircleIcon className="text-white w-6 h-6"   onClick={PlaylistHandler}/>
    </div>
  </div>
  )
}
