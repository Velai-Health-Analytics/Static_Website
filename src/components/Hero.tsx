"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Activity, 
  Dna, 
  Scan, 
  Stethoscope, 
  BrainCircuit, 
  Droplet, 
  FileHeart, 
  User, 
  ZoomIn,
  CheckCircle2,
  AlertCircle,
  Waves,
  UserCog,
  Microscope
} from 'lucide-react';

const Hero: React.FC = () => {
  // Mouse Interaction setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { stiffness: 40, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // 3D rotations based on mouse (inverted Y for natural tilt)
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);

  // Configuration for radii
  const innerRadius = 220; 
  const outerRadius = 340;

  // Animation constants
  const orbitDuration = 40; // Seconds for full rotation

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full flex items-center justify-center relative bg-brand-dark overflow-hidden perspective-container py-20 md:py-0"
      style={{ perspective: '1500px' }}
    >
      {/* Background Gradients & Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }} 
        />
      </div>

      {/* Main 3D Container */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-5/12 z-50 relative pointer-events-auto mt-12 md:mt-0 order-1 md:order-1 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-6 mx-auto md:mx-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Cardiac Intelligence
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-6 text-white shadow-black drop-shadow-2xl">
              Precision Care<br/>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
                At The Speed of AI
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
             Empowering providers with data-driven insights and risk assessment to enhance patient outcomes and streamline decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" />
                Analyze Patient
              </button>
              <button className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                View Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: The Visualization Engine */}
        <div className="w-full md:w-7/12 h-[400px] md:h-[600px] relative flex items-center justify-center perspective-1000 mt-8 md:mt-0 md:translate-x-24 order-2 md:order-2">
           
           {/* Reference Center Point (128x128 box centered in flex container) */}
           <div className="relative w-32 h-32 scale-[0.55] sm:scale-75 md:scale-100 origin-center transform-style-3d">
            
            {/* 1. Orbit Tracks (Static) - SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ overflow: 'visible', transform: 'rotate(-90deg)' }}>
              {/* Inner Track */}
              <circle cx="64" cy="64" r={innerRadius} fill="none" stroke="currentColor" className="text-emerald-500/40" strokeDasharray="4 4" />
              {/* Outer Track */}
              <circle cx="64" cy="64" r={outerRadius} fill="none" stroke="currentColor" className="text-blue-500/30" strokeWidth="1" />
            </svg>

            {/* 2. Central Heart Core - Static in layout, animated internally */}
            <div className="absolute inset-0 z-20 flex items-center justify-center transform-style-3d">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-900 to-black border border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.3)] flex items-center justify-center relative backdrop-blur-xl"
              >
                <FileHeart className="w-12 h-12 text-emerald-400 relative z-10" />
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-20" />
                {/* ID Badge */}
                <div className="absolute top-full mt-6 whitespace-nowrap z-20">
                  <div className="text-xs font-mono text-emerald-500 bg-black/90 px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-2 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                    ID: 8X-92
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 3. Inner Data Ring - Rotating Container */}
            <motion.div 
              className="absolute inset-0 z-30 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
            >
              {[
                { angle: 0, icon: <Activity />, label: "ECG", color: "red", viz: <ECGWave /> },
                { angle: 60, icon: <Scan />, label: "CT Scan", color: "blue", viz: <ScanLines /> },
                { angle: 120, icon: <Dna />, label: "Genomics", color: "purple", viz: <DNAHelix /> },
                { angle: 180, icon: <Droplet />, label: "Blood", color: "rose", viz: <BloodCells /> },
                { angle: 240, icon: <Waves />, label: "Echo", color: "cyan", viz: <EchoWaves /> },
                { angle: 300, icon: <FileHeart />, label: "History", color: "yellow", viz: <HistoryData /> }
              ].map((item, i) => (
                <DataOrb 
                  key={i}
                  {...item}
                  radius={innerRadius}
                  orbitDuration={orbitDuration}
                />
              ))}
            </motion.div>

            {/* 4. Outer Analyst Ring - Rotating Container (Counter-Direction) */}
            <motion.div 
              className="absolute inset-0 z-40 pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: orbitDuration * 1.5, repeat: Infinity, ease: "linear" }}
            >
               {[
                 { angle: 45, name: "Dr. Chen", role: "Cardiology", status: "Reviewing Echo", icon: <Stethoscope /> },
                 { angle: 165, name: "AI Engine", role: "Processing", status: "99.9% Confidence", icon: <BrainCircuit /> },
                 { angle: 285, name: "Dr. Sarah", role: "Radiology", status: "Segmenting CT scan", icon: <UserCog /> }
               ].map((item, i) => (
                 <AnalystAvatar 
                    key={i}
                    {...item}
                    radius={outerRadius}
                    orbitDuration={orbitDuration * 1.5}
                 />
               ))}
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
// --- Sub Components ---

