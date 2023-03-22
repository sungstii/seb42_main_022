import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import accountCircle from "../icon/account_circle.svg";
import { ReactComponent as DelIcon } from "../icon/delete.svg";
import { ReactComponent as LikeIcon } from "../icon/thumbup.svg";
import { ReactComponent as EditIcon } from "../icon/edit.svg";
import Picture from "../image/Picture.png";

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 51px auto;
`;
const Left_wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// * 상세게시글
const Post_wrapper = styled.div`
  width: 680px;
  height: auto;
  border-radius: 15px;
  background-color: #f6f6f6;
`;
const User_container = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
`;
const User_wrapper = styled.div`
  display: flex;
  margin: 30px;
`;
const User_img_wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
const User_name_wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
`;
const User_level_wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-left: 10px;
`;
const Content_container = styled.div`
  height: 400px;
`;
const Content_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`;
const Content_title = styled.div`
  font-size: 25px;
`;
const Content_img = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${Picture});
  background-size: cover;
`;
const Content_detail = styled.div`
  font-size: 18px;
`;
const Info_container = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  border-top: 1px solid #cccccc;
  color: #878484;
`;
const Info_wrapper = styled.div`
  margin: 10px;
  font-size: 15px;
`;
const Info_wrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 3px;
`;
const Date = styled.div``;
const View = styled.div``;
const Info_wrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;
const Like_wrapper = styled.div`
  display: flex;
`;
const LikeButtonBox = styled.div`
  display: flex;
  align-items: center;
`;
const LikeButton = styled.button<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  svg {
    fill: ${({ clicked }) => (clicked ? "#609966" : "#878484")};
  }
  :hover {
    svg {
      fill: #4f8255;
    }
  }
`;
const LikeCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
const Button_wrapper = styled.div`
  display: flex;
`;
const FixButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  :hover {
    svg {
      fill: #4f8255;
    }
  }
`;
const DeleteButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  :hover {
    svg {
      fill: #4f8255;
    }
  }
`;

// -------------------------------------------------------------------------------------------------------------- //

// * 추천게시글
const Featured_container = styled.div`
  width: 370px;
  height: 500px;
  margin-left: 70px;
  border-radius: 15px;
  background-color: #f6f6f6;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Featured_wrapper = styled.div`
  position: sticky;
  margin: 50px 10px;
`;
const Featured_title = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-size: 30px;
`;
const List_wrapper = styled.div``;
const List = styled.ul``;
const List_el = styled.li`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const List_like = styled.button`
  display: flex;
  width: 60px;
  height: 25px;
  border-radius: 15px;
  background-color: #609966;
  color: white;
  border: none;
  /* cursor: pointer; */
`;
const List_likeicon = styled.span`
  width: 18px;
  display: flex;
  align-items: center;
  height: 100%;
`;
const List_likecnt = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
  font-size: 18px;
`;
const List_title = styled.span`
  font-size: 20px;
  margin-left: 15px;
`;

// -------------------------------------------------------------------------------------------------------------- //

// * 댓글창 위 댓글수
const CommentCnt = styled.div`
  margin: 20px 10px;
  text-align: left;
  font-size: 23px;
`;

// -------------------------------------------------------------------------------------------------------------- //

// * 댓글창
const Comment_container = styled.div`
  width: 680px;
  background-color: #f6f6f6;
  border-radius: 15px;
`;
// 댓글입력창
const Input_container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  /* padding: 0 15px; */
`;
const Input_wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const InputBox = styled.div`
  flex-grow: 8;
`;
const Comment_Input = styled.input`
  font-size: 20px;
  border: none;
  background: transparent;
  outline: none;
`;
const ButtonBox = styled.div`
  flex-grow: 1;
`;
const Comment_Button = styled.button`
  height: 30px;
  width: 50px;
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
  :hover {
    background: #4f8255;
  }
`;
// 댓글 나타나는 창
const Comments_container = styled.div``;
const Comments_wrapper = styled.div`
  border-top: 1px solid #cccccc;
`;
const Comments_contents_wrapper = styled.div`
  margin: 0 0 15px 18px;
