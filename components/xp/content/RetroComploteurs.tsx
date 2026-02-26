import React from 'react';

export default function RetroComploteurs() {
    return (
        <div className="font-serif p-4 bg-gray-100 h-full">
            <table border={0} style={{ width: '100%' }}>
                <tr>
                    <td style={{ verticalAlign: 'top', width: 200 }}>
                        <div className="border border-black bg-white p-2 text-center">
                            <b>BOOK COVER</b><br />
                            <br />
                            [ IMAGE ]<br />
                            <br />
                            <i>Les Comploteurs</i>
                        </div>
                    </td>
                    <td style={{ verticalAlign: 'top' }} className="pl-4">
                        <h1 className="font-bold text-xl mb-2">LES COMPLOTEURS</h1>
                        <p className="text-sm mb-4">
                            <b>Par Antton Rouget & Ramses Kefi</b><br />
                            Date de sortie: 23 Janvier 2026<br />
                            Prix: 20 EUR
                        </p>

                        <p className="mb-4">
                            Une enquete explosive sur l&apos;affaire Perdriau (Saint-Etienne).
                            Chantage, homophobie, pouvoir local.
                        </p>

                        <div className="bg-white border border-gray-400 p-2 mb-4">
                            <b>POURQUOI LIRE CE LIVRE ?</b>
                            <ul className="list-square pl-6 mt-2 text-sm">
                                <li>Recit chronologique des faits.</li>
                                <li>Analyse des logiques de controle politique.</li>
                                <li>L&apos;homophobie comme levier de  pression.</li>
                            </ul>
                        </div>

                        <a href="https://www.placedeslibraires.fr/livre/9782488666008-les-comploteurs-antton-rouget-ramses-kefi/" target="_blank" className="font-bold text-red-600 underline text-lg">
                            &gt;&gt; COMMANDER MAINTENANT &lt;&lt;
                        </a>
                    </td>
                </tr>
            </table>

            <hr className="my-6 border-black" />

            <h3 className="font-bold text-lg mb-2">INTERVIEW EXCLUSIVE</h3>
            <div className="border border-black p-1 bg-black text-white text-center">
                <a href="https://www.youtube.com/watch?v=Jlw544x4T5Q" target="_blank" className="block relative group">
                    <img
                        src="https://img.youtube.com/vi/Jlw544x4T5Q/maxresdefault.jpg"
                        alt="Antton Rouget Interview"
                        className="w-full border border-gray-600 group-hover:opacity-80"
                    />
                    <div className="mt-2 text-yellow-400 underline">
                        &gt; WATCH INTERVIEW WITH ANTTON ROUGET &lt;
                    </div>
                </a>
            </div>

            <div className="mt-6 border-t-2 border-black pt-4">
                <h4 className="font-bold underline mb-2">POINTS CLES:</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                        <b>Recit chronologique :</b><br />
                        Qui fait quoi, qui sait quoi. Les faits.
                    </li>
                    <li>
                        <b>Logiques de controle :</b><br />
                        Intimidation, intox, domination politique locale.
                    </li>
                    <li>
                        <b>L&apos;homophobie comme levier :</b><br />
                        Un mecanisme de pouvoir, pas juste un &quot;scandale&quot;.
                    </li>
                </ul>
            </div>
        </div>
    );
}
