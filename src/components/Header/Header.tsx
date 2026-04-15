'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <nav className={styles.nav}>
                    <div className={styles.links}>
                        <Link href="/" className={styles.link}>Top</Link>
                        <Link href="/about" className={styles.link}>About</Link>
                        <Link href="/works" className={styles.link}>Works</Link>
                        <Link href="/contact" className={styles.link}>Contact</Link>
                    </div>
                    <button
                        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
                        <Link href="/" className={styles.mobileLink} onClick={closeMenu}>Top</Link>
                        <Link href="/about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
                        <Link href="/works" className={styles.mobileLink} onClick={closeMenu}>Works</Link>
                        <Link href="/contact" className={styles.mobileLink} onClick={closeMenu}>Contact</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
