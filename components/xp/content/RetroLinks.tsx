import React from 'react';

export default function RetroLinks() {
    return (
        <div className="font-serif p-4">
            <h2 className="text-xl font-bold mb-4 bg-yellow-200 inline-block border border-black px-2">
                MY FAVORITE LINKS
            </h2>

            <table border={0} style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td style={{ verticalAlign: 'top', width: '50%' }}>
                            <h3 className="font-bold underline mb-2">Social Media</h3>
                            <ul className="list-square pl-6 text-blue-800">
                                <li>
                                    <a href="https://tiktok.com/@sanstransition" target="_blank" className="hover:bg-blue-800 hover:text-white">
                                        My TikTok Page
                                    </a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/sanstransition__" target="_blank" className="hover:bg-blue-800 hover:text-white">
                                        Instagram Photos
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/sanstransition_" target="_blank" className="hover:bg-blue-800 hover:text-white">
                                        Twitter / X
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com/@SansTransitionMedia" target="_blank" className="hover:bg-blue-800 hover:text-white">
                                        YouTube Videos
                                    </a>
                                </li>
                            </ul>
                        </td>
                        <td style={{ verticalAlign: 'top', width: '50%' }}>
                            <h3 className="font-bold underline mb-2">Webring / Friends</h3>
                            <ul className="list-circle pl-6 text-green-800">
                                <li>
                                    <a href="https://gofund.me/6e217b10a" target="_blank">Help Abood</a>
                                </li>
                                <li>
                                    <a href="https://gofund.me/ed90a35c6" target="_blank">Help Elodie</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <hr className="my-4 border-dashed border-gray-400" />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: 'top' }} colSpan={2}>
                            <h3 className="font-bold underline mb-2">Legal / Info</h3>
                            <div className="flex gap-4 text-sm font-mono">
                                <a href="/mentions-legales" className="text-gray-600 hover:bg-black hover:text-white bracket-link">[ Mentions legales ]</a>
                                <a href="/cgu" className="text-gray-600 hover:bg-black hover:text-white bracket-link">[ CGU ]</a>
                                <a href="/confidentialite" className="text-gray-600 hover:bg-black hover:text-white bracket-link">[ Confidentialite ]</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <hr className="my-6 border-dashed border-gray-400" />

            <center>
                <h4 className="font-bold">CONTACT ME:</h4>
                <a href="mailto:contact@sanstransition.fr">
                    <img src="https://web.archive.org/web/20090829152342/http://geocities.com/Area51/Cavern/2220/emailme.gif" alt="Email Me" />
                </a>
                <br />
                <span style={{ fontFamily: 'monospace' }}>contact@sanstransition.fr</span>
            </center>
        </div>
    );
}
