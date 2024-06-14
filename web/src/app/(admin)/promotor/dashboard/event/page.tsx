import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { deleteEventAction } from '@/utils/action/deleteEventAction'
import { formatDistance, formatMoney } from '@/utils/format-any'
import { getEvent } from '@/utils/session/getEvent'
import { AxiosError } from 'axios'
import { ArrowUpRight, Edit2Icon, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import DeleteDialog from './_component/DeleteDialog'

export const metadata: Metadata = {
  title: 'Event',
}

export default async function EventPage() {
  const events = await getEvent()

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
            <TableHead>settings</TableHead>
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
              <TableCell className="min-h-[157px]">
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
              <TableCell className="flex gap-6">
                <Link href={`/promotor/edit-event/${event.slug}`}>
                  <Edit2Icon className="size-4" />
                </Link>

                <DeleteDialog
                  data={{
                    id: event.id,
                    title: event.title,
                  }}
                />

                <Link href={`/events/${event.slug}`}>
                  <ArrowUpRight className="size-5" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
