import { z } from "zod";

// Mold objects for Zod validator
const zMold = z.object({
  number: z.string(),
  description: z.string(),
  cycle_time: z.number(),
  status: z.enum(['Active', 'Maintenance', 'Retired']),
});

const zUpdateMold = z.object({
  number: z.string(),
  mold: zMold
});

const zDeleteMold = z.object({
  number: z.string()
})

export {
  zMold,
  zUpdateMold,
  zDeleteMold
}
