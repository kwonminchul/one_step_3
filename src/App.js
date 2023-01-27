import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import List from "./routes/List";
import Navi from "./components/Navi";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navi />
        <Routes>
          <Route path="/page/:detail/:num" element={<List />} />
          <Route path="/movie/:id" element={<Detail />} />
          <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
