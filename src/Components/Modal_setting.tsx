import styled from "styled-components";

const SettingModal = styled.div`
  width: 360px;
  height: 330px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
`;
type Props = {
    modalClose: (modal:boolean) => void;
}

function Modal_setting({modalClose}:Props){
    return(
        <SettingModal>
            <button>수정</button>
            {/* <button onClick={modalClose}>삭제</button> */}
        </SettingModal>
    )
}

export default Modal_setting;