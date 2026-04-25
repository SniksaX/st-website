import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../../app/xp/xp-theme.module.css';

export default function Taskbar() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-[30px] z-50 flex items-center bg-gradient-to-b from-[#245DDA] via-[#225AD3] to-[#1941A5] border-t border-[#3E80ED] text-white">
            {/* Start Button */}
            <motion.button
                whileHover={{ filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.98 }}
                className="h-full px-2 flex items-center gap-1.5 ml-0 rounded-r-[10px] bg-gradient-to-b from-[#3C8D0D] to-[#245505] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.4),2px_0px_5px_rgba(0,0,0,0.3)] italic font-bold text-lg select-none"
                style={{
                    marginTop: '-2px',
                    height: '32px',
                    borderTopLeftRadius: '0px',
                    borderBottomRightRadius: '10px',
                    borderTopRightRadius: '10px'
                }}
            >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center opacity-90 shadow-sm">
                    {/* Simple colored squares for windows logo */}
                    <div className="grid grid-cols-2 gap-[1px]">
                        <div className="w-1.5 h-1.5 bg-[#F25022]"></div>
                        <div className="w-1.5 h-1.5 bg-[#7FBA00]"></div>
                        <div className="w-1.5 h-1.5 bg-[#00A4EF]"></div>
                        <div className="w-1.5 h-1.5 bg-[#FFB900]"></div>
                    </div>
                </div>
                <span className="drop-shadow-md pr-2">start</span>
            </motion.button>

            {/* Task List (Active Window) */}
            <div className="flex-1 flex items-center px-2 gap-1 overflow-hidden">
                <div className="bg-[#1C46BB] hover:bg-[#2051D6] active:bg-[#153691] active:shadow-inner text-white/90 px-2 py-0.5 rounded-[3px] w-48 text-xs flex items-center gap-2 cursor-pointer shadow-[inset_1px_1px_0px_rgba(255,255,255,0.1)] transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Google_Chrome_icon_%282011%29.svg" alt="Chrome" className="w-4 h-4" />
                    <span className="truncate">Sans Transition - Google ...</span>
                </div>
            </div>

            {/* System Tray */}
            <div className="h-full bg-[#0B76BA] px-3 flex items-center gap-3 border-l border-[#095D95] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full border border-white/30 bg-blue-400/50"></div> {/* Generic icon */}
                    <div className="w-4 h-4 bg-red-500/80 rounded-sm border border-white/20"></div> {/* Generic icon */}
                </div>
                <span className="text-xs font-normal tracking-wide drop-shadow-sm">{time}</span>
            </div>
        </div>
    );
}
