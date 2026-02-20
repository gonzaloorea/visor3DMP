import { Suspense, lazy } from "react";
import Header from "./components/Header";
import Side from "./components/Side";

// Lazy load del componente Viewer (más pesado con Three.js)
const Viewer = lazy(() => import("./components/Viewer"));

// Fallback mientras se carga el Viewer
function ViewerLoader() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        fontSize: "16px",
        color: "#666",
        fontFamily: "system-ui",
      }}
    >
      Cargando visor 3D...
    </div>
  );
}

export default function App() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Side />
        <Suspense fallback={<ViewerLoader />}>
          <Viewer />
        </Suspense>
      </main>
    </div>
  );
}
