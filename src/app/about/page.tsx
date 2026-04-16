import AboutComponent from '@/components/About/About';
import { client } from '@/libs/client';
import { About, Performance, Exhibition } from '@/types/microcms';

export const revalidate = 60;

export default async function AboutPage() {
    const aboutData = await client.getObject<About>({
        endpoint: 'about',
    });

    const exhibitionData = await client.getList<Exhibition>({
        endpoint: 'exhibition',
        queries: { limit: 100, filters: 'publishedAt[exists]' }
    });

    const performanceData = await client.getList<Performance>({
        endpoint: 'performance',
        queries: { limit: 100, filters: 'publishedAt[exists]' }
    });

    return (
        <main>
            <AboutComponent
                data={aboutData}
                exhibitions={exhibitionData.contents}
                performances={performanceData.contents}
            />
        </main>
    );
}
