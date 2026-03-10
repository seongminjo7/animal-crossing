import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import Intro from "./components/Intro";
import VillagerRandom from "./components/VillagerRandom";
import VillagersList from "./components/VillagersList";
import Header from "./components/Header";
import Season from "./components/Season";
import { season } from "./data/season";
import Tools from "./components/Tools";
import ToolList from "./components/ToolList";
import { useState } from "react";
import Life from "./components/Life";
import MaterialsList from "./components/MaterialsList";
import Material from "./components/Material";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); // ⭐ 현재 경로
  const isHome = location.pathname === "/";

  const [phase, setPhase] = useState("idle");
  const [introFinished, setIntroFinished] = useState(false);

  const changePage = (path) => {
    if (phase !== "idle") return;

    setPhase("closing");

    setTimeout(() => {
      navigate(path);
      setPhase("opening");
    }, 450);

    setTimeout(() => {
      setPhase("idle");
    }, 900);
  };

  return (
    <>
      <GlobalStyle />
      <ScrollTop />


      {/* ⭐ home(/)에서만 인트로 */}
      {isHome && !introFinished && (
        <Intro onAnimationComplete={() => setIntroFinished(true)} />
      )}

      {/* ⭐ 인트로가 끝났거나, home이 아니면 Header 표시 */}
      {(introFinished || !isHome) && (
        <Header
          onGoHome={() => changePage("/")}
          onGoVillagers={() => changePage("/villagers")}
          onGoTools={() => changePage("/tools")}
          onGoLife={() => changePage("/life")}
          onGoMaterials={() => changePage("/materials")}
        />
      )}

      {/* ⭐ 인트로 중에는 home 콘텐츠 숨김 */}
      <Routes>
        <Route
          path="/"
          element={
            introFinished ? (
              <>
                <VillagerRandom onGoList={() => changePage("/villagers")} />
                <div
                  style={{
                    height: `${season.length * 50}vh`,
                    position: "relative",
                  }}
                >
                  <Season onGoLife={() => changePage("/life")} />
                </div>
                <Tools />
                <Material />
              </>
            ) : null
          }
        />
        <Route path="/villagers" element={<VillagersList />} />
        <Route path="/tools" element={<ToolList />} />
        <Route path="/life" element={<Life />} />
        <Route path="/materials" element={<MaterialsList />} />
      </Routes>
      <Footer />
    </>
  );
}
