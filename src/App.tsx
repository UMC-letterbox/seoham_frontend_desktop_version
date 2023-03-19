import CreatePage from "Components/Create";
import LoginPage from "Components/Login";
import Edit from "Edit";
import Home from "home";
import LetterTest from "Pages/LetterPractice";
import MainTest from "Pages/mainTest";
import MenuTest from "Pages/LetterTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
          {/* <Route path="/create" element={<CreatePage />} /> */}
          <Route path="/" element={<Home/>} />
            <Route path="/edit/*" element={<Home />}>
              <Route path="Edit" element={<Edit />} />
            </Route>
          <Route path="/letterTest" element={<LetterTest />} />
          <Route path="/home" element={<MainTest/>}/>
          <Route path="/letter" element={<MenuTest/>}/>
        </Routes>
        </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
