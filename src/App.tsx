import CreatePage from "Components/Create";
import FindPage from "Components/Find";
import FindIdPage from "Components/FindId";
import FindPwPage from "Components/FindPw";
import LoginPage from "Components/Login";
import Edit from "Edit";
import Home from "home";
import LetterTest from "Pages/LetterTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Test from "Test";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/find" element={<FindPage />}>
            <Route path="Id" element={<FindIdPage />} />
            <Route path="Pw" element={<FindPwPage />} />
          </Route>
          <Route path="/create" element={<CreatePage />} />
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
