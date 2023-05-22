import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { imgSrcState, letterState } from "../atom";

interface propsType {
    letter: {
        id: number;
        date: string;
        sender: string;
        image: string|null;
        content: string|null;
    };
}

function LetterBtn({letter}:propsType){
    console.log("letterbtn", letter, (letter.id).toString(), letter.image)
    const [imgSrc, setImgSrc] = useRecoilState(imgSrcState);
    const [lettercontent, setLetter] = useRecoilState(letterState);
    const navigate = useNavigate()
    const onClickLetter = (e:any) => {
        const letterId = e.target.id;
        console.log(e.target);
        console.log("id::::::", letterId)
        navigate("/letter", {state: {letterId}})
    }
    return (
        <LetterBtnCss id={(letter.id).toString()} onClick={onClickLetter}>
            <p className="sender" id={(letter.id).toString()}>{letter.sender}</p>
            {
                imgSrc ?
                <img src={imgSrc} id={(letter.id).toString()}/> :
                null
            }
            <div className="content" dangerouslySetInnerHTML={{__html:lettercontent}}></div>
            <p className="date" id={(letter.id).toString()}>{letter.date}</p>
        </LetterBtnCss>
    )
}

export default LetterBtn;


const LetterBtnCss = styled.button`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    padding: 10px 30px;
    width: 90%;
    max-width: 400px; //한줄에 2개 넣을거면 주석 풀기 + ViewLetterList.tsx에서 86번째 div 풀고 아래 div 지우기
    max-height: 350px;
    margin: 5px;
    border-radius: 10px;
    border: 0;
    &:hover,
    &:active{
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    }
    // background랑 color는 다크모드에서의 css 무시용
    .sender{
        align-self: flex-start;
        font-weight: bold;
        background: transparent;
        color: black;
    }
    .date{
        align-self: flex-end; 
        background: transparent;
        color: black;
        padding-top: 5px;
    }
    .content{
        padding-top: 15px;
        background: transparent;
        color: black;
        pointer-events: none;
        max-height: 47px;
        overflow: hidden;
        p,h1,h2,h3,h4,h5,h6{
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            background: transparent;
            color: black;
            pointer-events: none;
            text-align: start;
        }
    }
    img{
        width: 100%;
        height: 200px;
        object-fit: contain;
    }
`

