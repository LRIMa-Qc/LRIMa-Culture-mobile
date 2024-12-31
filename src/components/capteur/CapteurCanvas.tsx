// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { WebGPURenderer } from 'three/webgpu';
// import { Capteur } from './Capteur';

// export function CapteurCanvas() {
//     return (
//         <Canvas
//             className='w-full'
//             style={{ height: '20rem' }}
//             gl={(canvas) => {
//                 const renderer = new WebGPURenderer({
//                     canvas: canvas as HTMLCanvasElement,
//                     powerPreference: 'low-power',
//                     antialias: true,
//                     alpha: true,
//                 })
//                 renderer.init();
//                 //@ts-expect-error IDK y...
//                 renderer.xr = { addEventListener: () => { } }
//                 return renderer
//             }}
//         >
//             <OrbitControls />
//             <ambientLight intensity={Math.PI / 2} />
//             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//             <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//             <Capteur position={[0, -2.5, 0]} />
//         </Canvas>
//     )
// }