import styled from "styled-components";
//////////////////테스트용
export const LetterBtn = styled.button`
  width: 90%;
  height: 150px;
  margin: 2%;
`;
export const Test = styled.div`
  width: 10px;
  height: 10px;
  background-color: gray;
  ${LetterBtn}:focus & {
    transform: rotate(15deg);
  }
`;
export const MainGrid = styled.div`
  display: flex;
  ${LetterBtn}:hover & {
    background-color: blue;
  }
`;
//////////////////////
export const ViewTagGrid = styled.div`
  width: 50%;
`;
export const ViewLetterListGrid = styled.div`
  width: 100%;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 3%;
  position: relative;
`;

export const TagSenderWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    width: 80%;
  }
  margin-top: 10px;
`;
export const SettingWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
export const MyBtn = styled.button`
  padding: 2px;
  margin: 4px 0px;
  border-radius: 9999px;
  border: 0;
  background-color: transparent;
  &:active {
    background-color: #bababa;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
  }
`;
export const TagNameBar = styled.div<{ color: string }>`
  width: 90%;
  // margin-top: 30px;
  padding: 6px;
  margin-bottom: 3px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: transparent;
  background: ${(props) => props.color};
  p {
    font-size: large;
    font-weight: bold;
    background: transparent;
    color: black;
  }
  position: relative;
`;
export const NullTagDiv = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1; //부모는 relative, 자식은 absolute로 설정하기
`;
