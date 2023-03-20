import { useState, useEffect } from 'react';
import axios from "axios";

// interface Api {
//   rxs: {
//     obs: [
//       {
//         msg: {
//           iaqi: {
//             pm25: {
//               v: number;
//             },
//             pm10: {
//               v: number;
//             },
//             o3: {
//               v: number;
//             },
//             no2: {
//               v: number;
//             },
//             co: {
//               v: number;
//             },
//             so2: {
//               v: number;
//             },
//           },
//         },
//       },
//     ],
//   },
// }
interface IAqi {
  pm25: {
    v: number;
  };
  pm10: {
    v: number;
  },
  o3: {
    v: number;
  },
  no2: {
    v: number;
  },
  co: {
    v: number;
  },
  so2: {
    v: number;
  },
}

interface IMsg {
  iaqi: IAqi;
}

interface IObs {
  msg: IMsg;
}

interface IRxs {
  obs: IObs[];
  rxs: any;
}

const useFetch = (url: string) => {
    const [data, setData] = useState<IRxs | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, [url]);

  return { data, loading, error };
}

 
export default useFetch;