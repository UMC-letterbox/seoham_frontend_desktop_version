import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import {
  CreateStyledInput,
  CreateStyledInputButton,
  CreateTextH1,
  CreateTextH2,
  ErrorConfirmDiv,
  ErrorDiv,
  ErrorPwDiv,
  LoginButton,
  LoginInputDiv,
  LongInputDiv,
} from "./loginStyled";

interface UserValue {
  email: string;
  password: string;
  nickname: string;
  passwordConfirm: string;
  idCheck: boolean;
  emailCheck: boolean;
  numberCheck: boolean;
}

function CreatePage() {
  const navigate = useNavigate();
  const [admireNumber, setAdmireNumber] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
  const handleInputAdmire = (e: any) => {
    setAdmireNumber(e.target.value);
  };

  const onShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
  };

  const onConfirmShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setConfirmShow(!confirmShow);
  };

  const Idcheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get(
        `https://seohamserver.shop/user/check-join-nickname/?nickName=${watch(
          "nickname"
        )}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.data.result.valid === true) {
          alert("사용가능한 닉네임입니다.");
          setValue("idCheck", true);
          console.log(watch("idCheck"));
        } else {
          alert("사용불가능한 아이디이거나 중복됩니다.");
          setValue("idCheck", false);
          console.log(watch("idCheck"));
        }
      });
  };

  const emailCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        "https://seohamserver.shop/mail/send",
        {
          email: watch("email"),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.status === 200) {
          window.alert("사용가능한 이메일입니다.인증번호를 보냈습니다");
          setValue("emailCheck", true);
        } else {
          window.alert("이미 사용중이거나 유효하지 않는 이메일입니다");
          setValue("emailCheck", false);
        }
      });
  };

  const certifyCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        "https://seohamserver.shop/mail/check",
        {
          authCode: admireNumber,
          email: watch("email"),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.result === true) {
          alert("인증번호가 맞습니다 비밀번호 설정을 해주세요");
          setValue("numberCheck", true);
        } else {
          alert("인증번호가 맞지않습니다. 다시 시도해주세요");
          setValue("numberCheck", false);
        }
      });
  };

  const clickSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      watch("emailCheck") === false ||
      watch("idCheck") === false ||
      watch("numberCheck") === false ||
      watch("password") !== watch("passwordConfirm")
    ) {
      alert("유효성 검사 및 비밀번호중복확인을 완료해주세요");
    } else {
      axios
        .post("https://seohamserver.shop/user/join", {
          email: watch("email"),
          passWord: watch("password"),
          nickName: watch("nickname"),
        })
        .then((res) => {
          if (res.status === 200) {
            alert("가입이 완료되었습니다");
            navigate("/");
          } else {
            alert("조금 있다가 시도해주세요");
          }
        });
    }
  };

  // const Idcheck = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   fetch(
  //     `https://seohamserver.shop/user/check-join-nickname/?nickName=${watch(
  //       "nickname"
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.result.valid === true) {
  //         alert("사용가능한 닉네임입니다.");
  //         setValue("idCheck", true);
  //         console.log(watch("idCheck"));
  //       } else {
  //         alert("사용불가능한 아이디이거나 중복됩니다.");
  //         setValue("idCheck", false);
  //         console.log(watch("idCheck"));
  //       }
  //     });
  // };

  const regExpEm =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const regExgPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserValue>({
    mode: "onChange",
  });

  return (
    <>
      <LoginInputDiv>
        <BackButton></BackButton>
        <CreateTextH1>회원가입</CreateTextH1>
      </LoginInputDiv>
      <LongInputDiv></LongInputDiv>
      <CreateTextH2>
        계정&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="이메일을 입력해주세요"
          type="email"
          id="userEmail"
          required
          {...register("email", { required: true, pattern: regExpEm })}
        />
        <CreateStyledInputButton onClick={emailCheck}>
          인증번호 전송
        </CreateStyledInputButton>
      </LoginInputDiv>
      {errors.email?.type === "required" && (
        <ErrorDiv>이메일을 입력해주세요</ErrorDiv>
      )}
      {errors.email?.type === "pattern" && (
        <ErrorDiv>잘못된 이메일 형식입니다</ErrorDiv>
      )}
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="인증번호를 입력해주세요"
          type="text"
          id="admireNumber"
          value={admireNumber}
          onChange={handleInputAdmire}
        />
        <CreateStyledInputButton onClick={certifyCheck}>
          확인
        </CreateStyledInputButton>
      </LoginInputDiv>
      <CreateTextH2>닉네임&nbsp;&nbsp;&nbsp;&nbsp;</CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="닉네임을 입력해주세요(2~8자)"
          type="nickname"
          id="userNickname"
          required
          {...register("nickname", {
            required: true,
            minLength: 2,
            maxLength: 8,
          })}
        />
        <CreateStyledInputButton onClick={Idcheck}>
          중복확인
        </CreateStyledInputButton>
      </LoginInputDiv>
      {errors.nickname?.type === "required" && (
        <ErrorDiv>닉네임을 입력해주세요</ErrorDiv>
      )}
      {errors.nickname?.type === "minLength" && (
        <ErrorDiv>닉네임 길이를 지켜주세요</ErrorDiv>
      )}
      {errors.nickname?.type === "maxLength" && (
        <ErrorDiv>닉네임 길이를 지켜주세요</ErrorDiv>
      )}
      <CreateTextH2>비밀번호</CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
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
            marginLeft: "32px",
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
      {errors.password?.type === "required" && (
        <ErrorDiv>비밀번호를 입력해주세요</ErrorDiv>
      )}
      {errors.password?.type === "pattern" && (
        <ErrorPwDiv>
          비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
        </ErrorPwDiv>
      )}
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="비밀번호를 확인해주세요"
          type={confirmShow ? "text" : "password"}
          id="userPasswordConfirm"
          required
          {...register("passwordConfirm", {
            required: true,
            validate: {
              check: (value) => {
                if (watch("password") !== value) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            },
          })}
        />
        <button
          style={{
            position: "relative",
            backgroundColor: "transparent",
            borderColor: "transparent",
            marginLeft: "32px",
          }}
          onClick={onConfirmShowClick}
        >
          {confirmShow ? (
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
      {errors.passwordConfirm?.type === "required" && (
        <ErrorDiv>비밀번호 확인을 위해 입력해주세요</ErrorDiv>
      )}
      {errors.passwordConfirm && (
        <ErrorConfirmDiv>{errors.passwordConfirm.message}</ErrorConfirmDiv>
      )}
      <LongInputDiv>
        <LoginButton type="submit" disabled={!isValid} onClick={clickSignUp}>
          확인
        </LoginButton>
      </LongInputDiv>
    </>
  );
}

export default CreatePage;
