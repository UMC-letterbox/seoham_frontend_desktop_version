import { useRecoilState } from "recoil";
import { mypagePwModal } from "../atom";
import { CreateStyledInputButton } from "../Components/loginStyled";
import ModalPw from "../Components/Modal_pw";

function ModalContainerPw() {
  const [modalOpen, setmodalOpen] = useRecoilState(mypagePwModal);
  const modalClick = () => {
    setmodalOpen(!modalOpen);
  };
  const modalClose = () => {
    setmodalOpen(!modalOpen);
  };
  return (
    <div style={{ width: "100%", marginLeft: "20px" }}>
      <CreateStyledInputButton onClick={modalClick}>
        변경
      </CreateStyledInputButton>
      {modalOpen && <ModalPw modalClose={modalClose} />}
    </div>
  );
}

export default ModalContainerPw;
