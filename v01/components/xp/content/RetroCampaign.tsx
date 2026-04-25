import React, { useEffect, useState } from 'react';

type ProgressData = {
    monthlyActive: number;
    monthlyAmount?: number;
    goal?: number;
    currency?: string;
};

export default function RetroCampaign() {
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchProgress() {
            try {
                const res = await fetch('/api/don-progress');
                if (res.ok) {
                    const data = await res.json();
                    if (!cancelled) setProgress(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchProgress();
        return () => { cancelled = true; };
    }, []);

    const goal = 1000;
    const current = progress?.monthlyActive ?? 350; // Fallback to ~35% if loading fails
    const pct = Math.min(100, Math.round((current / goal) * 100));

    return (
        <div className="font-serif p-4 bg-[#FFFFCC] border-2 border-red-600 border-dashed m-2">
            <center>
                <h1 className="text-red-600 font-bold text-2xl blink">
                    !!! URGENT !!! SOUTENEZ-NOUS !!!
                </h1>
                <h2 className="font-bold text-lg mt-2">
                    La Transition - L&apos;independance ou rien.
                </h2>
            </center>

            <hr className="border-black my-4" />

            <p className="text-lg">
                <b>1 000 personnes a 2 €/mois</b> = un media qui ne doit rien a personne.
            </p>

            <p className="mt-4">
                Il y a des medias pour les patrons, d&apos;autres pour les fachos.
                <b>Sans Transition</b>, c&apos;est un media par et pour les minorites.
            </p>

            <div className="my-6 border border-black p-4 bg-white">
                <h3 className="font-bold underline mb-2">Pourquoi nous avons besoin de vous ?</h3>
                <ul className="list-disc pl-6">
                    <li>Production radicale (tournages, montages)</li>
                    <li>Communaute organisee (moderation, discord)</li>
                    <li>Autonomie totale (salaires, materiel)</li>
                </ul>
            </div>

            <center>
                <table border={1} cellPadding={2} style={{ width: '80%' }}>
                    <tbody>
                        <tr>
                            <td className="text-center text-white font-bold bg-black">
                                DONATIONS PROGRESS
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-[#CCCCCC]">
                                <div style={{ width: '100%', border: '1px solid black', height: '20px', backgroundColor: 'white', position: 'relative' }}>
                                    <div style={{ width: `${pct}%`, background: 'blue', height: '100%', transition: 'width 1s' }}></div>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', textAlign: 'center', fontSize: '12px', color: pct > 50 ? 'white' : 'black' }}>
                                        {loading ? 'LOADING...' : `${pct}% REACHED`}
                                    </div>
                                </div>
                                <div className="text-xs text-center mt-1">
                                    {loading ? '...' : `${current} / ${goal} SUPPORTERS`}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />

                <a href="https://www.helloasso.com/associations/sans-transition/formulaires/1" target="_blank" className="text-xl font-bold bg-yellow-400 border-2 border-black px-4 py-2 hover:bg-yellow-300">
                    &gt;&gt; CLICK HERE TO DONATE (HelloAsso) &lt;&lt;
                </a>
                <br /><br />
                <p className="text-sm">
                    <i>&quot;Soutenir Sans Transition, ce n&apos;est pas donner : c&apos;est prendre parti.&quot;</i>
                </p>
            </center>
        </div>
    );
}
