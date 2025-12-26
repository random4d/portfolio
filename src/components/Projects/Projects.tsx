import Link from 'next/link';
import styles from './Projects.module.css';
import { Work } from '@/types/microcms';

type Props = {
    projects: Work[];
};

const Projects = ({ projects }: Props) => {
    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className={styles.projects}>
                <div className="container">
                    <h2 className={styles.title}>FEATURED_WORKS</h2>
                    <p style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono)' }}>NO_DATA_FOUND</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <h2 className={styles.title}>FEATURED_WORKS</h2>
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <Link href={`/works/${project.title}`} key={project.id} className={styles.card}>
                            <article style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className={styles.image}>
                                    {project.thumbnail ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={project.thumbnail.url}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontFamily: 'var(--font-mono)' }}>NO_IMG</div>
                                    )}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <span className={styles.id}>ID_{project.id.slice(0, 6)}</span>
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
            </div>
        </section>
    );
};

export default Projects;
