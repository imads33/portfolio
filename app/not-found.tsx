'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Lightbulb, Zap, Rocket } from 'lucide-react'

export default function NotFound() {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative selection:bg-orange-500/30">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-2xl"
            >
                <div className="relative mb-10 mx-auto w-40 h-40">
                    {/* Animated Rings */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full border-2 border-orange-500/20 dark:border-orange-400/20"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}

                    {/* Main Icon that changes on hover */}
                    <motion.div
                        className="w-full h-full bg-white dark:bg-stone-900 rounded-full flex items-center justify-center shadow-xl border-4 border-stone-100 dark:border-stone-800 relative z-10 cursor-help"
                        onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    >
                        <motion.div
                            key={hovered ? "idea" : "bot"}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            {hovered ? <Lightbulb size={64} className="text-yellow-500" /> : <Bot size={64} className="text-stone-700 dark:text-stone-300" />}
                        </motion.div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-8 text-orange-500"><Zap /></motion.div>
                    <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-4 -left-8 text-blue-500"><Rocket /></motion.div>
                </div>

                <h1 className="text-8xl font-black text-stone-900 dark:text-stone-100 mb-2 tracking-tighter">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-8 uppercase tracking-widest text-sm">
                    Coordinates Not Found
                </h2>

                <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-800 transform rotate-1 transition-transform hover:rotate-0 mb-10">
                    <p className="text-lg text-stone-600 dark:text-stone-300 font-medium italic">
                        "Looking for something that isn't here? Or maybe you're just testing my error handling skills? (They're good, aren't they?)"
                    </p>
                    <p className="mt-4 text-stone-500 dark:text-stone-400">
                        While this page is a void, your project doesn't have to be. <br />
                        Let's redirect this energy into building something real.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg hover:shadow-orange-500/20"
                    >
                        Return to Base
                    </Link>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg hover:shadow-orange-500/20"
                    >
                        Hire the Pilot
                    </Link>
                </div>
            </motion.div>

            {/* Background Noise/Texture */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />
        </div>
    )
}
