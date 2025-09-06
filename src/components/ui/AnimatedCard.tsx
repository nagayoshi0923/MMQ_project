import React from 'react';
import { motion, Variants } from 'framer-motion';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from './Card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'bounce';
  hover?: boolean;
}

const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  }
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  variant = 'fadeIn',
  hover = false
}) => {
  const variants = animationVariants[variant];
  
  // カスタムアニメーション設定
  const customVariants = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        delay,
        duration
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={customVariants}
      whileHover={hover ? { 
        scale: 1.02, 
        transition: { duration: 0.2 } 
      } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// アニメーション付きCardコンポーネント
export const AnimatedCardComponent: React.FC<AnimatedCardProps & {
  title?: string;
  description?: string;
}> = ({
  children,
  title,
  description,
  className = '',
  delay = 0,
  duration = 0.5,
  variant = 'fadeIn',
  hover = false
}) => {
  return (
    <AnimatedCard
      className={className}
      delay={delay}
      duration={duration}
      variant={variant}
      hover={hover}
    >
      <Card>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default AnimatedCard;
