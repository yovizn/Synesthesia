import LoginForm from '@/components/form/login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <section className="mx-auto h-2/3 w-full max-w-screen-2xl px-6">
        <Card
          about="Synesthesia login page"
          className="flex size-full items-center justify-center overflow-hidden flex-col md:flex-row"
        >
          <div className="flex size-full flex-col items-stretch justify-between gap-2 bg-secondary/50 p-6 sm:p-8">
            <div className="space-y-2">
              <span className="text-muted-foreground">Let&apos;s connect with.</span>
              <h2 className="text-balance text-4xl font-medium tracking-tighter md:text-5xl">
                Synesthesia<span className="font-extralight">&copy;</span>
              </h2>
            </div>
            <p className="w-fit text-balance text-muted-foreground md:text-foreground">&quot;Let&apos;s login and explore you&apos;re journey&quot;</p>
          </div>

          <div className="flex size-full flex-col items-stretch justify-center text-center sm:p-6 gap-4">
            <CardHeader>
              <CardTitle className="text-lg sm:text-2xl">Have an account</CardTitle>
              <CardDescription>Sign in now and explore our event&apos;s</CardDescription>
            </CardHeader>

            <span className="block">OR</span>

            <CardContent className='space-y-4'>
              <Button
                asChild
                variant={'secondary'}
                className="w-full"
              >
                <Link href="/auth/register">Create your account</Link>
              </Button>
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
          </div>
        </Card>
      </section>
    </main>
  )
}
