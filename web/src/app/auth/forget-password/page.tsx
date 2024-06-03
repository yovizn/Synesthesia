import EmailForm from '@/components/form/Email'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ForgetPage() {
  return (
    <main className="flex flex-col justify-center h-screen">
      <Card className="mx-auto">
        <CardHeader className="max-w-screen-sm">
          <CardTitle className='text-3xl md:text-4xl'>
              Need Help with Your Password?
          </CardTitle>
          <CardDescription className="text-balance leading-relaxed">
            Don&apos;t worry! Enter your email address below, and we&apos;ll assist you in resetting your password by
            sending instructions via email.
          </CardDescription>
        </CardHeader>

        <CardContent className="max-w-screen-sm space-y-6">
          <EmailForm />
        </CardContent>
      </Card>
    </main>
  )
}
