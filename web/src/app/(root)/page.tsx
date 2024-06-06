export const revalidate = 60

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <section className="flex h-screen items-center justify-center">Hero</section>
      <section className="flex h-screen items-center justify-center bg-foreground text-background">Hello</section>
    </main>
  )
}