const DataOrb: React.FC<{ 
  angle: number; 
  radius: number;
  icon: React.ReactElement; 
  label: string; 
  viz: React.ReactNode;
  color: string;
  orbitDuration: number;
}> = ({ angle, radius, icon, label, viz, color, orbitDuration }) => {
  
  const colorMap: Record<string, string> = {
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  };
  const theme = colorMap[color] || colorMap.blue;

  return (
    // LAYER 1: The Anchor
    // Located at Parent Center (top-1/2 left-1/2)
    // Rotates to the correct angle and pushes out by radius.
    <div 
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
      style={{ 
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)` 
      }}
    >
      {/* LAYER 2: The Counter-Spinner 
          Spins opposite to the Main Ring to keep the item upright. 
      */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
        className="h-0 flex items-center justify-center"
      >
         {/* LAYER 3: The Centering Wrapper
             We use fixed width (w-40 = 160px) and negative margins to center.
             -ml-20 pulls it left by 80px (half width).
             -mt-12 pulls it up by roughly half height.
         */}
         <div
            className="w-40 pointer-events-auto"
            style={{ transform: "translate(-0%, -0%)" }}
          >
 
            <div className={`relative overflow-hidden bg-black/90 backdrop-blur-xl border rounded-xl p-3 shadow-2xl transition-all hover:scale-110 hover:z-50 ${theme.split(' ').pop()}`}>
                <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
                  <div className={`p-1.5 rounded-md ${theme.split(' ')[1]}`}>
                    {React.cloneElement(icon as React.ReactElement<any>, { className: `w-4 h-4 ${theme.split(' ')[0]}` })}
                  </div>
                  <span className="text-xs font-semibold text-gray-200">{label}</span>
                </div>
                <div className="h-12 w-full bg-black/50 rounded flex items-center justify-center overflow-hidden relative border border-white/5">
                   {viz}
                </div>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
            </div>
         </div>
      </motion.div>
    </div>
  );
};
const AnalystAvatar: React.FC<{
  angle: number;
  radius: number;
  name: string;
  role: string;
  icon: React.ReactElement;
  status: string;
  orbitDuration: number;
}> = ({ angle, radius, name, role, icon, status, orbitDuration }) => {

  return (
    // LAYER 1: The Anchor
    <div 
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
      style={{ 
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)` 
      }}
    >
       {/* LAYER 2: Counter-Spinner (Positive spin for outer ring) */}
       <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
          className="w-0 h-0 flex items-center justify-center"
       >
          {/* LAYER 3: Centering Wrapper
              w-48 = 192px. 
              -ml-24 pulls left by 96px (half width).
              -mt-8 pulls up by 32px (approx half height).
          */}
          <div
            className="w-48 pointer-events-auto"
            style={{transform: "translate(-0%, -0%)" }}
          >
             <div className="w-48 flex items-center gap-3 p-2 rounded-full bg-black/80 border border-blue-500/30 backdrop-blur-md hover:bg-blue-900/20 transition-colors shadow-xl group cursor-pointer hover:scale-105">
               <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center shrink-0">
                 {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 text-blue-400 group-hover:text-white transition-colors" })}
                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
               </div>
               <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-bold text-white truncate">{name}</div>
                  <div className="text-[10px] text-blue-400 flex items-center gap-1 truncate">
                    <ZoomIn className="w-3 h-3" /> {status}
                  </div>
               </div>
             </div>
          </div>
       </motion.div>
    </div>
  );
};
// --- Micro-Visualizations (Hydration Safe) ---

const ECGWave = () => (
  <svg viewBox="0 0 100 20" className="w-full h-full opacity-90">
    <motion.path
      d="M0 10 H10 L15 5 L20 15 L25 10 H35 L40 0 L45 20 L50 10 H60 L65 5 L70 15 L75 10 H100"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
      strokeDasharray="100"
      animate={{ strokeDashoffset: [100, -100] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const ScanLines = () => (
  <div className="w-full h-full relative bg-blue-900/10 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-scan-vertical" />
    <div className="w-full h-full flex flex-col justify-between p-1 opacity-30">
       {[...Array(6)].map((_,i) => <div key={i} className="h-[1px] bg-blue-500 w-full" />)}
    </div>
  </div>
);

const DNAHelix = () => (
  <div className="flex justify-center gap-1.5 h-full items-center">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-purple-500 rounded-full"
        animate={{ height: [4, 16, 4], opacity: [0.3, 1, 0.3], backgroundColor: ["#a855f7", "#d8b4fe", "#a855f7"] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

// Updated to use deterministic values instead of Math.random to avoid Next.js hydration mismatch
const BloodCells = () => (
  <div className="w-full h-full relative overflow-hidden bg-rose-900/10">
     {[...Array(6)].map((_, i) => (
       <motion.div
         key={i}
         className="absolute w-1.5 h-1.5 rounded-full bg-rose-500/80 shadow-sm"
         // Deterministic values based on index 'i'
         initial={{ x: -10, y: (i * 8) % 30 }} 
         animate={{ x: 140 }}
         transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "linear" }}
         style={{ top: `${(i * 16 + 10) % 90}%` }}
       />
     ))}
  </div>
);

const EchoWaves = () => (
   <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
     <div className="absolute w-1 h-1 bg-cyan-400 rounded-full z-10" />
     {[0, 1, 2].map((i) => (
       <motion.div 
         key={i}
         className="absolute border border-cyan-500/60 rounded-full"
         initial={{ width: 0, height: 0, opacity: 1 }}
         animate={{ width: 60, height: 60, opacity: 0 }}
         transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
       />
     ))}
   </div>
);

const HistoryData = () => (
  <div className="w-full h-full p-2 flex flex-col gap-1 justify-center">
    <div className="h-1.5 w-3/4 bg-yellow-500/30 rounded-full animate-pulse" />
    <div className="h-1.5 w-full bg-yellow-500/20 rounded-full" />
    <div className="h-1.5 w-1/2 bg-yellow-500/20 rounded-full" />
  </div>
);

export default Hero;