import React from "react";
import { SearchedItems } from "../components/SearchedItems";
import AudioPlayer from "../components/AudioPlayer";
import PlayList from "../components/PlayList";

export const Listen = () => {
  return (
    <div className="w-[100vw] mt-[4%]">
      <div className="mx-[8%]">
        <div className="lg:flex mb-[26px] lg:flex-row ">
          <PlayList />
          <SearchedItems />
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
};
