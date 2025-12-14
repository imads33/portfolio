'use server'

import { createClient } from '@/lib/supabase/server'

export async function getResumeUrl() {
    const supabase = await createClient();
    // 2. Fallback: Check Storage bucket manually
    const { data: files } = await supabase
        .storage
        .from('portfolio').getPublicUrl(`resume/ImadSab-FullStack-Resume.pdf`)

    return files.publicUrl;
}
