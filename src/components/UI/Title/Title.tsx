import React from 'react'
import style from './title.module.css'

interface Title {
    children?: string;
}

const Title : React.FC<Title> = ({children}) => {
  return (
    <div className={style.Title}>{children}</div>
  )
}

export default Title