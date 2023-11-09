/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Link from "next/link"
// Imported Types ==========>
import { userT } from '@/typing';
// Imported Icons ==========>
import { BsSearch } from 'react-icons/bs'
import { MdNotifications } from 'react-icons/md'

interface props {
  user: userT
}
function Header({ user }: props) {
  const [isScroll, setIsScrool] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrool(true)
      } else {
        setIsScrool(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScroll && 'bg-[#141414]'}`}>
      {/* Left elements */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="netflix-icon"
        />
        <ul className="hidden md:flex space-x-4">
          <li className="header-link">Home</li>
          <li className="header-link">Tv Shows</li>
          <li className="header-link">Movie</li>
          <li className="header-link">New & Popular</li>
          <li className="header-link"><Link href={'/my-list'}>My List</Link></li>
        </ul>
      </div>

      {/* Right elements */}
      <div className='flex items-center space-x-4 text-sm font-light'>
        <BsSearch className='hidden sm:inline w-6 h-6 cursor-pointer' />
        <MdNotifications className='w-6 h-6 cursor-pointer' />
        <p className='inline text-xl'>{user?.name ??
          (<Link href={'/login'}>
            <button className='bannerBtn bg-[#c11115] text-white '>
              signin
            </button>
          </Link>)}
        </p>
        {
          user?.email && (<Link href="/account">
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          </Link>)
        }
      </div>
    </header>
  )
}

export default Header