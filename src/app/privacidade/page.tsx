import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade — DrinkMaster',
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#1C1C21', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
      <h2 style={{ color: '#F59E0B', fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>{title}</h2>
      <div style={{ color: '#A1A1AA', fontSize: '0.88rem', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Contact() {
  return (
    <div style={{ backgroundColor: '#1C1C21', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
      <p style={{ color: '#71717A', fontSize: '0.78rem', marginBottom: '6px' }}>Dúvidas sobre privacidade?</p>
      <p style={{ color: '#F59E0B', fontSize: '0.9rem', fontWeight: 700 }}>drfredrcp@gmail.com</p>
      <p style={{ color: '#71717A', fontSize: '0.72rem', marginTop: '4px' }}>RCP Creative · Uberaba, MG</p>
      <p style={{ color: '#71717A', fontSize: '0.72rem', marginTop: '8px' }}>Você também pode registrar reclamações na ANPD: gov.br/anpd</p>
    </div>
  )
}

export default function PrivacidadePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121214', padding: '24px 16px 60px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', paddingTop: '12px' }}>
          <a href="/" style={{ color: '#F59E0B', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>← Voltar ao DrinkMaster</a>
          <h1 style={{ color: '#F4F4F5', fontSize: '1.6rem', fontWeight: 900, marginBottom: '6px' }}>Política de Privacidade</h1>
          <p style={{ color: '#71717A', fontSize: '0.82rem' }}>Versão 1.0 · 16 de setembro de 2026 · Conforme LGPD (Lei nº 13.709/2018)</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Section title="1. Introdução">A sua privacidade é importante para nós. Esta Política descreve como o <strong>DrinkMaster</strong> coleta, utiliza e protege suas informações, em conformidade com a LGPD (Lei nº 13.709/2018).</Section>

          <Section title="2. Controlador dos Dados">
            <p style={{margin:0}}><strong>Marca:</strong> RCP Creative</p>
            <p style={{margin:0}}><strong>Email:</strong> drfredrcp@gmail.com</p>
            <p style={{margin:0}}><strong>Localização:</strong> Uberaba, MG, Brasil</p>
          </Section>

          <Section title="3. O que coletamos">
            <p style={{marginBottom:'8px'}}><strong>Dados anônimos e agregados</strong> via Vercel Analytics:</p>
            <ul style={{paddingLeft:'16px', margin:'0 0 12px'}}>
              <li>Páginas visitadas e funcionalidades usadas</li>
              <li>Tipo de dispositivo (mobile/desktop)</li>
              <li>País/região de acesso</li>
              <li>Métricas de performance</li>
            </ul>
            <p style={{marginBottom:'8px'}}><strong>Dados locais</strong> (armazenados apenas no seu dispositivo, nunca enviados a servidores):</p>
            <ul style={{paddingLeft:'16px', margin:0}}>
              <li>Confirmação de maioridade (+18)</li>
              <li>Drinks favoritos</li>
              <li>Ingredientes selecionados no Meu Bar</li>
              <li>Preferência de sons</li>
            </ul>
          </Section>

          <Section title="4. O que NÃO coletamos">O DrinkMaster <strong>não coleta</strong> em nenhuma hipótese: nome, email, CPF, telefone, localização GPS, dados de pagamento, contatos do dispositivo, fotos, câmera, microfone, histórico de navegação externo ou dados de saúde.</Section>

          <Section title="5. Finalidade do Uso">Os dados coletados são usados exclusivamente para melhorar o Aplicativo, corrigir problemas técnicos e gerar estatísticas agregadas de uso. <strong>Nunca</strong> são usados para publicidade direcionada, venda a terceiros ou criação de perfis individuais.</Section>

          <Section title="6. Serviços Terceiros">
            <p style={{marginBottom:'8px'}}>Para operar o Aplicativo utilizamos:</p>
            <ul style={{paddingLeft:'16px', margin:0}}>
              <li><strong>Vercel</strong> — hospedagem e analytics (vercel.com/legal/privacy-policy)</li>
              <li><strong>Supabase</strong> — banco de dados das receitas (supabase.com/privacy)</li>
            </ul>
          </Section>

          <Section title="7. Seus Direitos (LGPD)">Você tem direito a: confirmação e acesso aos dados, correção de dados inexatos, eliminação de dados, portabilidade e revogação do consentimento. Como o DrinkMaster não coleta dados pessoais identificáveis, a maioria desses direitos é exercida diretamente no seu dispositivo, limpando os dados do navegador.</Section>

          <Section title="8. Segurança">Os dados de analytics são processados com criptografia em trânsito (HTTPS/TLS) e em repouso. Os dados locais são protegidos pelas medidas de segurança do seu próprio dispositivo.</Section>

          <Section title="9. Menores de Idade">O DrinkMaster é destinado exclusivamente a maiores de 18 anos. Não coletamos intencionalmente dados de menores de idade.</Section>

          <Section title="10. Alterações">Esta Política pode ser atualizada periodicamente. A data da última atualização está sempre indicada no topo do documento.</Section>

          <Contact />
        </div>
      </div>
    </div>
  )
}
