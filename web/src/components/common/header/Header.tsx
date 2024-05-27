import Link from 'next/link'
import AuthButton from './AuthButton'
import ThemeSwitcher from '../ThemeSwitcher'

export default function Header() {
  return (
    <header
      className="fixed left-0 top-0 z-20 h-16 w-full bg-background px-6 text-foreground 2xl:px-0"
    >
      <div className="mx-auto h-full max-w-[1400px]">
        <nav role='navigation' className="flex size-full items-center justify-between">
          <Link
            href="/"
            className="text-xl font-medium transition-colors duration-200 hover:text-foreground/85 sm:text-xl"
          >
            Sysnesthesia&copy;
          </Link>

          <div className="flex gap-4">
            <AuthButton />
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}
