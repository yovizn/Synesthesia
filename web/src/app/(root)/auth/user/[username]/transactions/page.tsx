import { Metadata } from 'next'

type TransactionProps = {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return {
    title: params.username,
  }
}

export default function TransactionPage({ params }: TransactionProps) {
  return <div>Transactions, {params.username}</div>
}
