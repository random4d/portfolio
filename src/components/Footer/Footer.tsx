import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink} target="_blank" rel="noreferrer">Twitter</a>
                        <a href="#" className={styles.socialLink} target="_blank" rel="noreferrer">GitHub</a>
                        <a href="#" className={styles.socialLink} target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                    <p className={styles.copyright}>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
