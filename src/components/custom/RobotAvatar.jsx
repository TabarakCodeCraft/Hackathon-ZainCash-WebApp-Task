import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

const RobotScene = ({ speaking, mouseActiveRef }) => {
  const cubeMeshRef = useRef();
  const eyeGroupRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();

  const lightTealRef = useRef();
  const lightGreenRef = useRef();
  const lightPurpleRef = useRef();
  const lightBlueRef = useRef();
  const lightDeepRef = useRef();
  const speechLightRef = useRef();

  const { mouse, scene } = useThree();

  useEffect(() => {
    scene.background = null;
  }, [scene]);

  const state = useRef({
    nextBlink: 2 + Math.random() * 2,
    blinkT: 0,
    t: 0,
    isBlinking: false,
  });

  useFrame((_, delta) => {
    const s = state.current;
    s.t += delta;
    const t = s.t;
    if (!cubeMeshRef.current || !eyeGroupRef.current) return;

    const active = mouseActiveRef.current;
    cubeMeshRef.current.position.y = Math.sin(t * 1.5) * 0.05;

    const mesh = cubeMeshRef.current;
    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      active ? mouse.y * -0.28 : 0,
      0.06,
    );
    mesh.rotation.y = THREE.MathUtils.lerp(
      mesh.rotation.y,
      active ? mouse.x * 0.38 : 0,
      0.06,
    );
    mesh.rotation.z = THREE.MathUtils.lerp(
      mesh.rotation.z,
      active ? mouse.x * -0.05 : 0,
      0.06,
    );
    mesh.position.x = THREE.MathUtils.lerp(
      mesh.position.x,
      active ? mouse.x * 0.18 : 0,
      0.06,
    );

    eyeGroupRef.current.position.copy(mesh.position);
    eyeGroupRef.current.rotation.copy(mesh.rotation);

    if (lightTealRef.current) {
      lightTealRef.current.intensity = 22 + Math.sin(t * 1.2) * 4;
    }
    if (lightGreenRef.current) {
      lightGreenRef.current.intensity = 10 + Math.cos(t * 1.5) * 2.5;
    }
    if (lightPurpleRef.current) {
      lightPurpleRef.current.intensity = 30 + Math.sin(t * 1.8) * 6;
    }
    if (lightBlueRef.current) {
      lightBlueRef.current.intensity = 26 + Math.cos(t * 2.0) * 5;
    }
    if (lightDeepRef.current) {
      lightDeepRef.current.intensity = 18 + Math.sin(t * 1.3) * 3;
    }
    if (speechLightRef.current) {
      speechLightRef.current.intensity = speaking
        ? 8 + Math.sin(t * 25) * 3
        : THREE.MathUtils.lerp(speechLightRef.current.intensity, 0, 0.1);
    }

    if (t > s.nextBlink && !s.isBlinking) {
      s.isBlinking = true;
      s.blinkT = 0;
    }
    if (s.isBlinking) {
      s.blinkT += delta;
      const bT = s.blinkT;
      let sy = 1;
      if (bT < 0.08) sy = THREE.MathUtils.lerp(1, 0.01, bT / 0.08);
      else if (bT < 0.12) sy = 0.01;
      else if (bT < 0.22) sy = THREE.MathUtils.lerp(0.01, 1, (bT - 0.12) / 0.1);
      else {
        sy = 1;
        s.isBlinking = false;
        s.nextBlink = t + 2.5 + Math.random() * 3;
      }
      if (eyeLeftRef.current) eyeLeftRef.current.scale.y = sy;
      if (eyeRightRef.current) eyeRightRef.current.scale.y = sy;
    }

    const ei = speaking ? 5 + Math.sin(t * 20) * 2 : 3.8;
    if (eyeLeftRef.current) eyeLeftRef.current.material.emissiveIntensity = ei;
    if (eyeRightRef.current)
      eyeRightRef.current.material.emissiveIntensity = ei;
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <hemisphereLight color="#3fd8b0" groundColor="#1a0a3d" intensity={0.35} />
      <directionalLight position={[0, 0, 8]} intensity={0.08} />

      <pointLight
        position={[0, -0.4, 3.4]}
        color="#5a3fe0"
        intensity={9}
        distance={9}
        decay={1.3}
      />

      <pointLight
        ref={speechLightRef}
        position={[0, 0, 3]}
        color="#a0c8ff"
        distance={8}
        intensity={0}
      />

      <pointLight
        ref={lightTealRef}
        position={[-2.2, 2.6, 2.0]}
        color="#00e8b0"
        intensity={22}
        distance={28}
        decay={1.0}
      />

      <pointLight
        ref={lightGreenRef}
        position={[2.0, 2.4, 2.0]}
        color="#00cc88"
        intensity={10}
        distance={20}
        decay={1.1}
      />

      <pointLight
        ref={lightPurpleRef}
        position={[2.8, -2.2, 1.6]}
        color="#9900ff"
        intensity={30}
        distance={30}
        decay={0.9}
      />

      <pointLight
        ref={lightBlueRef}
        position={[0.0, -2.8, 1.6]}
        color="#1144ff"
        intensity={26}
        distance={28}
        decay={0.9}
      />

      <pointLight
        ref={lightDeepRef}
        position={[-2.8, -2.4, 1.6]}
        color="#3300bb"
        intensity={18}
        distance={24}
        decay={1.0}
      />

      <RoundedBox
        ref={cubeMeshRef}
        args={[3.2, 3.2, 1.85]}
        radius={0.82}
        smoothness={14}
      >
        <meshStandardMaterial
          color="#0c1018"
          roughness={0.5}
          metalness={0.18}
        />
      </RoundedBox>

      <group ref={eyeGroupRef}>
        <mesh ref={eyeLeftRef} position={[-0.62, 0.18, 0.94]}>
          <capsuleGeometry args={[0.21, 0.2, 20, 36]} />
          <meshStandardMaterial
            color="#fff"
            emissive="#fff"
            emissiveIntensity={3.8}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.62, 0.18, 0.94]}>
          <capsuleGeometry args={[0.21, 0.2, 20, 36]} />
          <meshStandardMaterial
            color="#fff"
            emissive="#fff"
            emissiveIntensity={3.8}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
};

