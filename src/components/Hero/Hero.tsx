'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DraggableWindow } from '../DraggableWindow';
import { Work } from '@/types/microcms';
import styles from './Hero.module.css';
import GLSLCanvas from '../GLSLCanvas/GLSLCanvas';
import { shaders } from '../GLSLCanvas/shaders';

type Props = {
    works: Work[];
};

const glslConfigs = [
    { id: 'SYS_NOISE', shader: shaders.noise, title: 'SYSTEM_NOISE' },
    { id: 'SCN_LINE', shader: shaders.scanline, title: 'SCAN_MONITOR' },
    { id: 'MTX_FLOW', shader: shaders.matrix, title: 'DATA_FLOW' },
    { id: 'PLSM_CORE', shader: shaders.plasma, title: 'CORE_TEMP' },
];

const Hero = ({ works }: Props) => {
    const [worksItems, setWorksItems] = useState<{ work: Work; style: React.CSSProperties }[]>([]);
    const [glslItems, setGlslItems] = useState<{ config: typeof glslConfigs[0]; style: React.CSSProperties }[]>([]);

    useEffect(() => {
        // Setup GLSL Dummy Windows (runs once)
        // 4 Positions for GLSL (Background/Filler areas - Centered)
        const glslLayouts = [
            { top: '60%', left: '25%', zIndex: 5 },   // Bottom Left (More centered)
            { top: '15%', left: '45%', zIndex: 5 },   // Top Center (More centered)
            { top: '40%', left: '15%', zIndex: 5 },   // Middle Left (More centered)
            { top: '65%', left: '65%', zIndex: 5 },   // Bottom Right corner (More centered)
        ];

        setGlslItems(glslConfigs.map((config, i) => {
            const randomWidth = Math.floor(Math.random() * (400 - 250 + 1)) + 250;
            const randomHeight = Math.floor(Math.random() * (400 - 250 + 1)) + 250;
            return {
                config,
                style: {
                    ...glslLayouts[i],
                    animationDelay: `${i * 1.2 + 1}s`,
                    width: `${randomWidth}px`,
                    height: `${randomHeight}px`
                }
            };
        }));
    }, []);

    useEffect(() => {
        // Setup Works
        if (works && works.length > 0) {
            // 3 Positions for Works (High visibility areas - Centered)
            const workLayouts = [
                { top: '20%', left: '20%', zIndex: 10 },  // Top Left (More centered)
                { top: '50%', left: '55%', zIndex: 10 },  // Bottom Rightish (More centered)
                { top: '30%', left: '60%', zIndex: 10 },  // Top Right (More centered)
            ];

            // Randomly pick which work goes to which fixed slot
            const shuffledWorks = [...works].sort(() => 0.5 - Math.random()).slice(0, 3);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setWorksItems(shuffledWorks.map((work, i) => ({
                work,
                style: { ...workLayouts[i], animationDelay: `${i * 1.5}s` }
            })));
        }
    }, [works]);

    return (
        <section className={styles.hero}>
            {/* GLSL Dummy Windows */}
            {glslItems.map((item) => (
                <DraggableWindow
                    key={item.config.id}
                    initialTop={item.style.top as string}
                    initialLeft={item.style.left as string}
                    zIndex={item.style.zIndex as number}
                >
                    {/* GLSL Window */}
                    <div
                        className={styles.floatingWindow}
                        style={{
                            position: 'relative',
                            top: 'auto', left: 'auto',
                            width: item.style.width,
                            animationDelay: item.style.animationDelay as string,
                            margin: 0
                        }}
                    >
                        <div
                            className={item.config.id === 'MTX_FLOW' ? styles.fwContentAdditive : styles.fwContent}
                            style={{ height: item.style.height, overflow: 'hidden', borderRadius: '20px', borderTop: 'none' }}
                        >
                            <GLSLCanvas
                                fragmentShader={item.config.shader}
                                blendMode={item.config.id === 'MTX_FLOW' ? 'additive' : 'normal'}
                            />
                        </div>
                    </div>
                </DraggableWindow>
            ))}

            {/* Floating Works Windows */}
            {worksItems.map((item) => (
                <DraggableWindow
                    key={item.work.id}
                    initialTop={item.style.top as string}
                    initialLeft={item.style.left as string}
                    zIndex={item.style.zIndex as number}
                >
                    <Link
                        href={`/works/${item.work.title}`}
                        className={styles.floatingWindow}
                        style={{
                            position: 'relative',
                            top: 'auto', left: 'auto',
                            animationDelay: item.style.animationDelay as string,
                            textDecoration: 'none',
                            display: 'block'
                        }}
                        draggable={false}
                    >
                        <div className={styles.fwHeader}>
                            <span className={styles.fwHeaderL}>+ {item.work.title}</span>
                        </div>
                        <div className={styles.fwThumbnail}>
                            {item.work.thumbnail?.url ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={item.work.thumbnail.url}
                                    alt={item.work.title}
                                    className={styles.thumbImage}
                                />
                            ) : (
                                <div className={styles.noImage}>
                                    <span>NO_IMAGE</span>
                                </div>
                            )}
                        </div>
                    </Link>
                </DraggableWindow>
            ))}
        </section>
    );
};

export default Hero;
