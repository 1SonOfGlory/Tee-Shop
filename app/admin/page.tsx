import {Admin} from '../../components/admin';
import {ShopHeader,ShopFooter} from '../../components/shop-shell';
import {getChatGPTUser,chatGPTSignInPath} from '../chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getChatGPTUser();return <div className="shop"><ShopHeader/><main id="main">{user?<Admin/>:<section className="section empty-state"><h1>Your Tee Shop account</h1><p>Sign in to manage orders, saved items and print consultations.</p><a className="button" href={chatGPTSignInPath('/admin')} target="_top">Sign in with ChatGPT</a></section>}</main><ShopFooter/></div>}
