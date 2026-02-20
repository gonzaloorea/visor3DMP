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
import BG from "/public/BG_VIEWER.jpg";

function Loader() {
  const { progress } = useProgress();

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
  const gltf = useGLTF(url, undefined, (progress) => {
    console.log(`Cargando: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
  });
  
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
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance", alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ background: `url(${BG}) no-repeat center center / cover` }}
      >
        <Suspense fallback={<Loader />}>
          <Scene modelUrl={finalModelUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
