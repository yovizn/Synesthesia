import UserSideBar from '@/components/common/header/UserSideBar'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-[calc(100vh-88px)] w-full flex-col">
      <section className="flex flex-col md:flex-row size-full">
        <UserSideBar />
        <div className="grow p-6 md:p-8">{children}</div>
      </section>
    </main>
  )
}
