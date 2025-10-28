// FILE: src/components/OrdersGrid/OrderGridCard.styles.js

import { COLORS } from '../../constants/colors';

export const orderGridCardStyles = {
  card: {
    width: '100%',
    maxWidth: '100%',
    border: `2px solid ${COLORS.border}`,
    borderRadius: '10px',
    backgroundColor: COLORS.white,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  cardPaddingRight: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    flex: '0 0 36%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    padding: '6px',
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '150px',
    backgroundColor: COLORS.white,
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.2rem',
    color: '#9aa0a6',
    opacity: 0.5,
  },
  // --- Buttons ---
  carouselPrevBtn: {
    width: '34px',
    height: '28px',
    backgroundColor: 'rgba(127,140,141,0.7)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    border: 'none',
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    cursor: 'pointer',
    transition: 'background-color 0.12s ease',
    outline: 'none',
    padding: 0,
  },
  carouselPrevBtnHover: {
    backgroundColor: 'rgba(127,140,141,0.9)',
  },
  carouselNextBtn: {
    width: '34px',
    height: '28px',
    backgroundColor: 'rgba(127,140,141,0.7)',
    position: 'absolute',
    right: 0,
    bottom: 0,
    border: 'none',
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    cursor: 'pointer',
    transition: 'background-color 0.12s ease',
    outline: 'none',
    padding: 0,
  },
  carouselNextBtnHover: {
    backgroundColor: 'rgba(127,140,141,0.9)',
  },
  // --- Arrow icons (CSS only, like Bootstrap's) ---
  carouselArrowLeft: {
    width: '8px',
    height: '8px',
    borderTop: '2px solid rgba(80,80,80,0.8)',
    borderLeft: '2px solid rgba(80,80,80,0.8)',
    transform: 'rotate(-45deg)',
    marginLeft: '3px',
  },
  carouselArrowRight: {
    width: '8px',
    height: '8px',
    borderTop: '2px solid rgba(80,80,80,0.8)',
    borderRight: '2px solid rgba(80,80,80,0.8)',
    transform: 'rotate(45deg)',
    marginRight: '3px',
  },
  // --- Dots ---
  dotsWrap: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '8px',
    display: 'flex',
    gap: '6px',
    zIndex: 25,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '80%',
    backgroundColor: 'rgba(127,140,141,0.7)',
    border: '1px solid rgba(80,80,80,0.3)',
    cursor: 'pointer',
    pointerEvents: 'auto',
    transition: 'transform 0.12s ease, background-color 0.12s ease',
  },

  dotActive: {
    backgroundColor: 'rgba(127,140,141,0.9)',
    border: '1px solid rgba(80,80,80,0.5)',
    transform: 'scale(1.3)',
  },

  // --- Right side ---
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    borderBottom: `1px solid ${COLORS.border}`,
  },

  statBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  statDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: COLORS.border,
  },

  statNumber: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: '4px',
  },

  statLabel: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },

  details: {
    padding: '10px 14px 14px',
    display: 'flex',
    flexDirection: 'column',
  },

  productName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  category: {
    fontSize: '0.86rem',
    fontWeight: 600,
    color: COLORS.primary,
    marginBottom: '6px',
  },

  meta: {
    fontSize: '0.82rem',
    color: COLORS.textLight,
    fontWeight: 500,
  },

  '@media (max-width: 600px)': {
    content: { flexDirection: 'column' },
    imageWrapper: { minHeight: '180px' },
    statsRow: { flexDirection: 'column', gap: '8px' },
    statDivider: { display: 'none' },
  },
};

// import { COLORS } from '../../constants/colors';

// /**
//  * Helper: convert hex color to rgba with alpha.
//  * Accepts #RRGGBB or #RGB.
//  */
// const hexToRgba = (hex, alpha = 1) => {
//   if (!hex) return `rgba(0,0,0,${alpha})`;
//   let h = hex.replace('#', '');
//   if (h.length === 3) {
//     h = h.split('').map((c) => c + c).join('');
//   }
//   const bigint = parseInt(h, 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// export const orderGridCardStyles = {
//   // Core card
//   card: {
//     width: '100%',
//     maxWidth: '100%',
//     border: `2px solid ${COLORS.border}`,
//     borderRadius: '10px',
//     backgroundColor: COLORS.white,
//     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//     overflow: 'hidden',
//     transition: 'all 0.25s ease',
//     cursor: 'pointer',
//     display: 'flex',
//     flexDirection: 'column',
//   },

//   // Exposed right padding (user requested right side padding)
//   cardPaddingRight: '10px',

//   boxShadow: '0 2px 8px rgba(0,0,0,0.06)',

//   // Layout
//   content: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     width: '100%',
//   },

//   // Image side: reduced padding so carousel is slightly larger
//   imageContainer: {
//     position: 'relative',
//     flex: '0 0 36%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'visible',
//     padding: '6px', // small padding to keep slight gap from card edge
//     backgroundColor: 'transparent',
//   },

