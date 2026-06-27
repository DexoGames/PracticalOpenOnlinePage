import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PhotosPage } from "./pages/PhotosPage";
import { Bomb } from "./components/Bomb/Bomb";

export function App() {
  return (
    <>
      {/* Everything except the bomb lives in the wrapper so the bomb can shake
          and explode the page without blowing up itself. */}
      <div id="pageWrapper" className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Bomb />
    </>
  );
}
