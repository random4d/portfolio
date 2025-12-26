'use client';

import styles from './Contact.module.css';

const Contact = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className="container">
                <h2 className={styles.title}>Get In Touch</h2>
                <div className={styles.formContainer}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <input type="text" id="name" className={styles.input} placeholder="Your Name" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input type="email" id="email" className={styles.input} placeholder="your@email.com" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Message</label>
                            <textarea id="message" className={styles.textarea} placeholder="How can I help you?"></textarea>
                        </div>
                        <button type="submit" className={styles.button}>Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
