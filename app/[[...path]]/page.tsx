import {notFound,redirect} from 'next/navigation';
import {Shop} from '../../components/shop';
import {ShopHeader,ShopFooter} from '../../components/shop-shell';
import {products,articles} from '../../lib/content';
import {CONTACT_EMAIL,CONTACT_HREF} from '../../lib/business';
export default async function Page({params}:{params:Promise<{path?:string[]}>}){const {path=[]}=await params;const [view='home',id]=path;
if(view==='shop')redirect('/'+path.slice(1).join('/'));
if(view==='contact')redirect('/booking');
if(view==='about'||view==='terms'||view==='blog'){const article=articles.find(a=>a.slug===id);if(path.length>2||(view!=='blog'&&id)||(id&&!article))notFound();return <div className="shop"><ShopHeader/><main id="main" className="section shop-content"><h1>{view==='about'?'The Tee Shop':view==='terms'?'Shop information':article?.title||'The journal'}</h1>{view==='about'?<p>Tees, hoodies and custom prints. Book a consultation to discuss your artwork or a bulk order. We deliver within Accra.</p>:view==='terms'?<><h3>Orders and delivery</h3><p>Prices are in Ghana cedis. Delivery within Accra is charged separately and agreed before dispatch. Contact us about sizing, returns or custom print approval before ordering.</p><h3>Your information</h3><p>Your account stores orders, consultation requests, saved items and uploaded artwork. Payment details are handled by Paystack. Contact us to request correction or deletion of your information.</p></>:article?<><p>{article.intro}</p>{article.body.map(p=><p key={p}>{p}</p>)}</>:articles.map(a=><p key={a.slug}><a href={'/blog/'+a.slug}>{a.title}</a></p>)}<p><a href={CONTACT_HREF}>{CONTACT_EMAIL}</a></p></main><ShopFooter/></div>}
if(path.length>2||!['home','products','product','cart','wishlist','checkout','customize','booking'].includes(view)||view==='product'&&!products.some(p=>p.id===id)||view!=='product'&&id)notFound();return <Shop view={view} productId={id}/>}
