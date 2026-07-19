import React from 'react';

/**
 * Line-art icon set for Kriya Kayu Nusantara.
 * Every icon is stroke-based and inherits `currentColor`, so it always
 * resolves to the brand palette wherever it is placed (light & dark).
 */

const base = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false
};

const Svg = ({ children, ...rest }) => (
  <svg {...base} {...rest}>{children}</svg>
);

/* ---- Why Partner With Us ---- */

// Teak log cross-section — growth rings + grain
export const IconTeak = (props) => (
  <Svg {...props}>
    <circle cx="16" cy="16" r="12" />
    <circle cx="14.5" cy="15" r="7.5" />
    <circle cx="13.5" cy="14.5" r="3.5" />
    <path d="M13.5 14.5 h.01" />
  </Svg>
);

// Custom flexibility — drafting compass over a measured line
export const IconCustom = (props) => (
  <Svg {...props}>
    <circle cx="16" cy="6" r="2" />
    <path d="M14.8 7.7 L8 26" />
    <path d="M17.2 7.7 L24 26" />
    <path d="M11.6 18.4 a7 7 0 0 0 8.8 0" />
    <path d="M8 26 l1.6-2.6M24 26 l-1.6-2.6" />
  </Svg>
);

// Skilled craftsmen — chisel meeting a worked timber edge
export const IconCraftsmen = (props) => (
  <Svg {...props}>
    <path d="M20 4 l8 8 -3.5 3.5 -8-8z" />
    <path d="M16.5 7.5 L6 18 v8 h8 L24.5 15.5" />
    <path d="M6 26 l6-6" />
    <path d="M3 29 h26" />
  </Svg>
);

// Project support — workshop / production capacity
export const IconSupport = (props) => (
  <Svg {...props}>
    <path d="M3 27 V15 l7 4 V15 l7 4 V9 l12 6 v12z" />
    <path d="M3 27 h26" />
    <path d="M22 20 v3M26 20 v3" />
  </Svg>
);

/* ---- Industries served ---- */

// Hotels & resorts
export const IconHotel = (props) => (
  <Svg {...props}>
    <path d="M4 28 V7 a2 2 0 0 1 2-2 h12 a2 2 0 0 1 2 2 v21" />
    <path d="M20 13 h6 a2 2 0 0 1 2 2 v13" />
    <path d="M2 28 h28" />
    <path d="M8 10 h3M15 10 h3M8 15 h3M15 15 h3M8 20 h3M15 20 h3M24 19 h2" />
    <path d="M11 28 v-4 h4 v4" />
  </Svg>
);

// Villa developments
export const IconVilla = (props) => (
  <Svg {...props}>
    <path d="M2 15 L16 5 l14 10" />
    <path d="M5 13 v14 h22 V13" />
    <path d="M2 27 h28" />
    <path d="M12 27 v-8 h8 v8" />
    <path d="M9 17 h2M21 17 h2" />
  </Svg>
);

// Restaurants & cafes
export const IconRestaurant = (props) => (
  <Svg {...props}>
    <path d="M8 4 v10 a3 3 0 0 0 6 0 V4" />
    <path d="M11 14 v14" />
    <path d="M8 4 v6M14 4 v6" />
    <path d="M23 4 c-3 0-4 4-4 8 0 3 1 4 3 4 h1" />
    <path d="M23 4 v24" />
  </Svg>
);

// Architects & interior designers
export const IconArchitect = (props) => (
  <Svg {...props}>
    <path d="M3 26 L16 4 l13 22z" />
    <path d="M9 26 L16 14 l7 12" />
    <path d="M2 29 h28" />
  </Svg>
);

/* ---- Services ---- */

// Design consultation — dialogue around an idea
export const IconConsult = (props) => (
  <Svg {...props}>
    <path d="M4 7 h16 a2 2 0 0 1 2 2 v8 a2 2 0 0 1-2 2 H11 l-5 4 v-4 H4 a2 2 0 0 1-2-2 V9 a2 2 0 0 1 2-2z" />
    <path d="M25 11 h3 a2 2 0 0 1 2 2 v7 a2 2 0 0 1-2 2 v4 l-4-4 h-3" />
    <path d="M8 13 h9M8 16 h6" />
  </Svg>
);

// Technical drawing & 3D rendering — blueprint with isometric cube
export const IconDrawing = (props) => (
  <Svg {...props}>
    <rect x="3" y="4" width="26" height="24" rx="2" />
    <path d="M3 9 h26" />
    <path d="M16 12 l6 3.5 v7 L16 26 l-6-3.5 v-7z" />
    <path d="M10 15.5 L16 19 l6-3.5M16 19 v7" />
  </Svg>
);

// Material selection — stacked timber & rattan samples
export const IconMaterial = (props) => (
  <Svg {...props}>
    <rect x="3" y="6" width="26" height="6" rx="1.5" />
    <rect x="3" y="14" width="26" height="6" rx="1.5" />
    <rect x="3" y="22" width="26" height="6" rx="1.5" />
    <path d="M8 6 v6M20 14 v6M12 22 v6" />
  </Svg>
);

// Custom manufacturing — hand plane shaping stock
export const IconManufacture = (props) => (
  <Svg {...props}>
    <path d="M4 20 h20 a4 4 0 0 0 4-4 v-2 H8 a4 4 0 0 0-4 4z" />
    <path d="M12 14 V9 a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
    <path d="M4 24 h24" />
    <path d="M7 27 q3-2 6 0t6 0t6 0" />
  </Svg>
);

// Finishing consultation — brush laying a finish coat
export const IconFinishing = (props) => (
  <Svg {...props}>
    <path d="M11 3 h10 v9 a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z" />
    <path d="M11 8 h10" />
    <path d="M16 15 v5" />
    <path d="M13 20 h6 v4 a3 3 0 0 1-6 0z" />
    <path d="M5 29 q4-3 8 0t8 0t6-1" />
  </Svg>
);

// Delivery & installation — freight to site
export const IconDelivery = (props) => (
  <Svg {...props}>
    <path d="M2 8 h16 v13 H2z" />
    <path d="M18 13 h6 l4 4.5 V21 h-10z" />
    <circle cx="9" cy="24" r="2.5" />
    <circle cx="23" cy="24" r="2.5" />
    <path d="M2 21 h4.5M11.5 21 h9" />
  </Svg>
);
