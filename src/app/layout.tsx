import { Inter } from 'next/font/google'
import { MainLayout } from '@/components/MainLayout'
import { Sidebar } from '@/components/Sidebar'

export const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Dashboard - Next.js + TypeScript + Material-UI',
  description: 'Dashboard - Next.js + TypeScript + Material-UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          <main>
            <Sidebar />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100%',
              }}
            >
              {children}
            </div>
          </main>
        </MainLayout>
      </body>
    </html>
  )
}
