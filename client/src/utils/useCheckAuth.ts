import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sessionState } from "../recoil/state";

function useCheckAuth() {
  const location = useLocation();
  const refresh = localStorage.refresh;
  /**
   * refreshToken만 localStorage에 저장하고 accessToken토큰은 전역변수에 저장하려고 구현하였으나
   * useRecoilState의 setter를 이용하여 값 변경시에 변경된 값이 바로 반영이 안되는 경우가 있음
   * 유저 로그인 여부만 전역 상태관리를 이용하고 accessToken은 localStorage에 저장하여 관리
   */
  const [session, setSession] = useRecoilState(sessionState);
  const getAccessToken = () => {
    axios
      .get("http://3.39.150.26:8080/auth/reissue", {
        headers: { Refresh: refresh },
      })
      .then((res) => {
        // console.log("새로운 토큰 값: ", res.headers.authorization);
        // console.log("새로운 리프레쉬 값: ", res.headers.refresh);
        const token = res.headers.authorization;
        const refresh = res.headers.refresh;
        setSession({ authenticated: true, token });
        localStorage.setItem("token", token);

        //! 서버에서 리프레쉬 토큰으로 액세스토큰 재 요청시 새로운 리프레쉬 토큰을 발급해줘서 같이 저장한다.
        localStorage.setItem("refresh", refresh);

        console.log(localStorage.token);
        axios.defaults.headers.common["Authorization"] = token;
        console.log("세션있음", session);
      })
      .catch((error) => {
        console.log(error);
        // setSession({ ...session, authenticated: true });
      });
  };
  useEffect(() => {
    console.log("asdfsdfsdfssdfsdfds");
    refresh && getAccessToken();
  }, [location]);
}

export default useCheckAuth;
