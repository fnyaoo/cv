'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'

import DynamicIcon from '@/_components/DynamicIcon'
import Loader from '@/_components/Loader'
import LoginMenu from '@/_components/LoginMenu'
import locales from '@/_locales/locales'
import { useLanguage } from '@/_providers/LanguageProvider'
import { toast } from 'sonner'

export default function LoginPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const { language } = useLanguage()
	const t = locales[language]
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	useEffect(() => {
		if (t) {
			document.title = t.login.title
		}
	}, [t])

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		const res = await signIn('credentials', {
			username,
			password,
			redirect: false,
			callbackUrl,
		})

		setLoading(false)

		if (res?.ok) {
			window.location.href = res.url ?? '/'
		} else {
			toast.error(t.login.invalid)
		}
	}

	return (
		<>
			{loading && <Loader overlay />}
			<LoginMenu />
			<div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-neutral-800 pt-16">
				<form
					onSubmit={handleLogin}
					className="w-full max-w-sm p-6 rounded space-y-4 bg-white dark:bg-neutral-900 shadow"
				>
					<h2 className="text-2xl font-bold text-center text-black dark:text-white">{t.login.title}</h2>

					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							{t.login.username}
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							{t.login.password}
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer"
								tabIndex={-1}
							>
								<DynamicIcon name={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} className="text-xl" />
							</button>
						</div>
					</div>

					<Button
						label={t.login.submit || 'Sign in'}
						type="submit"
						severity="secondary"
						// text
						raised
						className="w-full"
					/>
				</form>
			</div>
		</>
	)
}
