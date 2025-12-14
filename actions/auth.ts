'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/login?error=Invalid credentials')
    }

    return redirect('/admin')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/')
}

export async function uploadResume(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const file = formData.get('resume') as File
    if (!file || file.name === 'undefined') return

    const fileName = `resume/resume-${Date.now()}.pdf`

    // Upload File
    const { error } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file)

    if (error) throw new Error(error.message)

    // Get URL (Signed or Public - keeping public for simplicity as per request, but can be signed)
    const { data } = supabase.storage.from('portfolio').getPublicUrl(fileName)

    // Update Profile with Resume URL
    await supabase.from('profiles').upsert({
        id: user.id,
        resume_url: data.publicUrl,
        updated_at: new Date().toISOString()
    })

    revalidatePath('/')
    return redirect('/admin?success=true')
}
