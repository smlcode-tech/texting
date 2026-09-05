import type { Metadata } from 'next'
import '../src/styles.css'

export const metadata: Metadata = {
  title: 'Texting | Mesajlaşma',
  description: 'Yakın olanla anında konuş.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}