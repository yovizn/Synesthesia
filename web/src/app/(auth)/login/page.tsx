import LoginForm from '@/components/form/Login'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full flex-col justify-center gap-6 px-16">
      <section className="w-full space-y-0.5 text-center">
        <div className='space-y-2'>
          <h1 className="text-3xl md:text-6xl uppercase">Welcome to Synesthesia</h1>
          <p>let's sign in and explore you&apos;re journey</p>
        </div>

        <LoginForm />
      </section>
      <Link
        href="/register"
        className="w-fit self-end text-end text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        Don&apos;t have an account?
      </Link>
    </main>
  )
}
