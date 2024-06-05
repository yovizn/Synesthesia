import RegisterPromotorForm from '@/components/form/register-promotor'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register Promotor',
}

export default function RegisterPromotorPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full max-w-screen-xl">
        <div className="flex h-screen w-full items-center justify-center">
          <RegisterPromotorForm />
        </div>
      </section>
    </main>
  )
}
