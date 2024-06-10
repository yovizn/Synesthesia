import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { formatDistance, formatMoney } from '@/utils/format-any'
import { getEvent } from '@/utils/session/getEvent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event',
}

export default async function EventPage() {
  const events = await getEvent()
  const total = events.map((event) => event.Tickets)

  return (
    <div className="size-full min-h-96 rounded-xl border bg-background p-6">
      <Table className="border">
        <TableCaption>List of your events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Venue Type</TableHead>
            <TableHead>Use Voucher</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {events.map((event, idx) => (
            <TableRow key={event.id}>
              <TableCell className="truncate">{idx < 10 ? '0' + (idx + 1) : idx}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>
                {event.Tickets?.map((ticket) => (
                  <span
                    key={ticket.id}
                    className="flex flex-col justify-between gap-4 md:flex-row"
                  >
                    <span className="block">{formatMoney(ticket.price)}</span>
                    <span className="block">{ticket.type}</span>
                  </span>
                ))}
              </TableCell>
              <TableCell>
                {event.Tickets?.map((ticket) => (
                  <span
                    key={ticket.id}
                    className="flex flex-col justify-between gap-4 md:flex-row"
                  >
                    <span className="block">{ticket.capacity}</span>
                    <span className="block">{ticket.type}</span>
                  </span>
                ))}
              </TableCell>
              <TableCell>{event.venueType}</TableCell>
              <TableCell className={cn('capitalize', event.useVoucher ? 'text-yellow-500' : 'text-destructive')}>
                {String(event.useVoucher)}
              </TableCell>
              <TableCell className="font-bold capitalize text-muted-foreground">
                Start {formatDistance(event.startAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell>Events: {events.length}</TableCell>
            <TableCell>Price: {''}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
