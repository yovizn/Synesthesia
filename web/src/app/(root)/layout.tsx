import Footer from '@/components/common/footer'
import Header from '@/components/common/header/Header'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
