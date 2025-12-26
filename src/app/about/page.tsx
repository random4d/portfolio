import AboutComponent from '@/components/About/About';
import { client } from '@/libs/client';
import { About } from '@/types/microcms';

export const revalidate = 60;

export default async function AboutPage() {
    const data = await client.getObject<About>({
        endpoint: 'about',
    });

    return (
        <main>
            <AboutComponent data={data} />
        </main>
    );
}
