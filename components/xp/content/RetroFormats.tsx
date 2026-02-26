import React from 'react';

const formats = [
    {
        title: "Fokus",
        desc: "Pour decrypter l'actu. Zoom radical sur une figure ou une info toxique.",
        color: "orange"
    },
    {
        title: "Hedito",
        desc: "Coup de gueule perso et politique, ou on assume le feu et les larmes.",
        color: "red"
    },
    {
        title: "Interviews",
        desc: "Entretiens safe et profonds avec celles et ceux qu'on n'ecoute jamais.",
        color: "pink"
    },
    {
        title: "L'Oeil d'Amandine",
        desc: "Lecture feministe radicale de l'actu, precise et documentee.",
        color: "orange"
    },
    {
        title: "L'Oeil de Lucho",
        desc: "Ancrage historique pour piger le present calmement mais surement.",
        color: "orange"
    },
    {
        title: "Mikro",
        desc: "Micro-trottoirs sensibles, au coeur des manifs et des luttes.",
        color: "orange"
    }
];

const values = [
    { title: "Independance", desc: "Aucune concession sur nos choix editoriaux." },
    { title: "Clarte", desc: "Vulgariser, couper dans le gras, zero jargon inutile." },
    { title: "Humanite", desc: "Mettre les personnes au centre, ecouter, respecter." },
    { title: "Rigueur", desc: "Verifier, sourcer, contextualiser." }
];

export default function RetroFormats() {
    return (
        <div className="font-serif p-4">
            <h2 className="text-xl font-bold bg-blue-800 text-white px-2 mb-4">
                NOS FORMATS & VALEURS
            </h2>

            <p className="mb-4">
                Voici la galaxie editoriale de <b>Sans Transition</b>.
            </p>

            <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                    <tr style={{ backgroundColor: '#EEEEEE' }}>
                        <th style={{ width: '50%' }} className="text-left">FORMATS</th>
                        <th style={{ width: '50%' }} className="text-left">VALEURS</th>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top' }}>
                            <dl>
                                {formats.map(f => (
                                    <React.Fragment key={f.title}>
                                        <dt className="font-bold underline text-blue-900">{f.title}</dt>
                                        <dd className="mb-2 italic text-sm">{f.desc}</dd>
                                    </React.Fragment>
                                ))}
                            </dl>
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                            <ul className="list-square">
                                {values.map(v => (
                                    <li key={v.title} className="mb-2">
                                        <b>{v.title}</b><br />
                                        <span className="text-sm">{v.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
