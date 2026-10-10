// Hand-drawn SVG brush paths, ink splatters, comic speed lines, and halftone configurations
// Designed to mimic imperfect real-world physical ink and comic book printing

export const comicBrushPaths = {
  // Rough horizontal ink slash
  horizontalSlash: "M10,25 Q180,12 360,22 Q540,32 720,18 Q900,10 1080,24 Q1000,38 720,32 Q360,38 10,25 Z",
  // Aggressive diagonal red paint slash
  diagonalSlash: "M-50,150 L650,-50 L750,10 L50,210 Z",
  // Organic sweeping ink brush stroke
  organicSweep: "M0,60 C180,10 320,110 500,40 C680,-20 840,90 1000,50 L1000,120 C820,150 680,60 500,110 C320,160 180,80 0,130 Z",
  // Jagged comic impact polygon
  impactBurst: "M100,50 L140,20 L135,60 L180,45 L150,80 L200,90 L160,110 L195,140 L150,140 L170,180 L130,160 L130,200 L100,170 L70,200 L70,160 L30,180 L50,140 L5,140 L40,110 L0,90 L50,80 L20,45 L65,60 L60,20 Z",
  // Rough hand scribble
  scribble: "M10,50 Q40,10 70,60 T130,30 T190,70 T250,20 T310,65 T370,25 T430,70",
  // Hand-drawn comic arrow
  arrow: "M10,30 L90,30 M70,15 L95,30 L70,45",
  // Registration crosshair
  registrationCross: "M25,5 L25,45 M5,25 L45,25",
};

// Radial comic burst rays (8 primary directions + intermediate sparks)
export const comicBurstRays = [
  { angle: 0, length: 320, width: 3, delay: 0 },
  { angle: 25, length: 260, width: 2, delay: 0.05 },
  { angle: 45, length: 340, width: 4, delay: 0.02 },
  { angle: 70, length: 280, width: 2, delay: 0.07 },
  { angle: 90, length: 350, width: 3, delay: 0.01 },
  { angle: 115, length: 290, width: 2, delay: 0.06 },
  { angle: 135, length: 360, width: 4, delay: 0.03 },
  { angle: 160, length: 270, width: 2, delay: 0.08 },
  { angle: 180, length: 340, width: 3, delay: 0 },
  { angle: 205, length: 280, width: 2, delay: 0.04 },
  { angle: 225, length: 370, width: 4, delay: 0.02 },
  { angle: 250, length: 290, width: 2, delay: 0.07 },
  { angle: 270, length: 350, width: 3, delay: 0.01 },
  { angle: 295, length: 280, width: 2, delay: 0.05 },
  { angle: 315, length: 360, width: 4, delay: 0.03 },
  { angle: 340, length: 270, width: 2, delay: 0.06 },
];

// Hand-drawn ink drops and splatters
export const inkSplatters = [
  { cx: -180, cy: -80, r: 8, color: "#FF0022" },
  { cx: -150, cy: -110, r: 4, color: "#FCFAED" },
  { cx: 160, cy: -70, r: 7, color: "#FF0022" },
  { cx: 190, cy: -40, r: 5, color: "#FCFAED" },
  { cx: -140, cy: 90, r: 6, color: "#FF0022" },
  { cx: 150, cy: 100, r: 8, color: "#FF0022" },
  { cx: 210, cy: 80, r: 4, color: "#FCFAED" },
  { cx: -220, cy: 20, r: 5, color: "#FCFAED" },
];
