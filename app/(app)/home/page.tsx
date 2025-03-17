import React from 'react'
import type { Metadata } from 'next'
import styles from './index.module.scss'
import avatar from '@/app/assets/images/avatar.png'
import Image from 'next/image'
import  NavList  from './navlist'
export const metadata: Metadata = {
  title: 'Home', 
};
const Home = () => {

  return (
    <div className={styles.home_container}>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
      <div className={styles.transparent_box}>
        <div className={styles.user_container}>
          <div className={styles.user_box}>
            <div className={styles.avatar_box}>
              <Image className={styles.avatar}  width="100"  height="100" src={avatar} alt="avatar" />
            </div>
            <div className=" text-white text-center text-xl">Xwya</div>
            <div className=" text-slate-500 text-center mt-2 text-sm"> 这是一个幽默的程序员</div>
          </div>
          <NavList />
          {/* <div className=' text-white flex gap-4 items-center justify-center  mt-8 flex-wrap'>
            {iconlist.map((item, index) => (<div onClick={()=>onClickPath(item)} key={item.icon} title={item.label} className={`w-10 h-10 bg-[rgba(63,63,66,0.4)] rounded-sm border border-[#383838] hover:transition-all hover:scale-110 hover:cursor-pointer flex justify-center items-center`}>
              <span className={`${item.icon} text-2xl`}></span>
            </div>))
            }
          </div> */}
          <div className='mt-5'>
            <div className=' text-gray-400 text-center text-sm select-none'>© 2025 Xwya. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
