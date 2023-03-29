import { useRecoilState } from "recoil";
import { mypageModal } from "../atom";
import { CreateStyledInputButton } from "../Components/loginStyled";
import Modalname from "../Components/Modal_name";

function ModalContainername() {
  const [modalOpenName, setmodalOpenName] = useRecoilState(mypageModal);
  const modalNameClick = () => {
    setmodalOpenName(!modalOpenName);
  };
  const modalNameClose = () => {
    setmodalOpenName(!modalOpenName);
  };
  return (
    <div style={{ width: "100%", marginLeft: "20px" }}>
      <CreateStyledInputButton onClick={modalNameClick}>
        변경
      </CreateStyledInputButton>
      {modalOpenName && <Modalname modalClose={modalNameClose} />}
    </div>
  );
}

export default ModalContainername;
