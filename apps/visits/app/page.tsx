'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

interface ThemeOption {
	key: string
	label: string
	type: 'color'
	/** Value the theme falls back to when the param is absent. */
	default: string
}

const themes: { name: string; options: ThemeOption[] }[] = [
	{ name: 'default', options: [] },
	{ name: 'tiles', options: [] },
	{
		name: 'mosaic',
		options: [{ key: 'color', label: 'Color', type: 'color', default: '#f5c724' }],
	},
	{ name: 'flip', options: [] },
	{ name: 'board', options: [] },
	{ name: 'lcd', options: [] },
	{ name: 'nixie', options: [] },
]

/** Hold back rapid changes (color pickers fire on every drag tick). */
function useDebounced<T>(value: T, ms: number): T {
	const [debounced, setDebounced] = useState(value)
	useEffect(() => {
		const timeout = setTimeout(() => setDebounced(value), ms)
		return () => clearTimeout(timeout)
	}, [value, ms])
	return debounced
}

function ThemePreview({ name, options }: { name: string; options: ThemeOption[] }) {
	const [values, setValues] = useState<Record<string, string>>({})
	const applied = useDebounced(values, 250)

	const params = new URLSearchParams({ debug: 'true' })
	if (name !== 'default') params.set('theme', name)
	for (const [key, value] of Object.entries(applied)) {
		if (value) params.set(key, value)
	}
	const src = `/api/image.svg?${params}`

	return (
		<li className={styles.item}>
			<h2 className={styles.label}>{name}</h2>
			<Image
				alt={`${name} theme preview`}
				src={src}
				width={800}
				height={160}
				loading="lazy"
				className={styles.preview}
			/>
			{options.length > 0 && (
				<div className={styles.options}>
					{options.map((option) => (
						<label key={option.key} className={styles.option}>
							{option.label}
							<input
								type={option.type}
								value={values[option.key] ?? option.default}
								onChange={(event) =>
									setValues((previous) => ({
										...previous,
										[option.key]: event.target.value,
									}))
								}
							/>
							{values[option.key] && (
								<button
									type="button"
									className={styles.reset}
									onClick={() =>
										setValues(({ [option.key]: _, ...rest }) => rest)
									}
								>
									reset
								</button>
							)}
						</label>
					))}
					<code className={styles.url}>{src}</code>
				</div>
			)}
		</li>
	)
}

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h1 className={styles.title}>Themes</h1>

				<ul className={styles.list}>
					{themes.map(({ name, options }) => (
						<ThemePreview key={name} name={name} options={options} />
					))}
				</ul>
			</main>
		</div>
	)
}
