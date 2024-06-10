import { Markdown } from '@/components/common/Markdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Paragraph from '@/components/ui/p'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EventDetailType } from '@/types/event.type'
import { formatMoney } from '@/utils/format-any'

export default function EventDetailDescription({ data }: { data: EventDetailType }) {
  return (
    <div className="my-40 flex min-h-96 justify-center">
      <div className="w-full max-w-screen-2xl">
        <Tabs
          defaultValue="description"
          className="w-full space-y-4"
        >
          <TabsList className="mx-auto flex w-full max-w-screen-lg items-center">
            <TabsTrigger
              className="w-full"
              value="description"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              className="w-full"
              value="ticket"
            >
              Tickets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description">{data.description && <Markdown>{data.description}</Markdown>}</TabsContent>
          <TabsContent
            value="ticket"
            className="mx-auto max-w-screen-lg"
          >
            <div>
              <h3>Order ticket now!</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.Tickets.map((ticket) => (
                <Card key={ticket?.id} className='space-y-2'>
                  <CardHeader>
                    <CardTitle>{ticket?.type}</CardTitle>
                    <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, ratione.</CardDescription>

                    <CardContent>
                      <div className="flex w-full justify-between">
                        <span className="block">Capacity:</span>
                        <span className="block">{ticket?.capacity}</span>
                      </div>

                      <Paragraph>{formatMoney(ticket?.price!)}</Paragraph>
                    </CardContent>
                    <CardFooter>
                      <Button>Order Now!</Button>
                    </CardFooter>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
