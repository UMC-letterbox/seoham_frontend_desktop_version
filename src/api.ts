import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentLettersState, ITag, userInfoState } from "./atom";
import { ILetter } from "./Components/ViewLetterList";
import { ISender } from "./Components/ViewTag";

const BASE_URL = `https://seohamserver.shop`;
export function FetchTagList() {
  const userInfo = useRecoilValue(userInfoState);
  const TAGLIST: ITag[] = [];
  fetch(`${BASE_URL}/posts/tags?userIdx=${userInfo.userIdx}`, {
    method: "GET",
    headers: {
      "X-ACCESS-TOKEN": userInfo.logintoken,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.result.map((item: ITag) => TAGLIST.push(item));
    });
  return [...TAGLIST]; //꼭 스프레드 연산자를 써야하나,,?
}

export function FetchLetterList(tagID: number) {
  const userInfo = useRecoilValue(userInfoState);
  const LETTERLIST: ILetter[] = [];
  const setLetters = useSetRecoilState(currentLettersState);
  //tagID에 해당하는 편지 불러오기
  fetch(`${BASE_URL}/posts/tags/${tagID}`, {
    method: "GET",
    headers: {
      "X-ACCESS-TOKEN": userInfo.logintoken,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.result.map((item: ILetter) => LETTERLIST.push(item));
      setLetters([...LETTERLIST]);
    });
  return [...LETTERLIST];
}

export function FetchSenderList() {
  const userInfo = useRecoilValue(userInfoState);
  const SENDERLIST: ISender[] = [];
  fetch(`${BASE_URL}/post/senders`, {
    method: "GET",
    headers: {
      "X-ACCESS-TOKEN": userInfo.logintoken,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.result.map((item: ISender) => SENDERLIST.push(item));
    });
  return [...SENDERLIST];
}
