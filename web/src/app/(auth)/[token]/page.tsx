import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axios.config'
import Link from 'next/link'
// import { redirect } from 'next/navigation'

export default async function ValidationPage({
  params,
}: {
  params: { token: string }
}) {
  const value = await axiosInstance().get(`/echos/${params.token}`)

  // redirect('/login')

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-medium uppercase">{value.data.title}</h1>
      <p>{value.data.description}</p>
      <Button asChild>
        <Link href="/login">Go to login?</Link>
      </Button>
    </main>
  )
}
