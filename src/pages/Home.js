import React, { useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import WebFont from 'webfontloader';
import './Home.css';
import RecommendedSongs from "../components/RecommendedSongs";


const Home = () => {
  const [isEntered, setIsEntered] = React.useState(false);

  React.useEffect(() => {
    setIsEntered(true);
  }, []);

  return (
    <div className="Home">
      <div className=" HrroSection flex items-center h-[100vh] justify-between pt-[4%] text-white bg-[url('Mountt.png')] bg-no-repeat bg-cover lg:bg-[length:100%]">
        <div className="flex-1">
        <CSSTransition
        in={isEntered}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
          <div className="Heading font-[400] text-white opacity-[0.8]">
            <p className="flex justify-center lg:text-[7vw] text-[12vw]">Unwind</p>
            <p className="flex justify-center lg:text-[7vw] text-[12vw]">with</p>
            <p className="flex justify-center lg:text-[7vw] text-[12vw]">Instrumentals</p>
          </div>
          </CSSTransition>
          <CSSTransition
        in={isEntered}
        timeout={800}
        classNames="load"
        unmountOnExit
      >
          <p className="lg:text-[2vw] text-white Para font-[300] opacity-[0.6] mx-[7%] my-[4%]">
          "Music expresses that which cannot be put into words and that which cannot remain silent." - Robert Fripp
          </p>
          </CSSTransition>
        </div>
      </div>
      {/* <div className="vignette inset-0 rounded-full bg-gradient-to-br from-transparent to-white mix-blend-multiply"></div> */}
      <RecommendedSongs/>

    </div>
  );
};
export default Home;
