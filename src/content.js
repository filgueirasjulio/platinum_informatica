// Fonte única dos dados da loja. Edite aqui telefones, preço, serviços e endereço.
window.PLATINUM = {
  name: "Platinum Informática",
  tagline: "Soluções inteligentes para o seu dia a dia!",

  // Somente dígitos, com código do país (55) e DDD
  whatsappPrimary: "5515988109438",
  phoneSecondary: "5515997133687",
  phonePrimaryLabel: "(15) 98810-9438",
  phoneSecondaryLabel: "(15) 99713-3687",
  whatsappMessage: "Olá! Vim pelo site da Platinum Informática e gostaria de um orçamento.",

  email: "platinuminformatica01@gmail.com",
  instagram: "platinum.informatica",
  // URL exata da página não informada: link de busca. Troque pelo endereço da página quando houver.
  facebook: "https://www.facebook.com/search/top?q=Platinum%20Informatica%20Manuten%C3%A7%C3%A3o%20De%20Computadores",

  address: {
    street: "Rua Ambrosina Pereira de Camargo",
    city: "Tatuí",
    state: "SP",
    zip: "18274-883",
  },
  serviceArea: "Tatuí, SP",
  hours: "Sempre aberto",
  pickupDelivery: true,

  problems: [
    { id: "lentidao", icon: "gauge", title: "Lentidão ao iniciar" },
    { id: "travamentos", icon: "alert", title: "Travamentos e erros" },
    { id: "aquecimento", icon: "thermo", title: "Superaquecimento" },
    { id: "demora", icon: "loader", title: "Programas demorando" },
  ],

  services: [
    {
      id: "manutencao",
      icon: "laptop",
      title: "Manutenção de computadores e notebooks",
      description: "Manutenção preventiva e corretiva para o seu equipamento voltar a funcionar bem.",
    },
    {
      id: "pecas",
      icon: "wrench",
      title: "Montagem e troca de peças",
      description: "Montamos o seu computador e trocamos componentes com peças de qualidade.",
    },
    {
      id: "formatacao",
      icon: "gear",
      title: "Formatação e instalação de sistemas",
      description: "Formatação, instalação e otimização do sistema para mais velocidade.",
    },
    {
      id: "limpeza",
      icon: "thermo",
      title: "Limpeza interna e troca de pasta térmica",
      description: "Remove poeira e melhora o resfriamento, evitando travamentos por calor.",
    },
    {
      id: "upgrade",
      icon: "chip",
      title: "Upgrade de memória, HD e SSD",
      description: "Mais memória RAM e SSD para dar novo fôlego a computadores lentos.",
    },
    {
      id: "venda",
      icon: "cart",
      title: "Venda de peças e acessórios",
      description: "Peças e acessórios de qualidade para o seu computador ou notebook.",
    },
  ],

  promotion: {
    title: "Limpeza + Troca de Pasta Térmica",
    audience: "Computador básico",
    price: 80,
    benefits: [
      "Remove poeira e impurezas",
      "Melhor resfriamento",
      "Mais desempenho e vida útil",
      "Serviço seguro e profissional",
    ],
    whatsappMessage:
      "Olá! Vi no site a promoção de Limpeza + Troca de Pasta Térmica por R$ 80,00 e gostaria de agendar.",
  },

  differentiators: [
    { id: "rapido", icon: "shield", title: "Atendimento rápido e confiável" },
    { id: "qualificados", icon: "award", title: "Profissionais qualificados" },
    { id: "qualidade", icon: "thumb", title: "Peças e acessórios de qualidade" },
    { id: "precos", icon: "dollar", title: "Preços justos e transparentes" },
  ],
};
