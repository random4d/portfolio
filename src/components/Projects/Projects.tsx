'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import styles from './Projects.module.css';
import { Work } from '@/types/microcms';

type Props = {
    projects: Work[];
};

const FIXED_TAGS = ['featured', 'media_art', 'VJ'];

const Projects = ({ projects }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tagParam = searchParams.get('tag');
    const effectiveFilterTag = tagParam === 'all' ? null : (tagParam || 'featured');

    const filteredProjects = useMemo(() => {
        if (!effectiveFilterTag) return projects;
        return projects.filter(project =>
            project.tags?.some(tag => tag.name.toLowerCase() === effectiveFilterTag.toLowerCase())
        );
    }, [projects, effectiveFilterTag]);

    const handleTagClick = (tagName: string) => {
        router.push(`${pathname}?tag=${tagName}`, { scroll: false });
    };

    if (!projects || projects.length === 0) {
        return (
            <section className={styles.projects}>
                <div className="container">
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No works found</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.projects}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTitle}>SELECTED WORKS</span>
                </div>

                <div className={styles.tagFilter}>
                    <button
                        className={`${styles.filterButton} ${tagParam === 'all' ? styles.active : ''}`}
                        onClick={() => handleTagClick('all')}
                    >
                        All
                    </button>
                    {FIXED_TAGS.map(tagName => (
                        <button
                            key={tagName}
                            className={`${styles.filterButton} ${effectiveFilterTag === tagName && tagParam !== 'all' ? styles.active : ''}`}
                            onClick={() => handleTagClick(tagName)}
                        >
                            {tagName}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filteredProjects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <Link href={`/works/${project.title}`} className={styles.cardLink}>
                                <div className={styles.image}>
                                    {project.thumbnail ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={`${project.thumbnail.url}?w=600&fm=webp&q=80`}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>NO IMAGE</div>
                                    )}
                                </div>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                            </Link>
                            <div className={styles.tags}>
                                {project.tags?.map(tag => (
                                    <button
                                        key={tag.id}
                                        className={styles.tagButton}
                                        onClick={() => handleTagClick(tag.name)}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                        No items found
                    </p>
                )}
            </div>
        </section>
    );
};

export default Projects;
