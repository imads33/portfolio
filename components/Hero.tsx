'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

export function Hero({ profile }: { profile: any }) {
    // Fallback data if DB is empty
    const name = profile?.full_name || "Imad Sab"
    const title = profile?.title || "Full Stack Developer"
    const bio = profile?.bio || "Full Stack Developer with over two years of experience building healthcare platforms, tracking systems, and mobile apps. Skilled in Java, Spring Boot, React Native, Supabase, and REST API development."
    const avatarUrl = profile?.avatar_url || null

    return (
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-48 h-48 md:w-64 md:h-64 shrink-0"
                >
                    {avatarUrl ? (
                        <div className="rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl w-full h-full relative">
                            <Image
                                src={avatarUrl}
                                alt={name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center border-4 border-white dark:border-stone-800 shadow-2xl">
                            <span className="text-4xl font-serif text-stone-400 dark:text-stone-600 font-bold">IS</span>
                        </div>
                    )}
                    <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg">
                        <Mail size={24} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left"
                >
                    <span className="text-orange-600 dark:text-orange-400 font-medium tracking-wide uppercase text-sm">Hello, I'm</span>
                    <h1 className="text-5xl md:text-7xl font-bold mt-2 mb-4 leading-tight text-stone-900 dark:text-stone-50">
                        {name}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-medium text-stone-700 dark:text-stone-300 mb-6 italic font-serif">
                        {title}
                    </h2>
                    <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mb-8 leading-relaxed">
                        {bio}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            Contact Me <ArrowRight size={18} />
                        </motion.a>
                        <div className="flex gap-4 items-center px-4">
                            <a href="https://github.com" target="_blank" className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 bg-white dark:bg-stone-800 rounded-full shadow-sm hover:shadow border border-stone-200 dark:border-stone-700"><Github size={20} /></a>
                            <a href="https://linkedin.com/in/imad-sab-898102226" target="_blank" className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 bg-white dark:bg-stone-800 rounded-full shadow-sm hover:shadow border border-stone-200 dark:border-stone-700"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
