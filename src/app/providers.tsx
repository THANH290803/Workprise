'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"      // Tailwind sẽ dựa vào class 'dark'
      defaultTheme="light"   // Có thể đổi thành 'system'
      enableSystem={true}    // Cho phép dùng theo hệ điều hành
    >
      {children}
    </ThemeProvider>
  )
}
