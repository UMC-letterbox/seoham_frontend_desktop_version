import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LetterWrap = styled.div<{letterName:string}>`
    height: 90vh;
    position: relative;
    img {
        height: 100%;
        vertical-align: middle;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    div {
        background-color: yellow;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        ${ props => {
            const letter = props.letterName;
            if (letter == "spring" || letter == "autumn" || letter == "winter"){
                return (
                    `
                    padding: 20px 10px;
                    height: 60%
                    `
                )
            }
            else if (letter == "christmas"){
                return (
                    `
                    padding: 20px 10px;
                    height: 50%;
                    position: absolute;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -60%);
                    `
                )
            }
            else if (letter == "birthday" || letter == "love"){
                return (
                    `
                    padding: 20px 10px;
                    height: 60%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -30%);
                    `
                )
            }
            else if (letter == "congratulation"){
                return (
                    `
                    padding: 20px 10px;
                    height: 50%;
                    transform: translate(-50%, -50%);
                    `
                )
            }
            else if (letter == "tradition" || letter == "letter1"){
                return (
                    `
                    padding: 20px 10px;
                    height: 70%;
                    `
                )
            }
        }}

    }
`;

        // ${ props => {
        //     const letter = props.letterName;
        //     if (letter == "spring"){
        //         return (
        //             `
        //             padding: 20px 10px;
        //             height: 60%
        //             `
        //         )
        //     }
        // }}

// 편지지 선택 후 편지지 내부에 div 가운데 정렬 시키기까지 완료
// 이젠 선택한 선택지 별로 마진이나 div 위치, 크기를 설정하는 작업 필요!!

const LetterCss = styled.div<{imgSrc:string}>`
width: 80%;
height: auto;
// background-color: #000;
background-image: url('${(props) => props.imgSrc}');
background-repeat: no-repeat;
background-position: center;
background-size: 100% auto;
`;

function LetterTest(){
    const [Selected, setSelected] = useState("");
    const handleSelect = (e:any) => {
        setSelected(e.target.value);
        console.log(typeof(Selected))
    };
    const navigate = useNavigate();
    const onClickBack = () => {
        navigate("/")
    }
    return(
        <div>
            <button onClick={onClickBack}>back</button>
            <select onChange={handleSelect} value={Selected}>
                <option value={0}>--</option>
                <option value={"spring"}>봄</option>
                <option value={"autumn"}>가을</option>
                <option value={"winter"}>겨울</option>
                <option value={"christmas"}>크리스마스</option>
                <option value={"birthday"}>생일</option>
                <option value={"congratulation"}>축하</option>
                <option value={"love"}>사랑</option>
                <option value={"tradition"}>전통</option>
                <option value={"letter1"}>일반</option>
            </select>
            
            {/* <LetterCss imgSrc={`letter/${Selected}.png`} className={`${Selected}`}>
                test
            </LetterCss> */}
            <LetterWrap letterName={`${Selected}`}>
                <img src={`img/${Selected}.png`} alt={`${Selected}`}/>
                <div>
                    <p>test</p>
                    <p>test test</p>
                    <p>와 편지! 이건 편지입니다! 테스트 중이에요! 길게길게 써도 잘 넘어가는지 테스트 하려고 아무말이나 쓰고 있답니다! 언제까지 써야지 적절할까요? 지금일까요? 아마도 지금?</p>
                </div>
            </LetterWrap>
        </div>
    )
}
export default LetterTest