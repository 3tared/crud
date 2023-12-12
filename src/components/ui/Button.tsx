import { ButtonHTMLAttributes, ReactNode } from 'react';
import { BtnType } from '../../types/buttonType';

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: BtnType;
  type?: 'submit' | 'reset' | 'button';
}

function Button({
  children,
  className,
  width = 'w-full',
  type = 'submit',
  ...rest
}: Iprops) {
  return (
    <button
      type={type}
      className={`${className} ${width}  rounded-lg py-2 px-3 font-medium duration-200
  `}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
