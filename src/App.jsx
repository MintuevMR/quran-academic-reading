import { Route, Routes } from "react-router-dom";
import "./App.css";
import Quran from "./Quran";
import Sura from "./Sura/Sura";
  
function App() {
  return (
    <>
      <Routes>
        <Route path="/quran" element={<Quran />} />
        <Route path="/quran/:number" element={<Sura />} />
      </Routes>
    </>
  );
}

export default App;
