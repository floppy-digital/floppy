import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Record = ({ front, back }) => {
  const frontTexture = useLoader(TextureLoader, front);
  const backTexture = useLoader(TextureLoader, back);

  const recordMesh = useRef();

  useFrame(({ clock }) => {
    recordMesh.current.rotation.y = clock.getElapsedTime() / 4;
  });
  return (
    <group>
      <mesh ref={recordMesh}>
        <boxGeometry args={[4.3, 4.3, 0.06]} />
        <meshStandardMaterial
          attach="material-0"
          transparent={true}
          opacity={0}
          // color={'pink'}
        />
        <meshStandardMaterial
          attach="material-1"
          transparent={true}
          opacity={0}
          // color={'pink'}
        />
        <meshStandardMaterial
          attach="material-2"
          transparent={true}
          opacity={0}
          // color={'pink'}
        />
        <meshStandardMaterial
          attach="material-3"
          transparent={true}
          opacity={0}
          // color={'pink'}
        />
        <meshStandardMaterial
          attach="material-4"
          transparent={true}
          map={frontTexture}
        />
        <meshStandardMaterial
          attach="material-5"
          transparent={true}
          map={backTexture}
        />
      </mesh>
    </group>
  );
};

const MainCanvas = ({ front, back }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight intenstiy={2} position={[0, 5, 0]} />
        <Record front={front} back={back} />
      </Suspense>
    </Canvas>
  );
};

export default MainCanvas;
