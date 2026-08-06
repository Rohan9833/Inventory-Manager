import { useState } from "react";
import Sidebar from "../components/Home/Sidebar.home";
import StatsCards from "../components/Home/StatsCards.home";
import QuickActions from "../components/Home/QuickActions.home";
import "../css/Home.home.css";

function Home() {
  return (
    <>
      <Sidebar />
      <StatsCards/>
      <QuickActions/>
    </>
  );
}  

export default Home;
