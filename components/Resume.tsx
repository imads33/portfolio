'use client'

import { useState } from 'react'
import { FileText, Download, Loader2 } from 'lucide-react'
import { getResumeUrl } from '@/actions/resume'

export function Resume() {
    const [loading, setLoading] = useState(false)

    const handleViewResume = async () => {
        setLoading(true)
        try {
            const url = await getResumeUrl();
            if (url) {
                window.open(url, '_blank');
            } else {
                alert('Resume not found. Please contact me.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to load resume.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="resume" className="py-24 px-6 md:px-24">
            <div className="max-w-4xl mx-auto bg-stone-900 dark:bg-stone-100 rounded-3xl p-12 text-center text-stone-100 dark:text-stone-900 relative overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

                <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Interested in my journey?</h2>
                <p className="text-lg text-stone-300 dark:text-stone-600 mb-8 max-w-xl mx-auto relative z-10">
                    Download my resume to see a detailed history of my experience, projects, and education.
                </p>

                <button
                    onClick={handleViewResume}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25 relative z-10"
                >
                    {loading ? <Loader2 className="py-1 animate-spin" /> : <FileText />}
                    {loading ? 'Fetching...' : 'View Resume'}
                </button>
            </div>
        </section>
    )
}
