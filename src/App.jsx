import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ApartmentsProvider } from "./context/ApartmentsContext";
import SpinnerPage from "./components/SpinnerPage";

import ApartmentList from "./components/ApartmentList";
import Apartment from "./components/Apartment";
import Form from "./components/Form";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export default function App() {
  return (
    <ApartmentsProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="apartments" />} />
              <Route path="apartments" element={<ApartmentList />} />
              <Route path="apartments/:id" element={<Apartment />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApartmentsProvider>
  );
}
