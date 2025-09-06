import React from 'react';
import { motion, Variants } from 'framer-motion';
import Button, { ButtonProps } from './Button';

interface AnimatedButtonProps extends ButtonProps {
  animation?: 'pulse' | 'bounce' | 'shake' | 'glow' | 'none';
  delay?: number;
  duration?: number;
  disabled?: boolean;
}

const animationVariants: Record<string, Variants> = {
  pulse: {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  bounce: {
    initial: { y: 0 },
    animate: { 
      y: [0, -5, 0],
      transition: { 
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  shake: {
    initial: { x: 0 },
    animate: { 
      x: [0, -5, 5, -5, 5, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  },
  glow: {
    initial: { 
      boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.7)",
      scale: 1
    },
    animate: { 
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0.7)",
        "0 0 0 10px rgba(59, 130, 246, 0)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ],
      scale: [1, 1.02, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  none: {
    initial: {},
    animate: {}
  }
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  animation = 'none',
  delay = 0,
  duration = 0.3,
  disabled = false,
  onClick,
  ...props
}) => {
  const variants = animationVariants[animation];
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // クリック時のアニメーション
    if (animation === 'shake') {
      // シェイクアニメーションを実行
      const element = e.currentTarget;
      element.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 500);
    }
    
    onClick?.(e);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        delay,
        duration
      }}
    >
      <Button
        {...props}
        onClick={handleClick}
        disabled={disabled}
        className={`${props.className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
