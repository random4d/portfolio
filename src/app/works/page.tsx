import { Suspense } from 'react';
import { client } from '@/libs/client';
import { Work } from '@/types/microcms';
import ProjectsComponent from '@/components/Projects/Projects';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function WorksPage() {
    const data = await client.getList<Work>({
        endpoint: 'works',
        queries: { limit: 100, filters: 'publishedAt[exists]' },
    });

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ProjectsComponent projects={data.contents} />
            </Suspense>
        </main>
    );
}
