// import EditUserForm from '@/components/form/edit-user'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'

type EditPageProps = {
  params: {
    username: string
  }
}

export default function EditPage({ params }: EditPageProps) {
const EditUserForm = dynamic(() => import('@/components/form/edit-user'), {
  // loading: () => <p>Loading...</p>,
})  
  return (
    <main className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center w-full">
        <EditUserForm params={params} />
      </section>
    </main>
  )
}
