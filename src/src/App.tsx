import Edit from "Edit";
import Home from "home";
import LetterTest from "Pages/LetterTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/*" element={<Home />}>
            <Route path="Edit" element={<Edit />} />
          </Route>
          <Route path="/letterTest" element={<LetterTest />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
