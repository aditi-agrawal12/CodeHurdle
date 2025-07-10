"use client"
import React, { useContext } from 'react'
import styles from './themetoggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext'
import moon from "@/assets/moon.png"
import sun from "@/assets/sun.png"

const ThemeToggle = () => {

  const {toggle, theme} = useContext(ThemeContext)
  console.log(theme)
  return (
    <div className={styles.container} onClick={toggle}>
      <Image src={moon} alt="moon" width={14} height={14} />
      <div
        className={`${styles.ball} ${theme === 'dark' ? styles.darkBall : ''}`}
        style={{
          backgroundColor: theme === 'dark' ? 'white' : '#0f172a',
        }}
      ></div>
      <Image src={sun} alt="sun" width={14} height={14} />
    </div>

  )
}

export default ThemeToggle