export default function RobotAvatar({
  speaking = false,
  size = 400,
  showMicButton = false,
  onToggleSpeaking,
  isMuted = false,
}) {
  const mouseActiveRef = useRef(true);
  const glowRef = useRef(null);
  const frameRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    let running = true;
    const animate = (ts) => {
      if (!running) return;
      tRef.current = ts / 1000;
      const t = tRef.current;

      if (glowRef.current) {
        if (speaking) {
          const pulse = 0.7 + Math.sin(t * 12) * 0.3;
          const tealAlpha = (0.55 + Math.sin(t * 7) * 0.15) * pulse;
          const purpleAlpha = (0.4 + Math.cos(t * 5) * 0.1) * pulse;
          const blueAlpha = (0.45 + Math.sin(t * 9) * 0.12) * pulse;
          const spread1 = Math.round(
            size * 0.38 + Math.sin(t * 8) * size * 0.05,
          );
          const spread2 = Math.round(
            size * 0.55 + Math.cos(t * 6) * size * 0.06,
          );
          glowRef.current.style.boxShadow = [
            `0 0 ${spread1}px ${Math.round(size * 0.08)}px rgba(0, 220, 160, ${tealAlpha})`,
            `0 0 ${spread2}px ${Math.round(size * 0.14)}px rgba(80, 40, 255, ${purpleAlpha})`,
            `0 0 ${Math.round(size * 0.22)}px ${Math.round(size * 0.04)}px rgba(0, 100, 255, ${blueAlpha})`,
          ].join(", ");
        } else {
          const breathe = 0.5 + Math.sin(t * 1.4) * 0.18;
          const tealA = 0.28 + Math.sin(t * 1.1) * 0.08;
          const purpleA = 0.32 + Math.cos(t * 1.6) * 0.09;
          const blueA = 0.22 + Math.sin(t * 1.9) * 0.07;
          const spread = Math.round(size * (0.28 + breathe * 0.08));
          glowRef.current.style.boxShadow = [
            `0 0 ${spread}px ${Math.round(size * 0.06)}px rgba(0, 210, 150, ${tealA})`,
            `0 0 ${Math.round(size * 0.38)}px ${Math.round(size * 0.1)}px rgba(120, 0, 255, ${purpleA})`,
            `0 0 ${Math.round(size * 0.3)}px ${Math.round(size * 0.04)}px rgba(20, 80, 255, ${blueA})`,
          ].join(", ");
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [speaking, size]);

  useEffect(() => {
    const onLeave = () => {
      mouseActiveRef.current = false;
    };
    const onEnter = () => {
      mouseActiveRef.current = true;
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "26%",
          pointerEvents: "none",
          transition: "box-shadow 0.08s ease-out",
          boxShadow: [
            `0 0 ${Math.round(size * 0.4)}px ${Math.round(size * 0.1)}px rgba(0, 210, 150, 0.35)`,
            `0 0 ${Math.round(size * 0.5)}px ${Math.round(size * 0.15)}px rgba(120, 0, 255, 0.4)`,
            `0 0 ${Math.round(size * 0.4)}px ${Math.round(size * 0.08)}px rgba(20, 80, 255, 0.3)`,
          ].join(", "),
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "6%",
          borderRadius: "22%",
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(0,180,120,0.18) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 70% 80%, rgba(100,0,220,0.22) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 20% 80%, rgba(20,60,220,0.16) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: size,
          height: size,
          background: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.0], fov: 38 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            premultipliedAlpha: false,
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
          }}
        >
          <RobotScene speaking={speaking} mouseActiveRef={mouseActiveRef} />
        </Canvas>
      </div>
    </div>
  );
}
