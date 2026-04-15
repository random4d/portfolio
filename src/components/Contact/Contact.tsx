import styles from './Contact.module.css';

const Contact = () => {
    return (
        <section className={styles.contact}>
            <div className="container">
                <div className={styles.content}>
                    <span className={styles.label}>CONTACT</span>
                    <h2 className={styles.title}>Get in Touch</h2>
                    <div className={styles.links}>
                        <a href="mailto:nyagaiworks@gmail.com" className={styles.linkRow}>
                            <span className={styles.linkLabel}>Email</span>
                            <span className={styles.linkValue}>nyagaiworks@gmail.com</span>
                        </a>
                        <a href="https://x.com/random6D" className={styles.linkRow} target="_blank" rel="noreferrer">
                            <span className={styles.linkLabel}>X (Twitter)</span>
                            <span className={styles.linkValue}>@random6D →</span>
                        </a>
                        <a href="https://instagram.com/random6D" className={styles.linkRow} target="_blank" rel="noreferrer">
                            <span className={styles.linkLabel}>Instagram</span>
                            <span className={styles.linkValue}>@random6D →</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
