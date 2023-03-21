import styled from "styled-components";
import "./styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { useState } from "react";
import { ImageResize } from "quill-image-resize-module-ts";
import { Outlet, useNavigate } from "react-router-dom";
import QuillToolbar from "EditorToolBar";
import { Link } from "react-router-dom";
import TagCreater from "./Components/TagCreater";
import QuillCustom from "Components/ReactQuill";

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
  const [test, Settest] = useState<boolean>(true);
  const [back, setBack] = useState<boolean>(true);
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
  return (
    <div>
      <section>
        <BUTTON submit={true} onClick={onImage} pay="nothing">
          First Button
        </BUTTON>
        <BUTTON submit={false} onClick={onClick} pay="shopping">
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
            <QuillCustom />
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
            <QuillCustom />
          </div>
        )}
      </section>
      {/* 이렇게 한꺼번에 묶으면 되는구나! 이렇게 여러개 하면 되겠네!*/}
      <Outlet />
    </div>
  );
}

export default Home;
