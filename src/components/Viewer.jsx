import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  OrbitControls,
  Environment,
  Center,
  Bounds,
  useGLTF,
  useProgress,
} from "@react-three/drei";
const modelUrl = "https://s3.dualstack.eu-west-3.amazonaws.com/portal2-public.mpascensores.com/PROYECTOS/3DMPVIEWER/model_izq_opt.glb";
const hdriUrl = "https://s3.dualstack.eu-west-3.amazonaws.com/portal2-public.mpascensores.com/PROYECTOS/3DMPVIEWER/hdri/photo_studio_01_1k.hdr";
import BG from "/BG_VIEWER.jpg";
import * as THREE from "three";

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function Loader() {
  const { progress, active } = useProgress();
  const { t } = useTranslation();
  if (!active) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex",
      alignItems: "center", justifyContent: "center",
      pointerEvents: "none", zIndex: 10,
    }}>
      <div style={{ fontFamily: "system-ui", fontSize: 14, textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>{t("loadingModel")}</div>
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

      {/* ✅ NUEVA LUZ HEMISFÉRICA */}
      <hemisphereLight
        skyColor={"#ffffff"}
        groundColor={"#444444"}
        intensity={isIOS ? 1 : 0.6}
      />
      <directionalLight position={[5, 5, 5]} intensity={isIOS ? 2 : 1.2} />
      <directionalLight position={[-5, 3, -2]} intensity={isIOS ? 1.2 : 0.6} />

      {/* ✅ En iOS usar environmentIntensity bajo o directamente omitir */}
      {isIOS
        ? <ambientLight intensity={0.8} /> // ← reemplaza Environment en iOS
        : <Environment
            files={hdriUrl}
            background={false}
            blur={0.5}
            intensity={isIOS ? 0.5 : 1}
          />  // ← solo en desktop/Android
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
            node.material.envMapIntensity = isIOS ? 1.5 : 1
            node.material.needsUpdate = true
          }
          // 🔹 Ajuste de materiales para evitar oscuridad
          if (node.material.roughness !== undefined) {
            node.material.roughness = Math.min(node.material.roughness, 0.8)
          }

          if (node.material.metalness !== undefined) {
            node.material.metalness = Math.min(node.material.metalness, 0.6)
          }

          node.material.needsUpdate = true
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
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isIOS ? 1.8 : 1.2,
          outputColorSpace: THREE.SRGBColorSpace
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