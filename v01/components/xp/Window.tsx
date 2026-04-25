import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import styles from '../../app/xp/xp-theme.module.css';

interface WindowProps {
    title: string;
    children: React.ReactNode;
    icon?: string;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export default function Window({ title, children, icon, onClose, onMinimize, onMaximize }: WindowProps) {
    const dragControls = useDragControls();

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="absolute flex flex-col rounded-t-[8px] overflow-hidden shadow-[0px_0px_20px_rgba(0,0,0,0.5)] bg-[#ECE9D8]
                 top-0 left-0 right-0 bottom-[30px] rounded-none border-x-0 border-b-0
                 md:top-[5%] md:left-[5%] md:right-[5%] md:bottom-[8%] md:rounded-t-[8px] md:border-[3px]"
            style={{
                borderColor: '#245DDA',
                // borderBottom: 'none' // Handled by classes now
            }}
        >
            {/* Title Bar */}
            <div
                onPointerDown={(e) => dragControls.start(e)}
                className="h-[30px] flex items-center justify-between px-2 cursor-default select-none bg-gradient-to-r from-[#245DDA] via-[#2055C9] to-[#245DDA]"
                style={{
                    textShadow: '1px 1px 1px #0F308C'
                }}
            >
                <div className="flex items-center gap-1 text-white font-bold text-sm tracking-wide">
                    {icon && <img src={icon} alt="" className="w-4 h-4" />}
                    <span>{title}</span>
                </div>

                <div className="flex gap-1">
                    {/* Minimize */}
                    <button
                        onClick={onMinimize}
                        className="w-[21px] h-[21px] bg-[#245DDA] rounded-sm hover:brightness-110 active:brightness-90 flex items-end justify-center pb-1.5 border border-white/40 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3)] transition-all"
                    >
                        <div className="w-2.5 h-[2px] bg-white"></div>
                    </button>
                    {/* Maximize */}
                    <button
                        onClick={onMaximize}
                        className="w-[21px] h-[21px] bg-[#245DDA] rounded-sm hover:brightness-110 active:brightness-90 flex items-center justify-center border border-white/40 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3)] transition-all"
                    >
                        <div className="w-[10px] h-[8px] border-[2px] border-white border-t-[3px]"></div>
                    </button>
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="w-[21px] h-[21px] bg-[#D64319] rounded-sm hover:bg-[#E3542B] active:bg-[#B5340F] flex items-center justify-center border border-white/40 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3)] transition-all ml-1"
                    >
                        <div className="text-white text-lg leading-none font-bold" style={{ marginTop: '-2px' }}>×</div>
                    </button>
                </div>
            </div>

            {/* Content Area (Browser Viewport) */}
            <div className="flex-1 flex flex-col relative bg-white border-[3px] border-[#245DDA] border-t-0 min-h-0">
                {children}
            </div>
        </motion.div>
    );
}
