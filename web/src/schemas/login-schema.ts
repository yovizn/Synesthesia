import { z } from 'zod'

const loginFormSchema = z.object({
  username_email: z.string().min(6, {
    message: 'Username or Email requires',
  }),
  password: z.string().min(6, { message: 'Password requires' }),
})

type LoginFormType = z.infer<typeof loginFormSchema>

export { loginFormSchema, type LoginFormType }
