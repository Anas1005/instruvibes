# InstruVibes-Website

InstruVibes is a platform dedicated to music lovers who find intrigue in instrumental versions of songs. It provides a centralized place where users can explore and listen to instrumental

## Technologies used:

HTML5, CSS3, JavaScript, Tailwind, React JS

### APIs used

(i) https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEy}&maxResults=5 (to fetch the list of videos/songs based on search query)

(ii) https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${API_KEy}&part=contentDetails (to fetch video details corresponding to the videoID, particularly the duration of the song to toggle the play/pause icon and to reset the timer/progress bar at the end of the song)

(iii) https://www.youtube.com/iframe_api (to embed the video in a div element)



