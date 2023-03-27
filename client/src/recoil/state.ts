import { atom } from "recoil";

interface postList {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  board_id: number;
  created_at: string;
}
interface userToken {
  /**
   * 로그인 유무
   */
  authenticated: boolean;
  /**
   * 토큰 값
   */
  token: string | null;
}

export const postListState = atom<postList[]>({
  key: "postListState",
  default: [],
});

export const areaState = atom<string>({
  key: "areaState",
  default: "seoul",
});

export const sessionState = atom<userToken>({
  key: "sessionState",
  default: {
    authenticated: false,
    token: null,
  },
});
