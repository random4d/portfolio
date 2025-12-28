import styles from './About.module.css';
import { About as AboutType, Performance, Exhibition } from '@/types/microcms';
import Link from 'next/link';

type Props = {
    data: AboutType;
    exhibitions: Exhibition[];
    performances: Performance[];
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
};

const About = ({ data, exhibitions, performances }: Props) => {
    // Guard against missing data
    if (!data) {
        return (
            <section id="about" className={styles.about}>
                <div className={styles.container}>
                    <p style={{ color: '#888' }}>Loading...</p>
                </div>
            </section>
        );
    }

    const safeExhibitions = Array.isArray(exhibitions) ? exhibitions : [];
    const safePerformances = Array.isArray(performances) ? performances : [];

    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>About Me</h2>
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: data.content || '' }}
                    />
                </div>

                {/* Exhibition Section */}
                {safeExhibitions.length > 0 && (
                    <div style={{ marginTop: '4rem' }}>
                        <h3 className={styles.subTitle}>Exhibition</h3>
                        <ul className={styles.legacyList}>
                            {safeExhibitions.map((exh) => (
                                <li key={exh.id} style={{ marginBottom: '0.5rem', listStyle: 'none', display: 'block' }}>
                                    <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', marginRight: '1rem' }}>
                                        {formatDate(exh.start_date)}
                                        {exh.end_date && ` - ${formatDate(exh.end_date)}`}
                                    </span>
                                    <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                                        {exh.exhibition_link ? (
                                            <a href={exh.exhibition_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                                {exh.exhibition_title}
                                            </a>
                                        ) : (
                                            exh.exhibition_title
                                        )}
                                    </span>
                                    {exh.works_link && (
                                        <Link href={`/works/${exh.works_link.title}`} style={{ marginLeft: '1rem', color: 'var(--accent-color)', textDecoration: 'none' }}>
                                            ◆
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Performance Section */}
                {safePerformances.length > 0 && (
                    <div style={{ marginTop: '4rem' }}>
                        <h3 className={styles.subTitle}>Performance</h3>
                        <ul className={styles.legacyList}>
                            {safePerformances.map((perf) => (
                                <li key={perf.id} style={{ marginBottom: '0.5rem', listStyle: 'none', display: 'block' }}>
                                    <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', marginRight: '1rem' }}>
                                        {formatDate(perf.event_date)}
                                    </span>
                                    <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                                        {perf.event_link ? (
                                            <a href={perf.event_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                                {perf.event_title}
                                            </a>
                                        ) : (
                                            perf.event_title
                                        )}
                                    </span>
                                    <span style={{ color: '#bbb' }}>{perf.description}</span>
                                    {perf.works_link && (
                                        <Link href={`/works/${perf.works_link.title}`} style={{ marginLeft: '1rem', color: 'var(--accent-color)', textDecoration: 'none' }}>
                                            ◆
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Log Section with Year Tags */}
                <div style={{ marginTop: '4rem' }}>
                    <h3 className={styles.subTitle}>Log</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                            <Link
                                key={year}
                                href={`/works?tag=${year}`}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    padding: '0.5rem 1rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '20px',
                                    color: '#888',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {year}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Content2 Section */}
                {data.content2 && (
                    <div style={{ marginTop: '4rem' }}>
                        <div
                            className={styles.text}
                            dangerouslySetInnerHTML={{ __html: data.content2 }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
