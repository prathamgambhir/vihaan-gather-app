'use server'

import dbConnect from '@/lib/db'
import { User } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function syncClerkUser() {
  await dbConnect()
  const clerkUser = await currentUser()
  if (!clerkUser) throw new Error('Unauthorized')

  await User.findOneAndUpdate(
    { email: clerkUser.emailAddresses[0].emailAddress?.toLowerCase() },
    {
      email: clerkUser.emailAddresses[0].emailAddress?.toLowerCase(),
      name: `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim(),
      profileImage: clerkUser.imageUrl,
    },
    { upsert: true, new: true }
  )

  revalidatePath('/')
}
