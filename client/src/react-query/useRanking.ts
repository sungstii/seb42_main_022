import axios from "axios";
import { useQuery } from 'react-query';

interface useRanking {
    name: string;
    tree_count: string;
}

export const useRanking = () => {
  const fetchPosts = async () => {
    const response = await axios.get<useRanking[]>('http://3.39.150.26:8080/members/donationRanks',
    {headers: {Authorization: localStorage.getItem('token'), Refresh: localStorage.getItem('fresh')}}
    )
    return response.data;
  };

  return useQuery<useRanking[], Error>('ranking', fetchPosts);
};