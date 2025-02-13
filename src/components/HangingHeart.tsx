import { motion } from 'framer-motion';

interface HangingHeartProps {
  color?: string;
  delay?: number;
  scale?: number;
  className?: string;
}

export function HangingHeart({ 
  color = "#FF4D6D", 
  delay = 0, 
  scale = 1, 
  className = "" 
}: HangingHeartProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`floating-heart ${className}`}
    >
      <div className="relative">
        <motion.div
          style={{ 
            width: `${40 * scale}px`, 
            height: `${40 * scale}px`,
            backgroundColor: color,
            clipPath: "path('M20,10 C20,0 0,0 0,10 C0,20 20,35 20,35 C20,35 40,20 40,10 C40,0 20,0 20,10 Z')",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))"
          }}
        />
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, transparent 50%)`,
            clipPath: "path('M20,10 C20,0 0,0 0,10 C0,20 20,35 20,35 C20,35 40,20 40,10 C40,0 20,0 20,10 Z')"
          }}
        />
      </div>
    </motion.div>
  );
}