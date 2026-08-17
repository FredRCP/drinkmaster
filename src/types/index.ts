export interface Ingredient {
  id: string
  name: string
  category: string | null
  alcohol_content: number | null
  is_common: boolean
  image_url: string | null
}

export interface Category {
  id: string
  name: string
  icon: string | null
  color: string | null
}

export interface GlassType {
  id: string
  name: string
  emoji: string
}

export interface Technique {
  id: string
  name: string
  description: string | null
}

export interface DrinkIngredient {
  ingredient_id: string
  quantity: number
  unit: string
  is_optional: boolean
  sort_order: number
  notes: string | null
  ingredient: Ingredient
}

export interface Drink {
  id: string
  name: string
  description: string | null
  image_url: string | null
  instructions: string
  difficulty: 'easy' | 'medium' | 'hard'
  preparation_time_minutes: number
  alcohol_content: number | null
  category_id: string | null
  glass_type_id: string | null
  technique_id: string | null
  drink_ingredients: DrinkIngredient[]
  category?: Category
}

export interface DrinkMatch {
  drink: Drink
  score: number
  matchCount: number
  totalRequired: number
  missing: Ingredient[]
  canMake: boolean
}

export const CATEGORY_LABELS: Record<string, string> = {
  spirit:  'Destilados',
  liqueur: 'Licores',
  fresh:   'Frutas & Frescas',
  juice:   'Sucos',
  mixer:   'Mixers',
  syrup:   'Xaropes',
  other:   'Outros',
}

export const CATEGORY_ICONS: Record<string, string> = {
  spirit:  '🥃',
  liqueur: '🍾',
  fresh:   '🍋',
  juice:   '🧃',
  mixer:   '💧',
  syrup:   '🍯',
  other:   '✨',
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy:   'Fácil',
  medium: 'Médio',
  hard:   'Difícil',
}

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   '#3FB950',
  medium: '#D29922',
  hard:   '#F85149',
}