`;
const Comments_contents = styled.div``;

interface BoardData {
  title: string;
  contents: string;
  member: {
    email: string;
    name: string;
    phone: string;
    point: string;
    tree_count: string;
    level_dto: null | {
      level_name: string;
      min_point: string;
    };
    member_id: number;
    member_status: string;
  };
  creator_level: number;
  upload_dto: {
    file_id: number;
    file_name: string;
    image_path: string;
  }[];
  comments: any[];
  board_id: number;
  like_count: number;
  view_count: number;
  created_at: string;
  modified_at: string;
}

function Post() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [clicked, setClicked] = useState(false);
  const [boardData, setBoardData] = useState<BoardData | null>(null);

  //! 핸들러
  // 댓글 입력
  function handleCommentChange(e: React.KeyboardEvent<HTMLInputElement>) {
    setComment(e.currentTarget.value);
  }
  // 클릭관리
  function handleClick() {
    setClicked(!clicked);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BoardData>(
          `http://3.39.150.26:8080/boards/${id}`,
        );
        setBoardData(response.data);
        console.log(boardData);
      } catch (error) {
        console.error("Error fetching board data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Comment updated:", comment);
    console.log(boardData);
  }, [comment]);

  return (
    <Container>
      {boardData ? (
        <Wrapper>
          <Left_wrapper>
            {/* 게시글 상세보기 부분 */}
            <Post_wrapper>
              <User_container>
                <User_wrapper>
                  <User_img_wrapper>
                    <img src={accountCircle} />
                  </User_img_wrapper>
                  <User_name_wrapper>{boardData.member.name}</User_name_wrapper>
                  <User_level_wrapper>
                    Lv.{boardData.creator_level}
                  </User_level_wrapper>
                </User_wrapper>
              </User_container>
              <Content_container>
                <Content_wrapper>
                  <Content_title>
                    <div>{boardData.title}</div>
                  </Content_title>
                  <Content_img></Content_img>
                  <Content_detail>
                    <div>{boardData.contents}</div>
                  </Content_detail>
                </Content_wrapper>
              </Content_container>
              <Info_container>
                <Info_wrapper>
                  <Info_wrapper1>
                    <Date>{boardData.created_at}</Date>
                    <View>조회수 {boardData.view_count}</View>
                  </Info_wrapper1>
                  <Info_wrapper2>
                    <Like_wrapper>
                      <LikeButtonBox>
                        <LikeButton clicked={clicked} onClick={handleClick}>
                          <LikeIcon width="20px" height="20px" fill="#2C9C2A" />
                        </LikeButton>
                      </LikeButtonBox>
                      <LikeCount>좋아요 {boardData.like_count}</LikeCount>
                    </Like_wrapper>
                    <Button_wrapper>
                      <FixButton>
                        <EditIcon fill="#878484" />
                      </FixButton>
                      <DeleteButton>
                        <DelIcon fill="#878484" />
                      </DeleteButton>
                    </Button_wrapper>
                  </Info_wrapper2>
                </Info_wrapper>
              </Info_container>
            </Post_wrapper>
            <CommentCnt>
              <span>댓글 1</span>
            </CommentCnt>

            {/* 댓글창 부분 */}
            <Comment_container>
              {/* 댓글입력부분 */}
              <Input_container>
                <Input_wrapper>
                  <User_img_wrapper style={{ flexGrow: "1" }}>
                    <img
                      src={accountCircle}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </User_img_wrapper>
                  <InputBox>
                    <Comment_Input
                      placeholder="댓글을 남겨주세요"
                      type="text"
                      onKeyUp={handleCommentChange}
                    />
                  </InputBox>
                  <ButtonBox>
                    <Comment_Button>
                      <span>등록</span>
                    </Comment_Button>
                  </ButtonBox>
                </Input_wrapper>
              </Input_container>
              {/* 댓글표시되는 부분 */}
              <Comments_container>
                <Comments_wrapper>
                  {/* 유저정보표시 */}
                  <User_container>
                    <User_wrapper style={{ margin: "0 0 0 18px" }}>
                      <User_img_wrapper>
                        <img src={accountCircle} />
                      </User_img_wrapper>
                      <User_name_wrapper style={{ fontSize: "18px" }}>
                        김기식
                      </User_name_wrapper>
                      <User_level_wrapper>Lv.10</User_level_wrapper>
                    </User_wrapper>
                  </User_container>
                  {/* 댓글내용 */}
                  <Comments_contents_wrapper>
                    <Comments_contents>아 그렇군요</Comments_contents>
                  </Comments_contents_wrapper>
                </Comments_wrapper>
              </Comments_container>
            </Comment_container>
          </Left_wrapper>

          {/* 추천게시글 부분 */}
          <Featured_container>
            <Featured_wrapper>
              <Featured_title>추천게시글</Featured_title>
              <List_wrapper>
                <List>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>999</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>832</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width2="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>103</List_likecnt>
                    </List_like>
                    <List_title>제가 키우는 식물입니다</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>55</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>2</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                </List>
              </List_wrapper>
            </Featured_wrapper>
          </Featured_container>
        </Wrapper>
      ) : (
        <p>Loading board data...</p>
      )}
    </Container>
  );
}

export default Post;
