"use client";

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return(
        <motion.div
            initial={{y: 100, opacity: 0, overflowX: 'hidden'}}
            animate={{y: 0, opacity: 1, overflowX: 'hidden'}}
            transition={{type: 'easeIn'  , duration: 0.5, delay: 1}}
            className='overflow-x-hidden'
        >
            {children}
        </motion.div>
    ) 
  }