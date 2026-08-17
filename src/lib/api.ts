const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Accept-Profile': 'barilq',
}

export async function fetchFromSupabase<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: HEADERS })
  if (!res.ok) throw new Error(`Supabase error ${res.status}: ${await res.text()}`)
  return res.json()
}

export async function fetchIngredients() {
  return fetchFromSupabase<any[]>('ingredients?select=*&order=category.asc,name.asc')
}

export async function fetchDrinks() {
  const select = '*,drink_ingredients(ingredient_id,quantity,unit,is_optional,sort_order,notes,ingredient:ingredients(id,name,category,alcohol_content,is_common,image_url))'
  return fetchFromSupabase<any[]>(`drinks?select=${encodeURIComponent(select)}&order=name.asc`)
}
