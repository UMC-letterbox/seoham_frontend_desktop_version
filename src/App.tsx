import Edit from "Edit";
import Home from "home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/*" element={<Home />}>
          <Route path="Edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
