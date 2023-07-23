import React from "react";

const About = () => {
  return (
    <div className="container Para mx-auto px-4 py-8 text-white opacity-[0.8]">
      <h2 className="text-4xl font-bold mb-4">About InstruVibes</h2>
      <p className="mb-8">
        InstruVibes is a platform dedicated to music lovers who find intrigue in instrumental versions of songs. It provides a centralized place where users can explore and listen to instrumental versions of almost any song they desire.
      </p>

      <h3 className="text-2xl font-bold mb-2">Project Scope</h3>
      <p className="mb-8">
        InstruVibes aims to offer a vast collection of instrumental tracks that cater to various musical tastes. Users can discover and enjoy the soothing melodies created by different musical instruments without the distraction of lyrics.
      </p>

      <h3 className="text-2xl font-bold mb-2">Technologies Used</h3>
      <ul className="list-disc ml-8 mb-8">
        <li>HTML</li>
        <li>CSS</li>
        <li>Tailwind CSS</li>
        <li>JavaScript</li>
        <li>ReactJS</li>
      </ul>

      <h3 className="text-2xl font-bold mb-2">Challenges Faced</h3>
      <p className="mb-8">
        Developing MelodyTracks presented unique challenges. One of the primary challenges was efficiently extracting audio content from YouTube. Additionally, implementing the feature to save favorite songs to the playlist locally required careful consideration to ensure a seamless user experience using browser's local storage.
      </p>

      <h3 className="text-2xl font-bold mb-2">Project Features</h3>
      <ul className="list-disc ml-8 mb-8">
        <li>Extensive collection of instrumental tracks</li>
        <li>Search functionality to find specific instrumentals</li>
        <li>Playlist feature to save favorite songs locally</li>
      </ul>

      <h3 className="text-2xl font-bold mb-2">Disclaimer</h3>
      <p className="mb-8">
        InstruVibes pulls songs from YouTube for streaming purposes only. The platform does not support downloading or redistributing copyrighted content. All rights belong to their respective owners.
      </p>
    </div>
  );
};

export default About;
