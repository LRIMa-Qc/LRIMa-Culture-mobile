// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei/native';
// import { Mesh } from 'three/webgpu';


// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function Capteur(props: any) {
//     const meshRef = useRef<Mesh>(null)

//     useFrame((_, delta) => (meshRef!.current!.rotation!.y += delta))

//     const gltf = useGLTF("./3d/statuette_old_man.gltf")
//     return <primitive {...props} object={gltf.scene} scale={0.18} ref={meshRef} />
// }
