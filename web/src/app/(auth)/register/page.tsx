import RegisterForm from '@/components/form/Register'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="h-screen w-full">
      <section className="mt-32 flex flex-col gap-6 px-6">
        <div>
          <h1 className="text-3xl font-semibold">Create your account</h1>

          <RegisterForm />
        </div>
        <Link
          href="/login"
          className="w-fit self-end text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          Already have an account
        </Link>
      </section>
    </main>
  )
}
