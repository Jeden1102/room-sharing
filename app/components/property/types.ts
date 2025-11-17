
import type {  Prisma } from "@prisma/client";

export type PropertyWithOwner = Prisma.PropertyGetPayload<{
  include: { owner: true }
}>;