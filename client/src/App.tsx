import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Community from "./pages/Community";
import Review from "./pages/Review";
import GreenAct from "./pages/GreenAct";
import News from "./pages/News";
import GreenCal from "./pages/GreenCal";
import Ranking from "./pages/Ranking";
import { useRecoilValue } from "recoil";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import MypageEdit from "./pages/MypageEdit";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Reset } from "styled-reset";
import Header from "./components/Header";
import Protected from "./components/privateRoute";
import { sessionState } from "./recoil/state";
import useCheckAuth from "./utils/useCheckAuth";

function App() {
  const { authenticated, token } = useRecoilValue(sessionState);
  // useCheckAuth(token);
  return (
    <Fragment>
      <Reset />
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
        <Route
          path="/mypage"
          element={<Protected auth={authenticated}>{<MyPage />}</Protected>}
        />
        <Route path="/mypageedit" element={<MypageEdit />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Fragment>
  );
}

export default App;
