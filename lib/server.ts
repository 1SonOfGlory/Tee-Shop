import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../app/chatgpt-auth';
export function database(){return env.DB}
export function setting(name:string){return (env as unknown as Record<string,string|undefined>)[name]||''}
export async function identity(){const user=await getChatGPTUser();if(!user)throw new AuthError();return user}
export class AuthError extends Error{constructor(){super('Please sign in to continue. Your account keeps your projects and orders together.')}}
export async function admin(){const user=await identity();const allowed=setting('ADMIN_EMAILS').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);if(!allowed.includes(user.email.toLowerCase()))throw new AuthError();return user}
export async function profile(user:{userId:string,email:string,displayName:string}){await database().prepare('INSERT INTO customers (id,email,name,created_at) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET email=excluded.email,name=excluded.name').bind(user.userId,user.email,user.displayName,new Date().toISOString()).run()}
export function errorResponse(error:unknown){if(error instanceof AuthError)return Response.json({error:error.message},{status:401});console.error(error);return Response.json({error:error instanceof Error?error.message:'Something went wrong. Please try again.'},{status:400})}
