import styles from './page.module.css'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h2>Themes</h2>

				<img alt="" src="/api/image.svg?debug=true&theme=classic" />
				<hr />
				<img alt="" src="/api/image.svg?debug=true&theme=cyber" />
				<hr />
				<img alt="" src="/api/image.svg?debug=true&theme=flip" />
			</main>
		</div>
	)
}
