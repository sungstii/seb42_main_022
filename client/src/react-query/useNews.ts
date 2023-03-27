import axios from "axios";
import { useQuery } from 'react-query';

interface useNews {
    display: number;
    items: [
        {
            title: string;
            originallink: string;
            description: string;
            pub_date: string;
        }
    ]
}

export const useNews = () => {
  const fetchPosts = async () => {
    const response = await axios.get<useNews>('http://3.39.150.26:8080/news')
    return response.data;
  };

  return useQuery<useNews, Error>('news', fetchPosts);
};