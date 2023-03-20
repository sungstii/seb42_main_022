import React from 'react';
import styled from "styled-components";
import user from "../icon/user.svg";
import picture from "../icon/picture.png"
import search from "../icon/search.svg"
import saving from "../icon/savings.svg"
import nature from "../icon/nature.svg"
import more from "../icon/expand_more.svg"
import less from "../icon/expand_less.svg"
import axios from "axios";
import { useState, useEffect } from "react";
import apiFetch from "../utils/useFetch";
import { useQuery } from 'react-query';
import { atom, useRecoilState } from 'recoil';
import { postListState } from "../recoil/state";
import { areaState } from "../recoil/state";
import { tokenState } from "../recoil/state";
import { myIdState } from "../recoil/state";
import { usePosts } from "../react-query/usePosts"
import { useWeatherInfo } from "../react-query/useWeatherInfo"
import PostModal from '../components/PostModal';

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  /* flex-direction: row; */
  padding: 30px 10px 10px 10px;
`;
const SectionContainer = styled.div`
  flex-direction: column;
  margin: 0px 60px 0px 0px;
`;
const AsideContainer = styled.div`
  flex-direction: column;
  margin: 20px 0px 20px 0px;
`;
const Aside = styled.div`
  width: 300px;
`;
const Posting = styled.div`
  display: flex;
  background-color: rgb(246,246,246);
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const Usericon = styled.img`
  padding: 2px 17px 2px 2px;
  width: 50px;
  height: 50px;
`;
const PostButton = styled.button`
  background-color: #EBEBEB;
  border-radius: 15px;
  font-size: 15px;
  color: #939393;
  border: 0px;
  width: 530px;
  height: 55px;
  padding: 0px 0px 0px 20px;
  text-align: start;
  cursor: pointer;
`;
const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(246,246,246);
  border-radius: 15px;
  padding: 15px;
  width: 600px;
  margin: 0px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const Postuser = styled.div`
  display: flex;
  flex-direction: row;
`;
const PostBody = styled.div`
  padding: 10px 0px 10px 0px;
  font-weight: bolder;
`;
const SearchBar = styled.div`
  display: flex;
  position: fixed;
  font-weight: bold;
  font-size: 18px;
  background-color: rgb(246,246,246);
  border-radius: 15px;
  padding: 15px;
  width: 300px;
  margin: 0px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const SearchOption = styled.div`
  display: flex;
  justify-content: center;
  background-color: #EBEBEB;
  border-radius: 15px;
  padding: 2px 0px 0px 10px;
  width: 120px;
  /* height: 0px; */
  margin: 0px 10px 0px 0px;
  cursor: pointer;
`;
const SearchInput = styled.input`
  background-color: #EBEBEB;
  border-width: 0px; 
  border-radius: 15px;
  padding: 5px 10px 5px 10px;
  width: 100%;
`;
const SearchButton = styled.img`
  position: relative;
  top: 1px;
  right: 0px;
  width: 28px;
  height: 28px;
`;

const DustBar = styled.div`
  display: flex;
  position: fixed;
  top: 130px;
  /* top: 150px; */
  background-color: rgb(246,246,246);
  border-radius: 15px;
  padding: 15px;
  width: 300px;
  height: 300px;
  margin: 0px 0px 20px 0px;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 0;
`;
const MileageBar = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  top: 480px;
  background-color: rgb(246,246,246);
  border-radius: 15px;
  padding: 20px 15px 15px 15px;
  width: 300px;
  /* height: 200px; */
  margin: 0px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const MileageInfo = styled.div`
  display: flex;
  /* flex-direction: row; */
  padding: 0px 0px 15px 0px;
  width: 100%;
  /* height: 50px; */
  /* margin: 0px 0px 20px 0px; */
`;
const MileageTitle = styled.div`
  font-size: 20px;
  margin: 0px 90px 0px 10px;
  font-weight: bold;
`;
const MileageIcon = styled.img`
  /* padding: 15px; */
  width: 30px;
  height: 30px;
  align-items: center;
`;
const MileageButton = styled.button`
  display: flex;
  width: 100%;
  height: 100px;
  border-radius: 15px;
  border-width: 0px;
  padding: 0px 20px 0px 0px;
  background-color: #609966;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const DustTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 0px 0px 20px 0px;
`;
const DustGraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Line = styled.div`
  padding: 0px 0px 20px 0px;
  
`;
const Row = styled.div`
  /* padding: 0px 30px 0px 0px; */
