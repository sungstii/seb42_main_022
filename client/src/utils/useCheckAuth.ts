import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { sessionState } from "../recoil/state";

function useCheckAuth(token: string | null) {
  const location = useLocation();
  const refresh = localStorage.refresh;
  const setSession = useSetRecoilState(sessionState);
  const getAccessToken = () => {
    axios
      .get("http://3.39.150.26:8080/auth/reissue", {
        headers: { Refresh: refresh },
      })
      .then((res) => {
        console.log(res);
        const token = res.headers.authorization;
        if (token) {
          console.log("로그인상태");
          setSession({ authenticated: true, token: token });
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          setSession({ authenticated: false, token: null });
          delete axios.defaults.headers.common["Authorization"];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("asdfsdfsdfssdfsdfds");
    getAccessToken();
  }, [location]);
}

export default useCheckAuth;
