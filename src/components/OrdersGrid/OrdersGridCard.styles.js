// FILE: src/components/OrdersGrid/OrderGridCard.styles.js

import { COLORS } from '../../constants/colors';

export const ordersGridCardStyles = {
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

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },

  imageContainer: {
    position: 'relative',
    flex: '0 0 35%',
    backgroundColor: COLORS.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },

  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    opacity: 0.3,
  },

  arrowLeft: {
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.7)',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    color: COLORS.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },

  arrowRight: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.7)',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    color: COLORS.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },

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
    padding: '12px 10px',
    borderBottom: `1px solid ${COLORS.border}`,
  },

  statBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },

  statLabel: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },

  details: {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
  },

  productName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  category: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: COLORS.primary,
    marginBottom: '4px',
  },

  meta: {
    fontSize: '0.8rem',
    color: COLORS.textLight,
    fontWeight: 500,
  },

  // --- Responsive ---
  '@media (max-width: 600px)': {
    content: {
      flexDirection: 'column',
    },
    imageContainer: {
      flex: '0 0 auto',
      height: '180px',
    },
    statsRow: {
      flexDirection: 'column',
      gap: '8px',
    },
    statDivider: {
      display: 'none',
    },
  },
};
