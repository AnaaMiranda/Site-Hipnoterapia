import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como os seus dados são tratados no site de Juliane Machado, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

function Bloco({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-ink-muted">{children}</div>
    </section>
  );
}

export default function PoliticaPrivacidade() {
  return (
    <div className="pt-32 pb-24">
      <article className="container-p prose-measure mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <h1 className="mt-8 text-[length:var(--text-h1)]">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-ink-soft">
          Última atualização: julho de 2025. Este documento descreve como
          tratamos os seus dados pessoais, em conformidade com a Lei Geral de
          Proteção de Dados — LGPD (Lei nº 13.709/2018).
        </p>

        <Bloco title="1. Quem é o responsável pelos seus dados">
          <p>
            O tratamento dos dados coletados neste site é realizado por{" "}
            <strong className="text-ink">{site.name}</strong> ({site.role}),
            responsável pelas atividades de atendimento em hipnoterapia. Para
            qualquer questão relacionada à privacidade, entre em contato pelo
            WhatsApp {site.contact.whatsappDisplay}.
          </p>
        </Bloco>

        <Bloco title="2. Quais dados coletamos">
          <p>Coletamos apenas os dados necessários para o contato e o cuidado:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Dados que você informa</strong> no
              formulário: nome, idade, cidade, telefone, e-mail, formato de
              atendimento e informações sobre o motivo da busca, histórico e
              objetivos.
            </li>
            <li>
              <strong className="text-ink">Dados de navegação</strong>{" "}
              (opcionais): informações estatísticas e anônimas coletadas por
              ferramentas de análise, somente após o seu consentimento.
            </li>
          </ul>
          <p>
            Algumas informações do formulário podem ser consideradas{" "}
            <strong className="text-ink">dados sensíveis</strong> (referentes à
            saúde). Elas são tratadas com sigilo e utilizadas exclusivamente
            para viabilizar o seu atendimento.
          </p>
        </Bloco>

        <Bloco title="3. Para que usamos os seus dados">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Responder ao seu contato e realizar o agendamento;</li>
            <li>Compreender a sua demanda e conduzir o atendimento com segurança;</li>
            <li>Melhorar a experiência de navegação no site (dados anônimos).</li>
          </ul>
          <p>
            A base legal para esse tratamento é o seu{" "}
            <strong className="text-ink">consentimento</strong> e os
            procedimentos preliminares relacionados a um serviço solicitado por
            você (art. 7º da LGPD). Dados sensíveis são tratados com base no
            consentimento específico (art. 11).
          </p>
        </Bloco>

        <Bloco title="4. Cookies e ferramentas de análise">
          <p>
            O site não instala cookies de análise ou rastreamento sem a sua
            autorização. Ao acessar, você pode escolher entre{" "}
            <em>“Aceitar”</em> ou <em>“Somente essenciais”</em>. Ferramentas como
            o Google Analytics só são carregadas após o aceite, e o mapa do
            Google só é carregado quando você clica para exibi-lo.
          </p>
        </Bloco>

        <Bloco title="5. Compartilhamento com terceiros">
          <p>
            Não vendemos os seus dados. Utilizamos operadores que auxiliam no
            funcionamento do site e podem processar dados em nosso nome:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">EmailJS</strong> — para entregar o
              conteúdo do formulário por e-mail;
            </li>
            <li>
              <strong className="text-ink">Google (Analytics/Maps)</strong> —
              apenas mediante consentimento/ação;
            </li>
            <li>
              <strong className="text-ink">Vercel</strong> — hospedagem do site.
            </li>
          </ul>
          <p>
            Esses serviços podem operar em servidores fora do Brasil, o que
            implica transferência internacional de dados, sempre buscando
            garantias adequadas de proteção.
          </p>
        </Bloco>

        <Bloco title="6. Por quanto tempo guardamos">
          <p>
            Mantemos os seus dados apenas pelo tempo necessário às finalidades
            acima ou conforme exigido por lei. Você pode solicitar a exclusão a
            qualquer momento.
          </p>
        </Bloco>

        <Bloco title="7. Os seus direitos">
          <p>Nos termos do art. 18 da LGPD, você pode a qualquer momento:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Confirmar a existência de tratamento e acessar os seus dados;</li>
            <li>Corrigir dados incompletos ou desatualizados;</li>
            <li>Solicitar anonimização, bloqueio ou eliminação;</li>
            <li>Revogar o consentimento.</li>
          </ul>
          <p>
            Para exercer qualquer direito, basta entrar em contato pelos canais
            informados nesta política.
          </p>
        </Bloco>

        <Bloco title="8. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger
            os seus dados contra acessos não autorizados, perda ou alteração.
          </p>
        </Bloco>

        <Bloco title="9. Atualizações desta política">
          <p>
            Esta política pode ser atualizada para refletir melhorias ou
            mudanças legais. A versão vigente estará sempre disponível nesta
            página.
          </p>
        </Bloco>

        <Bloco title="10. Contato">
          <p>
            Dúvidas sobre privacidade? Fale com {site.name} pelo WhatsApp{" "}
            {site.contact.whatsappDisplay}.
          </p>
        </Bloco>
      </article>
    </div>
  );
}
