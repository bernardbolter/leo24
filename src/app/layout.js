import localFont from 'next/font/local'
import LeoProvider from '@/providers/LeoProvider'
import '../styles/index.scss'

const myFont = localFont({
  src: [
    {
      path: '../fonts/helveticaneueltpro-roman-webfont.woff2',
      weight: '400',
      style: 'normal',
      preload: true
    },
    {
      path: '../fonts/helveticaneueltpro-it-webfont.woff2',
      weight: '400',
      style: 'italic',
      preload: true
    }
  ]
})

export const metadata = {
  title: "Leonhard Laupichler",
  description: "Leonhard Laupichler is a creative service conceptualizing and creating projects at the convergence of contemporary culture and visual language.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LeoProvider>
        <body className={myFont.className}>
          {children}
        </body>
      </LeoProvider>
    </html>
  );
}
