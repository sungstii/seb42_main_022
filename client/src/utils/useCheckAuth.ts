import axios from "axios";
import { useRecoilState } from "recoil";
import { sessionState } from "../recoil/state";

function useCheckAuth() {
  const refresh = localStorage.refresh;
  const [session, setSession] = useRecoilState(sessionState);
  axios
    .get("http://3.39.150.26:8080/auth/reissue", {
      headers: { Refresh: refresh },
    })
    .then((res) => {
      console.log(res);
      const token = res.headers.authorization;
      setSession({ ...session, token: token });
    });
  if (session.token) {
    setSession({ ...session, authenticated: true });
    axios.defaults.headers.common["Authorization"] = session.token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default useCheckAuth;
