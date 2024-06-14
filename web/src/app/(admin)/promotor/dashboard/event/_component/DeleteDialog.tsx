"use client"

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
import { toast } from '@/components/ui/use-toast'
import { deleteEventAction } from '@/utils/action/deleteEventAction'
import { AxiosError } from 'axios'
import { Trash } from 'lucide-react'

export default function DeleteDialog({ data }: { data: { id: string, title:string } }) {
  const handleDeletEvent = async (id: string) => {
    try {
      const event = await deleteEventAction(id)
      toast({
        title: event.data.title,
      })
      window.location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
        })
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Trash className="size-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-balance">
            Are you sure you want to delete this? This action cannot be undone.
          </DialogTitle>
          <DialogDescription>
            This action will delete {data.title}. Please confirm if you want to proceed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => handleDeletEvent(data.id)}
            variant={'outline'}
          >
            Confirm
          </Button>
          <Button asChild>
            <DialogClose>Cancel</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
