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
  authenticated: boolean;
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
