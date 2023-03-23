import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface FeatPost {
  title: string;
  board_id: number;
  like_count: number;
  view_count: number;
}

export const useFeaList = () => {
  const { category } = useParams();
  const fetchPost = async () => {
    let url = "";
    if (category === "community") {
      url = "http://3.39.150.26:8080/boards/rankFreeBoards";
    } else if (category === "review") {
      url = "http://3.39.150.26:8080/boards/rankEcoBoards";
    } else if (category === "greenact") {
      url = "http://3.39.150.26:8080/boards/rankGreenBoards";
    }
    const response = await axios.get<FeatPost[]>(url);
    return response.data;
  };

  return useQuery<FeatPost[], Error>("featpost", fetchPost);
};
