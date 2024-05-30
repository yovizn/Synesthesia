import LoginForm from '@/components/form/Login'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full flex-col justify-center gap-6 px-16">
      <section className="w-full space-y-16 text-center">
        <div className="space-y-2">
          <h1 className="text-balance text-3xl font-medium uppercase md:text-6xl">Welcome to Synesthesia</h1>
          <p className="text-balance">Let&apos;s sign in and explore you&apos;re journey</p>
        </div>

        <LoginForm />
      </section>

      <div className="flex w-full items-center justify-between">
        <Link
          href="/register"
          className="w-fit text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          Don&apos;t have an account?
        </Link>

        <Link
          href="/forget-password"
          className="w-fit text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          Forget your password?
        </Link>
      </div>
    </main>
  )
}
