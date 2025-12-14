'use client'

import { login } from '@/actions/auth'

export default function Login() {
    return (
        <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
            <form action={login} className="flex flex-col gap-4 p-8 bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-sm border border-stone-200 dark:border-stone-800">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 text-center">Admin Login</h1>
                <input name="email" type="email" placeholder="Email" required className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-none focus:ring-2 ring-orange-500 outline-none" />
                <input name="password" type="password" placeholder="Password" required className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-none focus:ring-2 ring-orange-500 outline-none" />
                <button type="submit" className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-2">
                    Sign In
                </button>
            </form>
        </div>
    )
}
