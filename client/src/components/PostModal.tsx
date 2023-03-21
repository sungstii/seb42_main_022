import React from "react";
import styled from "styled-components";
import Add from "../icon/add_circle.svg"
import Cancel from "../icon/cancel.svg"
import user from "../icon/user.svg";
import { useState } from "react";
import { tokenState } from "../recoil/state";
import { myIdState } from "../recoil/state";
import { useRecoilValue } from 'recoil';
import axios from "axios";

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
    /* align-items: center; */
    /* justify-content: center; */
    background-color: white;
    border-radius: 10px;
    border: 2px solid #609966;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    width: 600px;
    /* height: 300px; */
    padding: 10px;
    text-align: center;
`;

const CloseButton = styled.img`
    position: relative;
    width: 40px;
    height: 40px;
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

    margin: 10px 0px 10px 0px;
    border-radius: 5px;
    font-size: 18px;
    /* font-weight: bold; */
    border: 1px;
    /* vertical-align: top; */
    /* text-align: left; */
    resize: none;
`;

const ModalTextarea = styled.textarea`
    width: 100%;
    height: 100px;
    margin: 10px 0px 10px 0px;
    border-radius: 5px;
    font-size: 18px;
    /* font-weight: bold; */
    border: 1px;
    /* vertical-align: top; */
    /* text-align: left; */
    resize: none;
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
`;
const Postuser = styled.div`
    display: flex;
    padding: 10px 0px 0px 0px;
    /* justify-content: flex-start; */
    flex-direction: row;
    border-top: 1px solid #b5b5b5;
`;
const Usericon = styled.img`
    padding: 2px 17px 2px 2px;
    width: 50px;
    height: 50px;
`;
const UserInfo = styled.div`
    flex-direction: row;
`;
const UserText = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const Testinput = styled.input`
    display: none;
`;


interface modal{
    onClose: any;
    onConfirm: any;
}
function PostModal({ onClose, onConfirm }: modal) {
    const token = useRecoilValue(tokenState);
    const memberId: any = useRecoilValue(myIdState);
    const [imageSrc, setImageSrc]: any = useState(null);
    const [imageFile, setImageFile]: any = useState(null)
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const onUpload = (e: any) => {
        const file = e.target.files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<void>((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null);
                resolve();
            };
        });
    }
    const formData = new FormData();
    formData.append('memberId', memberId);
    formData.append('title', title);
    formData.append('contents', contents);
    formData.append('files', imageFile);

    const submit = () => { // 게시글 등록
        axios.post('http://3.39.150.26:8080/boards/free',formData, { 
        headers: {Authorization: token}})
        .then((response) => {
        const { data } = response;
        console.log(data);
        window.location.reload();
        })
        .catch((error) => console.log(error));
    }
    const handleSubmit = () => {
        onConfirm()
        submit()
    }
    return (
        <>
            <ModalWrapper>
                <ModalContent>
                    <TitleContainer>
                        <NoButton/>
                        <ModalTitle>탄소 배출 줄이는 법 알리기</ModalTitle>
                        <CloseButton src={Cancel} onClick={onClose}/>
                    </TitleContainer>
                    <Postuser>
                        <Usericon src={user} alt='user'/>
                        <UserInfo>
                            <UserText style={{padding:"5px 0px 0px 0px"}}><b>정민상</b>&nbsp;Lv.5</UserText>
                            <UserText>2023년 3월 6일</UserText>
                        </UserInfo>
                    </Postuser>
                    <ModalInput placeholder="제목을 입력하세요" onChange={(e) => setTitle(e.target.value)}/>
                    <ModalTextarea
                        placeholder="오늘 실천하신 회원님의 노력을 알려주세요!"
                        onChange={(e) => setContents(e.target.value)}
                    />
                    <img width={'100%'} src={imageSrc}/>
                    <SubmitContainer>
                    <label htmlFor="fileUpload">
                        <PlusButton src={Add}/>
                    </label>
                    <Testinput type="file" multiple={true} id="fileUpload" onChange={e => onUpload(e)}/>
                        {/* <PlusButton src={Add}/> */}
                        <ModalButton onClick={handleSubmit}>알려주기</ModalButton>
                    </SubmitContainer>
                </ModalContent>
            </ModalWrapper>
        </>
    );
}
export default PostModal;