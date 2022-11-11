import React from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../AssetHelpers'

type Props = {
  className?: string
  path: string
  alt?: string
}

const HIMG: React.FC<Props> = ({className = '', path, alt}) => {
  return (
      <img src={toAbsoluteUrl(path)} className={className} alt={alt}/>
  )
}


export {HIMG}