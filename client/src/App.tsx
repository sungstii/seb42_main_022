import React, { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Community from "./pages/Community";
import Review from "./pages/Review";
import GreenAct from "./pages/GreenAct";
import News from "./pages/News";
import GreenCal from "./pages/GreenCal";
import Ranking from "./pages/Ranking";
import { RecoilRoot } from "recoil";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import MypageEdit from "./pages/MypageEdit";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Reset } from "styled-reset";
import Header from "./components/Header";
import axios from "axios";
import GreenCalResult from "./pages/GreenCalResult";

function App() {
  const token = localStorage.token;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  return (
    <Fragment>
      <Reset />
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/community" element={<Community />} />
          <Route path="/review" element={<Review />} />
          <Route path="/greenact" element={<GreenAct />} />
          <Route path="/news" element={<News />} />
          <Route path="/greencal" element={<GreenCal />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/:category/:id" element={<Post />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypageedit" element={<MypageEdit />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/greencalresult" element={<GreenCalResult />} />
        </Routes>
      </RecoilRoot>
    </Fragment>
  );
}

export default App;
