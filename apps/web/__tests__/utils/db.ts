import prisma from '@/lib/prisma';

export async function resetDb() {
  // children -> parents
  await prisma.painSpikeEntry.deleteMany();
  await prisma.painSpike.deleteMany();

  // auth tables
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();

  await prisma.user.deleteMany();
}
