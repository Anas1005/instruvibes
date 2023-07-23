import React from "react";
import "./Recommned.css";
import { AppContext } from "../context/AppContext";
import { useContext} from "react";
import SearchedItem from "./SearchedItem";
import { Loader } from "./Loader";

export const SearchedItems= () => {
     const{searchedSongs}=useContext(AppContext);
     const{isLoading}=useContext(AppContext)
  
  return (
    <div className="shadow-[0px_0px_6px_0px_#E55857] max-h-[52vh] rounded-sm overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-[#181818]">
       {
        isLoading?
        (<Loader/>):
        searchedSongs.length===0?
        (<div>Loading......</div>):
        (
       searchedSongs.map((song, index) => (
         (
          <SearchedItem
            key={index}
            id={song.id}
            title={song.title}
            videoID={song.videoID}
            duration={song.duration}
            videoPlayerID={song.videoPlayerID}
            isPlaying={song.isPlaying}
            recommended={song.recommended}
            isAddedToPlaylist={song.isAddedToPlaylist}
          >
            <div id={song.videoPlayerID} className="hidden"></div>
          </SearchedItem>
         )
        )))
       }

    </div>
   
  )
}
