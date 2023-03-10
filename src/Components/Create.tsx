import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const handleInputAdmire = (e: any) => {
    setAdmireNumber(e.target.value);
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
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserValue>({
    mode: "onChange",
  });

  return (
    <>
      <div>
        <h1>회원가입</h1>
        <h2>계정</h2>
        <div>
          <input
            placeholder="이메일을 입력해주세요"
            type="email"
            id="userEmail"
            required
            {...register("email", { required: true, pattern: regExpEm })}
          />
          {errors.email?.type === "required" && (
            <div>이메일을 입력해주세요</div>
          )}
          {errors.email?.type === "pattern" && (
            <div>잘못된 이메일 형식입니다</div>
          )}
        </div>
        <button>인증번호 전송</button>
      </div>
      <div>
        <input
          placeholder="인증번호를 입력해주세요"
          type="text"
          id="admireNumber"
          value={admireNumber}
          onChange={handleInputAdmire}
        />
        <button>확인</button>
      </div>
      <h2>닉네임</h2>
      <div>
        <input
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
        {errors.nickname?.type === "required" && (
          <div>닉네임을 입력해주세요</div>
        )}
        {errors.nickname?.type === "minLength" && (
          <div>닉네임 길이를 지켜주세요</div>
        )}
        {errors.nickname?.type === "maxLength" && (
          <div>닉네임 길이를 지켜주세요</div>
        )}
        <button onClick={Idcheck}>중복확인</button>
      </div>
      <h2>비밀번호</h2>
      <div>
        <input
          placeholder="비밀번호 입력"
          type="password"
          id="userPw"
          required
          {...register("password", { required: true, pattern: regExgPw })}
        />
        {errors.password?.type === "pattern" && (
          <div>
            비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
          </div>
        )}
      </div>
      <div>
        <input
          placeholder="비밀번호를 확인해주세요"
          type="password"
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
        {errors.passwordConfirm?.type === "pattern" && (
          <div>비밀번호 확인을 위해 입력해주세요</div>
        )}
        {errors.passwordConfirm && <div>{errors.passwordConfirm.message}</div>}
      </div>
      <div>
        <button type="submit" disabled={!isValid}>
          확인
        </button>
      </div>
    </>
  );
}

export default CreatePage;
