import React, { createContext, useState, useEffect } from "react";
import API_KEy from '../API_key/apikey';



export const AppContext = createContext();

export default function AppContextProvider({ children }) {
 
  // Recommended Songs disaplyed on Home Page....
  const recommendedSongs = [
    {
      id: "R-1",
      title:
        "Alec Benjamin - Let Me Down Slowly | Piano Cover by Pianella Piano",
      image:
        "https://cdns-images.dzcdn.net/images/cover/1a2ff1ad7241739d524583d6f775c379/500x500.jpg",
      videoID: "Z5O59Twz8vo",
      videoPlayerID: "youtube-player-1",
      isPlaying: false,
      recommended: true,
    },
    {
      id: "R-2",
      title: "Apna Bana Le Piya |Instrumental Cover",
      image:
        "https://lyricalsansar.com/wp-content/uploads/2022/12/Apna-Bana-Le-Lyrics.jpg",
      videoID: "v8Dpdu_ZW6s",
      videoPlayerID: "youtube-player-2",
      isPlaying: false,
      recommended: true,
    },
    {
      id: "R-3",
      title: "Pasoori Flute by Lakhinandan Lahon",
      image: "https://i.ytimg.com/vi/5Eqb_-j3FDA/maxresdefault.jpg",
      videoID: "XDdtnZ9c2tw",
      videoPlayerID: "youtube-player-3",
      isPlaying: false,
      recommended: true,
    },
    {
      id: "R-4",
      title: "Alan Walker - On My Way Instrumental",
      image: "https://i1.sndcdn.com/artworks-000523641915-lo2qzf-t500x500.jpg",
      videoID: "HlnkW97H8ow",
      videoPlayerID: "youtube-player-4",
      isPlaying: false,
      recommended: true,
    },
    {
      id: "R-5",
      title:
        "Kesariya - Brahmāstra | Soulful Flute Cover | Divyansh Shrivastava | Ranbir , Alia | Arijit Singh |",
      image:
        "https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg",
      videoID: "37OFgwtS2pM",
      videoPlayerID: "youtube-player-5",
      isPlaying: false,
      recommended: true,
    },
    {
      id: "R-6",
      title:
        "Pirates Of The Caribbean Ringtone 2020|Captain Jack Sparrow Ringtone|Instrumental Viral Ringtone|",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_.jpg",
      videoID: "045rhSYYz8w",
      videoPlayerID: "youtube-player-6",
      isPlaying: false,
      recommended: true,
    },
  ];


   //Clearing the local storage before enrty to the site.....
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("playlist");
      localStorage.removeItem("globalSongs");
      localStorage.removeItem("lastAssignedId");
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  // Getting the previous data each time from local storage in case the user searches for a new song or navigates within the webisite...
  const [PlayList, setPlayList] = useState(() => {
    const savedPlaylist = localStorage.getItem("playlist");
    return savedPlaylist ? JSON.parse(savedPlaylist) : [];
  });

  const [GlobalSongs, setGlobalSongs] = useState(() => {
    const savedGlobalSongs = localStorage.getItem("globalSongs");
    return savedGlobalSongs ? JSON.parse(savedGlobalSongs) : [];
  });

  const [lastAssignedId, setLastAssignedId] = useState(() => {
    const savedLastAssignedId = localStorage.getItem("lastAssignedId");
    return savedLastAssignedId ? JSON.parse(savedLastAssignedId) : 0;
  });


  // Storing the requied data in local storage each time when dependency changes....
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(PlayList));
    localStorage.setItem("globalSongs", JSON.stringify(GlobalSongs));
    localStorage.setItem("lastAssignedId", JSON.stringify(lastAssignedId));
  }, [PlayList, GlobalSongs, lastAssignedId]);


  // Initialsing some state variables as per requirement.....
  const [songs, setSongs] = useState(recommendedSongs);
  const [CurrentPlayerRef, setCurentPlayerRef] = useState(null);
  const [CurrentVideoPlayerID, setCurrentVideoPlayerID] = useState("");
  const [CurrentSongID, setCurrentSongID] = useState(0);
  const [CurrTimerSong, setCurrTimerSong] = useState(null);
  const [isAudioPlayerActive, setAudioPlayerActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({
    minutes: "00",
    seconds: "00",
  });
  let TimeElapsedCopy = { minutes: "00", seconds: "00" };
  let [mins, setMins] = useState(0);
  let [sec, setSec] = useState(0);
  let timer;
;

  var isIFrameReady = false;

  useEffect(() => {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, []);


  //Checking if iframeAPI is ready to fetch the video/audio.......
  function onYouTubeIframeAPIReady() {
    isIFrameReady = true;
  }


  // Creating a player Reference which is to be embedded on a <div> element with some videoPlyerID each time when the user clicks on any song........
  function createPlayerRefID(videoSong) {
    return new Promise((resolve, reject) => {
      // setTimeElapsed({ minutes: "00", seconds: "00" });
      if (!videoSong.recommended) setAudioPlayerActive(true);
      setCurrentSongID(videoSong.id);
      if (CurrentPlayerRef) {
        CurrentPlayerRef.destroy();
      }
      setCurrentVideoPlayerID(videoSong.videoPlayerID);
      const playerRefID = new window.YT.Player(videoSong.videoPlayerID, {
        height: "360",
        width: "640",
        videoId: videoSong.videoID,
        events: {
          onReady: function (event) {
            event.target.playVideo();
            if (!videoSong.recommended){ setIsAudioPlaying(true)
              //  triggerMusicAnimation(videoSong.id);
              }
            // Play the video when it's ready
            resolve(playerRefID); // Resolve the promise with the playerRefID
          },
          onError: function (event) {
            console.log("Error loading the YouTube video.");
            // document.getElementById(videoPlayerID).innerHTML = 'Video not available.';
            reject(new Error("Video not available")); // Reject the promise with an error
          },
          'onStateChange': function (event) {
            if (event.data === 0) {
              if(videoSong.recommended)
              handleRecommendedSongEnd(videoSong.id); // Call the function to change the play/pause icon automatically at the end of  recommended song.....
            }
          }    
        },
      });
      setCurentPlayerRef(playerRefID); //storing the current player ref to destroy so before playing the next song.....
    });
  }



  // function to toggle the state of the song.......
  function triggerYouTubePlayPause() {
    if (CurrentPlayerRef) {
      if (typeof CurrentPlayerRef.getPlayerState === "function") {
        var playerState = CurrentPlayerRef.getPlayerState();
        if (playerState === 1) {
          CurrentPlayerRef.pauseVideo();
          if (typeof CurrentSongID !== "string") setIsAudioPlaying(false);
        } else if (
          playerState === 2 ||
          playerState === 5 ||
          playerState === 0
        ) {
          CurrentPlayerRef.playVideo();
          if (typeof CurrentSongID !== "string") setIsAudioPlaying(true);
        }
      }
    }
  }


  // function to toggle the play pause icon........
  function triggerPlayPauseIcon(videoPlayerID) {
    setSongs((prevSongs) => {
      return prevSongs.map((song) => {
        if (song.videoPlayerID === videoPlayerID) {
          return { ...song, isPlaying: !song.isPlaying };
        } else {
          return { ...song, isPlaying: false };
        }
      });
    });
  }

  // function to toggle the animtaion used in audio player playing the searched songs.......
  // function triggerMusicAnimation(songID) {
  //   setGlobalSongs((prevSongs) => {
  //     return prevSongs.map((song) => {
  //       if (song.id === songID) {
  //         const updatedSong={ ...song, isPlaying: !song.isPlaying };
  //         setCurrTimerSong(updatedSong);
  //         return updatedSong;
  //       } else {
  //         const updatedSong={ ...song, isPlaying: false};
  //         return updatedSong;
  //       }
  //     });
  //   });
  // }


  // function to change the icon to pasue at the end of recommended song.....
  const handleRecommendedSongEnd = (songId) => {
    setSongs((prevSongs) => {
      return prevSongs.map((song) => {
        if (song.id === songId) {
          return { ...song, isPlaying: false }; // Change the play/pause icon back to the play icon....
        } else {
          return song;
        }
      });
    });
  };



  //  function to manipulate the timer and progress bar of the audio player............
  useEffect(() => {
    function startPlaying() {
      console.log("Bss aaa gya...")
      if (CurrTimerSong) {
        console.log(
          CurrTimerSong.id +
            ":" +
            CurrTimerSong.title +
            ":" +
            CurrTimerSong.videoID +
            ":" +
            CurrTimerSong.videoPlayerID +
            ":" +
            CurrTimerSong.duration +
            ":" +
            CurrTimerSong.recommended +
            ":" +
            CurrTimerSong.isAddedToPlaylist +
            ":" +
            CurrTimerSong.isPlaying
        );
        console.log("-------------------------");
        console.log(
          GlobalSongs[CurrentSongID - 1].id +
            ":" +
            GlobalSongs[CurrentSongID - 1].title +
            ":" +
            GlobalSongs[CurrentSongID - 1].videoID +
            ":" +
            GlobalSongs[CurrentSongID - 1].videoPlayerID +
            ":" +
            GlobalSongs[CurrentSongID - 1].duration +
            ":" +
            GlobalSongs[CurrentSongID - 1].recommended +
            ":" +
            GlobalSongs[CurrentSongID - 1].isAddedToPlaylist +
            ":" +
            GlobalSongs[CurrentSongID - 1].isPlaying
        );
      }

      if (CurrTimerSong !== GlobalSongs[CurrentSongID - 1]) {
        console.log("Aayya tha..")
        setTimeElapsed({ minutes: "00", seconds: "00" });
        mins = 0;
        sec = 0;
        setCurrTimerSong(GlobalSongs[CurrentSongID - 1]);
      }
      timer = setInterval(keepPlaying, 1000);
    }

    function pausePlaying() {
      clearInterval(timer);
      timer = null;
    }

    function resetPlaying() {
      clearInterval(timer);
      timer = null;
      setTimeElapsed((Prev) => {
        return { ...Prev, minutes: "00", seconds: "00" };
      });
      mins = 0;
      sec = 0;
      setMins(0);
      setSec(0);
    }

    function keepPlaying() {
      if (
        `${TimeElapsedCopy.minutes}:${TimeElapsedCopy.seconds}` ===
        GlobalSongs[CurrentSongID - 1].duration
      ) {
        resetPlaying();
        // triggerMusicAnimation(CurrentSongID);
        setIsAudioPlaying(false);
      } else {
        sec++;
        if (sec === 60) {
          sec = 0;
          mins++;
        }
        let Seconds = sec < 10 ? "0" + sec : sec;
        let Minutes = mins < 10 ? "0" + mins : mins;
        TimeElapsedCopy = { minutes: Minutes, seconds: Seconds };
        setTimeElapsed(TimeElapsedCopy);
        setMins(mins);
        setSec(sec);
      }
    }

    if (isAudioPlaying && typeof CurrentSongID !== "string") {
      startPlaying();
    } else {
      pausePlaying();
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up Use Effect...");
      pausePlaying();
      console.log("Cleaning upEffect...");
    };
  }, [isAudioPlaying, CurrentSongID]);

  const [searchedSongs, setSearchedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  // function to fetch the searched Query songs.........
  const fetchSongs = async (searchQuery) => {
    console.log("PakdaGya");
    if (
      searchQuery.trim()==="" ||searchQuery==="instruvibes"||
      searchQuery === "contact" ||
      searchQuery === "about"
    ) {
      console.log("Achha chalata hoon.....");
      return;
    }
    searchQuery+="instrumental+piano+violin+guitar"
    // let videos;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEy}&maxResults=5`;
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      const Duration = await Promise.all(
        data.items.map((video) => fetchDuration(video.id.videoId))
      );

      const videoResults = data.items.map((item, index) => {
        const newId = lastAssignedId + index + 1;
        return {
          id: newId,
          title: item.snippet.title,
          videoID: item.id.videoId,
          videoPlayerID: `video-player${index + 1}`,
          duration: formatDuration(Duration[index]).substring(3),
          recommended: false,
          isPlaying: false,
          isAddedToPlaylist: false,
        };
      });
      setLastAssignedId((prev) => prev + videoResults.length);
      setSearchedSongs(videoResults);
      setGlobalSongs((prev) => [...prev, ...videoResults]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // function to fetch the duration of each song separately ......
  const fetchDuration = async (videoID) => {
    const api_url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${API_KEy}&part=contentDetails`;
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      const duration = data.items[0].contentDetails.duration;
      return duration;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };



  //function to Extract the duration in ISO 8601 format (e.g., PT1H30M15S)
  function formatDuration(duration) {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(durationRegex);

    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

    // Format the duration as HH:MM:SS
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

   

  //function to toggle the playlist(Add or remove as per the user....)
  function togglePlaylist(Item) {
    const itemExists = PlayList.some(
      (PlayListItem) => PlayListItem.id === Item.id
    );
    if (!itemExists) {
      setPlayList((prev) => [...prev, Item]);
    } else {
      setPlayList((prev) =>
        prev.filter((PlayListItem) => PlayListItem.id !== Item.id)
      );
    }
    setGlobalSongs((prev) => {
      return prev.map((song) => {
        if (song.id === Item.id) {
          const updatedSong = {
            ...song,
            isAddedToPlaylist: !song.isAddedToPlaylist,
          };
          setCurrTimerSong(updatedSong);
          return updatedSong;
        }
        return song;
      });
    });
  }


  // Returning necessary data to the children........
  const value = {
    songs,
    CurrentPlayerRef,
    CurrentVideoPlayerID,
    createPlayerRefID,
    triggerYouTubePlayPause,
    triggerPlayPauseIcon,
    fetchSongs,
    isLoading,
    searchedSongs,
    GlobalSongs,
    CurrentSongID,
    isAudioPlayerActive,
    isAudioPlaying,
    timeElapsed,
    PlayList,
    togglePlaylist,
    // triggerMusicAnimation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
