import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "../recoil/state";

function useCheckAuth(token: string | null) {
  const refresh = localStorage.refresh;
  const [session, setSession] = useRecoilState(sessionState);
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
          axios.defaults.headers.common["Authorization"] = session.token;
        } else {
          setSession({ authenticated: false, token: null });
          delete axios.defaults.headers.common["Authorization"];
        }
      });
  };
  useEffect(() => {
    console.log("asdfsdfsdfssdfsdfds");
    getAccessToken();
  }, []);
}

export default useCheckAuth;
