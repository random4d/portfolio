import { client } from '@/libs/client';
import { Work } from '@/types/microcms';
import Link from 'next/link';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
    const { contents } = await client.getList<Work>({
        endpoint: 'works',
    });

    return contents.map((work) => ({
        id: work.title,
    }));
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function WorkPage({ params }: Props) {
    const { id } = await params;
    const { contents } = await client.getList<Work>({
        endpoint: 'works',
        queries: { filters: `title[equals]${decodeURIComponent(id)}` },
    });

    const work = contents[0];

    if (!work) {
        return notFound();
    }

    return (
        <article className={styles.article}>
            <div className="container">
                <header className={styles.header}>
                    {/* Date and ID removed as requested */}
                    <h1 className={styles.title}>{work.title}</h1>
                    <div className={styles.tags}>
                        {work.tags && work.tags.map(tag => (
                            <Link key={tag.id} href={`/works?tag=${tag.name}`} className={styles.tag}>
                                {tag.name}
                            </Link>
                        ))}
                    </div>
                </header>

                <div className={styles.thumbnailWrapper}>
                    {work.thumbnail && (
                        <img src={work.thumbnail.url} alt={work.title} className={styles.thumbnail} />
                    )}
                </div>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: work.content }}
                />
            </div>
        </article>
    );
}
