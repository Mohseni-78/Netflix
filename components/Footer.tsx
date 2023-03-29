import { colors } from '@mui/material'
import React from 'react'
import { toast } from 'react-hot-toast'

const Footer = () => {
    return (
        <footer className='mt-3'>
            {/* Top */}
            <div className='p-1'>
                <p>Questions? Call <a className='underline' href="tel:0800-000-7969">0800-000-7969</a></p>
            </div>
            {/* Center */}
            <div className='flex flex-row items-center justify-around mt-2 p-1'>
                <div className='mr-5 sm:mr-0'>
                    <ul>
                        <li>FAQ</li>
                        <li>Help Center</li>
                        <li>Investor Relations</li>
                        <li>Redeem Gift Cards</li>
                        <li>Terms of Use</li>
                        <li>Impressum</li>
                        <li>Legal Guarantee</li>
                    </ul>
                </div>
                <div className='mr-5 sm:mr-0'>
                    <ul>
                        <li>Gift Card Terms</li>
                        <li>Account</li>
                        <li>Jobs</li>
                        <li>Buy Gift Cards</li>
                        <li>Privacy</li>
                        <li>Contact Us</li>
                        <li>Legal Notices</li>
                    </ul>
                </div>
                <div className='mr-5 sm:mr-0'>
                    <ul>
                        <li>Cancel Membership</li>
                        <li>Media Center</li>
                        <li>Netflix Shop</li>
                        <li>Ways to Watch</li>
                        <li>Cookie Preferences</li>
                        <li>Speed Test</li>
                        <li>Only on Netflix</li>
                    </ul>
                </div>
            </div>
            {/* Bottom */}
            <div className='mt-2 p-1'>
                <div className='relative flex items-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 absolute ml-1">
                        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                    </svg>
                    <select
                        onChange={(e) => {
                            e.target.value === "Persian" && toast("Comming soon...", {
                                position: "bottom-left",
                                style: {
                                    background: "#cecece",
                                    color: "#000"
                                }
                            })
                        }
                        }
                        className='bg-[#3f3e3e]  rounded  outline-0 border-0 px-6 py-1'>
                        <option value="English">English</option>
                        <option value="Persian">Persian</option>
                    </select>
                </div>
                <h2 className='mt-5 text-[#c1111e] text-lg'>Netflix Iran</h2>
            </div>
            <div className='flex justify-center items-center p-2 mt-4 text-white font-semibold text-sm tracking-widest'>Design By <a className='text-[#c1111e] text-lg mx-1' href='mailto:mohseni.arz@gmail.com'>Alireza Mohseni </a>&copy;</div>
        </footer>
    )
}

export default Footer