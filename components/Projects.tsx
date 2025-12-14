'use client'

import { motion } from 'framer-motion'
import { FolderGit2, ExternalLink, Smartphone } from 'lucide-react'

export function Projects({ projects }: { projects: any[] }) {
    // Use DB data or fallback
    const items = projects && projects.length > 0 ? projects : [
        {
            id: 1,
            title: "LitzChill",
            description: "A cross-platform social media mobile app built with React Native and Supabase. Features heavy authentication flows, secure API communication with Hono & Edge Functions, and real-time user interaction.",
            tags: ["React Native", "Supabase", "TypeScript", "Hono"],
            link: "https://litzchill.com"
        },
        {
            id: 2,
            title: "Eldermark",
            description: "Senior housing management platform backend. Designed microservices with Groovy and Spring Boot to manage room allocations, care schedules, and billing integrations.",
            tags: ["Java", "Spring Boot", "Microservices", "Groovy"],
            link: "https://www.eldermark.com"
        },
    ]

    return (
        <section id="projects" className="py-24 px-6 md:px-24 bg-stone-50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12 justify-center md:justify-start"
                >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <FolderGit2 size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100">Featured Projects</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-700 hover:border-orange-200 dark:hover:border-orange-900 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                    {item.link && (
                                        <a href={item.link} target="_blank" className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>

                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6 flex-grow">
                                    {item.description}
                                </p>

                                <div className="mt-auto">
                                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Tech Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags?.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 text-xs font-semibold rounded-full uppercase tracking-wider border border-transparent hover:border-stone-200 dark:hover:border-stone-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
