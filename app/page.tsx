import { createClient } from '@/lib/supabase/server'
import { getProfile, getProjects, getExperience } from '@/lib/data'
import { Hero } from "@/components/Hero"
import { Skills } from "@/components/Skills"
import { Resume } from "@/components/Resume"
import { Footer } from "@/components/Footer"
import { FloatingChat } from "@/components/FloatingChat"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { Education } from "@/components/Education"
import { Navbar } from "@/components/Navbar"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const profile = await getProfile()
  const projects = await getProjects()
  const experience = await getExperience()

  // Safe Accessors for new profile fields
  const education = profile?.education || []
  const skills = profile?.skills || []

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-500 selection:bg-orange-500/30 selection:text-orange-900 dark:selection:text-orange-100">
      <Navbar />
      <div id="about">
        <Hero profile={profile} />
      </div>
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Education education={education} />
      <Resume />
      <Footer />
      <FloatingChat />
    </main>
  );
}
