import React from 'react';

const schedule = [
    { day: "LUNDI", time: "09:00", show: "La TransMatinale", desc: "Revue de presse avec Hedji" },
    { day: "MARDI", time: "09:00", show: "La TransMatinale", desc: "Revue de presse" },
    { day: "MARDI", time: "20:00", show: "AKTU", desc: "Reaction a l'actu avec Amandine & Lucho" },
    { day: "MERCREDI", time: "09:00", show: "La TransMatinale", desc: "Revue de presse" },
    { day: "JEUDI", time: "09:00", show: "La TransMatinale", desc: "Revue de presse" },
    { day: "VENDREDI", time: "09:00", show: "La TransMatinale", desc: "Revue de presse" },
    { day: "VENDREDI", time: "20:00", show: "EKIP", desc: "Live chill avec la commu" },
];

export default function RetroCalendar() {
    return (
        <div className="font-serif p-4">
            <h2 className="text-center font-bold text-2xl mb-6 font-mono text-purple-900 border-b-2 border-purple-900 inline-block">
                PROGRAMME TV / STREAM
            </h2>

            <center>
                <p className="mb-4">
                    Retrouvez-nous sur <a href="https://twitch.tv/sans_transition" target="_blank" className="font-bold text-purple-700 underline">Twitch</a> !
                </p>

                <table
                    border={1}
                    cellPadding={5}
                    style={{ borderCollapse: 'collapse', borderColor: 'purple', width: '90%' }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#DDA0DD' }}>
                            <th>JOUR</th>
                            <th>HEURE</th>
                            <th>EMISSION</th>
                            <th>DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((s, i) => (
                            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8F8FF' }}>
                                <td><b>{s.day}</b></td>
                                <td style={{ textAlign: 'center' }}>{s.time}</td>
                                <td className="text-purple-900 font-bold">{s.show}</td>
                                <td className="text-sm">{s.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}
