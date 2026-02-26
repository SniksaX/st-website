import React from 'react';

const team = [
    {
        name: 'Hedi',
        role: 'Fondateur . Redac Chef',
        bio: "Createur de Sans Transition. Ligne claire : radical, pedagogique, zero bullshit.",
        img: '/hedi.png',
        socials: { tiktok: 'hedjient', instagram: 'hedjient' }
    },
    {
        name: 'Amandine',
        role: 'Chroniqueuse . Feminisme',
        bio: "Regard feministe sur l'actu. Analyses qui claquent, ancrees dans le reel.",
        img: '/amandine.png',
        socials: { tiktok: 'carpedine', instagram: 'amandine_chbd' }
    },
    {
        name: 'Louis',
        role: 'Chroniqueur . Histoire politique',
        bio: "Remet les faits dans le temps pour comprendre le present.",
        img: '/louis.png',
        socials: { tiktok: 'louis_bnh', instagram: 'louis_bnh' }
    },
];

export default function RetroAbout() {
    return (
        <div className="font-serif p-4">
            <h2 className="text-center font-bold text-2xl text-blue-800 underline mb-6">
                THE TEAM
            </h2>

            <center>
                <table
                    border={1}
                    cellPadding={10}
                    cellSpacing={0}
                    width="90%"
                    style={{ borderCollapse: 'collapse', borderColor: '#000000', backgroundColor: '#FFFFFF' }}
                >
                    <tbody>
                        <tr style={{ backgroundColor: '#CCCCCC' }}>
                            <th>Photo</th>
                            <th>Name / Role</th>
                            <th>Description</th>
                        </tr>
                        {team.map((member) => (
                            <tr key={member.name}>
                                <td style={{ textAlign: 'center', verticalAlign: 'top', width: 120 }}>
                                    <img src={member.img} alt={member.name} width="100" height="120" style={{ border: '1px solid black' }} />
                                </td>
                                <td style={{ verticalAlign: 'top' }}>
                                    <b>{member.name}</b>
                                    <br />
                                    <i className="block mb-2">{member.role}</i>
                                    {member.socials && (
                                        <div className="text-xs">
                                            [ <a href={`https://tiktok.com/@${member.socials.tiktok}`} target="_blank" className="text-blue-600 hover:text-red-500 underline">TikTok</a> ]
                                            &nbsp;
                                            [ <a href={`https://instagram.com/${member.socials.instagram}`} target="_blank" className="text-blue-600 hover:text-red-500 underline">Insta</a> ]
                                        </div>
                                    )}
                                </td>
                                <td style={{ verticalAlign: 'top' }}>
                                    {member.bio}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}
