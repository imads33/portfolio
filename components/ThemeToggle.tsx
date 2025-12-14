'use client'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    if (!mounted) {
        return <div className="w-11 h-11" />; // Placeholder to prevent layout shift
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-3 rounded-full bg-white/80 dark:bg-stone-800/80 shadow-md border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-stone-700"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
    )
}
