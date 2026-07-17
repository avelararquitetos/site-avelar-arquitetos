export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "processo-projeto-arquitetura",
    title: "Como Funciona um Projeto de Arquitetura na Avelar Arquitetos",
    excerpt: "Um guia direto sobre as etapas, prazos e decisões de quem está contratando um escritório de arquitetura pela primeira vez.",
    content: `
Contratar um escritório de arquitetura costuma ser uma experiência nova para a maioria dos clientes. Diferente de uma compra pontual, é uma parceria que se estende por meses — às vezes anos — e passa por decisões técnicas, estéticas e orçamentárias em sequência. Este texto existe para tirar as principais dúvidas antes mesmo do primeiro contato.

## O primeiro encontro

Tudo começa com uma conversa. Antes de qualquer desenho, entendemos o terreno ou imóvel, o orçamento disponível, o modo de vida da família e as referências que já fazem sentido para o cliente. Essa etapa é decisiva: um projeto bem-sucedido nasce de um briefing bem-feito, não de um talento isolado do arquiteto.

## Estudo Preliminar

Com o briefing em mãos, desenvolvemos as primeiras propostas de layout e volumetria. Aqui já é possível visualizar como os ambientes se organizam, como a luz natural entra na casa e como os espaços se conectam. É o momento de ajustar rota — mudar algo no papel custa muito menos do que mudar algo já construído.

## Anteprojeto

Com o partido arquitetônico validado, avançamos para o detalhamento: materiais, acabamentos, esquadrias, paisagismo e, quando aplicável, interiores. É nessa fase que o projeto ganha corpo visual através de imagens 3D, permitindo enxergar o resultado antes da obra começar.

## Projeto Executivo e Complementares

Esta é a etapa técnica: pranchas com todas as informações necessárias para a construção, compatibilizadas com os projetos complementares (estrutural, elétrico, hidráulico, ar-condicionado). É o que garante que a obra saia exatamente como foi desenhada — sem improviso no canteiro.

## Prazos realistas

Cada etapa tem um tempo próprio, e projetos residenciais de alto padrão costumam levar entre 4 e 8 meses do briefing ao projeto executivo, variando com a complexidade e o tamanho da obra. Reformas geralmente têm um ciclo mais curto que construções novas, mas exigem levantamento técnico detalhado do imóvel existente antes de começar.

## Acompanhamento de obra

Nosso envolvimento não termina na entrega das pranchas. Acompanhar a execução garante que o projeto seja construído com fidelidade ao que foi desenhado, resolvendo no campo os ajustes que toda obra real exige.

## Por onde começar

Se você está considerando um projeto residencial, reforma ou projeto de interiores, o primeiro passo é simples: uma conversa sobre o que você tem em mente. Entre em contato para agendarmos esse primeiro encontro.
    `,
    author: "Avelar Arquitetos",
    date: "2026-07-10",
    readTime: "6 min de leitura",
    category: "PROCESSO",
    image: "/src/assets/hero-architecture.jpg"
  },
  {
    id: "reforma-residencial-alto-padrao",
    title: "Reforma Residencial de Alto Padrão: O Que Considerar Antes de Começar",
    excerpt: "Pontos técnicos e de planejamento que definem o sucesso de uma reforma — antes do primeiro martelo.",
    content: `
Reformar costuma parecer mais simples do que construir do zero. Na prática, uma reforma residencial de alto padrão exige um nível de planejamento tão rigoroso quanto uma obra nova — muitas vezes maior, porque lida com um imóvel que já existe, com suas limitações estruturais e histórico próprio.

## Levantamento técnico antes de qualquer decisão estética

Antes de pensar em acabamentos, é preciso entender o que existe: estrutura, instalações elétricas e hidráulicas, e eventuais patologias construtivas (infiltrações, fissuras, desgaste). Esse diagnóstico evita surpresas no meio da obra — a causa mais comum de estouro de orçamento em reformas.

## O que pode e o que não pode mudar

Paredes estruturais, prumadas hidráulicas e limitações do condomínio (em apartamentos) definem o que é tecnicamente viável. Um bom projeto de reforma trabalha dentro dessas restrições sem que o resultado pareça limitado — é justamente aí que entra o valor do projeto arquitetônico bem resolvido.

## Planejamento de layout: o que realmente muda a experiência da casa

Mais do que trocar revestimentos, uma reforma bem-feita repensa a circulação, a entrada de luz natural e a relação entre os ambientes. Pequenos ajustes de layout — como reposicionar uma cozinha ou integrar ambientes sociais — costumam gerar mais impacto na qualidade de vida do que qualquer escolha de acabamento.

## Cronograma e convivência com a obra

Reformas residenciais, especialmente em imóveis ocupados, exigem um cronograma realista e faseado. Definir com clareza o que será feito em cada etapa evita imprevistos e ajuda a família a se organizar durante o período de obra.

## Orçamento: onde investir e onde economizar

Nem todo item da reforma tem o mesmo peso no resultado final. Estrutura, instalações e esquadrias são investimentos que não devem ser reduzidos — são a base técnica da casa. Já em elementos decorativos há mais flexibilidade para ajustar o orçamento sem comprometer a qualidade do projeto.

## O papel do arquiteto na reforma

Um projeto de arquitetura bem conduzido evita retrabalho, orienta fornecedores e mestres de obra, e garante que a reforma entregue o resultado que existia na intenção original — não uma versão aproximada dela.

## Próximo passo

Se você está avaliando uma reforma residencial em Belo Horizonte ou região, vale começar pela avaliação técnica do imóvel. Entre em contato para conversarmos sobre o seu projeto.
    `,
    author: "Avelar Arquitetos",
    date: "2026-07-15",
    readTime: "6 min de leitura",
    category: "REFORMAS",
    image: "/src/assets/project-1.jpg"
  }
];
