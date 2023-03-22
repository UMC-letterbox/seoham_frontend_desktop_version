import "./styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { useState } from "react";
import { ImageResize } from "quill-image-resize-module-ts";
import QuillToolbar from "EditorToolBar";
import { Link } from "react-router-dom";
import TagCreater from "./Components/TagCreater";
import QuillCustom from "Components/ReactQuill";

Quill.register("modules/ImageResize", ImageResize);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

function Home() {
  const [back, setBack] = useState<boolean>(true);
  return (
    <div>
      <section>
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
    </div>
  );
}

export default Home;