//   // inner wrapper that visually matches the card and holds image, shadow, radius
//   imageWrapper: {
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     minHeight: '150px',
//     backgroundColor: COLORS.white, // match card
//     borderRadius: '8px',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     boxShadow: '0 12px 30px rgba(0,0,0,0.08)', // visible shadow
//   },

//   image: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     display: 'block',
//   },

//   placeholder: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '2.2rem',
//     color: '#9aa0a6',
//     opacity: 0.5,
//     padding: '10px',
//   },

//   // Carousel buttons (smaller, anchored to extreme bottom corners inside imageWrapper)
//   carouselPrevBtn: {
//     width: '36px',
//     height: '28px',
//     backgroundColor: hexToRgba(COLORS.textLight, 0.12), // light shade from textLight
//     position: 'absolute',
//     left: 0, // extreme corner: flush with image border
//     bottom: 0, // extreme corner: flush with image border
//     border: 'none',
//     borderTopRightRadius: 6,
//     borderBottomLeftRadius: 8, // match imageWrapper corner
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 30,
//     cursor: 'pointer',
//     transition: 'background-color 0.12s ease, transform 0.06s ease',
//     outline: 'none',
//     padding: 0,
//     boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
//   },

//   carouselPrevBtnHover: {
//     backgroundColor: hexToRgba(COLORS.textLight, 0.20),
//     transform: 'translateY(-1px)',
//   },

//   carouselNextBtn: {
//     width: '36px',
//     height: '28px',
//     backgroundColor: hexToRgba(COLORS.textLight, 0.12),
//     position: 'absolute',
//     right: 0, // extreme corner
//     bottom: 0, // extreme corner
//     border: 'none',
//     borderTopLeftRadius: 6,
//     borderBottomRightRadius: 8, // match imageWrapper corner
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 30,
//     cursor: 'pointer',
//     transition: 'background-color 0.12s ease, transform 0.06s ease',
//     outline: 'none',
//     padding: 0,
//     boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
//   },

//   carouselNextBtnHover: {
//     backgroundColor: hexToRgba(COLORS.textLight, 0.20),
//     transform: 'translateY(-1px)',
//   },

//   // Dots - smaller and using lighter textLight shade
//   dotsWrap: {
//     position: 'absolute',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     bottom: '8px', // slightly above bottom corner buttons
//     display: 'flex',
//     gap: '6px',
//     zIndex: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     pointerEvents: 'none',
//   },

//   dot: {
//     width: '6px',
//     height: '6px',
//     borderRadius: '50%',
//     backgroundColor: hexToRgba(COLORS.textLight, 0.22),
//     border: `1px solid ${hexToRgba(COLORS.textLight, 0.28)}`,
//     padding: 0,
//     cursor: 'pointer',
//     pointerEvents: 'auto',
//     transition: 'transform 0.12s ease, background-color 0.12s ease',
//   },

//   dotActive: {
//     backgroundColor: hexToRgba(COLORS.textLight, 0.95), // active uses stronger textLight
//     transform: 'scale(1.2)',
//     border: `1px solid ${hexToRgba(COLORS.textLight, 0.95)}`,
//   },

//   // Right column
//   rightColumn: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },

//   statsRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '12px 14px',
//     borderBottom: `1px solid ${COLORS.border}`,
//   },

//   statBlock: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   statDivider: {
//     width: '1px',
//     height: '40px',
//     backgroundColor: COLORS.border,
//   },

//   statNumber: {
//     fontSize: '1.1rem',
//     fontWeight: 700,
//     color: COLORS.text,
//     marginBottom: '4px',
//     textAlign: 'center',
//   },

//   statLabel: {
//     fontSize: '0.72rem',
//     fontWeight: 500,
//     color: COLORS.textLight,
//     textTransform: 'uppercase',
//     letterSpacing: '0.6px',
//   },

//   details: {
//     padding: '10px 14px 14px',
//     display: 'flex',
//     flexDirection: 'column',
//   },

//   productName: {
//     fontSize: '1rem',
//     fontWeight: 700,
//     color: COLORS.text,
//     marginBottom: '6px',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//   },

//   category: {
//     fontSize: '0.86rem',
//     fontWeight: 600,
//     color: COLORS.primary,
//     marginBottom: '6px',
//   },

//   meta: {
//     fontSize: '0.82rem',
//     color: COLORS.textLight,
//     fontWeight: 500,
//   },

//   // Responsive tweaks
//   '@media (max-width: 600px)': {
//     content: {
//       flexDirection: 'column',
//     },
//     imageContainer: {
//       padding: '6px',
//     },
//     imageWrapper: {
//       minHeight: '180px',
//     },
//     statsRow: {
//       flexDirection: 'column',
//       gap: '8px',
//     },
//     statDivider: {
//       display: 'none',
//     },
//     dotsWrap: {
//       bottom: '10px',
//     },
//   },
// };
