'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './Projects.module.css';
import { Work, Tag } from '@/types/microcms';

type Props = {
    projects: Work[];
};

const FIXED_TAGS = ['featured', 'media_art', 'VJ'];

const Projects = ({ projects }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Derived state from URL
    // Rule:
    // - ?tag=all -> Show ALL
    // - ?tag=featured -> Show Featured
    // - ?tag=VJ -> Show VJ
    // - (no tag) -> Default to Featured
    const tagParam = searchParams.get('tag');

    // Determine the "effective" filter tag.
    // If 'all', we want NO filter (null).
    // If missing, we want 'featured'.
    // Otherwise, use the tag.
    const effectiveFilterTag = tagParam === 'all' ? null : (tagParam || 'featured');

    // Filter projects by effective tag
    const filteredProjects = useMemo(() => {
        if (!effectiveFilterTag) return projects; // Show all
        return projects.filter(project =>
            project.tags?.some(tag => tag.name.toLowerCase() === effectiveFilterTag.toLowerCase())
        );
    }, [projects, effectiveFilterTag]);

    const handleTagClick = (tagName: string) => {
        // Update URL
        router.push(`/works?tag=${tagName}`, { scroll: false });
    };

    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className={styles.projects}>
                <div className="container">
                    <p style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono)' }}>NO_DATA_FOUND</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                {/* Tag Filter */}
                <div className={styles.tagFilter}>
                    <button
                        className={`${styles.filterButton} ${tagParam === 'all' ? styles.active : ''}`}
                        onClick={() => handleTagClick('all')}
                    >
                        ALL
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
                        <Link href={`/works/${project.title}`} key={project.id} className={styles.card}>
                            <article style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                                        <div style={{ width: '100%', height: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontFamily: 'var(--font-mono)' }}>NO_IMG</div>
                                    )}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                    </div>

                                    <div className={styles.footer}>
                                        <div className={styles.tags}>
                                            {project.tags && project.tags.map(tag => (
                                                <span key={tag.id} className={styles.tag}>{tag.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono)', marginTop: '2rem' }}>
                        NO_ITEMS_WITH_TAG
                    </p>
                )}
            </div>
        </section>
    );
};

export default Projects;
