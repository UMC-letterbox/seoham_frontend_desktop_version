import styled from "styled-components";
//padding 이나 margin 순서 위부터! 시계방향으로!
export const LoginButton = styled.button`
  background-color: #f47c7c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 48px 8px 48px;
  width: 240px;
  height: 40px;
  top: calc(50% - 40px / 2 + 70.5px);
  cursor: pointer;
`;

export const TextHeader = styled.h1`
  margin: 40px 0px 40px 0px;
  padding: 20px 0px 28px 0px;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: #ff8080;
`;

export const StyledInput = styled.input`
  border-radius: 4px;
  border-width: 1px;
  padding: 4px 0px 4px 0px;
  width: 200px;
  height: 25px;
  top: 20%;
  left: 9px;
  bottom: 17.5%;
  background-color: transparent;
  border-color: #989898;
  line-height: 17px;
  align-items: center;
`;

export const LoginInputDiv = styled.div`
  justify-content: center;
  margin: 12px 0px 12px 0px;
  display: flex;
`;

export const LoginInfoText = styled.button`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.05em;
  background-color: transparent;
  border-color: transparent black transparent transparent;
  border-right: solid;
`;
