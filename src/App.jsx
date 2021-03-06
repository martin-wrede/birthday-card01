import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import React, { Suspense, useRef, useState, useEffect  } from 'react'
import { Canvas, useLoader,useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer , DepthOfField } from '@react-three/postprocessing'
import birthdaySong from "./audio/happy-birthday-music-box.mp3"
import { Archer } from "./Archer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// Orbit-Controls
const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
     () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
     },
     [camera, gl]
  );
  return null;
};

function GltfModel ({ modelPath, scale = 40, position = [0, 0, 0] }) {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
     //   scale={hovered ? scale *  1 : scale}
        
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}

      />
    </>
    );
  };
 

function Sound(){
  
  const ping = new Audio(birthdaySong)

 // const ping = new Audio(pingSound)
ping.load();
ping.muted = true;
document.addEventListener('keyup', () => {
  ping.muted = false;
  ping.play();
});
 
  return(
   console.log(ping) 
  )
}

export default function App({  modelPath, scale = 1, position = [0, 0, 0] , count = 15,  depth=60}) {
  const [action, setAction] = useState("Runforward");
  return (
    <>
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30, position:[0, -3, 2] }}>
    <color  attach="background" args={["#81B1EB"]} />
    <Suspense fallback={null}>
    <ambientLight intensity={0.2} />
    <Archer action={action} />
    <CameraController />
    <spotLight position={[10,10,10]}  intensity={2} />
    
    
    <GltfModel modelPath={"/gltf/zahlen-gold-1-v1.glb"} scale="0.9"  position = {[-0.20, -0.23, 0]}  />
    <GltfModel modelPath={"/gltf/zahlen-gold-0-v1.glb"} scale="1"  position = {[0.20, -0.23, 0]}  />


    <Environment preset="sunset" />
    
    <EffectComposer>
      <DepthOfField // target of focallength camera 60 ,depth = 60 /> h??lfte
      // zwischjen kamera und 0 depth / 2
      //  target={[0,0,0]} focalLength={0.2} bokehScale={10} height={700} />
      
      target={[0,0,0]} focalLength={1.0} bokehScale={20} height={700} />
    </EffectComposer>
    </Suspense>
   
  </Canvas>

 
   </>
    )
}