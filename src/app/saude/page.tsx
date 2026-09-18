import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de Saúde — DrinkMaster',
}

function Section({ title, emoji, children }: { title: string, emoji: string, children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#1C1C21', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
      <h2 style={{ color: '#F59E0B', fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>{emoji} {title}</h2>
      <div style={{ color: '#A1A1AA', fontSize: '0.88rem', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

export default function SaudePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121214', padding: '24px 16px 60px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', paddingTop: '12px' }}>
          <a href="/" style={{ color: '#F59E0B', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>← Voltar ao DrinkMaster</a>
          <h1 style={{ color: '#F4F4F5', fontSize: '1.6rem', fontWeight: 900, marginBottom: '6px' }}>Aviso de Saúde e Responsabilidade</h1>
          <p style={{ color: '#71717A', fontSize: '0.82rem' }}>Versão 1.0 · 16 de setembro de 2026</p>
        </div>

        {/* Banner de aviso */}
        <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'center' }}>
          <p style={{ color: '#FCA5A5', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>⚠️ Leia com atenção antes de utilizar este aplicativo</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Section title="Finalidade do Aplicativo" emoji="🍸">O DrinkMaster é um aplicativo <strong>educativo e recreativo</strong>. As receitas e informações disponibilizadas têm finalidade exclusivamente informativa e cultural, não constituindo incentivo ao consumo de bebidas alcoólicas.</Section>

          <Section title="Restrição de Idade" emoji="🔞">O consumo de bebidas alcoólicas é <strong>proibido para menores de 18 anos</strong> no Brasil (ECA — Lei nº 8.069/1990, Art. 81, II; Lei nº 9.294/1996). Este aplicativo é destinado exclusivamente a maiores de 18 anos.</Section>

          <Section title="Consumo Responsável" emoji="⚠️">
            <ul style={{paddingLeft:'16px', margin:0}}>
              <li><strong>Beba com moderação.</strong> O consumo excessivo de álcool é prejudicial à saúde</li>
              <li><strong>Não beba e dirija.</strong> É crime (CTB — Lei nº 9.503/1997, Art. 306)</li>
              <li><strong>Gestantes não devem consumir álcool.</strong> Pode causar Síndrome Alcoólica Fetal (SAF)</li>
              <li><strong>Nutrizes devem evitar o álcool.</strong> Passa para o leite materno</li>
              <li><strong>Atenção ao uso de medicamentos.</strong> Consulte sempre seu médico ou farmacêutico</li>
              <li><strong>Pessoas com condições de saúde específicas</strong> devem consultar seu médico antes de consumir álcool</li>
            </ul>
          </Section>

          <Section title="Alérgenos" emoji="🌾">As receitas podem conter: <strong>ovos</strong> (alguns coquetéis com clara), <strong>laticínios</strong> (creme de leite, natas), <strong>sulfitos</strong> (vinhos e espumantes), <strong>glúten</strong> (cervejas) e <strong>frutas com potencial alergênico</strong>. Pessoas com alergias devem verificar todos os ingredientes antes de preparar qualquer receita.</Section>

          <Section title="Interações Medicamentosas" emoji="💊">O álcool pode interagir com: ansiolíticos, antidepressivos, antibióticos (especialmente metronidazol), anti-inflamatórios, anticoagulantes, medicamentos para diabetes, anti-hipertensivos e analgésicos. <strong>Consulte sempre seu médico ou farmacêutico.</strong></Section>

          <Section title="Segurança no Preparo" emoji="🔪">
            <ul style={{paddingLeft:'16px', margin:0}}>
              <li>Manuseie facas e utensílios cortantes com atenção</li>
              <li>Cuidado ao flambar bebidas — mantenha distância de materiais inflamáveis</li>
              <li>Nunca utilize gelo de procedência duvidosa</li>
              <li>Higienize adequadamente frutas e utensílios</li>
              <li>Nunca deixe bebidas alcoólicas ao alcance de crianças e adolescentes</li>
            </ul>
          </Section>

          <Section title="Sinais de Uso Problemático" emoji="😔">Procure ajuda se identificar: necessidade crescente de álcool para o mesmo efeito, dificuldade de controlar o consumo, negligência de responsabilidades, sintomas físicos de abstinência ao parar de beber.
            <div style={{marginTop:'12px', padding:'12px', backgroundColor:'rgba(245,158,11,0.08)', borderRadius:'8px'}}>
              <p style={{margin:'0 0 4px', color:'#F59E0B', fontWeight:700, fontSize:'0.82rem'}}>Recursos de ajuda:</p>
              <p style={{margin:0, fontSize:'0.82rem'}}>• <strong>CVV:</strong> 188 (24h, gratuito)<br/>• <strong>CAPS AD:</strong> pelo SUS em sua cidade<br/>• <strong>Alcoólicos Anônimos:</strong> aa.org.br<br/>• <strong>CISA:</strong> cisa.org.br</p>
            </div>
          </Section>

          <Section title="Diretrizes da OMS" emoji="🌍">A OMS estabelece que não existe nível seguro de consumo de álcool para a saúde. O consumo de baixo risco é de até 14 doses/semana para homens e 7 doses/semana para mulheres. <strong>1 dose padrão = 14g de álcool puro ≈ 350ml de cerveja 5% ou 150ml de vinho 12% ou 45ml de destilado 40%.</strong></Section>

          <Section title="Isenção de Responsabilidade Médica" emoji="⚕️">As informações têm caráter <strong>exclusivamente educativo e recreativo</strong> e não constituem aconselhamento médico ou terapêutico. O desenvolvedor disponibiliza este conteúdo em sua capacidade de desenvolvedor de aplicativos, não como profissional de saúde. As informações não substituem a orientação de um profissional de saúde habilitado.</Section>

          {/* Rodapé */}
          <div style={{ textAlign: 'center', padding: '20px', color: '#71717A', fontSize: '0.78rem' }}>
            <p style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '8px' }}>🍸 Aprecie com responsabilidade. Sua saúde é o que importa.</p>
            <p>drfredrcp@gmail.com · RCP Creative · Uberaba, MG</p>
          </div>
        </div>
      </div>
    </div>
  )
}