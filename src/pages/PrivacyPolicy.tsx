import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <section className="pt-32 pb-32 flex-1">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 inline-block"
            >
              ← VOLTAR AO INÍCIO
            </Link>

            <h1 className="text-minimal text-muted-foreground mb-4">
              POLÍTICA DE PRIVACIDADE
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-16">
              Como Tratamos os Seus Dados
            </h2>

            <div className="space-y-12 text-muted-foreground leading-relaxed text-justify">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  1. Dados que coletamos
                </h3>
                <p>
                  Ao preencher o formulário de contato em nosso site, solicitamos
                  as seguintes informações: nome completo, endereço de e-mail,
                  telefone / WhatsApp, tipo de projeto de interesse, faixa de
                  investimento pretendida e a mensagem descritiva do projeto.
                  Esses dados são fornecidos voluntariamente por você para que
                  possamos entender sua demanda e retornar de forma adequada.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  2. Finalidade de uso
                </h3>
                <p>
                  Os dados coletados são utilizados exclusivamente para responder
                  ao seu contato, avaliar a viabilidade do projeto, agendar
                  reuniões e acompanhar o relacionamento comercial. Não
                  utilizamos essas informações para envio de comunicações
                  promocionais sem autorização prévia, nem as vendemos, alugamos
                  ou compartilhamos com terceiros para fins comerciais.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  3. Armazenamento e segurança
                </h3>
                <p>
                  As informações enviadas pelo formulário são armazenadas em
                  nosso banco de dados, hospedado na plataforma Supabase
                  (Lovable Cloud). O acesso aos dados é restrito aos
                  administradores responsáveis pelo atendimento da Avelar
                  Arquitetos, e adotamos práticas de segurança compatíveis com a
                  infraestrutura utilizada para proteger as informações contra
                  acessos não autorizados.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  4. Direitos do titular
                </h3>
                <p>
                  Você pode solicitar acesso, correção, exclusão ou limitação
                  do uso dos seus dados pessoais a qualquer momento. Para
                  exercer esses direitos, basta enviar um e-mail para{" "}
                  <a
                    href="mailto:contato@avelararquitetos.com.br"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    contato@avelararquitetos.com.br
                  </a>
                  , indicando a solicitação desejada. Responderemos no prazo de
                  até 10 dias úteis.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  5. Cookies e navegação
                </h3>
                <p>
                  Nosso site não utiliza cookies de rastreamento, publicidade
                  comportamental ou ferramentas de analytics de terceiros. As
                  únicas informações de navegação coletadas são técnicas e
                  essenciais para o funcionamento da plataforma de hospedagem.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  6. Alterações nesta política
                </h3>
                <p>
                  Esta Política de Privacidade pode ser atualizada periodicamente
                  para refletir mudanças em nossos processos ou na legislação
                  aplicável. Recomendamos que a consulte sempre que enviar novas
                  informações pelo site.
                </p>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Última atualização: 23 de julho de 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