`;
const Row4 = styled.div<{pm25:number, pm10:number, o3:number, no2:number, co:number, so2:number}>`
  /* padding: 0px 30px 0px 0px; */
  .a{
    color: ${(props) => props.pm25<50 ? "blue" : (props.pm25<100 ? "green" : (props.pm25<150 ? "orange" : "red"))};
  }
  .b{
    color: ${(props) => props.pm10<30 ? "blue" : (props.pm10<80 ? "green" : (props.pm10<150 ? "orange" : "red"))};
  }
  .c{
    color: ${(props) => props.o3<50 ? "blue" : (props.o3<100 ? "green" : (props.o3<150 ? "orange" : "red"))};
  }
  .d{
    color: ${(props) => props.no2<50 ? "blue" : (props.no2<100 ? "green" : (props.no2<150 ? "orange" : "red"))};
  }
  .e{
    color: ${(props) => props.co<50 ? "blue" : (props.co<100 ? "green" : (props.co<150 ? "orange" : "red"))};
  }
  .f{
    color: ${(props) => props.so2<50 ? "blue" : (props.so2<100 ? "green" : (props.so2<150 ? "orange" : "red"))};
  }
`;
const DustDropdown = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  /* position: relative;
  display: inline-block; */
`;
const DropdownHeader = styled.div`
  display: flex;
  justify-content: center;
  background-color: #EBEBEB;
  border-radius: 15px;
  padding: 0px 0px 0px 10px;
  width: 80px;
  height: 30px;
  /* margin: 0px 10px 0px 0px; */
  cursor: pointer;
  /* padding: 8px 16px; */
`;
const DropdownMenu = styled.ul`
  list-style-type: none;
  font-size: 15px;
  margin: 0;
  padding: 0;
  background-color: #EBEBEB;
  border-radius: 0px 0px 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 45px;
  z-index: 1;
  width: 90px;
  max-height: 150px;
  overflow-y: auto;
  li {
    padding: 8px 16px;
    cursor: pointer;
    
  }
`;
const SearchdownMenu = styled.ul`
  list-style-type: none;
  font-size: 15px;
  margin: 0;
  padding: 0;
  background-color: #EBEBEB;
  border-radius: 0px 0px 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 45px;
  z-index: 3;
  width: 80px;
  max-height: 150px;
  li {
    position: relative;
    padding: 8px 16px;
    cursor: pointer;
    z-index: 3;
  }
`;
const ExpandButton = styled.img`
  width: 30px;
  height: 30px;
`;

export interface Item {
  id: number;
  label: string;
  value: string;
}

