import { atom } from "recoil";

//테마
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isLogAtom = atom({
  key: "isLog",
  default: false,
});

//tagMaker
export interface ITag {
  text: string;
  id: number;
}
export const tagState = atom<ITag[]>({
  key: "tag",
  default: [],
});

//편지 내용 임시 저장(실제로는 안쓸거임!!)
export const letterState = atom({
  key: "letter",
  default: "",
});

//pickedDate
export const pickedDate = atom<Date>({
  key: "mydate",
  default: new Date(),
});

//마이페이지 관련(닉네임과 비밀번호 변경 모달버튼)
export const mypageModal = atom({
  key: "mypageModal",
  default: false,
});

export const mypagePwModal = atom({
  key: "mypagePwModal",
  default: false,
});

//alert대신 custom modal창 관련 state
export const popUpModal = atom({
  key: "popUpModal",
  default: false,
});

export const popUpMessage = atom({
  key: "popUpModal",
  default: "",
});
