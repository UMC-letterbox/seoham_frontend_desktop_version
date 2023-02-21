import styled from "styled-components";
import "./styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import { useState } from "react";
import { ImageResize } from "quill-image-resize-module-ts";
import { Outlet, useNavigate } from "react-router-dom";
import QuillToolbar, { formats, modules } from "EditorToolBar";

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

// const Custom_module = {
//   //백그라운드는 거스를 경우 삭제하면 간단하게 없어진다!
//   toolbar: {
//     container: [
//       [{ font: ["arial", "buri", "gangwon"] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ size: ["small", false, "large", "huge"] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//         { align: [] },
//       ],
//       [{ color: [] }, { background: [] }],
//       ["image", "video"],
//       ["clean"],
//     ],
//   },
//   ImageResize: {
//     parchment: Quill.import("parchment"),
//     modules: ["Resize", "DisplaySize"],
//   },
// };

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
  return (
    <div>
      <section>
        <BUTTON submit={true} onClick={onImage} pay="nothing">
          First Button
        </BUTTON>
        <BUTTON submit={true} onClick={onClick} pay="shopping">
          Second Button
        </BUTTON>
        <h1>한번 테스트로 텍스트 에디터 생성해보기</h1>
        {back === true ? (
          <div>
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
    </div>
  );
}

export default Home;
