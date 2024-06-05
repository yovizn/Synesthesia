import RegisterForm from '@/components/form/Register'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full">
      <section className="py-24 px-6">
        <Card className="mx-auto w-full max-w-screen-sm bg-secondary">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Create your account</CardTitle>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>

          <CardFooter>
            <Link
              href="/auth/login"
              className="w-fit self-end text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Already have an account?
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
