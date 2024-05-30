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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { UserType } from '@/types/user.type'
import Link from 'next/link'

type user = UserType

export default function AuthProfile({ user, handleLogout }: { user: UserType; handleLogout: () => void }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="space-x-4 py-7"
          >
            <span className="block size-9 rounded-[50%] bg-foreground" />
            <span className="block md:w-[119px]">
              <span className="block w-full truncate text-start font-medium">{user.username}</span>
              <span className="block w-full truncate text-start font-light">{user.firstname}</span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          sideOffset={10}
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Transaction</DropdownMenuItem>

          <DropdownMenuItem>Events</DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/">Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="space-y-6 md:space-y-0">
        <DialogHeader>
          <DialogTitle>Confirm Logout?</DialogTitle>

          <DialogDescription className="text-balance">
            Are you sure you want to logout? This action will end your current session. Confirm to proceed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-y-4">
          <Button
            className="sm:w-full"
            onClick={handleLogout}
          >
            Yes
          </Button>
          <DialogClose asChild>
            <Button className="sm:w-full">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
