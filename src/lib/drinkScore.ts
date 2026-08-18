import { Drink, DrinkMatch } from '@/types'

export function calculateDrinkScore(drink: Drink, selectedIds: string[]): DrinkMatch {
  const selectedSet = new Set(selectedIds)
  const required = drink.drink_ingredients.filter((di) => !di.is_optional)

  if (required.length === 0) {
    return { drink, score: 100, matchCount: 0, totalRequired: 0, missing: [], canMake: true }
  }

  const matched = required.filter((di) => selectedSet.has(di.ingredient_id))
  const missing = required.filter((di) => !selectedSet.has(di.ingredient_id)).map((di) => di.ingredient)
  const score = Math.round((matched.length / required.length) * 100)

  return { drink, score, matchCount: matched.length, totalRequired: required.length, missing, canMake: score === 100 }
}

/**
 * Modo padrão: drinks com pelo menos 1 ingrediente selecionado, ordenados por score
 */
export function matchDrinks(drinks: Drink[], selectedIds: string[]): DrinkMatch[] {
  if (selectedIds.length === 0) return []
  return drinks
    .map((drink) => calculateDrinkScore(drink, selectedIds))
    .filter((m) => m.score > 0)
    .sort((a, b) => {
      if (a.canMake && !b.canMake) return -1
      if (!a.canMake && b.canMake) return 1
      if (b.score !== a.score) return b.score - a.score
      return a.missing.length - b.missing.length
    })
}

/**
 * Modo Exato: apenas drinks que contêm TODOS os ingredientes selecionados
 */
export function filterDrinksByIngredients(drinks: Drink[], selectedIds: string[]): DrinkMatch[] {
  if (selectedIds.length === 0) return []

  return drinks
    .map((d) => calculateDrinkScore(d, selectedIds))
    .filter((m) => {
      const drinkIngredientIds = new Set(
        m.drink.drink_ingredients.map((di) => di.ingredient_id)
      )
      return selectedIds.every((id) => drinkIngredientIds.has(id))
    })
    .sort((a, b) => b.score - a.score)
}