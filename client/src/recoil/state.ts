import { atom } from "recoil";

interface postList {
    title: string;
    contents: string;
    member: {
        member_id: number;
        name: string;
        point: string;
    }
  }

export const postListState = atom<postList[]>({
    key: 'postListState',
    default: [],
});

export const areaState = atom<string>({
    key: 'areaState',
    default: 'seoul',
});