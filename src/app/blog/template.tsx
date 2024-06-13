"use client";

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return(
        <motion.div
            initial={{y: 100 ,  opacity: 0 }}
            animate={{y: 0, opacity: 1}}
            transition={{type: 'easeIn'  , duration: 1, delay: 0.5}}
        >
            {children}
        </motion.div>
    ) 
  }