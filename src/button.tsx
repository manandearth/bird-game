import React, { MouseEventHandler } from 'react'
/* import { buttonStyles } from './Button.styles' */

type Props = {
  onClick: MouseEventHandler,
  text: string,
}

const Button = ({ onClick, text }: Props) => (
  <button onClick={onClick} >
    {text}
  </button>
)

export default Button;
