import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bigError from "../icon/bigError.svg";
import { authInstance } from "../utils/api";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
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
  button {
    margin-top: 10px;
    border: none;
    background: transparent;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 1.125rem;
  text-align: center;
`;

const ModalButton = styled.div`
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
  font-size: 0.938rem;
  border: 1px;
`;
const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 0.938rem;
`;

function Deleteaccount() {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [textvalue, setTextValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  console.log(textvalue);
  const memberid = localStorage.getItem("memberid");
  const navigate = useNavigate();

  const deletefetch = () => {
    // 멤버 삭제
    const url = `/members/${memberid}`;
    authInstance
      .delete(url)
      .then(() => {
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
      navigate("../");
    } else {
      setErrorMessage('잘못된 메시지입니다! "탈퇴합니다"를 입력하세요!');
    }
  };

  return (
    <div>
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
            <ModalButton onClick={deletehandle}>회원탈퇴</ModalButton>
            <button onClick={handleCloseModal}>취소</button>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
}

export default Deleteaccount;
