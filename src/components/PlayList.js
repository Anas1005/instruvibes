import React from "react";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { PlayListItem } from "./PlayListItem";

const PlayList = () => {
  const { PlayList } = useContext(AppContext);
  const[isPlayListActive,setIsPlayListActive]=useState(true);
  function showPlayListHandler(){
    setIsPlayListActive(!isPlayListActive);
  }

  return (
    <div className="bg-transparent rounded-[0.125rem] max-h-[47vh] mr-[1%] mb-[53px] pr-[1%] pl-[2%] py-[1%] lg:w-[50%] w-[100%] bg-[url('AppBG.png')] ">
      <div className="sticky top-[0%]">
        <div className="text-center text-white cursor-pointer opacity-[0.8] Para text-xl UserInfo font-semibold py-[3%]" onClick={showPlayListHandler}>
          Add Playlist
        </div>
      </div>
      {
        isPlayListActive?
        <div className="space-y-[4%] w-[100%] p-[4.5%] overflow-y-auto max-h-[42vh] scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-[#181818] scrollbar-w ">
        {PlayList.length === 0 ? (
          <div className="text-white text-center Para">Your Playlist is Empty</div>
        ) : (
          PlayList.map((Item, index) => {
            return <PlayListItem key={index} item={Item} isPlayListActive={isPlayListActive}/>;
          })
        )}
      </div>:
      <div></div>
      }
 
    </div>
  );
};
export default PlayList;

