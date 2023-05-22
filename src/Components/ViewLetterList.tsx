import {
  ViewLetterListGrid,
  Test,
  TagNameBar,
  NullTagDiv,
} from "../styles/MaintestCss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { currentLettersState, currentTagState, ITag, sortByState, userInfoState, ISender, currentSenderState, isExistedState, fullDataState } from "../atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FetchLetterList } from "../api";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { sortByNew, sortByOld } from "../sort";
import { on } from "events";
import axios from "axios";
import LetterBtn from "./LetterBtn";


//안쓸거임 나중에 삭제하기
interface propsType {
  tagName: string;
  tagId: number;
  tagColor: string;
}

//select로 편지조회시 넘겨받을 편지 데이터
export interface ILetter {
  postIdx: number;
  sender: string;
  date: string;
  letterIdx: number;
  image: string|null;
  content: string;
}
const BASE_URL = `http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080`;
function ViewLetterList() {
  const [sorting, setSorting] = useState("");
  const navigate = useNavigate();
  //로그인한 유저 정보 불러오기 - state가 중복해서 불러오는걸 막아준다고 해서 사용해봤어요
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  //선택된 정렬기준 불러오기(tag 0, sender 1)
  const sortBy = useRecoilValue(sortByState);

  //선택된 태그 불러오기
  const currentTag = useRecoilValue<ITag>(currentTagState);
  const tagID = currentTag.tagIdx;
  
  //선택된 보낸이 불러오기
  const currentSender = useRecoilValue<ISender>(currentSenderState);

  //현재 저장한 편지 리스트가 존재하는지 확인
  const isExisted = useRecoilValue(isExistedState);
  const fullData = useRecoilValue(fullDataState);
  let tagNamelist:string[] = [];
  fullData.tag.map((t) => (
    tagNamelist.push(t.text)
  ));
  console.log(isExisted, fullData, tagNamelist, currentTag, "확인좀요");

  console.log(tagID, currentSender, sortBy, "tag=false, sender=true"); //recoil 정보들 확인
 
  //태그별 편지 조회
  const { isLoading: letterlistLoading, data: letterlistData } = useQuery(
    ["allLetters", tagID], () => FetchLetterList(tagID));
  const [LetterList, setLetterList] = useRecoilState(currentLettersState); //편지 상태

  //보낸이별 편지 조회
  const { isLoading: letterlistLoading_sender, data: letterlistData_sender } = useQuery(
    ["allLetters_sender", currentSender.sender], 
    () => FetchLetterList_sender(currentSender.sender)
  );

  useEffect(() => {
    const LETTERLIST: ILetter[] = [];
    console.log("편지 리스트 출력", letterlistData, letterlistData_sender);
    if (!sortBy){
      letterlistData?.data.result && letterlistData?.data.result.map((item: ILetter) => LETTERLIST.push(item));
    }
    else if(sortBy == true && currentSender.sender != " " ){
      letterlistData_sender?.data.result && letterlistData_sender?.data.result.map((item: ILetter) => LETTERLIST.push(item));
    }
    setLetterList([...LETTERLIST]);
  }, [letterlistData, letterlistData_sender, sortBy]);
  //letterListData에 api 호출 promise가 담김

  console.log(
    "태그이름",
    currentTag.tagName, currentTag.tagColor,
    "해당하는 편지 세트",
    letterlistData
  );
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    let sortedLetterList = [];
    setSorting(e.target.value);
    if (sort === "by_new") {
      sortedLetterList = sortByNew([...LetterList]);
    } else if (sort === "by_old") {
      sortedLetterList = sortByOld([...LetterList]);
    } else if (sort === "by_sender") {
      //보낸이별 -> 어떻게 할지,..?
      //제일 왼쪽으로 보내자
    }
    setLetterList([...sortedLetterList]);
  };

  function FetchLetterList(tagID: number) {
    //tagID에 해당하는 편지 불러오기
    return axios({
      method: 'get',
      url: `${BASE_URL}/posts/tags/${tagID}`,
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    })
  }

  function FetchLetterList_sender(sender: string) {
    //보낸이에 해당하는 편지 불러오기 - 미구현
    return axios({
      method: 'get',
      url: `${BASE_URL}/posts/senders/${sender}`,
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    })
  }

  const handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
    fetch(`${BASE_URL}/posts/tags/delete/${tagID}`, {
      method: "DELETE",
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      },
    })
      .then((res) => res.json());
  }

  return (
    <div style={{ width: "50%" }}>
      {/* 선택된 태그 출력 파트 */}
      <ViewLetterListGrid>
        {/* 태그나 보낸이 선택을 안한 경우 */}
        {(currentTag.tagName === " " && currentSender.sender === " ") ? <NullContent/> : null}
        {/* {(currentTag.tagName != " " && !isExisted && sortBy) ? <NullContent/> : null} */}
        {(currentTag.tagName === " " && currentSender.sender != " " && !sortBy) ? <NullContent/> : null}
        {(currentTag.tagName != " " && currentSender.sender === " " && sortBy) ? <NullContent/> : null}
        {/* {(currentTag.tagName === " " && currentSender.sender != " " && !sortBy) ? <NullContent/> : null} */}
        {!sortBy ? 
          <TagNameBar color={currentTag.tagColor}>
            <p># {currentTag.tagName}</p>
            <DeleteBtn onClick={handleDelete}> 삭제 </DeleteBtn>
          </TagNameBar>
          :
          <p>{currentSender.sender}</p>
        }
  
        <div>
          <img
            style={{
              width: "20px",
              marginBottom: "-5px",
              marginRight: "2px",
            }}
            src="/img/filter.png"
          />
          <Filter onChange={handleSelect} value={sorting}>
            <option value="by_new">최신순</option>
            <option value="by_old">오래된순</option>
          </Filter>
        </div>

        <ListDivScroll>
          {/* 여기다가작성  LetterList로 접근*/}
          {/* 태그별 로컬 데이터 출력 */}
          {
            isExisted && tagNamelist.includes(currentTag.tagName) ? 
            <LetterBtn
              letter={{id:fullData.postIdx, date:fullData.date, sender:fullData.sender, image:fullData.image, content:fullData.content}}                
              key={fullData.postIdx}               
            />
            :
            null
          }
          {/*  서버에서 받는 용
          {LetterList.map((letter, index) => (
            <LetterBtn
              letter={{id:letter.postIdx, date:letter.date, sender:letter.sender, image:letter.image, content:letter.content}}                
              key={letter.postIdx}               
            />
          ))}
           */}
        </ListDivScroll>
      </ViewLetterListGrid>
    </div>
  );
}

export default ViewLetterList;  

const NullContent = () => {
  return (
    <NullTagDiv>
      <span style={{ width: "50%" }}>
        <Logo />
      </span>
      <p>안녕하세요. 추억을 보관하는 서함입니다.</p>
      <p>태그를 선택해주세요.</p>
    </NullTagDiv>
  )
}
const Filter = styled.select`
  margin-top: 10px;
  padding: 5px 30px 5px 10px;
  border-radius: 10px;
  outline: 0 none;
`;

const ListDivScroll = styled.div`
  margin-top: 5px;
  width: 100%;
  max-height: 78vh;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

  // 스크롤바 커스텀
  /* 아래의 모든 코드는 영역::코드로 사용 */
  &::-webkit-scrollbar {
      width: 6px;  /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
      height: 30%; /* 스크롤바의 길이 */
      background: #667182; /* 스크롤바의 색상 */
      border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
      background: #d8d8d8;  /*스크롤바 뒷 배경 색상*/
  }
  //
`;
const DeleteBtn = styled.button`
  height: inherit;
  width : 50px;
  position: absolute;
  top: 0.6em;
  right: 0.5em;
  border: none;
  background-color: transparent;
  font-weight: 600;
  &:hover {
    color: #fd2020;
  }
`
