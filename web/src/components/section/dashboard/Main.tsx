import { Activity, HandCoins, Layers } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getPromotor } from '@/utils/session/get-promotor'

export default async function DashboardMain() {
  const data = await getPromotor()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <span className="block font-medium text-foreground">{data?.Event.length}</span>
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
            <span className="block font-medium text-foreground">{data.Event.length}</span>
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
            <span className="block font-medium text-foreground">{data.Event.length}</span>
            <span className="block text-xl md:text-2xl">Transactions</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
