import '@/styles/global.css'

export const metadata = {
  title: 'Land Platform',
  description: 'Buy and sell land properties',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
