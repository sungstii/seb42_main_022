import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Community from "./pages/Community";
import Review from "./pages/Review";
import GreenAct from "./pages/GreenAct";
import News from "./pages/News";
import GreenCal from "./pages/GreenCal";
import Ranking from "./pages/Ranking";
import SignUp from "./pages/SignUp";
import { Reset } from "styled-reset";
import { RecoilRoot } from "recoil";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <Reset />
      <header className="App-header">
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/community" element={<Community />} />
            <Route path="/review" element={<Review />} />
            <Route path="/greenact" element={<GreenAct />} />
            <Route path="/news" element={<News />} />
            <Route path="/greencal" element={<GreenCal />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
