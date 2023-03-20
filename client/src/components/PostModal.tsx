import React from "react";
import styled from "styled-components";
import Add from "../icon/add_circle.svg"
import Cancel from "../icon/cancel.svg"

const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    background-color: white;
    border-radius: 10px;
    border: 2px solid #609966;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    width: 600px;
    /* height: 300px; */
    padding: 20px;
    text-align: center;
`;

const CloseButton = styled.img`
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
`;
const NoButton = styled.div`
    width: 50px;
    height: 50px;
    display: hidden;
`;
const PlusButton = styled.img`
    position: relative;
    margin: 0px 10px 0px 0px;
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

const ModalTitle = styled.h2`
    color: #595959;
    margin-top: 0;
`;

const ModalInput = styled.input`
    width: 100%;
    height: 100px;
    margin-top: 20px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    border: 1px;
    justify-content: center;
`;

const ModalButton = styled.button`
    padding: 10px 20px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #609966;
    width: 100%;
    color: white;
    cursor: pointer;
`;
const SubmitContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
    width: 100%;
    margin: 10px 0px 0px 0px;
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    margin: 10px 0px 0px 0px;
`;


interface modal{
    onClose: any;
    onConfirm: any;
}

function PostModal({ onClose, onConfirm }: modal) {
    return (
        <>
            <ModalWrapper>
                <ModalContent>
                    <TitleContainer>
                        <NoButton/>
                        <ModalTitle>탄소 배출 줄이는 법 알리기</ModalTitle>
                        <CloseButton src={Cancel} onClick={onClose}/>
                    </TitleContainer>
                    <ModalInput
                        placeholder="오늘 실천하신 회원님의 노력을 알려주세요!"
                    />
                    <SubmitContainer>
                        <PlusButton src={Add}/>
                        <ModalButton onClick={onConfirm}>알려주기</ModalButton>
                    </SubmitContainer>
                </ModalContent>
            </ModalWrapper>
        </>
    );
}
export default PostModal;