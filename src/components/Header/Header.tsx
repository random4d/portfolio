'use client';

import { useState, useEffect, useCallback } from 'react';
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

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <nav className={styles.nav}>
                    <button
                        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
                        <Link href="/" className={styles.link} onClick={closeMenu}>Top</Link>
                        <Link href="/about" className={styles.link} onClick={closeMenu}>About</Link>
                        <Link href="/works" className={styles.link} onClick={closeMenu}>Works</Link>
                        <Link href="/contact" className={styles.link} onClick={closeMenu}>Contact</Link>
                    </div>
                    {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
                </nav>
            </div>
        </header>
    );
};

export default Header;
