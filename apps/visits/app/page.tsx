import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h2>Themes</h2>

				<Image
					alt=""
					src="/api/image.svg?debug=true"
					width={400}
					height={80}
					loading="lazy"
				/>
				<hr />
				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=tiles"
					width={400}
					height={80}
					loading="lazy"
				/>
				<hr />
				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=mosaic"
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
				<hr />
				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=board"
					width={400}
					height={80}
					loading="lazy"
				/>
				<hr />
				<Image
					alt=""
					src="/api/image.svg?debug=true&theme=lcd"
					width={400}
					height={80}
					loading="lazy"
				/>
			</main>
		</div>
	)
}
