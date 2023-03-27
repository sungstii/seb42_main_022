import axios from "axios";
import { useQuery } from "react-query";

interface MemberData {
  email: string;
  name: string;
  phone: string;
  point: string;
  tree_count: string;
  level_dto: {
    user_name: string;
    level: number;
    level_exp: number;
    total_exp: number;
  };
  member_id: number;
  member_status: string;
}

export const useMemberInfo = () => {
  const id = localStorage.memberid;
  const headers = {
    Authorization: localStorage.token,
    // "Content-Type": "multipart/form-data",
  };
  const fetchPost = async () => {
    const response = await axios.get<MemberData>(
      `http://3.39.150.26:8080/members/${id}`,
      { headers },
    );
    return response.data;
  };

  return useQuery<MemberData, Error>("member", fetchPost, {
    refetchOnWindowFocus: true, // Add this option to refetch data on window focus
  });
};
