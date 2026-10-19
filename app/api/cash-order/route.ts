import {database,identity,profile,errorResponse,setting} from '../../../lib/server';
import {readBody,sameOrigin,textValue,quantity,variant} from '../../../lib/validation';
import {products} from '../../../lib/content';
export async function POST(request:Request){try{
  sameOrigin(request);const user=await identity();const body=await readBody(request);
  const key=textValue(body.requestKey,36);if(!/^[a-f0-9-]{36}$/.test(key))throw Error('Invalid order request.');
  const db=database();const requestKey=user.userId+':cash:'+key;
  const previous=await db.prepare('SELECT id FROM orders WHERE request_key=?').bind(requestKey).first<{id:string}>();
  if(previous)return Response.json({url:'/account?tab=orders',id:previous.id});
  const city=textValue(body.city,100);if(city.toLowerCase()!=='accra'||body.country!=='GH')throw Error('Delivery is currently available within Accra only.');
  const phone=textValue(body.phone,40);if(!/^(?:\+233|0)[0-9]{9}$/.test(phone.replace(/[\s-]/g,'')))throw Error('Enter a Ghana phone number, such as 0241234567.');
  const fee=setting('SHOP_SHIPPING_MINOR');const shippingMinor=fee===''?null:Number(fee);
  if(shippingMinor!==null&&(!Number.isSafeInteger(shippingMinor)||shippingMinor<0))throw Error('Delivery is not configured.');
  const shipping={name:textValue(body.name,100),address:textValue(body.address,200),city:'Accra',country:'GH',phone,postalCode:typeof body.postalCode==='string'?body.postalCode.slice(0,30):'',deliveryFeeMinor:shippingMinor,deliveryFeeStatus:shippingMinor===null?'To be agreed before dispatch':'Fixed'};
  const rows=await db.prepare('SELECT c.*,p.price,p.currency,p.active FROM cart c LEFT JOIN catalog p ON c.product_id=p.id WHERE c.user_id=?').bind(user.userId).all<{id:string,product_id:string,size:string,quantity:number,custom:string,price:number,currency:string,active:number}>();
  if(!rows.results.length)throw Error('Your bag is empty.');
  if(rows.results.some(r=>r.custom))throw Error('Please book a consultation to confirm the quote for your custom print.');
  if(rows.results.some(r=>!r.active||r.currency!=='GHS'||!Number.isSafeInteger(r.price)||r.price<=0))throw Error('Prices are awaiting studio confirmation. Please contact kwansconcepts@gmail.com to arrange your order.');
  const items=rows.results.map(r=>({cartId:r.id,productId:r.product_id,name:products.find(p=>p.id===r.product_id)?.name||r.product_id,size:variant(r.size),quantity:quantity(r.quantity),price:r.price,custom:r.custom}));
  const total=items.reduce((n,i)=>n+i.price*i.quantity,shippingMinor??0);if(!Number.isSafeInteger(total))throw Error('Invalid order total.');
  await profile(user);const id=crypto.randomUUID();
  await db.batch([db.prepare('INSERT OR IGNORE INTO orders(id,user_id,email,status,total,currency,items,shipping,provider,created_at,request_key) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind(id,user.userId,user.email,'cash_pending',total,'GHS',JSON.stringify(items),JSON.stringify(shipping),'cash',new Date().toISOString(),requestKey),...items.map(i=>db.prepare('DELETE FROM cart WHERE id=? AND user_id=? AND quantity=? AND custom=?').bind(i.cartId,user.userId,i.quantity,i.custom))]);
  const saved=await db.prepare('SELECT id FROM orders WHERE request_key=?').bind(requestKey).first<{id:string}>();return Response.json({id:saved?.id,url:'/account?tab=orders'},{status:201});
}catch(e){return errorResponse(e)}}
