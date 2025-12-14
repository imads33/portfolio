'use client'

import React, { useState } from 'react'
import { Trash2, Pencil, Check, X, Building2, Calendar, Briefcase } from 'lucide-react'
import { updateExperience, deleteExperience } from '@/actions/content'

export function AdminExperienceItem({ exp }: { exp: any }) {
    const [isEditing, setIsEditing] = useState(false)

    if (isEditing) {
        return (
            <form action={async (formData) => { await updateExperience(formData); setIsEditing(false) }} className="p-4 bg-stone-100 dark:bg-stone-950 rounded-xl border-2 border-orange-500/50 space-y-3">
                <input type="hidden" name="id" value={exp.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input name="role" defaultValue={exp.role} placeholder="Role" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" required />
                    <input name="company" defaultValue={exp.company} placeholder="Company" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-stone-500 ml-1 mb-1">Start Date</label>
                        <input type="date" name="startDate" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-stone-500 ml-1 mb-1">End Date (Leave empty for Present)</label>
                        <input type="date" name="endDate" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" />
                    </div>
                </div>
                <textarea name="description" defaultValue={exp.description} placeholder="Description" rows={3} className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" />

                <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => setIsEditing(false)} className="p-2 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg flex items-center gap-1">
                        <X size={16} /> Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg font-bold flex items-center gap-2">
                        <Check size={16} /> Save
                    </button>
                </div>
            </form>
        )
    }

    return (
        <li className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-stone-50 dark:bg-stone-950 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors group">
            <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-lg text-stone-900 dark:text-stone-100">{exp.role}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1"><Building2 size={12} /> {exp.company}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {exp.period}</span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">{exp.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setIsEditing(true)} className="p-2 text-stone-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
                    <Pencil size={18} />
                </button>
                <form action={async () => { await deleteExperience(exp.id) }}>
                    <button className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} />
                    </button>
                </form>
            </div>
        </li>
    )
}
