import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  DeleteButton,
  FlexDiv,
  InfoP,
  LogoutDiv,
  MypageInput,
  MypageMaindiv,
  ProfileDiv,
} from "../styles/MypageStyled";
import BackButton from "../Components/BackButton";
import { LoginButton } from "../Components/loginStyled";
import ModalContainername from "../Components/ModalContainer_name";
import ModalContainerPw from "../Components/ModalContainerPw";
import { useRecoilState } from "recoil";
import { popUpModal } from "../atom";
import PopupMessage from "Components/PopupMessage";

function Mypage() {
  const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
  const [message, setMessage] = useState<string>("");
  const handlePopupMessage = () => {
    setModalOpen(!modalOpen);
    setMessage("아직은 안되지롱!");
  };
  const handlePopupMessage2 = () => {
    setModalOpen(!modalOpen);
    setMessage("회원탈퇴? 절대안되!");
  };
  const passRef = useRef(null);
  const UserSvgWhite = () => {
    return (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="100"
          cy="100"
          r="99"
          fill="white"
          stroke="#BABABA"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M88.9344 110.246C72.1782 110.246 58.3579 122.816 56.3882 139.04C56.1219 141.233 57.9384 143.033 60.1475 143.033H139.852C142.062 143.033 143.878 141.233 143.612 139.04C141.642 122.816 127.822 110.246 111.066 110.246H88.9344Z"
          fill="#FAD4D4"
        />
        <circle
          cx="100"
          cy="77.4591"
          r="22.9508"
          fill="black"
          fillOpacity="0.4"
        />
        <circle cx="100" cy="77.4591" r="22.9508" fill="#FAD4D4" />
      </svg>
    );
  };
  const LetterIcon = () => {
    return (
      <div
        style={{
          width: "20px",
          marginRight: "8px",
          backgroundColor: "transparent",
        }}
      >
        <svg viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.8333 0.166687H2.16659C1.02075 0.166687 0.083252 1.10419 0.083252 2.25002V14.75C0.083252 15.8959 1.02075 16.8334 2.16659 16.8334H18.8333C19.9791 16.8334 20.9166 15.8959 20.9166 14.75V2.25002C20.9166 1.10419 19.9791 0.166687 18.8333 0.166687ZM18.4166 4.59377L11.6041 8.85419C10.927 9.28127 10.0728 9.28127 9.39575 8.85419L2.58325 4.59377C2.32284 4.4271 2.16659 4.14585 2.16659 3.84377C2.16659 3.14585 2.927 2.72919 3.52075 3.09377L10.4999 7.45835L17.4791 3.09377C18.0728 2.72919 18.8333 3.14585 18.8333 3.84377C18.8333 4.14585 18.677 4.4271 18.4166 4.59377Z"
            fill="white"
          />
        </svg>
      </div>
    );
  };
  return (
    <div>
      <div style={{ backgroundColor: "#EF9F9F" }}>
        <MypageMaindiv>
          <BackButton></BackButton>
        </MypageMaindiv>
        <ProfileDiv>
          <div style={{ width: "168px", backgroundColor: "#EF9F9F" }}>
            <UserSvgWhite />
          </div>
        </ProfileDiv>
        <ProfileDiv>
          <LetterIcon />
          <p style={{ backgroundColor: "transparent" }}>0</p>
        </ProfileDiv>
        <ProfileDiv>
          <div style={{ backgroundColor: "transparent" }}>
            <span>이름</span>
            <span>님</span>
          </div>
        </ProfileDiv>
      </div>
      <ProfileDiv>
        <div>
          <InfoP>이메일</InfoP>
          <p>실제 이메일</p>
          <InfoP>닉네임</InfoP>
          <FlexDiv>
            <MypageInput name="nickname" disabled />
            <ModalContainername />
          </FlexDiv>
          <InfoP>현재 비밀번호</InfoP>
          <FlexDiv>
            <MypageInput
              name="password"
              type="password"
              placeholder="현재 비밀번호 입력"
              ref={passRef}
            />
            <ModalContainerPw />
          </FlexDiv>
        </div>
      </ProfileDiv>
      <LogoutDiv>
        <LoginButton onClick={handlePopupMessage}>로그아웃</LoginButton>
        <PopupMessage message={message} />
      </LogoutDiv>
      <ProfileDiv>
        <DeleteButton onClick={handlePopupMessage2}>회원탈퇴</DeleteButton>
        <PopupMessage message={message} />
      </ProfileDiv>
    </div>
  );
}
export default Mypage;
