import Link from 'next/link'
import Image from 'next/image'

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
import { renderImage } from '@/utils/action/render'
import placeholder from '@/public/placehorder.jpg'

type user = UserType

export default function AuthProfile({ user, handleLogout }: { user: UserType; handleLogout: () => void }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group space-x-4 py-7"
          >
            <span className="block text-muted-foreground duration-200 group-hover:text-foreground md:w-[119px]">
              <span className="block w-full truncate text-start font-medium text-foreground">{user.username}</span>
              <span className="block w-full truncate text-start font-light">{user.firstname}</span>
            </span>
            <Image
              src={user.image?.name ? renderImage.webp(user.image?.name!) : placeholder}
              className="aspect-square rounded-full object-cover"
              width={40}
              height={40}
              alt={`${user.username} Profile Page`}
            />
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

          <DropdownMenuItem>Tickets</DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/auth/edit/${user.username}`}>Settings</Link>
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
