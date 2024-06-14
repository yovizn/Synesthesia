import dynamic from 'next/dynamic'
import Link from 'next/link'
import SkeletonProfile from './SkeletonProfile'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import AuthLoginButton from './AuthLoginButton'
import Logo from '../Logo'
import { CalendarPlus } from 'lucide-react'
import PromotorButton from './PromotorButton'

const AuthButton = dynamic(() => import('./AuthButton'), {
  loading: () => <SkeletonProfile />,
})

export default function Header() {
  const access_token = cookies().get('access_token')?.value

  return (
    <header className="h-[88px] w-full border-b bg-background px-6 py-4 text-foreground shadow">
      <div className="mx-auto h-full max-w-screen-2xl">
        <nav
          role="navigation"
          className="flex size-full items-center justify-between"
        >
          <Link
            href="/"
            className="text-xl font-medium transition-colors duration-200 hover:text-foreground/85 sm:text-xl"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-6">
            <PromotorButton />
            {access_token ? <AuthButton /> : <AuthLoginButton />}
          </div>
        </nav>
      </div>
    </header>
  )
}
