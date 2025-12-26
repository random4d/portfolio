import styles from './About.module.css';
import { About as AboutType } from '@/types/microcms';

type Props = {
    data: AboutType;
};

const About = ({ data }: Props) => {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>About Me</h2>
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
