'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'
import { draftToMarkdown } from 'markdown-draft-js'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'

import { CATEGORY_TYPE, createEventSchema, CreateEventType } from '@/schemas/create-event-schema'

import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import RichText from '@/components/common/RichText'
import ButtonSubmit from '@/components/ui/button-submit'
import { Switch } from '@/components/ui/switch'
import { createEventAction } from '@/utils/action/createEventAction'

export default function CreateEventForm() {
  const form = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      avatar: undefined,
      title: '',
      description: '',
      location: '',
      city: '',
      category: '',
      venueType: '',
      priceReguler: 0,
      capacityReguler: 0,
      priceVip: 0,
      capacityVip: 0,
      use_voucher: false,
    },
    mode: 'onChange',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    form.setValue('avatar', file)
  }

  const onSubmit = async (payload: CreateEventType) => {
    try {
      const action = await createEventAction(payload)
      toast({
        title: action.data.title,
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          description: error.cause as string,
        })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-6 p-6 md:max-w-screen-xl"
      >
        <div className="space-y-6 overflow-hidden rounded-xl border bg-muted">
          {/* Avatar */}
          <div className="max-w-screen-[400px] relative size-full h-96 overflow-hidden rounded-t-md md:max-w-[1280px]">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, ...fieldValues }, formState }) => (
                <FormItem>
                  <FormLabel className="group mx-auto flex w-fit cursor-pointer flex-col items-center justify-center gap-2">
                    <Image
                      src={
                        form.getValues('avatar') ? window.URL.createObjectURL(form.getValues('avatar')!) : placeholder
                      }
                      alt="Profile image"
                      fill
                      priority
                      sizes="(min-width: 768px): 1280px, 100vw"
                      className="aspect-square object-cover brightness-75 transition-all duration-300 group-hover:brightness-90"
                    />
                    {!form.getValues('avatar') ? (
                      <span className="absolute left-1/2 top-1/2 z-10 flex size-fit -translate-x-1/2 flex-col items-center justify-center gap-2">
                        <PlusCircle className="size-6 text-black md:size-10" />
                        <span className="block text-black">Upload your Image/Poster/Banner</span>
                      </span>
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      accept="image/*"
                      type="file"
                      className="hidden"
                      disabled={formState.isSubmitting}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Title */}
          <div className="space-y-6 p-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field, formState }) => (
                <FormItem>
                  <Label className="font-light uppercase text-muted-foreground md:text-lg">
                    Title of your event<span className="text-destructive">&nbsp;*</span>
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Choose your title"
                      className="h-14 rounded-lg bg-background sm:text-xl"
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonSubmit
              isSubmitting={form.formState.isSubmitting}
              label="Create Event"
              className="w-full"
            />
          </div>
        </div>

        <Tabs defaultValue="detail">
          <TabsList className="size-full">
            <TabsTrigger
              className="w-full text-lg"
              value="detail"
            >
              Event Detail
            </TabsTrigger>
            <TabsTrigger
              className="w-full text-lg"
              value="description"
            >
              Event Description
            </TabsTrigger>
          </TabsList>

          {/* Description */}
          <TabsContent
            value="description"
            className="rounded-xl bg-muted"
          >
            <div className="p-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      onClick={() => form.setFocus('description')}
                      className=""
                    >
                      Description
                    </Label>
                    <FormControl>
                      <RichText
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="detail">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 rounded-xl bg-muted p-6 md:grid-cols-2">
              {/* Use Voucher */}
              <FormField
                control={form.control}
                name="use_voucher"
                render={({ field, formState }) => (
                  <FormItem className="col-span-1 w-fit gap-4 space-x-4 rounded-md bg-background px-4 py-2 md:col-span-2">
                    <FormLabel className="font-light uppercase text-muted-foreground md:text-lg">Voucher</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={formState.isSubmitting}
                        aria-readonly
                        className="data-[state=unchecked]:bg-foreground/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel className="font-light uppercase text-muted-foreground md:text-lg">
                        location<span className="text-destructive">&nbsp;*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Where your actual location?"
                          className="bg-background"
                          disabled={formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Where your event city is?"
                          className="bg-background"
                          disabled={formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Time */}
              <div className="flex w-full flex-col">
                <FormField
                  control={form.control}
                  name="startAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-light uppercase text-muted-foreground md:text-lg">
                        Schedule <span className="text-destructive">&nbsp;*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn('w-full pl-3 text-left', !field.value && 'text-muted-foreground')}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Start from date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverAnchor />

                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromYear={2024}
                            toYear={2030}
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date <= new Date() || date > new Date('2040-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endAt"
                  render={({ field, formState }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              disabled={formState.isSubmitting}
                              className={cn('w-full pl-3 text-left', !field.value && 'text-muted-foreground')}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>End to date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverAnchor />

                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromYear={2024}
                            toYear={2030}
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date <= new Date() || date > new Date('2040-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Venue Type */}
              <FormField
                control={form.control}
                name="venueType"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="font-light uppercase text-muted-foreground md:text-lg">
                      Type of your event venue<span className="text-destructive">&nbsp;*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={formState.isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className={cn('bg-background', !field.value && 'text-muted-foreground')}>
                          <SelectValue placeholder="Choose your venue" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="INDOOR">Indoor</SelectItem>
                        <SelectItem value="OUTDOOR">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Must be provide information about the venue</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="font-light uppercase text-muted-foreground md:text-lg">
                      Category or Genre<span className="text-destructive">&nbsp;*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={formState.isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className={cn('bg-background', !field.value && 'text-muted-foreground')}>
                          <SelectValue placeholder="Choose your category" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {CATEGORY_TYPE.map((ctr) => (
                          <SelectItem
                            value={ctr}
                            key={ctr}
                            className="capitalize"
                          >
                            {ctr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Must have information about the category or genre</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reguler Session */}
              <Card className="flex w-full flex-col">
                <CardHeader>
                  <CardTitle className="font-light uppercase text-muted-foreground md:text-lg">
                    Ticket<span className="text-destructive">&nbsp;*</span>
                  </CardTitle>
                  <CardDescription>
                    If you want to create an event for free use only this session, the vip session is not recommended.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FormField
                    control={form.control}
                    name="priceReguler"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center gap-2.5">
                            <span className="block w-full">Rp.</span>
                            <Input
                              {...field}
                              min={0}
                              type="number"
                              step={1000}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="bg-background"
                              disabled={formState.isSubmitting}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacityReguler"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center justify-between gap-2.5">
                            <span className="block w-full">Capacity</span>
                            <Input
                              {...field}
                              min={0}
                              type="number"
                              className="bg-background"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              disabled={formState.isSubmitting}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* VIP session */}
              <Card
                className="flex w-full flex-col"
                aria-disabled
              >
                <CardHeader>
                  <CardTitle className="font-light uppercase text-muted-foreground md:text-lg">
                    Ticket<span className="text-destructive">&nbsp;*</span>
                  </CardTitle>
                  <CardDescription>
                    If you want to create an event for free use only this session, the vip session is not recommended.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FormField
                    control={form.control}
                    name="priceVip"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center gap-2.5">
                            <span className="block w-full">Rp.</span>
                            <Input
                              {...field}
                              min={0}
                              type="number"
                              step={1000}
                              className="bg-background"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              disabled={formState.isSubmitting || form.getValues('priceReguler')! <= 0}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacityVip"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center justify-between gap-2.5">
                            <span className="block w-full">Capacity</span>
                            <Input
                              {...field}
                              min={0}
                              type="number"
                              className="bg-background"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              disabled={formState.isSubmitting || form.getValues('priceReguler')! <= 0}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
