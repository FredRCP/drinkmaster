'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface GuideModalProps {
  onClose: () => void
}

type Section = 'glossario' | 'copos' | 'utensilios'

const GLOSSARIO = [
  { term: 'Teor Alcoólico', def: 'Percentual de álcool puro na bebida. Ex: Vodka 40% significa que 40% do volume é álcool puro.' },
  { term: 'Dry (Seco)', def: 'Sem açúcar ou com muito pouco adoçante. Um Martini Dry usa mínimo de vermute.' },
  { term: 'Neat', def: 'Destilado puro, sem gelo, sem mistura. Direto da garrafa para o copo.' },
  { term: 'On the Rocks', def: 'Servido com pedras de gelo no copo.' },
  { term: 'Straight Up', def: 'Agitado ou mexido com gelo, mas servido sem gelo na taça.' },
  { term: 'Double', def: 'Dose dupla do destilado principal (normalmente 60ml em vez de 30ml).' },
  { term: 'Splash', def: 'Pequena quantidade, um "toque" de ingrediente — menos que 15ml.' },
  { term: 'Dash', def: 'Gotejamento rápido — cerca de 0,6ml. Usado para bitters e aromatizantes.' },
  { term: 'Macerar', def: 'Amassar levemente frutas ou ervas no fundo do copo para liberar sabores e aromas. Feito com muddler.' },
  { term: 'Float (Flutuar)', def: 'Verter um ingrediente devagar por cima sem misturar, criando camadas de cor.' },
  { term: 'Bitters', def: 'Aromáticos concentrados usados em pequenas doses para dar complexidade. Ex: Angostura Bitters.' },
  { term: 'Grenadine', def: 'Xarope de romã, usado para dar cor vermelha e doçura. Icônico no Tequila Sunrise.' },
  { term: 'Xarope Simples', def: 'Açúcar dissolvido em água na proporção 1:1. Base de muitos drinques, fácil de fazer em casa.' },
  { term: 'Mocktail', def: 'Coquetel sem álcool que imita a complexidade e apresentação de um drink alcoólico.' },
  { term: 'Highball', def: 'Drinque simples com destilado + mixer em copo alto. Ex: Gin Tônica, Cuba Libre.' },
  { term: 'IBA', def: 'International Bartenders Association — define as receitas oficiais dos coquetéis clássicos reconhecidos mundialmente.' },
  { term: 'Jigger', def: 'Medidor de metal em formato de ampulheta usado para medir doses com precisão (30ml/60ml).' },
  { term: 'Strainer', def: 'Coador metálico colocado na boca do shaker para coar o gelo ao servir.' },
  { term: 'Twist', def: 'Casca de cítrico torcida sobre o drinque para liberar os óleos aromáticos da casca.' },
  { term: 'Top (Completar)', def: 'Completar o copo com um mixer — água com gás, tônica ou refrigerante — após adicionar os demais ingredientes.' },
]

