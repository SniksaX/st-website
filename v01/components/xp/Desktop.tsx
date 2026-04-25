import React from 'react';
import styles from '../../app/xp/xp-theme.module.css';

interface DesktopProps {
    children: React.ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
    return (
        <div
            className={`${styles['xp-desktop']} ${styles['desktop-bg']} ${styles['xp-font']} fixed inset-0 overflow-hidden select-none`}
        >
            {children}
        </div>
    );
}
