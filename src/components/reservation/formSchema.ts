import { z } from 'zod';

export const formSchema = z.object({
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string({ message: 'Time is required' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  phone: z
    .string()
    .nonempty({ message: 'Phone is required' })
    .regex(/^0[789]0\d{8}$/, {
      message:
        'Phone number must be a valid 11-digit number starting with 070, 080, or 090',
    }),
  guests: z.string().refine((n) => +n > 0 && +n <= 10, {
    message: 'Number of guests must be 1-10',
  }),
});

export type FormValues = z.infer<typeof formSchema>;
