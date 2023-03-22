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
import { RecoilRoot } from "recoil";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import MypageEdit from "./pages/MypageEdit";

function App() {
  return (
    <div className="App">
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
            <Route path="/:id" element={<Post />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypageedit" element={<MypageEdit />} />
          </Routes>
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
