import { useState } from "react";
import Sidebar from "../components/Home/Sidebar.home";
import StatsCards from "../components/Home/StatsCards.home";
import QuickActions from "../components/Home/QuickActions.home";
import HomeBottom from "../components/Home/HomeBottom.home";
import "../css/Home.home.css";

function Home() {
  return (
    <>
      <div className="Home">
        <Sidebar />
        <StatsCards />
        <QuickActions />
        <HomeBottom />
      </div>
    </>
  );
}

export default Home;
