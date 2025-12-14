'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

export function Education({ education }: { education: any[] }) {
    // Use DB data or fallback
    const items = education && education.length > 0 ? education : [
        {
            id: 1,
            degree: "B.E. in Computer Science Engineering",
            institution: "Visvesvaraya Technological University (VTU), Belagavi",
            period: "2023",
            description: "Minor in Programming. CGPA: 7.5"
        },
        {
            id: 2,
            degree: "Diploma in Computer Science Engineering",
            institution: "Govt. Polytechnic College, Karwar",
            period: "2020",
            description: ""
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    }

    return (
        <section id="education" className="py-24 px-6 md:px-24">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                        <GraduationCap size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100">Education</h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8"
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{item.institution}</h3>
                                    {item.university && <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">{item.university}</p>}
                                </div>
                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">{item.period}</span>
                            </div>
                            <p className="text-lg font-medium text-stone-700 dark:text-stone-300 mb-2">{item.degree}</p>
                            {item.description && (
                                <p className="text-stone-600 dark:text-stone-400 text-sm">
                                    {item.description}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
