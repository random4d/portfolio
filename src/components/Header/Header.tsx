'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <nav className={styles.nav}>
                    <div className={styles.links}>
                        <Link href="/" className={styles.link}>top</Link>
                        <Link href="/about" className={styles.link}>about</Link>
                        <Link href="/works" className={styles.link}>works</Link>
                        <Link href="/contact" className={styles.link}>contact</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
