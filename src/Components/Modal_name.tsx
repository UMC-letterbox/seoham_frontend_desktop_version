import { useForm } from "react-hook-form";
import {
  MyModal,
  ModalButton,
  ModalErrorDiv,
  ModalErrorDivWrap,
  ModalH1,
  ModalMargin,
  ModalStyledInput,
  ModalStyledInputButton,
  MyPageModal,
} from "styles/Modal";
import { FlexDiv } from "styles/MypageStyled";

type Props = {
  modalClose: () => void;
};

function Modalname({ modalClose }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ nickname: string; idCheck: boolean }>({ mode: "onChange" });

  return (
    <MyModal>
      <MyPageModal>
        <ModalH1>닉네임 중복 확인</ModalH1>
        <ModalMargin>
          <FlexDiv>
            <ModalStyledInput
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
            <ModalStyledInputButton>중복확인</ModalStyledInputButton>
          </FlexDiv>
          <ModalErrorDivWrap>
            {errors.nickname?.type === "required" && (
              <ModalErrorDiv>닉네임을 입력해주세요</ModalErrorDiv>
            )}
            {errors.nickname?.type === "minLength" && (
              <ModalErrorDiv>닉네임 길이를 지켜주세요</ModalErrorDiv>
            )}
            {errors.nickname?.type === "maxLength" && (
              <ModalErrorDiv>닉네임 길이를 지켜주세요</ModalErrorDiv>
            )}
          </ModalErrorDivWrap>
        </ModalMargin>
        <ModalMargin>
          <p
            style={{
              justifyContent: "center",
              color: "#989898",
              fontSize: "11px",
              marginLeft: "30%",
            }}
          >
            사용 가능한 닉네임입니다.
          </p>
        </ModalMargin>
        <ModalMargin>
          <ModalButton onClick={modalClose}>사용하기</ModalButton>
        </ModalMargin>
      </MyPageModal>
    </MyModal>
  );
}

export default Modalname;
