import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./widgets/footer";
import { Nav } from "./widgets/nav";

import EditRunPage from "./pages/edit-run-page";
import RppPage from "./pages/rpp-page";
import RunPage from "./pages/run-page";
import RunsMapPage from "./pages/runs-map-page";
import RunsPage from "./pages/runs-page";
import SplashPage from "./pages/splash-page";
import SubmitRunPage from "./pages/submit-run-page";
import TownLinesPage from "./pages/town-lines-page";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col font-manrope text-ink/80">
        <Nav />

        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/runs" element={<RunsPage />} />
            <Route path="/runs/map" element={<RunsMapPage />} />
            <Route path="/runs/:slug" element={<RunPage />} />
            <Route path="/edit" element={<SubmitRunPage />} />
            <Route path="/edit/:slug" element={<EditRunPage />} />
            <Route path="/rpp" element={<RppPage />} />
            <Route path="/town-lines" element={<TownLinesPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
