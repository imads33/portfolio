'use client'

import React, { useState } from 'react'
import { Trash2, Pencil, Check, X, Link as LinkIcon, Tag } from 'lucide-react'
import { updateProject, deleteProject } from '@/actions/content'

export function AdminProjectItem({ proj }: { proj: any }) {
    const [isEditing, setIsEditing] = useState(false)

    if (isEditing) {
        return (
            <form action={async (formData) => { await updateProject(formData); setIsEditing(false) }} className="p-4 bg-stone-100 dark:bg-stone-950 rounded-xl border-2 border-orange-500/50 space-y-3">
                <input type="hidden" name="id" value={proj.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input name="title" defaultValue={proj.title} placeholder="Title" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" required />
                    <input name="link" defaultValue={proj.link} placeholder="Link" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" />
                </div>
                <input name="tags" defaultValue={proj.tags?.join(', ')} placeholder="Tags (comma separated)" className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" />
                <textarea name="description" defaultValue={proj.description} placeholder="Description" rows={3} className="p-2 rounded-lg bg-white dark:bg-stone-800 w-full" />

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
                    <p className="font-bold text-lg text-stone-900 dark:text-stone-100">{proj.title}</p>
                    {proj.link && <a href={proj.link} target="_blank" className="text-stone-400 hover:text-blue-500"><LinkIcon size={14} /></a>}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-stone-500 mt-1">
                    {proj.tags?.map((t: string) => <span key={t} className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded flex items-center gap-1"><Tag size={10} className="opacity-50" /> {t}</span>)}
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">{proj.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setIsEditing(true)} className="p-2 text-stone-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Edit">
                    <Pencil size={18} />
                </button>
                <form action={async () => { await deleteProject(proj.id) }}>
                    <button className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} />
                    </button>
                </form>
            </div>
        </li>
    )
}
