import LoginForm from '@/components/form/Login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full flex-col justify-center gap-6 px-16">
      <section className="w-full space-y-16 text-center">
        <Card
          about="Synesthesia login page"
          className="mx-auto w-full max-w-[380px] md:max-w-[680px]"
        >
          <CardHeader className="space-y-4">
            <CardTitle className="text-balance text-3xl font-medium md:text-5xl">Welcome to Synesthesia</CardTitle>
            <CardDescription className="text-balance">
              Let&apos;s login and explore you&apos;re journey
            </CardDescription>
            <span className="block">OR</span>
            <Button asChild variant={'secondary'}>
              <Link href="/auth/register">Create your account</Link>
            </Button>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>

          <CardFooter>
            <Link
              href="/auth/forget-password"
              className="block w-fit text-start text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Forget your password?
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
