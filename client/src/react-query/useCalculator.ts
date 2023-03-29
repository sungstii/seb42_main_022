import axios from "axios";
import { useQuery } from 'react-query';
import { string } from 'yup';

interface resultList {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  board_id: number;
  created_at: string;
}
type postData = {
    hour: string;
    power_consumption: string;
};

export const useCalculator = (postData: postData) => {
  const fetchPosts = async () => {
    const response = await axios.post<resultList[]>('http://3.39.150.26:8080/calculators', postData);
    return response.data;
  };

  return useQuery<resultList[], Error>('result', fetchPosts);
};