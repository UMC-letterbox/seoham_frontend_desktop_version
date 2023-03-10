import { isLogAtom } from "atom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  LoginButton,
  LoginInfoText,
  LoginInputDiv,
  StyledInput,
  TextHeader,
} from "./loginStyled";

function LoginPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLogAtom);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/edit");
    }
  });

  const regExpEm =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const regExgPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });

  // const onSubmit = handleSubmit((data) => {
  //   fetch("https://seohamserver.shop/user/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: data.email,
  //       passWord: data.password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.isSuccess === true) {
  //         localStorage.setItem("login_token", res.result.jwt);
  //         localStorage.setItem("userIdx", res.result.userIdx);
  //         setIsLoggedIn(true);
  //         alert("로그인 되었습니다");
  //         navigate("/edit");
  //       } else {
  //         alert("이메일과 비밀번호를 다시 한 번 확인해주세요");
  //       }
  //     });
  // });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        "https://seohamserver.shop/user/login",
        {
          email: watch("email"),
          passWord: watch("password"),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.isSuccess === true) {
          localStorage.setItem("login_token", res.data.result.jwt);
          localStorage.setItem("userIdx", res.data.result.userIdx);
          setIsLoggedIn(true);
          alert("로그인 되었습니다");
          navigate("/edit");
        } else {
          alert("이메일과 비밀번호를 다시 한 번 확인해주세요");
        }
      });
  };

  const onShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      {errors.email?.type === "required" && <div>이메일을 입력해주세요</div>}
      {errors.email?.type === "pattern" && <div>잘못된 이메일 형식입니다</div>}
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
            />
          ) : (
            <img
              src="/img/hide.png"
              style={{ width: "18.33px", height: "15.27px" }}
            />
          )}
        </button>
      </LoginInputDiv>
      {errors.password?.type === "pattern" && (
        <div>
          비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
        </div>
      )}
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          paddingTop: "48px",
          paddingBottom: "20px",
        }}
      >
        <LoginButton type="submit" disabled={!isValid} onClick={onSubmit}>
          로그인
        </LoginButton>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/create">
          <LoginInfoText>계정찾기</LoginInfoText>
        </Link>
        <Link to="/create">
          <LoginInfoText>비밀번호찾기</LoginInfoText>
        </Link>
        <Link to="/create">
          <LoginInfoText>회원가입</LoginInfoText>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
