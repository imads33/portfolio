import { Github, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, url: 'mailto:contact@example.com' },
]

export function Footer() {
    return (
        <footer id="contact" className="py-12 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-8 text-stone-900 dark:text-stone-50">Get In Touch</h3>
                <div className="flex justify-center flex-wrap gap-6 mb-8">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white dark:bg-stone-900 rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all text-stone-600 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-400"
                        >
                            <link.icon size={24} />
                        </a>
                    ))}
                    <a href="#" className="flex items-center px-4 py-2 bg-white dark:bg-stone-900 rounded-full font-medium text-sm text-stone-700 dark:text-stone-300 hover:text-orange-500 transition-colors shadow-sm">Naukri</a>
                    <a href="#" className="flex items-center px-4 py-2 bg-white dark:bg-stone-900 rounded-full font-medium text-sm text-stone-700 dark:text-stone-300 hover:text-orange-500 transition-colors shadow-sm">Indeed</a>
                </div>
                <p className="text-stone-500 text-sm font-medium italic">
                    Built with <span className="text-red-500">♥</span> & High Performance Code. <br className="md:hidden" />
                    (Copying this template won't give you my debugging superpowers 😉)
                </p>
            </div>
        </footer>
    )
}
