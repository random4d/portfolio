'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

type Props = {
    initialTop: string | number;
    initialLeft: string | number;
    zIndex?: number;
    children: ReactNode;
    className?: string; // To pass styles if needed
};

export const DraggableWindow = ({ initialTop, initialLeft, zIndex = 1, children, className }: Props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [currentZIndex, setCurrentZIndex] = useState(zIndex);
    const [hasMoved, setHasMoved] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef<{ x: number; y: number } | null>(null);
    const initialPosRef = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        // Prevent default to stop text selection etc, but be careful with inputs (none here)
        e.preventDefault();
        setIsDragging(true);
        setHasMoved(false);
        setCurrentZIndex(100); // Bring to front while dragging

        dragStartRef.current = { x: e.clientX, y: e.clientY };
        initialPosRef.current = { ...position };

        // Capture pointer to ensure we get events even if mouse leaves window
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !dragStartRef.current) return;

        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            setHasMoved(true); // Flag that we moved significantly
        }

        setPosition({
            x: initialPosRef.current.x + dx,
            y: initialPosRef.current.y + dy,
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        dragStartRef.current = null;
        (e.target as Element).releasePointerCapture(e.pointerId);
    };

    // Intercept click to prevent navigation if dragged
    const handleClickCapture = (e: React.MouseEvent) => {
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                position: 'absolute',
                top: initialTop,
                left: initialLeft,
                zIndex: currentZIndex,
                transform: `translate(${position.x}px, ${position.y}px)`,
                touchAction: 'none', // Critical for dragging on touch devices
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClickCapture={handleClickCapture}
        >
            {children}
        </div>
    );
};
