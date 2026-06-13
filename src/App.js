import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AskAI from "./pages/AskAI";
import Blood from "./pages/Blood";
import Thyroid from "./pages/Thyroid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/blood" element={<Blood />} />
         <Route path="/thyroid" element={<Thyroid />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;