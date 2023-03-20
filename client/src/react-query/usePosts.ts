import axios from "axios";
import { useQuery } from 'react-query';

interface postList {
    title: string;
    contents: string;
    member: {
        member_id: number;
        name: string;
        point: string;
    }
  }

export const usePosts = () => {
  const fetchPosts = async () => {
    const response = await axios.get<postList[]>('http://3.39.150.26:8080/boards?searchType=CONTENTS&searchValue=');
    return response.data;
  };

  return useQuery<postList[], Error>('posts', fetchPosts);
};