function Community() {
  const [itemvalue, setItemvalue] = useRecoilState(areaState); // 지역 상태 (서울, 부산 등)
  const { data, loading, error } = apiFetch(`https://api.waqi.info/v2/feed/${itemvalue}/?token=apikey`);
  // const { data: dusts, isLoading: dustLoading, error } = useWeatherInfo();
  const { data: posts, isLoading, isError } = usePosts();
  const [pm25, setPm25] = useState(0);
  const [pm10, setPm10] = useState(0);
  const [o3, setO3] = useState(0);
  const [no2, setNo2] = useState(0);
  const [co, setCo] = useState(0);
  const [so2, setSo2] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // 지역 드롭다운 open
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // 지역 드롭다운 현재값 (label)
  const [pm25info, setPm25info] = useState("");
  const [pm10info, setPm10info] = useState("");
  const [o3info, setO3info] = useState("");
  const [no2info, setNo2info] = useState("");
  const [coinfo, setCoinfo] = useState("");
  const [so2info, setSo2info] = useState("");
  const [logintoken, setLogintoken] = useRecoilState(tokenState); // 회원 권한
  const [memberId, setMemberId] = useRecoilState(myIdState);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 드롭다운 open
  const [isSearchbox, setIsSearchbox] = useState<Item | null>(null); // 검색 드롭다운 현재값 (label)
  const [searchValue, setSearchValue] = useState(""); // 검색 input 값
  const [elvalue, setElvalue] = useState("TITLE"); // 검색타입 상태 (제목, 내용)
  const [postList, setPostList] = useRecoilState(postListState); // recoil 상태 선언
  const [showModal, setShowModal] = useState(false);

  if (posts) setPostList(posts); // 서버에서 데이터 가져왔으면 리코일 상태에 넣기
  

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsOpen(false); // 드롭다운 텍스트 클릭하면 드롭다운 닫기
    setItemvalue(item.value);
    // console.log(selectedItem)
  };
  const searchbarClick = (el: Item) => {
    setIsSearchbox(el);
    setIsSearchOpen(false); // 드롭다운 텍스트 클릭하면 드롭다운 닫기
    setElvalue(el.value);
    // console.log(isSearchbox)
  };
  const AQIhandle = () => {
    pm25<50 ? setPm25info('좋음') : (pm25<100 ? setPm25info('보통') : (pm25<150 ? setPm25info('나쁨') : setPm25info('매우나쁨')))
    pm10<30 ? setPm10info('좋음') : (pm10<80 ? setPm10info('보통') : (pm10<150 ? setPm10info('나쁨') : setPm10info('매우나쁨')))
    o3<50 ? setO3info('좋음') : (o3<100 ? setO3info('보통') : (o3<100 ? setO3info('나쁨') : setO3info('매우나쁨')))
    no2<50 ? setNo2info('좋음') : (no2<100 ? setNo2info('보통') : (no2<100 ? setNo2info('나쁨') : setNo2info('매우나쁨')))
    co<50 ? setCoinfo('좋음') : (co<100 ? setCoinfo('보통') : (co<100 ? setCoinfo('나쁨') : setCoinfo('매우나쁨')))
    so2<50 ? setSo2info('좋음') : (so2<100 ? setSo2info('보통') : (so2<100 ? setSo2info('나쁨') : setSo2info('매우나쁨')))
  };

  const items: Item[]  = [
    { id: 1, label: "서울", value: "seoul" },
    { id: 2, label: "대구", value: "daegu" },
    { id: 3, label: "성남", value: "Seongnam" },
    { id: 4, label: "수원", value: "Suwon" },
    { id: 5, label: "시흥", value: "siheung" },
    { id: 6, label: "고양", value: "Goyang" },
    { id: 7, label: "부천", value: "bucheon" },
    { id: 8, label: "인천", value: "Incheon" },
    { id: 9, label: "부산", value: "busan"},
  ];
  const searchbox: Item[]  = [
    { id: 1, label: "제목", value: "TITLE" },
    { id: 2, label: "내용", value: "CONTENTS" },
  ];

  const login = () => { // 로그인 요청
    axios.post('http://3.39.150.26:8080/members/login', { "email" : "jeong@gmail.com", "password" : "qwer1234" })
    .then((response) => {
      const token = response.headers.authorization;
      const { data } = response;
      console.log(data);
      setMemberId(data.memberId);
      setLogintoken(token);
    })
    .catch((error) => console.log(error));
  }
  const membersearch = () => { // 멤버 검색 요청
    axios.get('http://3.39.150.26:8080/members/2', {headers: {Authorization: logintoken,},})
    .then((response) => {
      const { data } = response;
      console.log(data);
      console.log(response.headers.authorization);
      // setLogintoken(token);
    })
    .catch((error) => console.log(error));
  }
  const postsearch = () => { // 게시글 검색
    axios.get(`http://3.39.150.26:8080/boards?searchType=${elvalue}&searchValue=${searchValue}`)
    .then((response) => {
      const { data } = response;
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  const formData = new FormData();
  formData.append('memberId', '3');
  formData.append('title', '테스트');
  formData.append('contents', '내용 테스트');
  formData.append('file', '');

  const submit = () => { // 게시글 등록
    axios.post('http://3.39.150.26:8080/boards',formData, { 
      headers: {Authorization: logintoken}})
    .then((response) => {
      const { data } = response;
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    alert('게시물이 등록되었습니다!');
    handleClose();
  };

  useEffect(() => {
    // setPm25(dusts?.rxs.obs[0].msg.iaqi.pm25.v);
    // setPm10(dusts?.rxs.obs[0].msg.iaqi.pm10.v);
    // setO3(dusts?.rxs.obs[0].msg.iaqi.o3.v);
    // setNo2(dusts?.rxs.obs[0].msg.iaqi.no2.v);
    // setCo(dusts?.rxs.obs[0].msg.iaqi.co.v);
    // setSo2(dusts?.rxs.obs[0].msg.iaqi.so2.v);
    setPm25(data?.rxs.obs[0].msg.iaqi.pm25.v);
    setPm10(data?.rxs.obs[0].msg.iaqi.pm10.v);
    setO3(data?.rxs.obs[0].msg.iaqi.o3.v);
    setNo2(data?.rxs.obs[0].msg.iaqi.no2.v);
    setCo(data?.rxs.obs[0].msg.iaqi.co.v);
    setSo2(data?.rxs.obs[0].msg.iaqi.so2.v);
  });
  useEffect(() => {
    AQIhandle();
    // posthandle();
    // console.log(sdata?.title);
    //Optional Chaining
  });

  return (
    <>
      {isLoading && 'Error!'}
      {isError && 'Loading...'}
      <MainContainer>
        <SectionContainer>
          <Posting>
            <Usericon src={user} alt='user'/>
            <PostButton onClick={() => setShowModal(true)}>오늘 실천하신 회원님의 노력을 알려주세요!</PostButton>
            {showModal && (
              <PostModal
                onClose={handleClose}
                onConfirm={handleConfirm}
                // onSubmit={submit}
              />
            )}
          </Posting>
          {postList.map((el, index)=>{
            return(
              <PostSection key={index}>
                <Postuser>
                  <Usericon src={user} alt='user'/>
                  <div style={{padding:"5px 0px 0px 0px"}}><b>{el.board_creator}</b>&nbsp;Lv. {el.creator_level}</div>
                </Postuser>
                <PostBody>{el.title}</PostBody>
                {/* <img src={picture} alt='picture'/> */}
                {el.delegate_image_path && ( <img src={el.delegate_image_path} alt='picture'/>)}
              </PostSection>
            );
          })}
        </SectionContainer>
        <AsideContainer>
          <SearchBar>
            <SearchOption onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchbox ? isSearchbox.label : "제목"}{isSearchOpen === false ? <ExpandButton src={more} /> : <ExpandButton src={less}/>}
            </SearchOption>
            {isSearchOpen && (
              <SearchdownMenu>
                {searchbox.map(({id, label, value}) => (
                  <li key={id} onClick={() => searchbarClick({id, label, value})}>
                    {label}
                  </li>
                ))}
              </SearchdownMenu>
            )}

            <SearchInput 
            placeholder='검색'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchButton src={search} onClick={() => postsearch()}/>
          </SearchBar>
          {/* {error && 'Error!'}
          {loading && 'Loading...'} */}
          {data && (
            <DustBar>
              
              <DustDropdown>
                <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
                  {selectedItem ? selectedItem.label : "서울"}{isOpen === false ? <img src={more}/> : <img src={less}/>}
                </DropdownHeader>
                {isOpen && (
                  <DropdownMenu>
                    {items.map(({id, label, value}) => (
                      <li key={id} onClick={() => handleItemClick({id, label, value})}>
                        {label}
                      </li>
                    ))}
                  </DropdownMenu>
                )}<DustTitle>의 대기질 정보(AQI)</DustTitle>
              </DustDropdown>
              
              <DustGraph>
                <Row style={{ fontWeight: 'bold'}}>
                  <Line>초미세먼지</Line>
                  <Line>미세먼지</Line>
                  <Line>오존</Line>
                  <Line>이산화질소</Line>
                  <Line>일산화탄소</Line>
                  <Line>아황산가스</Line>
                </Row>
                <Row style={{ color: 'gray'}}>
                  <Line>PM-2.5</Line>
                  <Line>PM-10</Line>
                  <Line>O₃</Line>
                  <Line>NO₂</Line>
                  <Line>CO</Line>
                  <Line>SO₂</Line>
                </Row>
                <Row>
                  <Line>{pm25}㎍/㎥</Line>
                  <Line>{pm10}㎍/㎥</Line>
                  <Line>{o3}ppm</Line>
                  <Line>{no2}ppm</Line>
                  <Line>{co}ppm</Line>
                  <Line>{so2}ppm</Line>
                </Row>
                <Row4 pm25={pm25} pm10={pm10} o3={o3} no2={no2} co={co} so2={so2}>
                  <Line className='a'>{pm25info}</Line>
                  <Line className='b'>{pm10info}</Line>
                  <Line className='c'>{o3info}</Line>
                  <Line className='d'>{no2info}</Line>
                  <Line className='e'>{coinfo}</Line>
                  <Line className='f'>{so2info}</Line>
                </Row4>
              </DustGraph>
            </DustBar>
          )}
          <MileageBar>
            <MileageInfo>
            <MileageIcon src={saving}/>
              <MileageTitle>나의 마일리지</MileageTitle>
              <div>300P</div>
            </MileageInfo>
            <MileageButton><img src={nature}/>내 마일리지로 나무 심기!</MileageButton>
            <div onClick={membersearch}>회원 검색 버튼</div>
            <div onClick={login}>로그인 버튼</div>
          </MileageBar>
          <Aside/>
        </AsideContainer>
      </MainContainer>
    </>
  );
}

export default Community;
