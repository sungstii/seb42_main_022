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

export const postListState = atom<postList[]>({
  key: "postListState",
  default: [],
});

export const areaState = atom<string>({
  key: "areaState",
  default: "seoul",
});
