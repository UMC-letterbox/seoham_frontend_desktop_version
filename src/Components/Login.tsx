import { isLogAtom, popUpMessage, popUpModal, userInfoState } from "../atom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  LineInfoText,
  LoginButton,
  FindInfoText,
  LoginInputDiv,
  StyledInput,
  TextHeader,
  LongInputDiv,
  LoginErrorDiv,
} from "./loginStyled";
import PopupMessage from "../Components/PopupMessage";

function LoginPage() {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLogAtom);
  const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
  const [message, setMessage] = useRecoilState(popUpMessage);
  const [show, setShow] = useState<boolean>(false);
  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     navigate("/edit");
  //   }
  // });

  const regExpEm =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const regExgPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });

  /* const onSubmit = handleSubmit((data) => {
    fetch("https://seohamserver.shop/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        passWord: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isSuccess === true) {
          localStorage.setItem("login_token", res.result.jwt);
          localStorage.setItem("userIdx", res.result.userIdx);
          setIsLoggedIn(true);
          alert("로그인 되었습니다");
          navigate("/edit");
        } else {
          alert("이메일과 비밀번호를 다시 한 번 확인해주세요");
        }
      });
   }); */

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/user/login",
        {
          email: watch("email"),
          passWord: watch("password"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.isSuccess === true) {
        setUserInfo({
          logintoken: res.data.result.jwt,
          userIdx: res.data.result.userIdx,
        });
        setModalOpen(!modalOpen);
        setMessage("로그인 되었습니다");
        setIsLoggedIn(true);
      } else {
        setModalOpen(!modalOpen);
        setMessage("이메일과 비밀번호를 다시 한 번 확인해주세요");
      }
    } catch (error) {
      setModalOpen(!modalOpen);
      setMessage("서버 오류가 발생했습니다.");
      console.log(error);
    }
  };

  const onShowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
  };

  return (
    <div style={{ margin: "5px", padding: "5px" }}>
      <TextHeader>서함</TextHeader>
      <LoginInputDiv>
        <StyledInput
          placeholder="이메일 입력"
          type="email"
          id="userEmail"
          required
          {...register("email", { required: true, pattern: regExpEm })}
        />
      </LoginInputDiv>
      {errors.email?.type === "required" && (
        <LoginErrorDiv>이메일을 입력해주세요</LoginErrorDiv>
      )}
      {errors.email?.type === "pattern" && (
        <LoginErrorDiv>잘못된 이메일 형식입니다</LoginErrorDiv>
      )}
      <LoginInputDiv>
        <StyledInput
          placeholder="비밀번호 입력"
          type={show ? "text" : "password"}
          id="userPw"
          required
          {...register("password", { required: true, pattern: regExgPw })}
        />
        <button
          style={{
            position: "relative",
            backgroundColor: "transparent",
            borderColor: "transparent",
            marginLeft: "-32px",
          }}
          onClick={onShowClick}
        >
          {show ? (
            <img
              src="/img/show.png"
              style={{ width: "18.33px", height: "15.27px" }}
              alt="show"
            />
          ) : (
            <img
              src="/img/hide.png"
              style={{ width: "18.33px", height: "15.27px" }}
              alt="hide"
            />
          )}
        </button>
      </LoginInputDiv>
      {errors.password?.type === "pattern" && (
        <LoginErrorDiv>
          비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
        </LoginErrorDiv>
      )}
      <LongInputDiv>
        <LoginButton type="submit" disabled={!isValid} onClick={onSubmit}>
          로그인
        </LoginButton>
        <PopupMessage message={message} />
      </LongInputDiv>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/find/Id">
          <FindInfoText>계정찾기</FindInfoText>
        </Link>
        <LineInfoText>ㅣ</LineInfoText>
        <Link to="/find/Pw">
          <FindInfoText>비밀번호찾기</FindInfoText>
        </Link>
        <LineInfoText>ㅣ</LineInfoText>
        <Link to="/create">
          <FindInfoText>회원가입</FindInfoText>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
