import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Marvin',
	description: "My name's Marvin",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
