import React from 'react'
//Imported reactHotToast ============>
import { toast } from 'react-hot-toast'
// Imported Icons
import { GrLanguage } from 'react-icons/gr'

const Footer = () => {
    return (
        <footer className='mt-3'>
            {/* Top */}
            <div className='p-1'>
                <p>Questions? Call <a className='underline text-[#99ff6a]' href="tel:0800-000-7969">0800-000-7969</a></p>
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
                <div className='flex items-center'>
                    <GrLanguage className="w-4 h-4 absolute ml-2" />
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
            <div className='flex justify-center items-center p-2 mt-4 text-white font-semibold text-sm tracking-widest'>
                Design By
                <a className='text-[#c1111e] text-lg mx-1' href='mailto:mohseni.arz@gmail.com'>
                    Alireza Mohseni
                </a>&copy;</div>
        </footer>
    )
}

export default Footer