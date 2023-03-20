import axios from "axios";
import { useQuery } from 'react-query';
import { areaState } from '../recoil/state';
import { useRecoilValue } from 'recoil';

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

export const useWeatherInfo = () => {
    const area = useRecoilValue(areaState);
    // console.log(area);
    const fetchPosts = async () => {
      const response = await axios.get<IRxs[]>(`https://api.waqi.info/v2/feed/${area}/?token=apikey`);
      return response.data;
    };
  
    return useQuery<IRxs[], Error>('dusts', fetchPosts);
  };