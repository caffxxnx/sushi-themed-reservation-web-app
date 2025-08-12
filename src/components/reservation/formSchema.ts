import { z } from 'zod';

export const formSchema = z.object({
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string({ message: 'Time is required' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  phone: z.string().nonempty({ message: 'Phone is required' }),
});

export type FormValues = z.infer<typeof formSchema>;
