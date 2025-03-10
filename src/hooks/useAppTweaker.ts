// // useTweakPane.ts
// import { BladeState } from '@tweakpane/core';
// import { useEffect, useRef, useState } from 'react';
// import { Pane } from 'tweakpane';

// import { useKeyPress } from './useKeyPress';



// type UseTweakPaneProps = { onChange?: (params: BladeState) => void };
// type Disposable = { dispose: () => void }



// const useAppTweaker = ({ onChange }: UseTweakPaneProps) => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const paneRef = useRef<Pane | null>(null);
//     const [showTweaker, setShowTweaker] = useState(false);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [params, setParams] = useState<BladeState>({
//         title: 'Theme Settings',
//         background: { r: 0, g: 255, b: 214, a: 0.5 },
//         paper: { r: 255, g: 0, b: 55 },
//         primary: { r: 255, g: 0, b: 55 },
//         secondary: { r: 255, g: 0, b: 55 },
//         text: { r: 255, g: 0, b: 55 },

//     });
//     // Toggle the TweakPane with the key combination
//     useKeyPress(['Control', 'Shift', 'D'], () => {
//         setShowTweaker((prev) => !prev);
//     });

//     useEffect(() => {
//         // any pane or component we attach listeners to should be disposed during cleanup
//         const disposables: Disposable[] = [];
//         if (containerRef.current) {
//             const pane = paneRef.current = new Pane({ container: containerRef.current, title: 'Developer Tools' });
//             pane.addBlade({ view: 'separator', });
//             paneRef.current.hidden = !showTweaker;

//             pane.addBlade({ view: 'text', label: 'Theme Settings', value: '', parse: (v: string) => String(v), disabled: true })
//             pane.addBlade({ view: 'separator', });
//             pane.addBinding(params, 'background');
//             pane.addBinding(params, 'paper');
//             pane.addBinding(params, 'primary');
//             pane.addBinding(params, 'secondary');
//             pane.addBinding(params, 'text');
//             pane.addBlade({ view: 'separator', });
//             pane.addBlade({ view: 'separator', });
//             pane.on('change', (e) => {
//                 onChange && onChange(params);

//             });
//             // Cleanup function to dispose the TweakPane instance
//             return () => {
//                 if (paneRef.current) {
//                     disposables.forEach((d) => d.dispose());
//                     paneRef.current.dispose();
//                     paneRef.current = null;
//                 }
//             };
//         }
//     }, [onChange, showTweaker, params]);
//     return containerRef;
// };

// export default useAppTweaker;
