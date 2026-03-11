import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import {
  OrbitControls,
  Environment,
  Center,
  Bounds,
  Html,
  useGLTF,
  useBounds,
  useProgress,
} from "@react-three/drei";
import modelUrl from "../assets/model.glb?url";
import BG from "/BG_VIEWER.jpg";

function Loader() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <Html center>
      <div style={{ fontFamily: "system-ui", fontSize: 14, textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>Cargando modelo…</div>
        <div
          style={{
            width: 200,
            height: 8,
            backgroundColor: "#e0e0e0",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#BA0C2F",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

function Scene({ modelUrl }) {
  const bounds = useBounds();

  return (
    <>
      {/* Luces base */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -2]} intensity={0.6} />

      {/* Fondo/iluminación "pro" */}
      <Environment preset="studio" />

      {/* Bounds: encuadra el modelo automáticamente (fit + clip) */}
      <Bounds fit clip observe margin={0.8} ref={bounds}>
        <Center>
          <Model url={modelUrl} bounds={bounds} />
        </Center>
      </Bounds>

      {/* Controles */}
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
    </>
  );
}

function Model({ url, bounds }) {
  const gltf = useGLTF(url);
  
  const modelRef = useRef();

  useEffect(() => {
    if (bounds && modelRef.current) {
      bounds.fit();
    }
  }, [gltf, bounds]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001; // Rotación lenta alrededor del eje Y
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      dispose={null}
      scale={1}
    />
  );
}

export default function Viewer({ modelUrlProp = null }) {
  const finalModelUrl = modelUrlProp || modelUrl;

  return (
    <div style={{ width: "100%", height: "100%", flex: 1 }}>
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50, near: 0.01, far: 2000 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)} // limitar DPR en móvil
        gl={{
          preserveDrawingBuffer: false, // solo true si necesitas capturas de pantalla
          powerPreference: "default",   // más estable en iOS
          alpha: true,
          antialias: false              // desactivar en móvil mejora rendimiento
        }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ background: `url(${BG}) no-repeat center center / cover` }}
      >
        <Suspense fallback={null}>
          <Scene modelUrl={finalModelUrl} />
        </Suspense>
        <Loader />
      </Canvas>
    </div>
  );
}
