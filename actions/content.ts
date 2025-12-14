'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- Profile (Includes Skills, Education, Resume) ---


export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const fullName = formData.get('fullName') as string
    const title = formData.get('title') as string
    const bio = formData.get('bio') as string

    const updates: any = {
        id: user.id,
        full_name: fullName,
        title,
        bio,
        updated_at: new Date().toISOString()
    }

    // Handle Avatar Upload
    const file = formData.get('avatar') as File
    if (file && file.size > 0 && file.name !== 'undefined') {
        const fileName = `pictures/avatar-${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(fileName, file)
        if (uploadError) {
            console.error('Avatar Upload Error:', uploadError)
        } else {
            const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(fileName)
            updates.avatar_url = publicUrlData.publicUrl
        }
    }

    const { error } = await supabase.from('profiles').upsert(updates)
    if (error) console.error(error)

    revalidatePath('/')
}

// --- Skills (Stored in Profile) ---
export async function addSkill(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const newSkill = formData.get('skill') as string
    if (!newSkill) return

    // Fetch current skills
    const { data } = await supabase.from('profiles').select('skills').eq('id', user.id).single()
    const currentSkills = data?.skills || []

    if (!currentSkills.includes(newSkill)) {
        await supabase.from('profiles').update({
            skills: [...currentSkills, newSkill]
        }).eq('id', user.id)
    }
    revalidatePath('/')
}

export async function removeSkill(skillToRemove: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data } = await supabase.from('profiles').select('skills').eq('id', user.id).single()
    const currentSkills = data?.skills || []

    await supabase.from('profiles').update({
        skills: currentSkills.filter((s: string) => s !== skillToRemove)
    }).eq('id', user.id)
    revalidatePath('/')
}

// --- Education (Stored in Profile as JSONB) ---
export async function addEducation(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const newEdu = {
        id: Date.now(),
        institution: formData.get('institution'),
        university: formData.get('university'),
        degree: formData.get('degree'),
        period: formData.get('period'),
        description: formData.get('description')
    }

    const { data } = await supabase.from('profiles').select('education').eq('id', user.id).single()
    const currentEdu = data?.education || []

    await supabase.from('profiles').update({
        education: [newEdu, ...currentEdu]
    }).eq('id', user.id)
    revalidatePath('/')
}

export async function removeEducation(idToRemove: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data } = await supabase.from('profiles').select('education').eq('id', user.id).single()
    const currentEdu = data?.education || []

    await supabase.from('profiles').update({
        education: currentEdu.filter((e: any) => e.id !== idToRemove)
    }).eq('id', user.id)
    revalidatePath('/')
}


// --- Experience (Separate Table) ---


export async function addExperience(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const startDateRaw = formData.get('startDate') as string
    const endDateRaw = formData.get('endDate') as string

    // Helper to format YYYY-MM-DD to "Month YYYY"
    const formatDate = (dateStr: string) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    const start = formatDate(startDateRaw)
    const end = endDateRaw ? formatDate(endDateRaw) : 'Present'
    const period = `${start} - ${end}`

    await supabase.from('experience').insert({
        company: formData.get('company'),
        role: formData.get('role'),
        period, // Derived from date inputs
        description: formData.get('description'),
        // We could also store raw_start_date: startDateRaw if we added that column, but for now we stick to schema
    })
    revalidatePath('/')
}

export async function updateExperience(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const id = formData.get('id')
    if (!id) return

    const startDateRaw = formData.get('startDate') as string
    const endDateRaw = formData.get('endDate') as string

    // Helper to format YYYY-MM-DD to "Month YYYY"
    const formatDate = (dateStr: string) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    const start = formatDate(startDateRaw)
    const end = endDateRaw ? formatDate(endDateRaw) : 'Present'
    const period = `${start} - ${end}`

    await supabase.from('experience').update({
        company: formData.get('company'),
        role: formData.get('role'),
        period,
        description: formData.get('description')
    }).eq('id', id)
    revalidatePath('/')
}

export async function deleteExperience(id: number) {
    const supabase = await createClient()
    await supabase.from('experience').delete().eq('id', id)
    revalidatePath('/')
}

// --- Projects (Separate Table) ---


export async function addProject(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const tags = (formData.get('tags') as string).split(',').map(s => s.trim())
    await supabase.from('projects').insert({
        title: formData.get('title'),
        description: formData.get('description'),
        link: formData.get('link'),
        tags
    })
    revalidatePath('/')
}

export async function updateProject(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const id = formData.get('id')
    if (!id) return

    const tagsRaw = formData.get('tags') as string;
    const tags = tagsRaw ? tagsRaw.split(',').map(s => s.trim()) : [];

    await supabase.from('projects').update({
        title: formData.get('title'),
        description: formData.get('description'),
        link: formData.get('link'),
        tags
    }).eq('id', id)
    revalidatePath('/')
}

export async function deleteProject(id: number) {
    const supabase = await createClient()
    await supabase.from('projects').delete().eq('id', id)
    revalidatePath('/')
}
