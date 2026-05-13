import Image from 'next/image'
import styles from './page.module.css'

const themes = ['default', 'tiles', 'mosaic', 'flip', 'board', 'lcd']

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h1 className={styles.title}>Themes</h1>

				<ul className={styles.list}>
					{themes.map((theme) => {
						const src =
							theme === 'default'
								? '/api/image.svg?debug=true'
								: `/api/image.svg?debug=true&theme=${theme}`

						return (
							<li key={theme} className={styles.item}>
								<h2 className={styles.label}>{theme}</h2>
								<Image
									alt={`${theme} theme preview`}
									src={src}
									width={800}
									height={160}
									loading="lazy"
									className={styles.preview}
								/>
							</li>
						)
					})}
				</ul>
			</main>
		</div>
	)
}
