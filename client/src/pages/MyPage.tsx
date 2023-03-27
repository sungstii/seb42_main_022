import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMemberInfo } from "../react-query/useMemberInfo";
import { ReactComponent as LikeIcon } from "../icon/thumbup.svg";
import accountCircle from "../icon/account_circle.svg";
import { ReactComponent as SproutIcon } from "../icon/sprout.svg";
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

interface LevelProp {
  exp: number;
}

const Container = styled.div`
  /* width: 100%;
  height: 100%; */
`;

// 흰색부분 컨테이너
const White_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 450px;
`;
// 유저정보 전체박스
const User_wrapper = styled.div`
  width: 600px;
  height: 250px;
  margin: 40px auto 0 auto;
`;
// 위쪽 두개항목
const User_Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

const User_box1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70%;
`;
const User_ImgBox = styled.div`
  width: 84px;
  height: 100%;
`;
const User_ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 100%;
`;
const Editlink = styled(Link)`
  text-decoration: none;
`;
const User_Button = styled.div`
  height: 40px;
  width: 60px;
  background: #609966;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  span {
    background: transparent;
  }
`;
const User_box2 = styled.div`
  display: flex;
  height: 30%;
`;
const User_name = styled.div`
  display: flex;
  height: 100%;
  width: 84px;
  font-size: 18px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;
const User_mileage = styled.div`
  display: flex;
  height: 100%;
  width: auto;
  margin: 0 25px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;
// 아래 두개항목
const User_Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;
const User_box3 = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;

  /* margin-left: px; */
`;
const User_level = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  height: 35%;
  font-size: 15px;
  span {
  }
`;
const User_levelbar = styled.div`
  width: 40%;
  height: 65%;
`;
const TotalExp = styled.div`
  width: 100%;
  height: 11px;
  background: #d9d9d9;
  border-radius: 10px;
`;
const CurExp = styled.div<LevelProp>`
  height: 100%;
  width: ${(props) => props.exp}%;
  background: rgb(96, 153, 102);
  background: linear-gradient(
    90deg,
    rgba(96, 153, 102, 1) 0%,
    rgba(5, 172, 1, 0.34919905462184875) 100%
  );
  border-radius: 10px;
  animation-name: my-animation;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  box-shadow: 0 0 4px rgb(96, 153, 102);
  @keyframes my-animation {
    from {
      background-color: #ffffff;
      width: 0%;
    }
    to {
      background: linear-gradient(
        90deg,
        rgba(96, 153, 102, 1) 0%,
        rgba(5, 172, 1, 0.34919905462184875) 100%
      );
      width: ${(props) => props.exp};
      box-shadow: 0 0 4px rgb(96, 153, 102);
    }
  }
`;
const User_box4 = styled.div`
  display: flex;
  height: 50%;
  align-items: center;
  margin-left: 11px;
  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;
// -------------------------------------------------------------------------------------------------------------- //

// 내 게시글 텍스트부분

const Mypagetxt = styled.div`
  font-weight: 700;
  height: 50px;
`;

// -------------------------------------------------------------------------------------------------------------- //

// 회색부분 컨테이너
const Gray_Container = styled.div`
  flex: 1;
  background: #e3e3e3;
  padding: 30px 0;
`;
const Post_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: auto;
  margin: 0 auto;
  padding-top: 20px;
`;
const NoPostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;

  h1 {
    margin-top: 20px;
    text-align: center;
    font-size: 50px;
    color: #808080;
  }
`;
const Post_wrapper = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  margin-top: 30px;
  border-radius: 15px;
  background: #f6f6f6;
`;
const Postbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
`;
const Post_Left = styled.div`
  height: 100%;
  width: 70%;
`;
const Post_title = styled.div`
  display: flex;
  width: 100%;
  height: 55%;
  align-items: center;
`;
const Post_info = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45%;
  color: #878484;
  span {
    display: flex;
    align-items: center;
  }
`;
//
const Post_Right = styled.div`
  height: 80%;
  width: 20%;
  border: 1px solid green;
