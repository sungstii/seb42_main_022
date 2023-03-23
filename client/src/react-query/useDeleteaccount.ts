import axios from "axios";
import { useQuery } from 'react-query';

interface useDeleteaccount {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
}

export const useDeleteaccount = () => {
  const fetchPosts = async () => {
    const response = await axios.get<useDeleteaccount[]>('http://3.39.150.26:8080/boards/free?searchType=CONTENTS&searchValue=&page=&size=');
    return response.data;
  };

  return useQuery<useDeleteaccount[], Error>('posts', fetchPosts);
};