import { Metadata } from 'next'
import dynamic from 'next/dynamic'

type EditPageProps = {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return {
    title: params.username,
  }
}

export default function SettingPage({ params }: EditPageProps) {
  const EditUserForm = dynamic(() => import('@/components/form/edit-user'), {})
  return (
    <>
        <EditUserForm params={params} />
    </>
  )
}
