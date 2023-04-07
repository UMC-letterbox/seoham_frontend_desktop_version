import styled from "styled-components";
import { deleteLetter } from '../api/getData';
import { useRecoilState } from "recoil";
// 민규 오빠 코드랑 합치고 주석 해제 - 메시지창 팝업
// import { popUpMessage, popUpModal } from "../atom";
// import PopupMessage from "../Components/PopupMessage";

const Layer = styled.div`
    z-index: 1500;
    display: block;
    background: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const ModalLayer = styled.div`
    z-index: 2000;
    width: 70px;
    height: 50px;
    position: absolute;
    top: 5%;
    left: 90%;
    transform: translate(-90%, -5%);
    padding: 2px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MyBtn = styled.button`
    background: transparent;
    border: 0;
    &: hover{
        font-weight: 600;
        font-size: 1rem;
    }
`

type Props = {
    modalRef: React.ForwardedRef<HTMLDivElement>;
    modalClose: Function;
    modalOutSideClick: (e:any) => void;
}

function Modal_setting({modalRef, modalClose, modalOutSideClick}:Props){
    // const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
    // const [message, setMessage] = useRecoilState(popUpMessage);

    // const handlePopupMessage = ({m}:any) => {
    //     setModalOpen(!modalOpen);
    //     setMessage(m);
    // };
    const onClickModify = () => {
        console.log("수정버튼")
        modalClose()
        // 수정 페이지로 이동
    }
    const onClickDelete = () => {
        console.log("삭제버튼")
        let isSuccess = false
        deleteLetter()
        .then((res) => {
            const data = res.data
            isSuccess = data.isSuccess
            console.log(data)
            // handlePopupMessage(data.message)
        }).catch((err) => {
            isSuccess = false
            console.log(err)
            // handlePopupMessage("오류가 발생하였습니다")
        })
        modalClose()
    }
    return(
        <Layer ref={modalRef} onClick={(e) => modalOutSideClick(e)}>
            <ModalLayer>
                <MyBtn onClick={onClickModify}>수정</MyBtn>
                <MyBtn onClick={onClickDelete}>삭제</MyBtn>
                {/* <PopupMessage message={message} /> */}
            </ModalLayer>
        </Layer>
    )
}

export default Modal_setting;