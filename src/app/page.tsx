import Hero from '@/components/Hero/Hero';
import { client } from '@/libs/client';
import { Work } from '@/types/microcms';

export const revalidate = 60;

export default async function Home() {
  const data = await client.getList<Work>({
    endpoint: 'works',
    queries: { limit: 30 }
  });

  const featuredWorks = data.contents.filter(work =>
    work.tags?.some(tag => tag.name === 'featured')
  );

  return (
    <main>
      <Hero works={featuredWorks} />
    </main>
  );
}
