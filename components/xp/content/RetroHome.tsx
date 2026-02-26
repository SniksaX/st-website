import React from 'react';
import FacesMosaic from '@/components/FacesMosaic';

export default function RetroHome() {
    return (
        <div className="font-serif p-4 bg-white text-black text-center">
            <div className="mb-4 overflow-hidden whitespace-nowrap">
                <div className="retro-marquee text-red-600 font-bold text-xl">
                    *** WELCOME TO SANS TRANSITION *** MEDIA PAR ET POUR LES MINORITES ***
                </div>
            </div>

            <div className="p-4 border-b border-gray-400 mb-4 bg-[#F0F0F0]">
                <h3 className="font-bold underline mb-2">MISSION STATEMENT</h3>
                <p className="text-justify text-sm">
                    <b>Sans Transition</b> est un media radical, independant, par et pour les minorites.
                    Notre mission est simple : politiser sans bullshit. On raconte l&apos;actualite depuis les premiers concernes.
                    <br /><br />
                    On parle d&apos;abord a la generation Z et aux jeunes adultes qui se politisent, en assumant nos emotions.
                </p>
            </div>

            <div className="border-[4px] border-double border-blue-800 p-8 my-6 bg-[#FFFFCC]">
                <h1 className="text-4xl font-bold text-blue-900 mb-4" style={{ textShadow: '2px 2px #AAA' }}>
                    Sans Transition
                </h1>
                <hr className="border-t-2 border-black mb-4" />
                <p className="text-lg">
                    Media par et pour les minorites.
                </p>

                <div className="my-6 border-2 border-black bg-white p-1">
                    <div className="h-[200px] overflow-hidden relative">
                        <FacesMosaic variant="default" />
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"></div>
                    </div>
                </div>

                <div className="my-6">
                    <img
                        src="https://web.archive.org/web/20091027075215/http://geocities.com/Heartland/Bluffs/4157/underconstruction.gif"
                        alt="Under Construction"
                        className="inline-block mx-2"
                    />
                    <img
                        src="https://web.archive.org/web/20091027075215/http://geocities.com/Heartland/Bluffs/4157/underconstruction.gif"
                        alt="Under Construction"
                        className="inline-block mx-2"
                    />
                </div>
                <p className="text-sm font-bold text-red-600 blink">
                    NEW UPDATES COMING SOON!!!
                </p>
            </div>

            <div className="text-left mt-8">
                <h2 className="text-2xl font-bold bg-blue-800 text-white px-2 py-1 mb-2">
                    Latest News
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Check out our <a href="#" className="text-blue-600 underline">Youtube Channel</a>!</li>
                    <li>We are live every week.</li>
                    <li>Don&apos;t forget to sign the guestbook (Twitter/X).</li>
                </ul>
            </div>

            <style jsx>{`
                .retro-marquee {
                    display: inline-block;
                    padding-left: 100%;
                    animation: retro-marquee 12s linear infinite;
                }

                @keyframes retro-marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-200%);
                    }
                }
            `}</style>
        </div>
    );
}
