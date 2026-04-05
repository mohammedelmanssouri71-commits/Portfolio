export const pageStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const timelineItem = {
  hidden: { opacity: 0, x: -30 },
  show: (index = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const hoverLiftCard = {
  rest: { scale: 1, y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { scale: 1.02, y: -2, boxShadow: '0 20px 45px rgba(0,0,0,.3)', transition: { duration: 0.22 } },
};

export const badgeBounce = {
  rest: { y: 0 },
  hover: { y: -4, transition: { type: 'spring', stiffness: 320, damping: 16 } },
};
