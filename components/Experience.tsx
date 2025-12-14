'use client'

import { motion } from 'framer-motion'
import { Briefcase, Building2 } from 'lucide-react'

export function Experience({ experience }: { experience: any[] }) {
    // Use DB data or fallback
    const rawItems = experience && experience.length > 0 ? experience : [
        {
            id: 1,
            role: "Software Developer",
            company: "Tekworks Enterprise Solutions Pvt Ltd",
            period: "May 2025 - Present",
            description: "Led the development of a cross-platform mobile app using React Native and Supabase (MVP in 6 months)."
        },
        {
            id: 2,
            role: "Software Engineer",
            company: "Tekworks Enterprise Solutions Pvt Ltd",
            period: "April 2024 - May 2025",
            description: "Contributed on backend services with Java, Groovy, and Spring Boot. Maintained 5+ microservices."
        },
        {
            id: 3,
            role: "Associate Software Engineer",
            company: "Tekworks Enterprise Solutions Pvt Ltd",
            period: "July 2023 - April 2024",
            description: "Developed 20+ RESTful APIs using Groovy & Spring Boot. Fixed 30+ frontend bugs in React/Vite."
        }
    ]

    // Sort by ID desc (assuming higher ID = newer) or existing order
    // Then Group by Company
    const groupedExperience = rawItems.reduce((acc: any[], item) => {
        // Check if the last group is the same company
        const lastGroup = acc[acc.length - 1];
        if (lastGroup && lastGroup.company === item.company) {
            lastGroup.roles.push(item);
        } else {
            // Start a new group
            acc.push({
                company: item.company,
                roles: [item]
            });
        }
        return acc;
    }, []);

    return (
        <section id="experience" className="py-24 px-6 md:px-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                        <Briefcase size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100">Experience</h2>
                </div>

                <div className="space-y-16">
                    {groupedExperience.map((group, groupIndex) => (
                        <motion.div
                            key={groupIndex + group.company}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: groupIndex * 0.1 }}
                            className="relative"
                        >
                            {/* Company Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 shadow-sm">
                                    <Building2 size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{group.company}</h3>
                            </div>

                            {/* Roles List */}
                            <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-6 space-y-10 pl-8 pb-2">
                                {group.roles.map((item: any, roleIndex: number) => (
                                    <div key={item.id} className="relative">
                                        {/* Dot */}
                                        <span
                                            className={`absolute -left-[39px] top-2 w-4 h-4 rounded-full border-2 border-white dark:border-stone-950 ${roleIndex === 0 ? 'bg-orange-500 scale-125' : 'bg-green-500'}`}
                                        />

                                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                            <h4 className="text-xl font-semibold text-stone-800 dark:text-stone-200">{item.role}</h4>
                                            <span className="text-sm font-medium text-stone-500 dark:text-stone-400 font-mono bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
                                                {item.period}
                                            </span>
                                        </div>

                                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base mt-2">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
