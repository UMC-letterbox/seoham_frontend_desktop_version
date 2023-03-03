import styled from "styled-components";
import "./styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import { useState } from "react";
import { ImageResize } from "quill-image-resize-module-ts";
import { Outlet, useNavigate } from "react-router-dom";
import QuillToolbar, { formats, modules } from "EditorToolBar";
import { useRecoilState } from "recoil";
import { letterState } from "atom";
import { Link } from "react-router-dom";
import TagCreater from "TagCreater";
import CreateTag from "TagMaker";

Quill.register("modules/ImageResize", ImageResize);

interface IBtn {
  submit: boolean;
  pay: string;
}

const BUTTON = styled.button<IBtn>`
  border: 1px ${(props) => (props.submit ? "solid" : "dotted")} yellow;
  background: blue;
  color: white;
  font-weight: ${(props) => (props.pay === "shopping" ? "bold" : 500)};
`;

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

function Home() {
  const [value, setValue] = useState("");
  const [test, Settest] = useState(true);
  const [back, setBack] = useState(true);
  const navigate = useNavigate();
  const onImage = () => {
    if (back === true) {
      setBack(false);
    } else {
      setBack(true);
    }
  };
  const onClick = () => {
    if (test === true) {
      navigate("/edit/Edit");
      Settest(false);
    } else {
      navigate("/edit");
      Settest(true);
    }
  };
  // 저장 버튼 -> recoil 임시 사용
  const [letter, setLetter] = useRecoilState(letterState);
  const onClickSave = () => {
    setLetter(value);
    console.log(value);
  };
  return (
    <div>
      <section>
        <BUTTON submit={true} onClick={onImage} pay="nothing">
          First Button
        </BUTTON>
        <BUTTON submit={true} onClick={onClick} pay="shopping">
          Second Button
        </BUTTON>
        <Link to={"/letterTest"}>
          <button>letterTest</button>
        </Link>
        <h1>한번 테스트로 텍스트 에디터 생성해보기</h1>
        {back === true ? (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TagCreater />
            </div>
            <QuillToolbar />
            <ReactQuill
              style={{ height: "400px", margin: "4px" }}
              // modules={Custom_module}
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="내용을 입력하세요."
            />
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "4px",
              }}
            >
              <TagCreater />
            </div>
            <QuillToolbar />
            <ReactQuill
              style={{
                height: "400px",
                margin: "4px",
                backgroundImage: `url('/img/paper3.jpg')`,
              }}
              // modules={Custom_module}
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="내용을 입력하세요."
            />
          </div>
        )}
      </section>
      {/* 이렇게 한꺼번에 묶으면 되는구나! 이렇게 여러개 하면 되겠네!*/}
      <Outlet />
      <button onClick={onClickSave}>저장</button>
    </div>
  );
}

export default Home;
