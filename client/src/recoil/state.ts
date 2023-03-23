import { atom } from "recoil";

interface postList {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
}

export const postListState = atom<postList[]>({
  key: "postListState",
  default: [],
});

export const areaState = atom<string>({
  key: "areaState",
  default: "seoul",
});

export const tokenState = atom<string>({
  key: "tokenState",
  default: "",
});
export const refreshState = atom<string>({
  key: "refreshState",
  default: "",
});

export const myIdState = atom<number>({
  key: "myIdState",
  default: 0,
});
