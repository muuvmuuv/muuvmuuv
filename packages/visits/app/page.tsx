import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h2>Themes</h2>

				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=classic"
					width={400}
					height={80}
					loading="lazy"
				/>
				<hr />
				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=cyber"
					width={400}
					height={80}
					loading="lazy"
				/>
				<hr />
				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=flip"
					width={400}
					height={80}
					loading="lazy"
				/>
			</main>
		</div>
	)
}
