import { Markdown } from '@/components/common/Markdown'
import H3 from '@/components/ui/h3'
import Paragraph from '@/components/ui/p'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EventDetailType } from '@/types/event.type'
import { formatMoney } from '@/utils/format-any'
import TicketCard from '../TicketCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EventDetailDescription({ data }: { data: EventDetailType }) {
  const cheaper = data.Tickets.sort((a, b) => (a?.price ? a.price : 0) - (b?.price ? b.price : 0))[0]
  const toleranceDate = new Date(data.startAt) >= new Date()
  const toleranceCapacity = data.Tickets.reduce((sum, val) => sum + val?.capacity!, 0) <= 0

  return (
    <div className="my-40 flex min-h-96 justify-center">
      <div className="w-full max-w-screen-2xl px-6 lg:px-0">
        <Tabs
          defaultValue="description"
          className="w-full space-y-4"
        >
          <TabsList className="mx-auto flex h-fit w-full max-w-screen-lg items-center">
            <TabsTrigger
              className="w-full text-xl md:text-2xl"
              value="description"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              className="w-full text-xl md:text-2xl"
              value="ticket"
            >
              Tickets
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="description"
            className="mx-auto max-w-screen-lg space-y-6 text-balance"
          >
            <H3 className="text-7xl md:text-8xl">{data.title}</H3>
            {data.description && <Markdown>{data.description}</Markdown>}
          </TabsContent>
          <TabsContent
            value="ticket"
            className="mx-auto max-w-screen-lg space-y-6"
          >
            <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <H3 className="mt-5">Order ticket now!</H3>
                <Paragraph className="uppercase text-muted-foreground">
                  Start from {formatMoney(cheaper?.price!)}
                </Paragraph>
              </div>
            </div>

            <Button asChild>
              <Link href={`/carts/${data.id}`} className='w-full'>Checkout</Link>
            </Button>

            <div className="space-y-10">
              {data.Tickets.map((ticket) => (
                <TicketCard
                  key={ticket?.id}
                  eventId={data.id}
                  eventSlug={data.slug}
                  ticket={ticket}
                  toleranceDate={toleranceDate}
                  toleranceCapacity={toleranceCapacity}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