const COPOS = [
  {
    name: 'Taça de Coquetel',
    desc: 'Taça cônica com haste longa. Usada para Martini, Cosmopolitan, Espresso Martini. A haste evita o calor das mãos.',
    svg: `<svg viewBox="0 0 60 100" width="50" height="80"><polygon points="30,5 2,55 58,55" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="30" y1="55" x2="30" y2="85" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="85" x2="46" y2="85" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Copo Old Fashioned (Rocks)',
    desc: 'Copo baixo e largo. Ideal para Old Fashioned, Negroni, Whisky nas pedras. Perfeito para cubos de gelo grandes.',
    svg: `<svg viewBox="0 0 60 80" width="50" height="65"><path d="M5,5 L55,5 L50,70 L10,70 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="5" y1="5" x2="55" y2="5" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Copo Highball',
    desc: 'Copo alto e estreito. Usado para Gin Tônica, Moscow Mule, Cuba Libre, Long Island. Mantém a carbonatação.',
    svg: `<svg viewBox="0 0 60 100" width="50" height="80"><path d="M10,3 L50,3 L47,92 L13,92 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="10" y1="3" x2="50" y2="3" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Flûte (Taça de Champagne)',
    desc: 'Taça alta e estreita que preserva as bolhas. Usada para Champagne, Mimosa, Kir Royal, Bellini.',
    svg: `<svg viewBox="0 0 60 110" width="50" height="90"><path d="M22,5 Q8,35 14,70 L46,70 Q52,35 38,5 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="70" x2="30" y2="95" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="95" x2="46" y2="95" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Copo de Shot',
    desc: 'Copo pequeno de 30-60ml. Para B52, Tequila Shot, Kamikaze e outros shots. Bebido de uma única vez.',
    svg: `<svg viewBox="0 0 60 70" width="50" height="60"><path d="M8,5 L52,5 L46,60 L14,60 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="8" y1="5" x2="52" y2="5" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Copo Hurricane',
    desc: 'Copo alto em formato de furacão, curvilíneo. Ideal para drinks tropicais como Piña Colada e Zombie.',
    svg: `<svg viewBox="0 0 60 110" width="50" height="90"><path d="M20,5 Q2,30 5,55 Q8,80 30,95 Q52,80 55,55 Q58,30 40,5 Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Taça de Vinho',
    desc: 'Taça redonda e larga. Além do vinho, usada para Sangria e alguns Spritz. A abertura larga libera os aromas.',
    svg: `<svg viewBox="0 0 60 110" width="50" height="90"><path d="M10,5 Q5,35 15,55 Q22,68 30,70 Q38,68 45,55 Q55,35 50,5 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="70" x2="30" y2="95" stroke="currentColor" stroke-width="1.5"/><ellipse cx="30" cy="95" rx="16" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Caneca de Cobre',
    desc: 'Caneca metálica que mantém o drinque gelado por mais tempo. Icônica no Moscow Mule e variações de Mule.',
    svg: `<svg viewBox="0 0 70 80" width="55" height="65"><path d="M8,5 L52,5 L50,70 L10,70 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="8" y1="5" x2="52" y2="5" stroke="currentColor" stroke-width="1.5"/><path d="M52,20 Q68,20 68,40 Q68,60 52,60" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
]

const UTENSILIOS = [
  {
    name: 'Coqueteleira (Shaker)',
    desc: 'Utensílio metálico para agitar drinques com gelo. Agite com força por 10-15 segundos até gelar por fora. Existem dois tipos: Boston (2 peças) e Cobbler (3 peças com coador integrado).',
    svg: `<svg viewBox="0 0 60 120" width="50" height="100"><rect x="15" y="2" width="30" height="14" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="16" width="40" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10,26 Q5,80 12,108 L48,108 Q55,80 50,26 Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Colher de Bar',
    desc: 'Colher longa (30cm) com cabo torcido. Usada para mexer drinques suavemente sem aeração, montar camadas e medir ~5ml.',
    svg: `<svg viewBox="0 0 40 120" width="35" height="100"><ellipse cx="15" cy="10" rx="10" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15,17 Q18,60 20,115" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,2"/></svg>`
  },
  {
    name: 'Jigger (Medidor)',
    desc: 'Medidor duplo em formato de ampulheta. Um lado mede 30ml e o outro 60ml. Essencial para receitas precisas.',
    svg: `<svg viewBox="0 0 60 100" width="50" height="85"><path d="M5,2 L55,2 L42,38 L18,38 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M18,38 L42,38 L55,97 L5,97 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`
  },
  {
    name: 'Muddler (Socador)',
    desc: 'Bastão de madeira ou metal para macerar frutas, ervas e açúcar no fundo do copo. Essencial para Caipirinha e Mojito.',
    svg: `<svg viewBox="0 0 40 120" width="35" height="100"><rect x="8" y="2" width="24" height="22" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="24" width="8" height="88" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Mixing Glass (Copo de Mexer)',
    desc: 'Copo de vidro grosso usado para mexer drinques delicados que não devem ser agitados como Martini, Manhattan e Negroni.',
    svg: `<svg viewBox="0 0 60 90" width="50" height="75"><path d="M8,5 L52,5 L48,80 L12,80 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="8" y1="5" x2="52" y2="5" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Strainer (Coador)',
    desc: 'Coador metálico com mola que se encaixa no shaker para coar o gelo ao servir. Mantém o drinque limpo.',
    svg: `<svg viewBox="0 0 80 80" width="65" height="65"><path d="M5,25 Q5,5 35,5 Q65,5 65,25" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="25" x2="65" y2="25" stroke="currentColor" stroke-width="1.5"/><path d="M12,25 Q16,58 35,62 Q54,58 58,25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3,3"/><line x1="65" y1="12" x2="78" y2="8" stroke="currentColor" stroke-width="1.5"/><line x1="65" y1="25" x2="78" y2="28" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Espremedor de Cítricos',
    desc: 'Suco fresco de limão e laranja faz toda a diferença. Nunca use suco de caixinha em coquetéis clássicos!',
    svg: `<svg viewBox="0 0 60 90" width="50" height="75"><ellipse cx="30" cy="35" rx="24" ry="12" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6,35 Q6,65 30,72 Q54,65 54,35" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16,20 Q30,5 44,20" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="72" x2="30" y2="85" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
  {
    name: 'Liquidificador',
    desc: 'Para drinques frozen como Frozen Margarita, Daiquiri Frozen e Piña Colada. Use gelo picado para melhor resultado.',
    svg: `<svg viewBox="0 0 60 110" width="50" height="90"><path d="M15,5 L45,5 L50,70 L10,70 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="8" y="70" width="44" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="84" width="36" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="5" x2="45" y2="5" stroke="currentColor" stroke-width="1.5"/></svg>`
  },
]

export function GuideModal({ onClose }: GuideModalProps) {
  const [section, setSection] = useState<Section>('glossario')
  const [search, setSearch] = useState('')

  const sections: { key: Section; label: string; emoji: string }[] = [
    { key: 'glossario',  label: 'Glossário',   emoji: '📖' },
    { key: 'copos',      label: 'Copos',        emoji: '🥃' },
    { key: 'utensilios', label: 'Utensílios',   emoji: '🍹' },
  ]

  const filteredGlossario = GLOSSARIO.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.def.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 998,
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(6px)',
      overflowY: 'auto', padding: '20px 16px 40px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '560px', margin: '0 auto',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '16px', border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
              📚 Guia do Bar
            </h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', margin: '3px 0 0' }}>
              Tudo que você precisa saber
            </p>
          </div>
          <button onClick={onClose} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <X size={14} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', padding: '0 20px' }}>
          {sections.map(s => (
            <button key={s.key} onClick={() => { setSection(s.key); setSearch('') }} style={{
              flex: 1, padding: '10px 4px', fontSize: '0.82rem',
              fontWeight: section === s.key ? 700 : 400,
              color: section === s.key ? 'var(--gold)' : 'var(--text-secondary)',
              border: 'none', background: 'none', cursor: 'pointer',
              borderBottom: `2px solid ${section === s.key ? 'var(--gold)' : 'transparent'}`,
              transition: 'all 0.15s ease',
            }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Busca no glossário */}
        {section === 'glossario' && (
          <div style={{ padding: '14px 20px 0' }}>
            <input
              type="text" placeholder="Buscar termo..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '9px 14px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
            />
          </div>
        )}

        {/* Conteúdo */}
        <div style={{ padding: '14px 20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* GLOSSÁRIO */}
          {section === 'glossario' && filteredGlossario.map(g => (
            <div key={g.term} style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px', padding: '12px 14px',
            }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                {g.term}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                {g.def}
              </p>
            </div>
          ))}

          {/* COPOS */}
          {section === 'copos' && COPOS.map(c => (
            <div key={c.name} style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px', padding: '14px',
              display: 'flex', gap: '16px', alignItems: 'center',
            }}>
              <div style={{
                width: '64px', minWidth: '64px', height: '80px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', opacity: 0.85,
              }}
                dangerouslySetInnerHTML={{ __html: c.svg.replace(/currentColor/g, 'var(--gold)') }}
              />
              <div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '5px' }}>
                  {c.name}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}

          {/* UTENSÍLIOS */}
          {section === 'utensilios' && UTENSILIOS.map(u => (
            <div key={u.name} style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px', padding: '14px',
              display: 'flex', gap: '16px', alignItems: 'center',
            }}>
              <div style={{
                width: '64px', minWidth: '64px', height: '80px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', opacity: 0.85,
              }}
                dangerouslySetInnerHTML={{ __html: u.svg.replace(/currentColor/g, 'var(--gold)') }}
              />
              <div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '5px' }}>
                  {u.name}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
                  {u.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
