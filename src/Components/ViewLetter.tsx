import { LetterPaper, LetterContent, PlusBtn, ContentDiv } from '../styles/LetterTestCss';
import { Letters_tag1, Letters_tag2, LetterType } from '../dummydata';
import { useEffect, useState } from 'react';

import { useRecoilState } from "recoil";
import { letterState } from "../atom"; // react-quill에서 넘어오는 버전으로 수정해서 다시 만들기
import { getLetter } from "../api/getData";

import styled from 'styled-components';

interface propsType {
    letterId:number;
    //setTagId:Funtion; 도 추가하기(api 호출에 필요할듯)
}
interface tagStateType {
    tagIdx: number[],
    tagName: string[],
    tagColor: string[]
    
}

const TagBtn = styled.div`
    background: ${(props) => props.color};
    border-radius: 30px;
    padding: 5px;
    margin: 0 5px;
    color: black;
`

function ViewLetter({letterId}:propsType){
    console.log(typeof(letterId), letterId)
    const [plus, setPlus] = useState(false);
    const [Letter, setLetter] = useRecoilState(letterState)
    const [letterTag, setletterTag] = useState<tagStateType>({tagIdx: [-1], tagName: ["-1"], tagColor: ["#C7AC98"]})
    useEffect(() => {
        // 편지 받기 api
        getLetter()
        .then((res) => {
            const data = res.data;
            setletterTag({
                tagIdx: data.result.tagIdx,
                tagName: data.result.tagName,
                tagColor: data.result.tagColor
            })
        })
        .catch((err) => console.log(err))

        // 더미 데이터. api 연결 후 삭제
        setletterTag({
            tagIdx: [1, 2, 3],
            tagName: ["tag1", "tag2", "tag3"],
            tagColor: ["#C7AC98", "#F7DECF", "#FFEDDB"]
        })
    }, [])
    useEffect(()=>{
        setPlus(false)
    }, [letterId])
    const onClickPlus = () => {
        setPlus(true)
        console.log("plus")
    }
    console.log(plus)
    let currentLetter:LetterType = {id:0, sender:"", date:"", content:"", paper:0}
    Letters_tag1.map((letter) => {
        if(letter.id == letterId){
            currentLetter = letter
            console.log("letter 잘 넘기니?", currentLetter)
        }
    })
    Letters_tag2.map((letter) => {
        if(letter.id == letterId){
            currentLetter = letter
            console.log("letter 잘 넘기니?", currentLetter)
        }
    })

    return (
        <div>
            <div style={{position:"relative", width:"100%", height:"86vh"}}>
                {/* <LetterPaper src='/img/autumn.png'/>   */}
                <LetterPaper paper={(currentLetter.paper)}/>
                <LetterContent paper={Number(currentLetter.paper)}>
                    <p className='sender'><span>{currentLetter.sender}</span>님에게서 온 편지</p>
                    {/* <p className='content'>{currentLetter.content}</p> */}

                    {/* content, button 둘 다 styled-component로 수정해서 props 전달받을 수 있게 수정하기 */}
                    {/* <div className='content' dangerouslySetInnerHTML={{__html:Letter}}></div> */}
                    <ContentDiv clickprops={plus} dangerouslySetInnerHTML={{__html:Letter}}></ContentDiv>
                    <PlusBtn clickprops={plus} onClick={onClickPlus}>더보기</PlusBtn> 
                    <p className='date'>{currentLetter.date}</p>
                </LetterContent>
            </div>
            <div style={{display:"flex", justifyContent:"center", paddingBottom:"3px"}}>
                {
                    letterTag.tagIdx.map((id, index) => (
                        <TagBtn color={letterTag.tagColor[index]} key={id}>{letterTag.tagName[index]}</TagBtn>
                    ))
                }                
            </div>
        </div>

    )
}

export default ViewLetter;