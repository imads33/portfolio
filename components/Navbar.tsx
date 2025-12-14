'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
// Custom Sarcastic Toast implemented explicitly below
// Actually, let's build a simple custom toast/modal for the "sarcastic" message 
// or just use window.alert for simplicity as requested "message something sarcastic".
// Better: A custom nice looking toast.

const navLinks = [
    { name: 'About', href: '#' }, // Hero top
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills', special: true }, // Mark as special
    { name: 'Education', href: '#education' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showSarcasticToast, setShowSarcasticToast] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
        if (link.special) {
            e.preventDefault()
            setShowSarcasticToast(true)

            // Scroll to section after a delay or immediately? User said: 
            // "why not work together know what i am capable of."
            // "keep the skill section there only i am just trying to make my portfolio interactive"
            // So we show message, THEN scroll? Or just show message?
            // "when we click on it it will go to skills section right instead open page and give a message"
            // Interpreting: Go to section (behavior) + Show message (extras).

            const element = document.querySelector(link.href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }

            // Hide toast automatically after 5 seconds
            setTimeout(() => setShowSarcasticToast(false), 5000)
            setIsMobileMenuOpen(false)
        } else {
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-stone-950/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 font-bold text-xl text-stone-900 dark:text-stone-100">
                        <div className="bg-orange-500 text-white p-1.5 rounded-lg">
                            <Code2 size={20} />
                        </div>
                        <span>Imad.Dev</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link)}
                                className={`text-sm font-medium transition-colors ${link.special
                                    ? 'text-orange-600 dark:text-orange-400 font-bold hover:text-orange-700 dark:hover:text-orange-300'
                                    : 'text-stone-600 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-400'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pl-4 border-l border-stone-200 dark:border-stone-800">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Nav Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-stone-600 dark:text-stone-400"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-[70px] left-0 right-0 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 z-40 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link)}
                                    className="text-lg font-medium text-stone-700 dark:text-stone-300 py-2 border-b border-stone-100 dark:border-stone-800 last:border-0"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sarcastic Toast/Popup */}
            <AnimatePresence>
                {showSarcasticToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className="fixed bottom-8 left-1/2 z-[60] w-[90%] max-w-md"
                    >
                        <div className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 p-6 rounded-2xl shadow-2xl flex items-start gap-4 border-2 border-orange-500">
                            <div className="text-3xl">😏</div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Looking for skills?</h4>
                                <p className="text-sm font-medium leading-relaxed opacity-90">
                                    "Checking if I'm qualified? <br />
                                    Why not just <b>hire me</b> and see what I'm truly capable of? Let's build something epic together."
                                </p>
                            </div>
                            <button onClick={() => setShowSarcasticToast(false)} className="text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black">
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
