import { createClient } from '@/lib/supabase/server'

export async function getProfile() {
    const supabase = await createClient()
    const { data } = await supabase.from('profiles').select('*').single()
    return data
}

export async function getExperience() {
    const supabase = await createClient()
    const { data } = await supabase.from('experience').select('*').order('id', { ascending: false })
    return data || []
}

export async function getProjects() {
    const supabase = await createClient()
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    return data || []
}
