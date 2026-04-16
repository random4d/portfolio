import { Suspense } from 'react';
import Projects from '@/components/Projects/Projects';
import { client } from '@/libs/client';
import { Work } from '@/types/microcms';

export const revalidate = 60;

export default async function Home() {
  const data = await client.getList<Work>({
    endpoint: 'works',
    queries: { limit: 30, filters: 'publishedAt[exists]' }
  });

  return (
    <main>
      <Suspense>
        <Projects projects={data.contents} />
      </Suspense>
    </main>
  );
}
