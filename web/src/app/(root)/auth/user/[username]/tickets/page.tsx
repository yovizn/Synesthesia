import { Metadata } from "next"

type TicketsProps = {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return {
    title: params.username,
  }
}

export default function TicketPage({ params }: TicketsProps) {
  return <div>Tickets, {params.username}</div>
}
