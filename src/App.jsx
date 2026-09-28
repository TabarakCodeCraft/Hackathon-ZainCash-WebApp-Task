import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ComplainesList from "./pages/ComplainesList";
import CreateComplaine from "./pages/CreateComplaine";
import StartPage from "./pages/StartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/complaines" element={<ComplainesList />} />
        <Route path="/create_complaine" element={<CreateComplaine />} />
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
