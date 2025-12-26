import Hero from '@/components/Hero/Hero';
import { client } from '@/libs/client';
import { Work } from '@/types/microcms';

export const revalidate = 60;

export default async function Home() {
  const data = await client.getList<Work>({
    endpoint: 'works',
    queries: { limit: 10 } // Fetch up to 10 latest works for randomness
  });

  return (
    <main>
      <Hero works={data.contents} />
    </main>
  );
}
