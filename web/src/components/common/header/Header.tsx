import dynamic from 'next/dynamic'
import Link from 'next/link'
import SkeletonProfile from './SkeletonProfile'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import AuthLoginButton from './AuthLoginButton'

export default function Header() {
  const access_token = cookies().get('access_token')?.value
  const AuthButton = dynamic(() => import('./AuthButton'), {
    loading: () => <SkeletonProfile />,
  })

  return (
    <header className="fixed left-0 top-0 z-20 h-[88px] w-full bg-background px-6 py-4 text-foreground">
      <div className="mx-auto h-full max-w-screen-2xl">
        <nav
          role="navigation"
          className="flex size-full items-center justify-between"
        >
          <Link
            href="/"
            className="text-xl font-medium transition-colors duration-200 hover:text-foreground/85 sm:text-xl"
          >
            Sysnesthesia&copy;
          </Link>
          {access_token ? (
            <AuthButton />
          ) : (
            <AuthLoginButton />
          )}
        </nav>
      </div>
    </header>
  )
}
