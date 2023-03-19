import { LetterType } from '../dummydata';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface propsType{
    letter: LetterType
    children: React.ReactNode;
}

function LetterBtn(props:propsType){
    const navigate = useNavigate();
    const onClickLetter = (e:any) => {
        const lettername = e.target.name;
        console.log(lettername)
        // navigate("/letter", {state: {lettername, tagName, tagId, tagColor}})
    }

    return(
        <LetterBtnCss>
            <p style={{alignSelf:"flex-start", fontWeight:"bold"}}>{props.letter.sender}</p>
            <p style={{alignSelf:"flex-end"}}>{props.letter.date}</p>
        </LetterBtnCss>
    )
}
const LetterBtnCss = styled.button`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    padding: 10px 30px;
    width: 90%;
    height: 150px;
    margin: 2%;
    border-radius: 10px;
    border: 0;
    &:hover,
    &:active{
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    }
`
export default LetterBtn;