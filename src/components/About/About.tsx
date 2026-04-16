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

const LOG_YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

/** Split rich HTML by <h1> tags into labeled sections */
const parseContentSections = (html: string): { label: string; html: string }[] => {
    const parts = html.split(/<h1[^>]*>(.*?)<\/h1>/i);
    // parts: [before_first_h1, label1, content1, label2, content2, ...]
    const sections: { label: string; html: string }[] = [];
    for (let i = 1; i < parts.length; i += 2) {
        const label = parts[i].trim();
        const content = (parts[i + 1] || '').trim();
        if (label) {
            sections.push({ label, html: content });
        }
    }
    return sections;
};

const About = ({ data, exhibitions, performances }: Props) => {
    if (!data) {
        return (
            <section className={styles.about}>
                <div className={styles.container}>
                    <p className={styles.loading}>Loading...</p>
                </div>
            </section>
        );
    }

    const safeExhibitions = Array.isArray(exhibitions) ? exhibitions : [];
    const safePerformances = Array.isArray(performances) ? performances : [];

    // Sort exhibitions by start_date desc
    const sortedExhibitions = [...safeExhibitions].sort((a, b) => {
        const aTime = a.start_date ? new Date(a.start_date).getTime() : 0;
        const bTime = b.start_date ? new Date(b.start_date).getTime() : 0;
        return bTime - aTime;
    });

    // Sort performances by event_date desc
    const sortedPerformances = [...safePerformances].sort((a, b) => {
        const aTime = a.event_date ? new Date(a.event_date).getTime() : 0;
        const bTime = b.event_date ? new Date(b.event_date).getTime() : 0;
        return bTime - aTime;
    });

    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <div className={styles.inner}>
                    {/* Biography */}
                    <section className={styles.section}>
                        <span className={styles.sectionLabel}>BIOGRAPHY</span>
                        <div
                            className={styles.bioContent}
                            dangerouslySetInnerHTML={{ __html: data.content || '' }}
                        />
                    </section>

                    {/* Exhibition */}
                    {sortedExhibitions.length > 0 && (
                        <section className={styles.section}>
                            <span className={styles.sectionLabel}>EXHIBITION</span>
                            <ul className={styles.entryList}>
                                {sortedExhibitions.map((exh) => (
                                    <li key={exh.id} className={styles.entry}>
                                        <span className={styles.entryDate}>
                                            {formatDate(exh.start_date)}
                                            {exh.end_date && ` – ${formatDate(exh.end_date)}`}
                                        </span>
                                        <div className={styles.entryBody}>
                                            {exh.exhibition_link ? (
                                                <a
                                                    href={exh.exhibition_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.entryTitle}
                                                >
                                                    {exh.exhibition_title} ↗
                                                </a>
                                            ) : (
                                                <span className={styles.entryTitle}>
                                                    {exh.exhibition_title}
                                                </span>
                                            )}
                                        </div>
                                        {exh.works_link && (
                                            <Link
                                                href={`/works/${exh.works_link.title}`}
                                                className={styles.entryWorkLink}
                                            >
                                                View work →
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Performance */}
                    {sortedPerformances.length > 0 && (
                        <section className={styles.section}>
                            <span className={styles.sectionLabel}>PERFORMANCE</span>
                            <ul className={styles.entryList}>
                                {sortedPerformances.map((perf) => (
                                    <li key={perf.id} className={styles.entry}>
                                        <span className={styles.entryDate}>
                                            {formatDate(perf.event_date)}
                                        </span>
                                        <div className={styles.entryBody}>
                                            {perf.event_link ? (
                                                <a
                                                    href={perf.event_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.entryTitle}
                                                >
                                                    {perf.event_title} ↗
                                                </a>
                                            ) : (
                                                <span className={styles.entryTitle}>
                                                    {perf.event_title}
                                                </span>
                                            )}
                                            {perf.description && (
                                                <span className={styles.entryDesc}>
                                                    {perf.description}
                                                </span>
                                            )}
                                        </div>
                                        {perf.works_link && (
                                            <Link
                                                href={`/works/${perf.works_link.title}`}
                                                className={styles.entryWorkLink}
                                            >
                                                View work →
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Log */}
                    <section className={styles.section}>
                        <span className={styles.sectionLabel}>LOG</span>
                        <div className={styles.yearTags}>
                            {LOG_YEARS.map((year) => (
                                <Link key={year} href={`/?tag=${year}`} className={styles.yearTag}>
                                    {year}
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Content2 — split by h1 into labeled sections */}
                    {data.content2 && parseContentSections(data.content2).map((sec, i) => (
                        <section key={i} className={styles.section}>
                            <span className={styles.sectionLabel}>{sec.label.toUpperCase()}</span>
                            <div
                                className={styles.bioContent}
                                dangerouslySetInnerHTML={{ __html: sec.html }}
                            />
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
