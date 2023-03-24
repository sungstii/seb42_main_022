import React from 'react';
import styled from "styled-components";
import { useNews } from "../react-query/useNews"
import dayjs from 'dayjs';
import 'dayjs/locale/ko'

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  padding: 30px 10px 10px 10px;
`;
const SectionContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 50px 0px 0px 0px;
`;
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 800px;
  height: 100%;
  padding: 0px 50px 20px 50px;
`;
const NewsBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  height: 100px;
  padding: 20px 50px 20px 50px;
  margin: 0px 0px 30px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  text-decoration-line: none;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 20px 0px;
  color: black;
`;
const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 30px 0px;
`;
const Contents = styled.div`
  font-size: 15px;
  /* font-weight: bold; */
  text-align: center;
  margin: 0px 0px 10px 0px;
  color: #757575;
`;


function News () {
  const { data: news, isLoading, isError } = useNews();

  return (
    <>
      {isLoading && "Error!"}
      {isError && "Loading..."}
      <MainContainer>
        <SectionContainer>
          <Text>여긴 환경뉴스 페이지입니다</Text>
          <NewsContainer>
            {news?.items.map((el, index) => {
              return (
                <NewsBox key={index} onClick={() => window.open(`${el.originallink}`, "_blank")}>
                  <Title>{el.title.replace(/<\/?[^>]+(>|$)/g, "")}</Title>
                  <Contents>{el.description.replace(/<\/?[^>]+(>|$)/g, "")}</Contents>
                  <div>{dayjs(el.pub_date).locale('ko').format('YYYY년 M월 D일 ddd HH:mm')}</div>
                </NewsBox>
              )
            })}
          </NewsContainer>
        </SectionContainer>
      </MainContainer>
    </>
  );
}

export default News;