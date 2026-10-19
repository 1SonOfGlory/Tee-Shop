'use client';
import {useState} from 'react';
import {CONTACT_EMAIL, CONTACT_HREF} from '../lib/business';

export function ShopHeader({cartCount=0,wishlistCount=0}:{cartCount?:number,wishlistCount?:number}) {
  const [open,setOpen]=useState(false);
  return <header className="tee-header">
    <div className="tee-utility"><div><a href="/about">About Us</a><a href="/contact">Contact Us</a><a href="/#shop-faq">FAQs</a></div><a href={CONTACT_HREF}>{CONTACT_EMAIL}</a><span>Accra · GH₵</span></div>
    <div className="tee-navigation">
      <button className="tee-menu" aria-expanded={open} aria-controls="tee-links" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button>
      <nav id="tee-links" aria-label="Shop navigation" className={open?'expanded':''}><a href="/">Home</a><a href="/">Shop</a><details><summary>Products</summary><div><a href="/products">All products</a><a href="/products?category=T-shirts">T-shirts</a><a href="/products?category=Hoodies">Hoodies</a><a href="/customize">Customise a tee</a><a href="/booking">Book a consultation</a></div></details></nav>
      <a className="tee-wordlogo" href="/" aria-label="Kwans Tee Shop home"><img src="/figma/shop-imgGroup3.svg" width="142" height="27" alt="KWANS"/><img src="/figma/shop-imgGroup4.svg" width="8" height="4" alt=""/></a>
      <div className="tee-actions">{[['/account','Your account','shop-imgGroup5.svg',0],['/wishlist','Wishlist','shop-imgGroup6.svg',wishlistCount],['/cart','Shopping bag','shop-imgGroup7.svg',cartCount]].map(([href,label,icon,count])=><a key={href} href={String(href)} aria-label={String(label)+(count?`, ${count} items`:'')}><img src={'/figma/'+icon} width="22" height="22" alt=""/>{Number(count)>0&&<span>{count}</span>}</a>)}</div>
    </div>
  </header>;
}

export function ShopFooter(){return <footer className="tee-footer"><div className="tee-footer-grid"><div><a className="logo" href="/"><img src="/figma/imgGroup48.svg" width="60" height="40" alt=""/><span>KWANS<small>TEE SHOP</small></span></a><a href={CONTACT_HREF}>{CONTACT_EMAIL}</a><a href="/booking">Book a custom print consultation</a></div><div><h3>My account</h3><a href="/account">My profile</a><a href="/account?tab=orders">My order history</a><a href="/account?tab=orders">Order tracking</a><a href="/cart">Shopping cart</a></div><div><h3>Shop category</h3><a href="/products?category=T-shirts">T-shirts</a><a href="/products?category=Hoodies">Hoodies</a><a href="/customize">Custom prints</a><a href="/products">All products</a></div><div><h3>Let’s make it yours</h3><p>Have a design in mind? Talk to the studio about your next print.</p><a className="text-link" href="/booking">Book a consultation</a></div></div><div className="tee-footer-bottom"><span>© {new Date().getFullYear()} Kwans Tee Shop. All Rights Reserved.</span><a href="/terms">Terms & privacy</a></div><img className="tee-footer-wordmark" src="/figma/shop-imgGroup2.svg" width="1386" height="262" alt="KWANS"/></footer>}
