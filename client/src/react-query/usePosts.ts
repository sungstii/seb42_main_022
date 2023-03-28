import { useQuery } from "react-query";
import { defaultInstance } from "../utils/api";
interface postList {
  board_id: number;
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  created_at: string;
}

export const usePosts = () => {
  const url = "/boards/free?searchType=CONTENTS&searchValue=&page=&size=";
  const fetchPosts = async () => {
    const response = await defaultInstance.get<postList[]>(url);
    return response.data;
  };

  return useQuery<postList[], Error>("posts", fetchPosts);
};
