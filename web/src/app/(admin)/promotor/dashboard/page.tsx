import Logo from '@/components/common/Logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { API_BASE_URL } from '@/configs/env'
import { axiosInstance } from '@/lib/axios.config'
import { PromotorType } from '@/types/promotor.type'
import { renderImage } from '@/utils/action/render'
import { jwtDecode } from 'jwt-decode'
import { Activity, HandCoins, Layers } from 'lucide-react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const promotor = (await getPromotor()) as PromotorType

  return {
    title: promotor.promotorName,
  }
}

export default async function DashboardPage() {
  const promotor = (await getPromotor()) as PromotorType
  const balance = Number(promotor.balance).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="h-24 w-full bg-background md:h-screen md:w-96 md:border-r-2">
        <nav className="flex size-full flex-col">
          <Link
            href="/"
            className="flex h-20 w-full items-center justify-center border-b-2 bg-secondary/50 text-center text-2xl"
          >
            <Logo />
          </Link>
        </nav>
      </aside>
      <main className="flex min-h-screen w-full grow flex-col gap-5 bg-secondary/50 p-4">
        <Card className="flex h-20 w-full items-center justify-between px-8">
          <div className="flex h-full items-center gap-8">
            <h3 className="text-2xl font-bold">Dashboard</h3>
            <Separator orientation="vertical" />
            <p>{promotor.promotorName}</p>
          </div>

          <div className="flex items-center gap-6">
            <p>{balance}</p>
            <Avatar>
              <AvatarImage src={renderImage.webp(promotor.promotorImage?.name!)} />
              <AvatarFallback>{promotor.promotorName.split('')[0]}</AvatarFallback>
            </Avatar>
          </div>
        </Card>
        <section className="size-full space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/promotor/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/promotor/event">Events</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2.5">
                  <Activity className="size-5 text-green-500" />
                  <span>Active Events</span>
                </CardTitle>
                <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</CardDescription>
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent className="flex items-end justify-between text-2xl font-extralight text-muted-foreground md:text-5xl">
                <span className="block font-medium text-foreground">{promotor.Event.length}</span>
                <span className="block text-xl md:text-2xl">Events</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2.5">
                  <Layers className="size-5 text-cyan-500" />
                  <span>Draft Events</span>
                </CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent className="flex items-end justify-between text-2xl font-extralight text-muted-foreground md:text-5xl">
                <span className="block font-medium text-foreground">{promotor.Event.length}</span>
                <span className="block text-xl md:text-2xl">Events</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-4">
                <CardTitle className="flex items-center gap-2.5">
                  <HandCoins className="size-5" />
                  <span>Total Transactions</span>
                </CardTitle>

                <Button
                  className="w-full"
                  variant="secondary"
                >
                  Check
                </Button>
              </CardHeader>
              <CardContent className="flex items-end justify-between text-2xl font-extralight text-muted-foreground md:text-5xl">
                <span className="block font-medium text-foreground">{promotor.Event.length}</span>
                <span className="block text-xl md:text-2xl">Transactions</span>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

const getPromotor = async () => {
  const access_token = cookies().get('access_token')?.value || ''
  return await fetch(`${API_BASE_URL}/promotors/v1`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