`;

function MyPage() {
  const [memberdata, setMemberdata] = useState<MemberData | undefined>(
    undefined,
  );
  const token = localStorage.token;
  const {
    data: member,
    isLoading: postLoading,
    isError: postError,
  } = useMemberInfo();
  useEffect(() => {
    if (member) {
      setMemberdata(member);
    }
  }, [member]);
  // console.log(memberdata);

  if (!token) {
    return <div>로그인 해주세요</div>;
  }
  console.log(memberdata);
  // memberdata 데이터 형식
  //   {
  //     "email": "esoo@gmail.com",
  //     "name": "이수",
  //     "phone": "010-1234-1234",
  //     "point": "8550",
  //     "tree_count": "5",
  //     "level_dto": {
  //         "user_name": "이수",
  //         "level": 2,
  //         "level_exp": 0,
  //         "total_exp": 100
  //     },
  //     "member_id": 3,
  //     "member_status": "활동중"
  // }
  return (
    <Container>
      {postLoading ? (
        "loading..."
      ) : memberdata ? (
        <>
          <White_Container>
            <User_wrapper>
              <User_Top>
                <User_box1>
                  <User_ImgBox>
                    <img
                      src={accountCircle}
                      style={{ width: "84px", height: "84px" }}
                    />
                  </User_ImgBox>
                  <User_ButtonBox>
                    <Editlink to="../mypageedit">
                      <User_Button>
                        <span>편집</span>
                      </User_Button>
                    </Editlink>
                  </User_ButtonBox>
                </User_box1>
                <User_box2>
                  <User_name>{memberdata.name}</User_name>
                  <User_mileage>
                    마일리지 {memberdata.point}
                    {/* 경험치퍼센트 {memberdata.level_dto.level_exp} */}
                  </User_mileage>
                </User_box2>
              </User_Top>
              <User_Bottom>
                <User_box3>
                  <User_level>
                    <span>Lv.{memberdata.level_dto.level}</span>
                    {/* <span>누적 경험치 {memberdata.level_dto.total_exp}</span> */}
                  </User_level>
                  <User_levelbar>
                    <TotalExp>
                      <CurExp exp={memberdata.level_dto.level_exp}></CurExp>
                    </TotalExp>
                  </User_levelbar>
                </User_box3>
                <User_box4>
                  <button>회원탈퇴</button>
                </User_box4>
              </User_Bottom>
            </User_wrapper>
            <Mypagetxt>내 게시글</Mypagetxt>
          </White_Container>
          <Gray_Container>
            <Post_Container>
              <NoPostBox>
                <SproutIcon></SproutIcon>
                <h1>준비중입니다.</h1>
              </NoPostBox>

              {/* <Post_wrapper>
                <Postbox>
                  <Post_Left>
                    <Post_title>
                      친환경 물품 사용 후기 ( 커피 원두 자루, 풀빨대, 천연 밀랍
                      캔들)
                    </Post_title>
                    <Post_info>
                      <span>
                        <LikeIcon width="20px" height="20px" fill="#878484" />
                      </span>
                      <span style={{ marginLeft: "5px" }}>좋아요 42</span>
                    </Post_info>
                  </Post_Left>
                  <Post_Right></Post_Right>
                </Postbox>
              </Post_wrapper>
              <Post_wrapper>
                <Postbox>
                  <Post_Left>
                    <Post_title>
                      친환경 물품 사용 후기 ( 커피 원두 자루, 풀빨대, 천연 밀랍
                      캔들)
                    </Post_title>
                    <Post_info>
                      <span>
                        <LikeIcon width="20px" height="20px" fill="#878484" />
                      </span>
                      <span style={{ marginLeft: "5px" }}>좋아요 42</span>
                    </Post_info>
                  </Post_Left>
                  <Post_Right></Post_Right>
                </Postbox>
              </Post_wrapper> */}
            </Post_Container>
          </Gray_Container>
        </>
      ) : (
        "loading..."
      )}
    </Container>
  );
}

export default MyPage;
