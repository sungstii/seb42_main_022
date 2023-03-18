import { useState, useEffect } from 'react';
import axios from "axios";

interface Post {
    title: string;
    contents: string;
    member: {
        member_id: number;
        name: string;
        point: string;
    }
    
}

const useFetch = (url: string) => {
    const [sdata, setSdata] = useState<Post[]>([]);
    const [isloading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setIsloading(true);
        axios
          .get(url)
          .then((response) => {
            setSdata(response.data);
          })
          .catch((err) => {
            setIsError(err);
          })
          .finally(() => {
            setIsloading(false);
          });
      }, [url]);

  return { sdata, isloading, isError };
}

 
export default useFetch;