const DRINK_IMAGE_FILES: Record<string, string> = {
  'Caipirinha':               'caipirinha.jpg',
  'Caipirosca':               'caipirosca.jpg',
  'Caipirinha de Morango':    'caipirinha-morango.jpg',
  'Caipirinha de Maracujá':   'caipirinha-maracuja.jpg',
  'Caipirinha de Melancia':   'caipirinha-melancia.jpg',
  'Caipivodka de Manga':      'caipivodka-manga.jpg',
  'Batida de Coco':           'batida-coco.jpg',
  'Batida de Maracujá':       'batida-maracuja.jpg',
  'Mojito':                   'mojito.jpg',
  'Virgin Mojito':            'virgin-mojito.jpg',
  'Margarita':                'margarita.jpg',
  'Margarita Frozen':         'margarita-frozen.jpg',
  "Tommy's Margarita":        'tommy-margarita.jpg',
  'Watermelon Margarita':     'watermelon-margarita.jpg',
  'Gin Tônica':               'gin-tonica.jpg',
  'Vodka Tônica':             'vodka-tonica.jpg',
  'Cosmopolitan':             'cosmopolitan.jpg',
  'Negroni':                  'negroni.jpg',
  'Daiquiri':                 'daiquiri.jpg',
  'Strawberry Daiquiri':      'strawberry-daiquiri.jpg',
  'Moscow Mule':              'moscow-mule.jpg',
  'Mango Mule':               'mango-mule.jpg',
  'Strawberry Mule':          'strawberry-mule.jpg',
  'Aperol Spritz':            'aperol-spritz.jpg',
  'Hugo Spritz':              'hugo-spritz.jpg',
  'Spritz Veneziano':         'spritz-veneziano.jpg',
  'Piña Colada':              'pina-colada.jpg',
  'Virgin Piña Colada':       'virgin-pina-colada.jpg',
  'Old Fashioned':            'old-fashioned.jpg',
  'Martini Clássico':         'martini-classico.jpg',
  'Tequila Sunrise':          'tequila-sunrise.jpg',
  'Sex on the Beach':         'sex-on-the-beach.jpg',
  'Pornstar Martini':         'pornstar-martini.jpg',
  'Espresso Martini':         'espresso-martini.jpg',
  'Whisky Sour':              'whisky-sour.jpg',
  'Rum Sour':                 'rum-sour.jpg',
  'Amaretto Sour':            'amaretto-sour.jpg',
  'Pisco Sour':               'pisco-sour.jpg',
  'Midori Sour':              'midori-sour.jpg',
  'Bloody Mary':              'bloody-mary.jpg',
  'Cuba Libre':               'cuba-libre.jpg',
  'Dark and Stormy':          'dark-and-stormy.jpg',
  'Long Island Iced Tea':     'long-island-iced-tea.jpg',
  'White Russian':            'white-russian.jpg',
  'Black Russian':            'black-russian.jpg',
  'Alexander':                'alexander.jpg',
  'Grasshopper':              'grasshopper.jpg',
  'Mudslide':                 'mudslide.jpg',
  'Manhattan':                'manhattan.jpg',
  'Rob Roy':                  'rob-roy.jpg',
  'French 75':                'french-75.jpg',
  'Sidecar':                  'sidecar.jpg',
  'Between the Sheets':       'between-the-sheets.jpg',
  'Gimlet':                   'gimlet.jpg',
  'Tom Collins':              'tom-collins.jpg',
  'Gin Fizz':                 'gin-fizz.jpg',
  'Clover Club':              'clover-club.jpg',
  'Aviation':                 'aviation.jpg',
  'Bramble':                  'bramble.jpg',
  'Harvey Wallbanger':        'harvey-wallbanger.jpg',
  'Screwdriver':              'screwdriver.jpg',
  'Vodka Cranberry':          'vodka-cranberry.jpg',
  'Paloma':                   'paloma.jpg',
  'Penicillin':               'penicillin.jpg',
  'Paper Plane':              'paper-plane.jpg',
  'Naked and Famous':         'naked-and-famous.jpg',
  'Blue Lagoon':              'blue-lagoon.jpg',
  'Zombie':                   'zombie.jpg',
  'Mai Tai':                  'mai-tai.jpg',
  'Jungle Bird':              'jungle-bird.jpg',
  'Tequila Shot':             'tequila-shot.jpg',
  'B52':                      'b52.jpg',
  'Kamikaze':                 'kamikaze.jpg',
  'Tequila Boom':             'tequila-boom.jpg',
  'Shot de Baileys':          'shot-baileys.jpg',
  'Lemon Drop Shot':          'lemon-drop-shot.jpg',
  'Shirley Temple':           'shirley-temple.jpg',
  'Sunrise Mocktail':         'sunrise-mocktail.jpg',
  'Limonada Suíça':           'limonada-suica.jpg',
  'Mocktail Tropical':        'mocktail-tropical.jpg',
  // PDF drinks
  'Acapulco':                 'acapulco.jpg',
  'Alabama Slammer':          'alabama-slammer.jpg',
  'Alexandra':                'alexandra.jpg',
  'Banshee':                  'banshee.jpg',
  'Batida do Mário':          'batida-mario.jpg',
  'Chi-Chi':                  'chi-chi.jpg',
  'Godmother':                'godmother.jpg',
  'Pain Killer':              'pain-killer.jpg',
  'Prairie Fire':             'prairie-fire.jpg',
  'Purple Passion':           'purple-passion.jpg',
  'Scooter':                  'scooter.jpg',
}

function getFallbackByName(drink: Drink): string {
  const n = drink.name.toLowerCase()
  if (n.includes('caipir') || n.includes('batida')) return '/drinks/caipirinha.jpg'
  if (n.includes('mojito')) return '/drinks/mojito.jpg'
  if (n.includes('margarita')) return '/drinks/margarita.jpg'
  if (n.includes('mule')) return '/drinks/moscow-mule.jpg'
  if (n.includes('sour')) return '/drinks/whisky-sour.jpg'
  if (n.includes('martini')) return '/drinks/martini-classico.jpg'
  if (n.includes('spritz')) return '/drinks/aperol-spritz.jpg'
  if (n.includes('daiquiri')) return '/drinks/daiquiri.jpg'
  if (n.includes('shot') || n.includes('b52') || n.includes('kamikaze')) return '/drinks/tequila-shot.jpg'
  if (n.includes('virgin') || n.includes('mocktail') || n.includes('sem álcool')) return '/drinks/virgin-mojito.jpg'
  if (n.includes('colada')) return '/drinks/pina-colada.jpg'
  if (n.includes('russian')) return '/drinks/white-russian.jpg'
  if (n.includes('gin')) return '/drinks/gin-tonica.jpg'
  if (n.includes('vodka')) return '/drinks/cosmopolitan.jpg'
  if (n.includes('rum') || n.includes('cuba')) return '/drinks/cuba-libre.jpg'
  if (n.includes('whisky') || n.includes('whiskey') || n.includes('bourbon')) return '/drinks/old-fashioned.jpg'
  if (n.includes('tequila')) return '/drinks/margarita.jpg'
  return '/drinks/placeholder.jpg'
}

export function getDrinkImage(drink: Drink): string {
  if (drink.image_url) return drink.image_url
  const file = DRINK_IMAGE_FILES[drink.name]
  if (file) return `/drinks/${file}`
  return getFallbackByName(drink)
}
