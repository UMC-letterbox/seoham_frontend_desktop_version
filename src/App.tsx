import CreatePage from "Components/Create";
import FindPage from "Components/Find";
import FindIdPage from "Components/FindId";
import FindPwPage from "Components/FindPw";
import LoginPage from "Components/Login";
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
          <Route path="/find" element={<FindPage />}>
            <Route path="Id" element={<FindIdPage />} />
            <Route path="Pw" element={<FindPwPage />} />
          </Route>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/*" element={<Home />} />
          <Route path="/letterTest" element={<LetterTest />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
