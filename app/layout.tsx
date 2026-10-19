import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import './commerce.css';
const display=Space_Grotesk({variable:'--font-display',subsets:['latin']});
const body=Inter({variable:'--font-body',subsets:['latin']});
export const metadata:Metadata={title:{default:'Tee Shop — Kwans',template:'%s — Tee Shop'},description:'Custom tees, hoodies and print consultations. Accra delivery.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={display.variable+' '+body.variable}><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>}

import './tee.css';
