import {database} from '../../../lib/server';
export async function GET(){const r=await database().prepare('SELECT id,price,currency,active FROM catalog').all();return Response.json(r.results)}
