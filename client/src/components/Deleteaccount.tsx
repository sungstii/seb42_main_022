import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bigError from "../icon/bigError.svg";
import axios from "axios";
import { authInstance, defaultInstance } from "../utils/api";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  font-weight: bold;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #609966;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 40px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 18px;
  text-align: center;
`;

const ModalButton = styled(Link)`
  margin-top: 5px;
  padding: 10px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 80%;
  text-align: center;
  text-decoration-line: none;
  cursor: pointer;

  &:hover {
    background-color: #9b0000;
  }
  &:active {
    background-color: #ff2626;
  }
`;
const ModalInput = styled.input`
  width: 80%;
  padding: 10px 10px 10px 10px;
  background-color: #d9d9d9;
  margin: 20px 0px 5px 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 15px;
  border: 1px;
`;
const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 15px;
`;

function Deleteaccount() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [textvalue, setTextValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const Id = localStorage.getItem("memberid") || "";

  const deletefetch = () => {
    // 멤버 삭제
    const url = `/members/${Id}`;
    authInstance
      .delete(url)
      .then(() => {
        // const { data } = response;
        console.log("탈퇴 성공");
      })
      .catch(() => console.log("탈퇴 실패"));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deletehandle = () => {
    if (textvalue === "탈퇴합니다") {
      setErrorMessage("");
      deletefetch();
      window.localStorage.clear();
      window.location.reload();
    } else {
      setErrorMessage('잘못된 메시지입니다! "탈퇴합니다"를 입력하세요!');
    }
  };

  return (
    <div>
      <button onClick={handleShowModal}>
        회원탈퇴 버튼(이건 나중에 바꾸면 됨)
      </button>
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <img src={bigError} />
            <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
            <ModalMessage>
              탈퇴하시려면 “탈퇴합니다” 라고 입력해 주세요.
            </ModalMessage>
            <ModalInput
              placeholder="탈퇴합니다"
              onChange={(e) => setTextValue(e.target.value)}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <ModalButton type="text" to="/Ranking" onClick={deletehandle}>
              회원탈퇴
            </ModalButton>
            <button onClick={handleCloseModal}>닫기(이건 나중에 없앨거)</button>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
}

export default Deleteaccount;
