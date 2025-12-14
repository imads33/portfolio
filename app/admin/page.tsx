import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { uploadResume, signOut } from '@/actions/auth'
import { updateProfile, addExperience, addProject, addSkill, removeSkill, addEducation, removeEducation } from '@/actions/content'
import { getProfile, getExperience, getProjects } from '@/lib/data'
import { AdminExperienceItem } from '@/components/admin/AdminExperienceItem'
import { AdminProjectItem } from '@/components/admin/AdminProjectItem'
import Link from 'next/link'
import { ArrowLeft, UploadCloud, Trash2, Plus, X } from 'lucide-react'

export default async function Admin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const profile = await getProfile()
    const experience = await getExperience()
    const projects = await getProjects()

    // Safe Accessors
    const skills = profile?.skills || []
    const education = profile?.education || []

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                        <ArrowLeft size={20} /> Back to Portfolio
                    </Link>
                    <form action={signOut}>
                        <button className="text-sm text-red-500 hover:underline">Sign Out</button>
                    </form>
                </div>

                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Admin Dashboard</h1>

                {/* Profile Section */}
                <section className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                    <form action={updateProfile} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="fullName" defaultValue={profile?.full_name} placeholder="Full Name" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                            <input name="title" defaultValue={profile?.title} placeholder="Job Title" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                        </div>
                        <textarea name="bio" defaultValue={profile?.bio} placeholder="Bio" rows={4} className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Profile Picture</label>
                            <input type="file" name="avatar" accept="image/*" className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                        </div>
                        <button type="submit" className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium">Save Profile</button>
                    </form>
                </section>

                {/* Skills Section (Now in Profile) */}
                <section className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h2 className="text-xl font-bold mb-6">Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {skills.map((skill: string) => (
                            <div key={skill} className="flex items-center gap-2 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700">
                                <span className="text-sm">{skill}</span>
                                <form action={async () => { 'use server'; await removeSkill(skill) }}>
                                    <button className="text-stone-400 hover:text-red-500"><X size={14} /></button>
                                </form>
                            </div>
                        ))}
                    </div>
                    <form action={addSkill} className="flex gap-4">
                        <input name="skill" placeholder="Add Skill (e.g. React)" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 flex-1" />
                        <button type="submit" className="px-6 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium">Add</button>
                    </form>
                </section>

                {/* Experience Section */}
                <section className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h2 className="text-xl font-bold mb-6">Experience</h2>
                    <ul className="space-y-4 mb-6">
                        {experience && experience.map((exp: any) => (
                            <AdminExperienceItem key={exp.id} exp={exp} />
                        ))}
                    </ul>
                    <form action={addExperience} className="space-y-4 border-t pt-6 border-stone-200">
                        <p className="font-medium text-sm text-stone-500">Add New</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="role" placeholder="Role (e.g. Software Engineer)" required className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <input name="company" placeholder="Company" required className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-stone-500 ml-1 mb-1">Start Date</label>
                                <input type="date" name="startDate" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-stone-500 ml-1 mb-1">End Date (Leave empty for Present)</label>
                                <input type="date" name="endDate" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                            </div>
                        </div>
                        <textarea name="description" placeholder="Description" rows={3} className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium"><Plus size={18} /> Add Experience</button>
                    </form>
                </section>

                {/* Projects Section */}
                <section className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h2 className="text-xl font-bold mb-6">Projects</h2>
                    <ul className="space-y-4 mb-6">
                        {projects && projects.map((proj: any) => (
                            <AdminProjectItem key={proj.id} proj={proj} />
                        ))}
                    </ul>
                    <form action={addProject} className="space-y-4 border-t pt-6 border-stone-200">
                        <p className="font-medium text-sm text-stone-500">Add New</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="title" placeholder="Project Title" required className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <input name="link" placeholder="Link (Optional)" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <div className="col-span-2">
                                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 block">Tech Stack / Tags</label>
                                <input name="tags" placeholder="e.g. React, Supabase, Java (comma separated)" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                            </div>
                        </div>
                        <textarea name="description" placeholder="Description" rows={3} className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium"><Plus size={18} /> Add Project</button>
                    </form>
                </section>

                {/* Education Section (Now in Profile) */}
                <section className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h2 className="text-xl font-bold mb-6">Education</h2>
                    <ul className="space-y-4 mb-6">
                        {education && education.map((edu: any) => (
                            <li key={edu.id} className="flex justify-between items-start p-4 bg-stone-50 dark:bg-stone-950 rounded-xl">
                                <div>
                                    <p className="font-bold">{edu.institution}</p>
                                    <p className="text-sm text-stone-500">{edu.degree} | {edu.period}</p>
                                </div>
                                <form action={async () => { 'use server'; await removeEducation(edu.id) }}>
                                    <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                </form>
                            </li>
                        ))}
                    </ul>
                    <form action={addEducation} className="space-y-4 border-t pt-6 border-stone-200">
                        <p className="font-medium text-sm text-stone-500">Add New</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="institution" placeholder="College/Institution" required className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <input name="university" placeholder="University (e.g. Affiliated To)" className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <input name="degree" placeholder="Degree" required className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                            <input name="period" placeholder="Year/Period" required className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800" />
                        </div>
                        <textarea name="description" placeholder="Description (Optional)" rows={2} className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 w-full" />
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium"><Plus size={18} /> Add Education</button>
                    </form>
                </section>

                {/* Resume Upload */}
                <section className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h2 className="text-xl font-bold mb-6">Resume</h2>
                    <form action={uploadResume} className="flex flex-col gap-4">
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            required
                            className="block w-full text-sm text-stone-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-orange-50 file:text-orange-700
                    hover:file:bg-orange-100"
                        />
                        <button type="submit" className="w-fit px-6 py-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2">
                            <UploadCloud size={18} /> Upload New Resume
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}
