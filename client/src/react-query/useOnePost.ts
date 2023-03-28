import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface BoardData {
  title: string;
  contents: string;
  member: {
    email: string;
    name: string;
    phone: string;
    point: string;
    tree_count: string;
    level_dto: null | {
      level_name: string;
      min_point: string;
    };
    member_id: number;
    member_status: string;
  };
  creator_level: number;
  upload_dto: {
    file_id: number;
    file_name: string;
    image_path: string;
  }[];
  comments: any[];
  board_id: number;
  like_count: number;
  view_count: number;
  created_at: string;
  modified_at: string;
}

export const useOnePost = () => {
  const { id } = useParams();
  const fetchPost = async () => {
    const response = await axios.get<BoardData>(
      `http://3.39.150.26:8080/boards/${id}`,
    );
    return response.data;
  };

  return useQuery<BoardData, Error>("post", fetchPost, {
    refetchOnWindowFocus: true, // Add this option to refetch data on window focus
  });
};
