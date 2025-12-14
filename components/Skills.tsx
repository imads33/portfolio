'use client'

import { motion } from 'framer-motion'

export function Skills({ skills }: { skills?: string[] }) {
    // Use DB data or fallback
    const items = skills && skills.length > 0 ? skills : [
        "React", "Next.js", "TypeScript", "Node.js", "Supabase", "Tailwind CSS",
        "PostgreSQL", "GraphQL", "Framer Motion", "n8n", "Docker", "AWS"
    ]

    return (
        <section id="skills" className="py-24 px-6 md:px-24 bg-stone-50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-stone-900 dark:text-stone-100">Skills & Technologies</h2>

                <div className="flex flex-wrap gap-4">
                    {items.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 px-6 bg-white dark:bg-stone-800 rounded-full shadow-sm border border-stone-100 dark:border-stone-700 flex items-center justify-center font-medium text-stone-700 dark:text-stone-200 hover:border-orange-200 dark:hover:border-orange-900 transition-colors cursor-default"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
