import {Poppins,Poltawski_Nowy,Alegreya_SC} from 'next/font/google';

export const poppins = Poppins({
    subsets:['latin'],
    weight:['400','700'],
    variable:'--font-poppins'
  });
  
  export const poltawski = Poltawski_Nowy({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-poltawski',
  });
  
  export const alegreya = Alegreya_SC({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-alegreya',
  });