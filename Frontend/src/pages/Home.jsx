import { useState } from "react";
import Sidebar from "../components/Home/Sidebar.home";
import StatsCards from "../components/Home/StatsCards.home";
import QuickActions from "../components/Home/QuickActions.home";
import HomeBottom from "../components/Home/HomeBottom.home";
import HomeHeader from "../components/Home/HomeHeader";
import HomeHero from "../components/Home/HomeHero";

import "../css/Home.home.css";

function Home() {
  return (
    <>
      <div className="">
        <HomeHeader/>
        <HomeHero/>
        <StatsCards />
        <QuickActions />
        <HomeBottom />
      </div>
    </>
  );
}

export default Home;
