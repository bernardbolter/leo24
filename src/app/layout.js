import localFont from 'next/font/local'
import LeoProvider from '@/providers/LeoProvider'
import '@/styles/index.scss'

const myFont = localFont({
  src: [
    {
      path: '../fonts/helveticaneueltpro-roman-webfont.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/helveticaneueltpro-it-webfont.woff2',
      weight: '400',
      style: 'italic'
    }
  ]
})

export const metadata = {
  title: "Leonhard Laupichler",
  description: "Leonhard Laupichler's Portfolio",
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
