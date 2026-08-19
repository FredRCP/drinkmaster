// Script para reescrever instruções de todos os drinks
// Execute com: node rewrite_instructions.js
// Precisa das variáveis: SUPABASE_URL, SUPABASE_KEY, ANTHROPIC_KEY

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY

if (!SUPABASE_URL || !SUPABASE_KEY || !ANTHROPIC_KEY) {
  console.error('❌ Faltam variáveis de ambiente!')
  console.error('   SUPABASE_URL, SUPABASE_KEY, ANTHROPIC_KEY')
  process.exit(1)
}

// Busca todos os drinks com ingredientes
async function fetchDrinks() {
  const select = [
    'id,name,instructions,alcohol_content,difficulty',
    'drink_ingredients(quantity,unit,is_optional,ingredient:ingredients(name))',
    'glass_type:glass_types(name)',
    'technique:techniques(name)',
  ].join(',')

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/drinks?select=${encodeURIComponent(select)}&order=name.asc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Accept-Profile': 'barilq',
      },
    }
  )
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`)
  return res.json()
}

// Reescreve instrução de um drink via Claude
async function rewriteInstructions(drink) {
  const ingredients = drink.drink_ingredients
    .map(di => `${di.quantity} ${di.unit} de ${di.ingredient.name}${di.is_optional ? ' (opcional)' : ''}`)
    .join('\n')

  const prompt = `Você é um bartender profissional experiente. Reescreva as instruções de preparo do drink "${drink.name}" de forma detalhada e didática para iniciantes em casa.

DADOS DO DRINK:
- Nome: ${drink.name}
- Copo: ${drink.glass_type?.name || 'taça de coquetel'}
- Técnica: ${drink.technique?.name || 'shaker'}
- Teor alcoólico: ${drink.alcohol_content || '?'}%
- Dificuldade: ${drink.difficulty}

INGREDIENTES:
${ingredients}

INSTRUÇÕES ATUAIS (melhore estas):
${drink.instructions}

REGRAS PARA REESCRITA:
- Numere cada passo (1. 2. 3. etc)
- Inclua nuances importantes: como cortar frutas, quanto macerar, quantos segundos agitar, como decorar
- Para frutas cítricas: mencione remover sementes/miolo branco se amarga
- Para shaker: diga por quantos segundos agitar e o que sentir (coqueteleira gelada por fora)
- Para maceração: diga pressione e gire suavemente, não esmague demais
- Para gelo: especifique pedras grandes, gelo picado ou crushed quando relevante
- Mencione dicas de apresentação/decoração no último passo
- Máximo 10 passos. Cada passo em 1-2 linhas.
- Responda APENAS com os passos numerados, sem título, sem introdução, sem explicação extra.
- Use português brasileiro informal e acolhedor.`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) throw new Error(`Claude error: ${res.status}`)
  const data = await res.json()
  return data.content[0].text.trim()
}

// Atualiza instrução no Supabase
async function updateDrink(id, instructions) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/drinks?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Content-Profile': 'barilq',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ instructions }),
    }
  )
  if (!res.ok) throw new Error(`Update error: ${res.status}`)
}

// Aguarda entre chamadas pra não sobrecarregar a API
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function main() {
  console.log('🍸 DrinkMaster — Reescrita de instruções\n')

  const drinks = await fetchDrinks()
  console.log(`📋 ${drinks.length} drinks encontrados\n`)

  let success = 0
  let errors = 0

  for (let i = 0; i < drinks.length; i++) {
    const drink = drinks[i]
    process.stdout.write(`[${i + 1}/${drinks.length}] ${drink.name}... `)

    try {
      const newInstructions = await rewriteInstructions(drink)
      await updateDrink(drink.id, newInstructions)
      console.log('✓')
      success++
    } catch (err) {
      console.log(`❌ ${err.message}`)
      errors++
    }

    // Pausa de 1s entre chamadas
    if (i < drinks.length - 1) await sleep(1000)
  }

  console.log(`\n✅ Concluído! ${success} atualizados, ${errors} erros.`)
}

main().catch(console.error)
