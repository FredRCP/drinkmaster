import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso — DrinkMaster',
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#1C1C21', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
      <h2 style={{ color: '#F59E0B', fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>{title}</h2>
      <p style={{ color: '#A1A1AA', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>{children}</p>
    </div>
  )
}

function Contact() {
  return (
    <div style={{ backgroundColor: '#1C1C21', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
      <p style={{ color: '#71717A', fontSize: '0.78rem', marginBottom: '6px' }}>Dúvidas? Entre em contato</p>
      <p style={{ color: '#F59E0B', fontSize: '0.9rem', fontWeight: 700 }}>drfredrcp@gmail.com</p>
      <p style={{ color: '#71717A', fontSize: '0.72rem', marginTop: '4px' }}>RCP Creative · Uberaba, MG</p>
    </div>
  )
}

export default function TermosPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121214', padding: '24px 16px 60px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', paddingTop: '12px' }}>
          <a href="/" style={{ color: '#F59E0B', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>← Voltar ao DrinkMaster</a>
          <h1 style={{ color: '#F4F4F5', fontSize: '1.6rem', fontWeight: 900, marginBottom: '6px' }}>Termos de Uso</h1>
          <p style={{ color: '#71717A', fontSize: '0.82rem' }}>Versão 1.0 · 16 de setembro de 2026</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Section title="1. Aceitação dos Termos">Ao acessar ou utilizar o aplicativo <strong>DrinkMaster</strong>, você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso. Caso não concorde, você deve cessar imediatamente o uso do Aplicativo.</Section>
          <Section title="2. Descrição do Serviço">O DrinkMaster é um aplicativo <strong>educativo e recreativo</strong> de coquetelaria que oferece catálogo de receitas, sistema de descoberta de drinks por ingredientes, guia educativo sobre utensílios e copos, e Modo Barman com instruções passo a passo. Destina-se exclusivamente a fins informativos e recreativos, não constituindo incentivo ao consumo excessivo de bebidas alcoólicas.</Section>
          <Section title="3. Restrição de Idade">O DrinkMaster é destinado <strong>exclusivamente a pessoas com 18 anos ou mais</strong>, em conformidade com a Lei nº 9.294/1996, o ECA (Lei nº 8.069/1990) e o Código de Defesa do Consumidor (Lei nº 8.078/1990). Ao confirmar o acesso, o usuário declara, sob sua inteira responsabilidade, ter atingido a maioridade legal.</Section>
          <Section title="4. Uso Permitido">O usuário poderá consultar receitas para consumo próprio e privado, aprender sobre técnicas de coquetelaria, descobrir drinks compatíveis com ingredientes disponíveis e compartilhar receitas com outros usuários maiores de idade.</Section>
          <Section title="5. Uso Proibido">É vedado: utilizar o Aplicativo com finalidade comercial sem autorização prévia; reproduzir ou distribuir o conteúdo sem autorização; incentivar o consumo irresponsável de álcool; fornecer dados falsos incluindo declaração inverídica de maioridade; acessar sistemas do Aplicativo de forma não autorizada.</Section>
          <Section title="6. Isenção de Responsabilidade">O desenvolvedor não se responsabiliza por reações alérgicas a ingredientes, interações medicamentosas, intoxicação alcoólica, acidentes com utensílios ou qualquer dano à saúde relacionado ao consumo de bebidas alcoólicas. O Aplicativo é fornecido "no estado em que se encontra", sem garantias de disponibilidade ininterrupta.</Section>
          <Section title="7. Propriedade Intelectual">Todo o conteúdo do DrinkMaster — textos, design, logotipo, código-fonte e organização das informações — é de propriedade de <strong>RCP Creative</strong>, protegido pela Lei nº 9.610/1998.</Section>
          <Section title="8. Modificações">O desenvolvedor pode modificar estes Termos a qualquer momento. As alterações entram em vigor imediatamente após publicação. O uso continuado do Aplicativo constitui aceitação dos novos termos.</Section>
          <Section title="9. Legislação e Foro">Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de <strong>Uberaba, MG</strong>, em conformidade com o Marco Civil da Internet (Lei nº 12.965/2014) e a LGPD (Lei nº 13.709/2018).</Section>
          <Contact />
        </div>
      </div>
    </div>
  )
}
