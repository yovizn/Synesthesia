import EmailForm from '@/components/form/Email'

export default async function ForgetPage() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-screen-xl flex-col items-center justify-center gap-4 px-6 xl:flex-row xl:justify-between">
      <h2 className="self-start text-balance text-5xl md:max-w-screen-sm md:self-auto md:text-7xl">
        Need Help with Your Password?
      </h2>

      <div className="max-w-screen-sm space-y-6 self-start md:self-auto">
        <p className="text-balance leading-relaxed">
          Don&apos;t worry! Enter your email address below, and we&apos;ll assist you in resetting your password by
          sending instructions via email.
        </p>
        <EmailForm />
      </div>
    </main>
  )
}
