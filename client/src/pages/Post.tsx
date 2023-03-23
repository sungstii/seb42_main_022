import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import { postListState } from "../recoil/state";
import { useOnePost } from "../react-query/useOnePost";
import { useFeaList } from "../react-query/useFeaList";
import * as dayjs from "dayjs";
import accountCircle from "../icon/account_circle.svg";
import { ReactComponent as DelIcon } from "../icon/delete.svg";
import { ReactComponent as LikeIcon } from "../icon/thumbup.svg";
import { ReactComponent as EditIcon } from "../icon/edit.svg";
import Picture from "../image/Picture.png";

interface CommentButtonProps {
  disabled?: boolean;
}

interface ImageData {
  file_id: number;
  file_name: string;
  image_path: string;
}

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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  height: auto;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
const blank = styled.div``;
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
  flex-grow: 2;
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  width: 95%;
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
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
      background: #757575;
      :hover {
        background: #757575;
      }
    `}
`;
// 댓글 나타나는 창
const Comments_container = styled.div``;
const Comments_wrapper = styled.div`
  border-top: 1px solid #cccccc;
`;
const Comments_contents_wrapper = styled.div`
  margin: 0 18px 15px 18px;
`;
const Comments_contents = styled.div`
  line-height: 1.3em;
`;

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
  //
  const { id } = useParams();
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = useOnePost();
  const {
    data: feat,
    isLoading: featLoading,
    isError: featError,
  } = useFeaList();
  const [boardData, setBoardData] = useState<BoardData | undefined>(undefined);
  const [comment, setComment] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // 댓글input 수정시 바로 반영
    console.log("Comment updated:", comment);
  }, [comment]);
  useEffect(() => {
    if (post) {
      setBoardData(post);
    }
  }, [post]);

  if (postLoading) {
    return <div>Loading...</div>;
  }

  if (postError) {
    return <div>Error fetching data</div>;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<BoardData>(
  //         `http://3.39.150.26:8080/boards/${id}`,
  //       );
  //       setBoardData(response.data);
  //       console.log(boardData);
  //     } catch (error) {
  //       console.error("Error fetching board data: ", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const postComment = async () => {
    const url = "http://3.39.150.26:8080/comments";
    const headers = { Authorization: `Bearer ${localStorage.token}` };
    const body = {
      member_id: localStorage.memberid,
      board_id: id,
      contents: comment,
    };

    try {
      const response = await axios.post(url, body, { headers });
      console.log("Comment posted:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  //! 핸들러
  // 댓글 입력 내용 관리
  function handleCommentChange(e: React.KeyboardEvent<HTMLInputElement>) {
    setComment(e.currentTarget.value);
  }
  // 좋아요 클릭관리
  async function handleLikeClick() {
    // setClicked(!clicked);
    try {
      if (boardData && localStorage.memberid === boardData.member.member_id) {
        alert("본인 게시글은 추천할 수 없습니다!");
      } else {
        await axios.post(`http://3.39.150.26:8080/boards/${id}/Like`, {
          member_id: localStorage.memberid,
        });
        console.log("좋아요를 보냈습니다");
        window.location.reload();
      }
    } catch (error) {
      console.log("좋아요를 실패했습니다:", error);
    }
  }
  async function handleDeleteClick() {
    try {
      if (boardData && localStorage.memberid !== boardData.member.member_id) {
        alert("본인 게시글만 삭제 가능합니다!");
      } else {
        await axios.delete(`http://3.39.150.26:8080/boards/${id}`);
        console.log("게시글이 삭제되었습니다");
        window.location.reload();
      }
    } catch (error) {
      console.log("게시글 삭제를 실패했습니다:", error);
    }
  }
  // 댓글 등록 관리
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postComment();
  }

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
                  {boardData.upload_dto.map((image, idx) => {
                    return (
                      // <Content_img key={idx} imageUrl={image.image_path} />
                      <Content_img key={idx}>
                        <img src={image.image_path} alt="picture" />
                      </Content_img>
                    );
                  })}

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
                        <LikeButton
                          clicked={clicked}
                          disabled={
                            localStorage.memberid === boardData.member.member_id
                          }
                          onClick={handleLikeClick}
                        >
                          <LikeIcon width="20px" height="20px" fill="#2C9C2A" />
                        </LikeButton>
                      </LikeButtonBox>
                      <LikeCount>좋아요 {boardData.like_count}</LikeCount>
                    </Like_wrapper>
                    <Button_wrapper>
                      <FixButton>
                        <EditIcon fill="#878484" />
                      </FixButton>
                      <DeleteButton onClick={handleDeleteClick}>
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
                      placeholder={
                        localStorage.token
                          ? "댓글을 남겨주세요"
                          : "로그인이 필요합니다"
                      }
                      type="text"
                      onKeyUp={handleCommentChange}
                      disabled={!localStorage.token}
                    />
                  </InputBox>
                  <ButtonBox>
                    <form onSubmit={handleSubmit}>
                      <Comment_Button disabled={!localStorage.token}>
                        <span>등록</span>
                      </Comment_Button>
                    </form>
                  </ButtonBox>
                </Input_wrapper>
              </Input_container>
              {/* 댓글표시되는 부분 */}
              <Comments_container>
                {boardData.comments.map((el) => {
                  return (
                    <Comments_wrapper key={el.comment_id}>
                      {/* 유저정보표시 */}
                      <User_container>
                        <User_wrapper style={{ margin: "0 0 0 18px" }}>
                          <User_img_wrapper>
                            <img src={accountCircle} />
                          </User_img_wrapper>
                          <User_name_wrapper style={{ fontSize: "18px" }}>
                            {el.member.name}
                          </User_name_wrapper>
                          <User_level_wrapper>
                            Lv.{el.creator_level}
                          </User_level_wrapper>
                        </User_wrapper>
                      </User_container>
                      {/* 댓글내용 */}
                      <Comments_contents_wrapper>
                        <Comments_contents>{el.contents}</Comments_contents>
                      </Comments_contents_wrapper>
                    </Comments_wrapper>
                  );
                })}
              </Comments_container>
            </Comment_container>
          </Left_wrapper>

          {/* 추천게시글 부분 */}
          <Featured_container>
            <Featured_wrapper>
              <Featured_title>추천게시글</Featured_title>
              <List_wrapper>
                <List>
                  {feat
                    ? feat.map((el, idx) => {
                        return (
                          <List_el key={idx}>
                            <List_like>
                              <List_likeicon>
                                <LikeIcon
                                  width="18px"
                                  height="18px"
                                  fill="#ffffff"
                                />
                              </List_likeicon>
                              <List_likecnt>{el.like_count}</List_likecnt>
                            </List_like>
                            <List_title>{el.title}</List_title>
                          </List_el>
                        );
                      })
                    : null}
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
