import type { Prisma } from "@prisma/client";

export type PropertyWithOwner = Prisma.PropertyGetPayload<{
  include: { owner: true }
}> & {
  isBookmarked?: boolean;
  bookmarkedBy: { id: string }[]
};