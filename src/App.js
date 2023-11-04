
import React from "react";
import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Listen } from "./pages/Listen";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Routes, useLocation} from 'react-router-dom';
import { Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import {useContext} from 'react';
import Footer from "./components/Footer";



function App() {
   let location = useLocation();
   const{fetchSongs}=useContext(AppContext)
  

   useEffect(() => {
    let searchQuery=location.pathname.split("/").at(-1).replaceAll("-"," ");
    console.log("SearchQueryIs:"+searchQuery)
    console.log(searchQuery);
    fetchSongs(searchQuery);
    
   }, [location.pathname,location.search])

   useEffect(() => {
    const preventScroll = (e) => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollY = window.scrollY;

      if (scrollY <= 0 || scrollY >= scrollHeight - clientHeight) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", preventScroll);

    return () => {
      window.removeEventListener("scroll", preventScroll);
    };
  }, []);
  
  
  return(
    <div className="bg-[url('AppBG.png')] bg-contain w-[100vw] h-[100vh] relative overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-gray-[#181818] scrollbar-w">
    <NavBar/>
   <Routes>
   <Route path="/" element={<Home/>}/>
  <Route path="/listen/:searchQuery" element={<Listen/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  
  
  </Routes>
  <hr className="border border-[white] mt-[14%] opacity-10" />
  <Footer/>
    </div>
  )
}
export default App;

