import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function GenerationEnvelope() {
  return (
    <motion.div
      key="envelope"
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <motion.div
          className="w-96 h-72 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-2xl relative overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: [0, -20, 0] }}
          transition={{ duration: 1.5, times: [0, 0.5, 1], delay: 0.3 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-r from-red-300 to-red-500 origin-top"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 180 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          
          <motion.div
            className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[90%] h-64 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center"
            initial={{ y: 0 }}
            animate={{ y: -80 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          >
            <div className="text-center">
              <Mail className="w-16 h-16 text-red-400 mb-4" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-red-500 font-medium"
              >
                Creating your special message...
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}