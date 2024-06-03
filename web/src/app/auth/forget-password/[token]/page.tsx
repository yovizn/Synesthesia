import ForgetPasswordForm from '@/components/form/ForgetPassword'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type ForgetPasswordPageType = {
  params: {
    token: string
  }
}

export default async function ForgetPasswordPage({ params }: ForgetPasswordPageType) {
  const forget_password_token = cookies().get('forget_password_token')?.value
  const user = jwtDecode(params.token) as JwtPayload & { username: string }
  if (!forget_password_token || !user.username) redirect('/auth/login')

  return (
    <main className="min-h-screen px-6 py-40">
      <section className="mx-auto max-w-screen-2xl space-y-20">
        <div className="max-w-screen-sm space-y-6 md:max-w-screen-md">
          <span className="font-light">
            Helo, <span className="font-bold">{user.username}</span>
          </span>
          <h3 className="text-balance text-2xl font-medium md:text-6xl">Create your new password</h3>
          <p className="text-balance leading-relaxed">
            Ready for a new password? Please enter your current password along with your new password below.
          </p>
        </div>

        <div>
          <ForgetPasswordForm params={params.token} />
        </div>
      </section>
    </main>
  )
}
