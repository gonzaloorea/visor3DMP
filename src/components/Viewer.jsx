import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import {
  OrbitControls,
  Environment,
  Center,
  Bounds,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import modelUrl from "../assets/model_opt.glb?url";
import BG from "/BG_VIEWER.jpg";

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function Loader() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex",
      alignItems: "center", justifyContent: "center",
      pointerEvents: "none", zIndex: 10,
    }}>
      <div style={{ fontFamily: "system-ui", fontSize: 14, textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>Cargando modelo…</div>
        <div style={{
          width: 200, height: 8, backgroundColor: "#e0e0e0",
          borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}>
          <div style={{
            width: `${progress}%`, height: "100%",
            backgroundColor: "#BA0C2F", transition: "width 0.3s ease",
          }} />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

function Scene({ modelUrl }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -2]} intensity={0.6} />

      {/* ✅ En iOS usar environmentIntensity bajo o directamente omitir */}
      {isIOS
        ? <ambientLight intensity={0.8} /> // ← reemplaza Environment en iOS
        : <Environment preset="studio" />  // ← solo en desktop/Android
      }

      <Bounds fit clip observe margin={0.8}>
        <Center>
          <Model url={modelUrl} />
        </Center>
      </Bounds>

      <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
    </>
  );
}

function Model({ url }) {
  const gltf = useGLTF(url);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });

  // ✅ En iOS: desactivar texturas pesadas si las hay
  useEffect(() => {
    if (isIOS && gltf.scene) {
      gltf.scene.traverse((node) => {
        if (node.isMesh && node.material) {
          // Reducir calidad de texturas en iOS
          if (node.material.envMapIntensity !== undefined) {
            node.material.envMapIntensity = 0.3
          }
        }
      })
    }
  }, [gltf])

  return <primitive ref={modelRef} object={gltf.scene} dispose={null} />;
}

export default function Viewer({ modelUrlProp = null }) {
  const finalModelUrl = modelUrlProp || modelUrl;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", flex: 1 }}>
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50, near: 0.01, far: 2000 }}
        dpr={isIOS ? [1, 1] : [1, 1.5]}
        gl={{
          preserveDrawingBuffer: false,
          powerPreference: isIOS ? "default" : "high-performance",
          alpha: true,
          antialias: !isIOS,
          failIfMajorPerformanceCaveat: false,
          precision: isIOS ? "mediump" : "highp",
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.autoUpdate = false;
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
          }, false);
        }}
        style={{ background: `url(${BG}) no-repeat center center / cover` }}
      >
        <Suspense fallback={null}>
          <Scene modelUrl={finalModelUrl} />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}