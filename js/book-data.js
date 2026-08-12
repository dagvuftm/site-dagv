/* ============================================================
   DAGV – Livro Histórico Interativo
   book-data.js | Fonte única dos documentos exibidos no livro.

   ESTRUTURA: Tema > Capítulo > Páginas
   ---------------------------------------------------------------
   O conteúdo é organizado em 2 TEMAS maiores:
     - "Histórico FMTM"
     - "O Epíplon"

   Dentro de cada tema, as páginas podem ser agrupadas em
   CAPÍTULOS (opcional). No tema "O Epíplon", por exemplo, cada
   edição (Epíplon 1973, Epíplon 1980...) é um capítulo com
   várias páginas dentro (8 a 10 cada).

   Campos de cada página:
     theme     — nome do tema (obrigatório, agrupa no índice)
     chapter   — nome do capítulo (opcional; páginas do mesmo
                 tema sem `chapter` aparecem soltas no índice)
     type      — 'divider' | 'text' | 'image' | 'pdf'
     year      — usado no índice e em legendas
     title     — usado no índice e em legendas

   TIPOS DE PÁGINA:
     'divider' — página de abertura de tema/capítulo, só com
                 título grande centralizado. Use `title` (e
                 opcionalmente `subtitle`).
     'text'    — página com ano/título/descrição.
                 Preencha `description`.
     'image'   — mostra o documento digitalizado como imagem.
                 Preencha `image` com o caminho do arquivo exibido
                 na página do livro (idealmente já redimensionado,
                 leve). Se tiver o escaneado em resolução alta,
                 preencha também `imageFull` — ao clicar na página
                 ela abre em tela cheia, nessa resolução total,
                 pra dar pra ler o texto do documento.
     'pdf'     — renderiza a 1ª página do PDF via PDF.js, com
                 link para abrir o arquivo completo.
                 Preencha `pdf` com o caminho do arquivo.

   Para adicionar um novo capítulo do Epíplon: copie o bloco de
   um capítulo existente (o divider + as páginas dele), troque
   `chapter`/`year`/`title`/`image`, cole no array. Nenhuma
   mudança de HTML/CSS/JS é necessária.
   ============================================================ */

window.DAGV_BOOK_DOCS = [

  /* ================= TEMA 2 — HISTÓRICO FMTM ================= */
  {
    id: 'div-fmtm',
    theme: 'Histórico FMTM',
    type: 'divider',
    title: 'Histórico FMTM',
    subtitle: 'Da Escola de Medicina de Uberaba à UFTM'
  },
  {
    id: 'doc-1953',
    theme: 'Histórico FMTM',
    year: '1953',
    title: 'Fundação da Escola de Medicina',
    type: 'text',
    description:
      'Criação da Escola de Medicina e Cirurgia de Uberaba, embrião do que viria a ser ' +
      'a Faculdade de Medicina do Triângulo Mineiro (FMTM), inaugurando a tradição ' +
      'médica da região.'
  },
  {
    id: 'doc-1960',
    theme: 'Histórico FMTM',
    year: '1960',
    title: 'Federalização da FMTM',
    type: 'text',
    description:
      'A Faculdade de Medicina do Triângulo Mineiro passa à esfera federal, ampliando ' +
      'sua estrutura e alcance. Este momento consolidou a vocação pública e gratuita da instituição.'
  },
  /* ================= CENTRO ACADÊMICO GASPAR VIANNA (CAGV) =================
     Fonte: HistoriaFaculdadeMedicia.pdf, seção 3.4 "Centro Acadêmico Gaspar
     Vianna" e 3.5/3.6 (p. 141–160). Imagens originais das Figuras 20–28. */
  {
    id: 'div-cagv',
    theme: 'Histórico FMTM',
    type: 'divider',
    title: 'Centro Acadêmico Gaspar Vianna',
    subtitle: 'A fundação da entidade estudantil, 1954'
  },
  {
    id: 'cagv-1954-fundacao',
    theme: 'Histórico FMTM',
    year: '1954',
    title: 'Fundação do CAGV',
    type: 'text',
    description:
      'O Centro Acadêmico Gaspar Vianna (CAGV) foi fundado em 1954 para representar ' +
      'os estudantes de Medicina da FMTM, só ganhando sede definitiva em 1960, no 3º ' +
      'andar do edifício Vitória Varotto. Mais tarde passou a se chamar Diretório ' +
      'Acadêmico Gaspar Vianna (DAGV). O nome homenageia Gaspar de Oliveira Vianna, ' +
      'médico paraense que desvendou o ciclo do barbeiro e a transmissão da doença de Chagas.'
  },
  {
    id: 'cagv-1954-diretoria',
    theme: 'Histórico FMTM',
    year: '1954',
    title: 'Primeira Diretoria',
    type: 'text',
    description:
      'A primeira reunião do CAGV aconteceu em 1º de maio de 1954, com a presença do ' +
      'diretor Mozart Furtado Nunes. Wander Magalhães Moreira foi o primeiro presidente; ' +
      'Nilza Martinelli Gomes, uma das únicas mulheres da turma, ocupou a 2ª vice-presidência. ' +
      'Completavam a diretoria estudantes nas secretarias e tesourarias, formando a primeira ' +
      'representação oficial dos acadêmicos da FMTM.'
  },
  {
    id: 'cagv-fig20',
    theme: 'Histórico FMTM',
    year: '1957',
    title: 'Homenagem a Jorge Furtado',
    type: 'image',
    image: 'img/historico/cagv/fig20.jpg',
    imageFull: 'img/historico/cagv/full/fig20.jpg',
    caption: 'Figura 20 — De pé à mesa, o homenageado pelo CAGV Jorge Furtado, 1957. Fonte: FMTM, 1997.'
  },
  {
    id: 'cagv-epiplon',
    theme: 'Histórico FMTM',
    year: '1954',
    title: 'O Jornal Epíplon',
    type: 'text',
    description:
      'Ainda em seus primeiros anos, o CAGV lançou o jornal acadêmico Epíplon, proposto ' +
      'como companheiro de todas as turmas — do calouro ao doutorando. O nome vem do ' +
      'epíplon, órgão que protege as vísceras abdominais: assim como ele, o informativo ' +
      'nasceu para proteger e defender a instituição. Publicado até hoje, tornou-se um dos ' +
      'registros mais duradouros da vida estudantil na FMTM.'
  },
  {
    id: 'cagv-fig21',
    theme: 'Histórico FMTM',
    year: '1957',
    title: 'Carteirinha de Sócio do CAGV',
    type: 'image',
    image: 'img/historico/cagv/fig21.jpg',
    imageFull: 'img/historico/cagv/full/fig21.jpg',
    caption: 'Figura 21 — Ficha de identificação de filiação ao CAGV, 1957. Fonte: UFTM.'
  },
  {
    id: 'cagv-atividades',
    theme: 'Histórico FMTM',
    year: '1955–1960',
    title: 'Atividades do CAGV',
    type: 'text',
    description:
      'Em 3 de maio de 1956, o presidente Juscelino Kubitschek esteve em Uberaba para ' +
      'inaugurar a sede do CAGV. Entre 1955 e 1960 o Centro promovia a Semana Científica, ' +
      'reunindo professores de outras faculdades, além de bailes beneficentes na MED, sua ' +
      'sede social — cuja renda revertia em cobertores, alimentos e utensílios doados à ' +
      'Santa Casa de Misericórdia de Uberaba.'
  },
  {
    id: 'cagv-fig22',
    theme: 'Histórico FMTM',
    year: '1958',
    title: 'Baile na Sede Social',
    type: 'image',
    image: 'img/historico/cagv/fig22.jpg',
    imageFull: 'img/historico/cagv/full/fig22.jpg',
    caption: 'Figura 22 — Baile promovido pelo CAGV na sede social, [1958]. Fonte: UFTM.'
  },
  {
    id: 'cagv-fig23',
    theme: 'Histórico FMTM',
    year: '1954–1960',
    title: 'Presidentes do CAGV',
    type: 'image',
    image: 'img/historico/cagv/fig23.jpg',
    imageFull: 'img/historico/cagv/full/fig23.jpg',
    caption: 'Figura 23 — Presidentes do CAGV (1954–1960): Wander Magalhães Moreira, Mercides Rocha ' +
      'Pacheco, Leopoldo de Castro Silva, Paulo Miguel de Mesquita, Lincoln Marques de Rocha, ' +
      'Wandir Ferreira de Sousa e Nelson Assis. Fonte: UFTM.'
  },

  /* ================= OPERAÇÃO MED ================= */
  {
    id: 'div-operacao-med',
    theme: 'Histórico FMTM',
    type: 'divider',
    title: 'Operação MED',
    subtitle: 'Os alunos reformam o prédio da FMTM, 1959'
  },
  {
    id: 'med-problema',
    theme: 'Histórico FMTM',
    year: '1959',
    title: 'Um Prédio em Ruínas',
    type: 'text',
    description:
      'Às vésperas da formatura da primeira turma, o antigo prédio da penitenciária que ' +
      'abrigava a FMTM estava arruinado e sem recursos para reforma. O recém-chegado ' +
      'professor Mauritano Rodrigues Ferreira propôs um projeto de reforma sem custos para ' +
      'a instituição, e o CAGV liderou, junto à sociedade de Uberaba, a campanha que ficou ' +
      'conhecida como "Operação MED".'
  },
  {
    id: 'med-fig24',
    theme: 'Histórico FMTM',
    year: '1959',
    title: 'A Faixa da Operação MED',
    type: 'image',
    image: 'img/historico/cagv/fig24.jpg',
    imageFull: 'img/historico/cagv/full/fig24.jpg',
    caption: 'Figura 24 — Faixa da "Operação MED" na entrada do prédio da FMTM, [1959]. Fonte: UFTM.'
  },
  {
    id: 'med-arrecadacao',
    theme: 'Histórico FMTM',
    year: '1959',
    title: 'A Cidade se Mobiliza',
    type: 'text',
    description:
      'A campanha reuniu doações de 35 professores e 30 alunos, somando Cr$ 650.000,00, ' +
      'além de gado zebu leiloado, sacos de cimento, toneladas de ferro e tubulação doados ' +
      'por empresas e pelo governo estadual. A "barrica da Operação MED" circulava pelos ' +
      'bairros de Uberaba recolhendo contribuições de toda a população, do mais pobre ao mais rico.'
  },
  {
    id: 'med-fig25',
    theme: 'Histórico FMTM',
    year: '1959',
    title: 'Trabalho dos Próprios Alunos',
    type: 'image',
    image: 'img/historico/cagv/fig25.jpg',
    imageFull: 'img/historico/cagv/full/fig25.jpg',
    caption: 'Figura 25 — Alunos da FMTM se entregam às atividades de reforma do prédio, [1959]. Fonte: UFTM.'
  },
  {
    id: 'med-mao-de-obra',
    theme: 'Histórico FMTM',
    year: '1959',
    title: 'Mão de Obra Braçal',
    type: 'text',
    description:
      'Além do dinheiro arrecadado, os próprios estudantes trabalharam como operários: ' +
      'demoliram os antigos muros de pedra da cadeia, ergueram paredes e grades e fizeram a ' +
      'terraplanagem do terreno. O jornal paulista O Independente noticiou o feito com a ' +
      'manchete "Um Punhado de Bravos", registrando que médicos, alunos e professores faziam ' +
      'trabalho braçal lado a lado para transformar a penitenciária em faculdade.'
  },
  {
    id: 'med-fig26',
    theme: 'Histórico FMTM',
    year: '1960',
    title: 'O Prédio Reformado',
    type: 'image',
    image: 'img/historico/cagv/fig26.jpg',
    imageFull: 'img/historico/cagv/full/fig26.jpg',
    caption: 'Figura 26 — Obras de reforma do prédio da FMTM, [1960]. Fonte: UFTM.'
  },

  /* ================= CAMINHO PARA A FEDERALIZAÇÃO ================= */
  {
    id: 'div-caminho-federalizacao',
    theme: 'Histórico FMTM',
    type: 'divider',
    title: 'Caminho para a Federalização',
    subtitle: 'A mobilização estudantil junto a Juscelino Kubitschek'
  },
  {
    id: 'fed-primeiro-pedido',
    theme: 'Histórico FMTM',
    year: '1956',
    title: 'O Primeiro Pedido',
    type: 'text',
    description:
      'Em maio de 1956, ano do centenário de Uberaba, o presidente Juscelino Kubitschek ' +
      'inaugurou a exposição agropecuária da raça zebuína e recebeu do diretor Mozart ' +
      'Furtado o primeiro pedido de federalização da FMTM. O CAGV entregou, na mesma ' +
      'ocasião, um memorial assinado por todos os alunos da faculdade pedindo a federalização ' +
      'como presente do centenário — mas o presidente considerou o momento ainda prematuro.'
  },
  {
    id: 'fed-campanha-cagv',
    theme: 'Histórico FMTM',
    year: '1956–1960',
    title: 'A Campanha do CAGV',
    type: 'text',
    description:
      'Em março de 1956, o presidente do CAGV Wander Magalhães Moreira lançou pelo jornal ' +
      'O Epíplon a federalização como objetivo máximo do Centro Acadêmico. Em setembro do ' +
      'mesmo ano, uma comitiva com o diretor, o presidente do CAGV e 19 alunos viajou ao Rio ' +
      'de Janeiro para uma audiência no Palácio do Catete, onde JK prometeu federalizar a ' +
      'FMTM antes do fim de seu mandato.'
  },
  {
    id: 'fed-jk-aeroporto',
    theme: 'Histórico FMTM',
    year: '1960',
    title: 'JK é "Sequestrado" pelos Estudantes',
    type: 'text',
    description:
      'Em 3 de maio de 1960, ao desembarcar em Uberaba para a exposição de gado zebu, o ' +
      'presidente JK foi cercado por estudantes da FMTM ainda na escada do avião e levado, ' +
      'em meio à multidão, direto para a sede do CAGV. Ali, escreveu sobre uma fotografia sua: ' +
      '"tudo farei que estiver ao meu alcance para federalizar esta escola, pois ela é a menina ' +
      'dos meus olhos" — frase saudada com euforia pelos estudantes presentes.'
  },
  {
    id: 'fed-fig27',
    theme: 'Histórico FMTM',
    year: '1960',
    title: 'A Primeira Turma se Forma',
    type: 'image',
    image: 'img/historico/cagv/fig27.jpg',
    imageFull: 'img/historico/cagv/full/fig27.jpg',
    caption: 'Figura 27 — Colação de grau da primeira turma de formandos da FMTM, 6 de janeiro de 1960. Fonte: UFTM.'
  },

  /* ================= A FEDERALIZAÇÃO ================= */
  {
    id: 'div-a-federalizacao',
    theme: 'Histórico FMTM',
    type: 'divider',
    title: 'A Federalização',
    subtitle: 'A FMTM se torna instituição pública federal'
  },
  {
    id: 'fed-mobilizacao-final',
    theme: 'Histórico FMTM',
    year: '1960',
    title: 'A Reta Final',
    type: 'text',
    description:
      'Sob a nova diretoria do CAGV, presidida por Nelson Assis, os estudantes organizaram ' +
      'passeatas, comícios e uma concentração popular na praça Rui Barbosa, enviando ao ' +
      'governo federal mais de quatro mil solicitações de federalização. A Câmara dos ' +
      'Deputados aprovou o projeto em 25 de novembro de 1960, e o Senado, em 14 de dezembro ' +
      'do mesmo ano.'
  },
  {
    id: 'fed-fig28',
    theme: 'Histórico FMTM',
    year: '18 dez. 1960',
    title: 'A Assinatura do Decreto',
    type: 'image',
    image: 'img/historico/cagv/fig28.jpg',
    imageFull: 'img/historico/cagv/full/fig28.jpg',
    caption: 'Figura 28 — Assinatura do decreto de federalização da FMTM pelo presidente Juscelino ' +
      'Kubitschek, no Rio de Janeiro. Fonte: UFTM.'
  },
  {
    id: 'fed-legado',
    theme: 'Histórico FMTM',
    year: '1960',
    title: 'Uma Escola Pública',
    type: 'text',
    description:
      'A sanção presidencial ocorreu em 18 de dezembro de 1960, no Palácio da Alvorada, com ' +
      'uma comissão do CAGV presente. Na "Mensagem da Federalização" enviada aos colegas, o ' +
      'CAGV celebrou: a Faculdade deixava de ser sociedade particular para se tornar "autêntico ' +
      'centro de formação médica, autônoma, livre, independente, plenamente democrática como ' +
      'só a Escola Pública" — um marco decisivo para Uberaba e para o Triângulo Mineiro.'
  },

  {
    id: 'doc-1970',
    theme: 'Histórico FMTM',
    year: 'Déc. 1970',
    title: 'Primeiras Gestões do DAGV',
    type: 'text',
    description:
      'Surgem os primeiros registros formais do Diretório Acadêmico Gaspar Vianna — ' +
      'batizado em homenagem ao médico paraense patrono da parasitologia brasileira. ' +
      'Estudantes iniciam a organização representativa oficial.'
  },
  {
    id: 'doc-2005',
    theme: 'Histórico FMTM',
    year: '2005',
    title: 'Transformação em UFTM',
    type: 'text',
    description:
      'A FMTM se transforma na Universidade Federal do Triângulo Mineiro (UFTM), ' +
      'expandindo cursos e consolidando um campus universitário completo em Uberaba.'
  },
  {
    id: 'doc-2010',
    theme: 'Histórico FMTM',
    year: '2010–2020',
    title: 'Expansão e Projetos Sociais',
    type: 'text',
    description:
      'Década de grande crescimento do DAGV: criação do Cursinho Carolina, fortalecimento ' +
      'das Ligas Acadêmicas e articulação com o DCE UFTM. O diretório consolida sua identidade ' +
      'social e científica.'
  },
  {
    id: 'doc-2026',
    theme: 'Histórico FMTM',
    year: '2026',
    title: 'Gestão Guimarães Rosa',
    type: 'text',
    description:
      'A atual gestão, inspirada pelo legado literário e mineiro de João Guimarães Rosa, ' +
      'dá continuidade ao projeto do DAGV: representar, integrar e transformar a experiência ' +
      'acadêmica dos futuros médicos da UFTM.'
  },

  

/* ================= TEMA 3 — O EPÍPLON ================= */

{
    id: 'div-epiplon',
    theme: 'O Epíplon',
    type: 'divider',
    title: 'O Epíplon',
    subtitle: 'Boletim histórico do DAGV, edição a edição'
  },



  /* ---- Epíplon 1973 (Nº 31) (1973) ---- */

{
    id: 'div-epiplon-1973-n31',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    type: 'divider',
    title: 'Epíplon 1973',
    subtitle: 'Nº 31'
  },

{
    id: 'epiplon-1973-n31-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 1',
    type: 'image',
    image: 'img/epiplon/1973-n31/01.jpg',
    imageFull: 'img/epiplon/1973-n31/full/01.jpg'
  },

{
    id: 'epiplon-1973-n31-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 2',
    type: 'image',
    image: 'img/epiplon/1973-n31/02.jpg',
    imageFull: 'img/epiplon/1973-n31/full/02.jpg'
  },

{
    id: 'epiplon-1973-n31-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 3',
    type: 'image',
    image: 'img/epiplon/1973-n31/03.jpg',
    imageFull: 'img/epiplon/1973-n31/full/03.jpg'
  },

{
    id: 'epiplon-1973-n31-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 4',
    type: 'image',
    image: 'img/epiplon/1973-n31/04.jpg',
    imageFull: 'img/epiplon/1973-n31/full/04.jpg'
  },

{
    id: 'epiplon-1973-n31-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 5',
    type: 'image',
    image: 'img/epiplon/1973-n31/05.jpg',
    imageFull: 'img/epiplon/1973-n31/full/05.jpg'
  },

{
    id: 'epiplon-1973-n31-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 6',
    type: 'image',
    image: 'img/epiplon/1973-n31/06.jpg',
    imageFull: 'img/epiplon/1973-n31/full/06.jpg'
  },

{
    id: 'epiplon-1973-n31-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 7',
    type: 'image',
    image: 'img/epiplon/1973-n31/07.jpg',
    imageFull: 'img/epiplon/1973-n31/full/07.jpg'
  },

{
    id: 'epiplon-1973-n31-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 31)',
    year: '1973',
    title: 'Epíplon Nº 31 — Página 8',
    type: 'image',
    image: 'img/epiplon/1973-n31/08.jpg',
    imageFull: 'img/epiplon/1973-n31/full/08.jpg'
  },



  /* ---- Epíplon 1973 (Nº 33) (1973) ---- */

{
    id: 'div-epiplon-1973-n33',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    type: 'divider',
    title: 'Epíplon 1973',
    subtitle: 'Nº 33'
  },

{
    id: 'epiplon-1973-n33-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 1',
    type: 'image',
    image: 'img/epiplon/1973-n33/01.jpg',
    imageFull: 'img/epiplon/1973-n33/full/01.jpg'
  },

{
    id: 'epiplon-1973-n33-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 2',
    type: 'image',
    image: 'img/epiplon/1973-n33/02.jpg',
    imageFull: 'img/epiplon/1973-n33/full/02.jpg'
  },

{
    id: 'epiplon-1973-n33-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 3',
    type: 'image',
    image: 'img/epiplon/1973-n33/03.jpg',
    imageFull: 'img/epiplon/1973-n33/full/03.jpg'
  },

{
    id: 'epiplon-1973-n33-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 4',
    type: 'image',
    image: 'img/epiplon/1973-n33/04.jpg',
    imageFull: 'img/epiplon/1973-n33/full/04.jpg'
  },

{
    id: 'epiplon-1973-n33-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 5',
    type: 'image',
    image: 'img/epiplon/1973-n33/05.jpg',
    imageFull: 'img/epiplon/1973-n33/full/05.jpg'
  },

{
    id: 'epiplon-1973-n33-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 6',
    type: 'image',
    image: 'img/epiplon/1973-n33/06.jpg',
    imageFull: 'img/epiplon/1973-n33/full/06.jpg'
  },

{
    id: 'epiplon-1973-n33-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 7',
    type: 'image',
    image: 'img/epiplon/1973-n33/07.jpg',
    imageFull: 'img/epiplon/1973-n33/full/07.jpg'
  },

{
    id: 'epiplon-1973-n33-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 8',
    type: 'image',
    image: 'img/epiplon/1973-n33/08.jpg',
    imageFull: 'img/epiplon/1973-n33/full/08.jpg'
  },

{
    id: 'epiplon-1973-n33-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 9',
    type: 'image',
    image: 'img/epiplon/1973-n33/09.jpg',
    imageFull: 'img/epiplon/1973-n33/full/09.jpg'
  },

{
    id: 'epiplon-1973-n33-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 10',
    type: 'image',
    image: 'img/epiplon/1973-n33/10.jpg',
    imageFull: 'img/epiplon/1973-n33/full/10.jpg'
  },

{
    id: 'epiplon-1973-n33-p11',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 11',
    type: 'image',
    image: 'img/epiplon/1973-n33/11.jpg',
    imageFull: 'img/epiplon/1973-n33/full/11.jpg'
  },

{
    id: 'epiplon-1973-n33-p12',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1973 (Nº 33)',
    year: '1973',
    title: 'Epíplon 1973 (Nº 33) — Página 12',
    type: 'image',
    image: 'img/epiplon/1973-n33/12.jpg',
    imageFull: 'img/epiplon/1973-n33/full/12.jpg'
  },



  /* ---- Epíplon 1974 (Nº 34) (1974) ---- */

{
    id: 'div-epiplon-1974-n34',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    type: 'divider',
    title: 'Epíplon 1974',
    subtitle: 'Nº 34'
  },

{
    id: 'epiplon-1974-n34-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 1',
    type: 'image',
    image: 'img/epiplon/1974-n34/01.jpg',
    imageFull: 'img/epiplon/1974-n34/full/01.jpg'
  },

{
    id: 'epiplon-1974-n34-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 2',
    type: 'image',
    image: 'img/epiplon/1974-n34/02.jpg',
    imageFull: 'img/epiplon/1974-n34/full/02.jpg'
  },

{
    id: 'epiplon-1974-n34-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 3',
    type: 'image',
    image: 'img/epiplon/1974-n34/03.jpg',
    imageFull: 'img/epiplon/1974-n34/full/03.jpg'
  },

{
    id: 'epiplon-1974-n34-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 4',
    type: 'image',
    image: 'img/epiplon/1974-n34/04.jpg',
    imageFull: 'img/epiplon/1974-n34/full/04.jpg'
  },

{
    id: 'epiplon-1974-n34-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 5',
    type: 'image',
    image: 'img/epiplon/1974-n34/05.jpg',
    imageFull: 'img/epiplon/1974-n34/full/05.jpg'
  },

{
    id: 'epiplon-1974-n34-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 6',
    type: 'image',
    image: 'img/epiplon/1974-n34/06.jpg',
    imageFull: 'img/epiplon/1974-n34/full/06.jpg'
  },

{
    id: 'epiplon-1974-n34-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 7',
    type: 'image',
    image: 'img/epiplon/1974-n34/07.jpg',
    imageFull: 'img/epiplon/1974-n34/full/07.jpg'
  },

{
    id: 'epiplon-1974-n34-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1974 (Nº 34)',
    year: '1974',
    title: 'Epíplon 1974 (Nº 34) — Página 8',
    type: 'image',
    image: 'img/epiplon/1974-n34/08.jpg',
    imageFull: 'img/epiplon/1974-n34/full/08.jpg'
  },



  /* ---- Epíplon 1978 (Nº 41) (1978) ---- */

{
    id: 'div-epiplon-1978-n41',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    type: 'divider',
    title: 'Epíplon 1978',
    subtitle: 'Nº 41'
  },

{
    id: 'epiplon-1978-n41-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 1',
    type: 'image',
    image: 'img/epiplon/1978-n41/01.jpg',
    imageFull: 'img/epiplon/1978-n41/full/01.jpg'
  },

{
    id: 'epiplon-1978-n41-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 2',
    type: 'image',
    image: 'img/epiplon/1978-n41/02.jpg',
    imageFull: 'img/epiplon/1978-n41/full/02.jpg'
  },

{
    id: 'epiplon-1978-n41-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 3',
    type: 'image',
    image: 'img/epiplon/1978-n41/03.jpg',
    imageFull: 'img/epiplon/1978-n41/full/03.jpg'
  },

{
    id: 'epiplon-1978-n41-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 4',
    type: 'image',
    image: 'img/epiplon/1978-n41/04.jpg',
    imageFull: 'img/epiplon/1978-n41/full/04.jpg'
  },

{
    id: 'epiplon-1978-n41-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 5',
    type: 'image',
    image: 'img/epiplon/1978-n41/05.jpg',
    imageFull: 'img/epiplon/1978-n41/full/05.jpg'
  },

{
    id: 'epiplon-1978-n41-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 6',
    type: 'image',
    image: 'img/epiplon/1978-n41/06.jpg',
    imageFull: 'img/epiplon/1978-n41/full/06.jpg'
  },

{
    id: 'epiplon-1978-n41-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 7',
    type: 'image',
    image: 'img/epiplon/1978-n41/07.jpg',
    imageFull: 'img/epiplon/1978-n41/full/07.jpg'
  },

{
    id: 'epiplon-1978-n41-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 8',
    type: 'image',
    image: 'img/epiplon/1978-n41/08.jpg',
    imageFull: 'img/epiplon/1978-n41/full/08.jpg'
  },

{
    id: 'epiplon-1978-n41-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1978 (Nº 41)',
    year: '1978',
    title: 'Epíplon 1978 (Nº 41) — Página 9',
    type: 'image',
    image: 'img/epiplon/1978-n41/09.jpg',
    imageFull: 'img/epiplon/1978-n41/full/09.jpg'
  },



  /* ---- Epíplon 1980 (Nº 45) (1980) ---- */

{
    id: 'div-epiplon-1980-n45',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    type: 'divider',
    title: 'Epíplon 1980',
    subtitle: 'Nº 45'
  },

{
    id: 'epiplon-1980-n45-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 1',
    type: 'image',
    image: 'img/epiplon/1980-n45/01.jpg',
    imageFull: 'img/epiplon/1980-n45/full/01.jpg'
  },

{
    id: 'epiplon-1980-n45-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 2',
    type: 'image',
    image: 'img/epiplon/1980-n45/02.jpg',
    imageFull: 'img/epiplon/1980-n45/full/02.jpg'
  },

{
    id: 'epiplon-1980-n45-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 3',
    type: 'image',
    image: 'img/epiplon/1980-n45/03.jpg',
    imageFull: 'img/epiplon/1980-n45/full/03.jpg'
  },

{
    id: 'epiplon-1980-n45-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 4',
    type: 'image',
    image: 'img/epiplon/1980-n45/04.jpg',
    imageFull: 'img/epiplon/1980-n45/full/04.jpg'
  },

{
    id: 'epiplon-1980-n45-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 5',
    type: 'image',
    image: 'img/epiplon/1980-n45/05.jpg',
    imageFull: 'img/epiplon/1980-n45/full/05.jpg'
  },

{
    id: 'epiplon-1980-n45-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 6',
    type: 'image',
    image: 'img/epiplon/1980-n45/06.jpg',
    imageFull: 'img/epiplon/1980-n45/full/06.jpg'
  },

{
    id: 'epiplon-1980-n45-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 7',
    type: 'image',
    image: 'img/epiplon/1980-n45/07.jpg',
    imageFull: 'img/epiplon/1980-n45/full/07.jpg'
  },

{
    id: 'epiplon-1980-n45-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980 (Nº 45)',
    year: '1980',
    title: 'Epíplon 1980 (Nº 45) — Página 8',
    type: 'image',
    image: 'img/epiplon/1980-n45/08.jpg',
    imageFull: 'img/epiplon/1980-n45/full/08.jpg'
  },



  /* ---- Epíplon 1980 (1980) ---- */

{
    id: 'div-epiplon-1980',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    type: 'divider',
    title: 'Epíplon 1980'
  },

{
    id: 'epiplon-1980-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 1',
    type: 'image',
    image: 'img/epiplon/1980/01.jpg',
    imageFull: 'img/epiplon/1980/full/01.jpg'
  },

{
    id: 'epiplon-1980-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 2',
    type: 'image',
    image: 'img/epiplon/1980/02.jpg',
    imageFull: 'img/epiplon/1980/full/02.jpg'
  },

{
    id: 'epiplon-1980-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 3',
    type: 'image',
    image: 'img/epiplon/1980/03.jpg',
    imageFull: 'img/epiplon/1980/full/03.jpg'
  },

{
    id: 'epiplon-1980-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 4',
    type: 'image',
    image: 'img/epiplon/1980/04.jpg',
    imageFull: 'img/epiplon/1980/full/04.jpg'
  },

{
    id: 'epiplon-1980-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 5',
    type: 'image',
    image: 'img/epiplon/1980/05.jpg',
    imageFull: 'img/epiplon/1980/full/05.jpg'
  },

{
    id: 'epiplon-1980-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 6',
    type: 'image',
    image: 'img/epiplon/1980/06.jpg',
    imageFull: 'img/epiplon/1980/full/06.jpg'
  },

{
    id: 'epiplon-1980-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 7',
    type: 'image',
    image: 'img/epiplon/1980/07.jpg',
    imageFull: 'img/epiplon/1980/full/07.jpg'
  },

{
    id: 'epiplon-1980-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 8',
    type: 'image',
    image: 'img/epiplon/1980/08.jpg',
    imageFull: 'img/epiplon/1980/full/08.jpg'
  },

{
    id: 'epiplon-1980-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 9',
    type: 'image',
    image: 'img/epiplon/1980/09.jpg',
    imageFull: 'img/epiplon/1980/full/09.jpg'
  },

{
    id: 'epiplon-1980-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 10',
    type: 'image',
    image: 'img/epiplon/1980/10.jpg',
    imageFull: 'img/epiplon/1980/full/10.jpg'
  },

{
    id: 'epiplon-1980-p11',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 11',
    type: 'image',
    image: 'img/epiplon/1980/11.jpg',
    imageFull: 'img/epiplon/1980/full/11.jpg'
  },

{
    id: 'epiplon-1980-p12',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1980',
    year: '1980',
    title: 'Epíplon 1980 — Página 12',
    type: 'image',
    image: 'img/epiplon/1980/12.jpg',
    imageFull: 'img/epiplon/1980/full/12.jpg'
  },



  /* ---- Epíplon 1983 (Agosto, Nº 53) (ago/1983) ---- */

{
    id: 'div-epiplon-1983-agosto-n53',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    type: 'divider',
    title: 'Epíplon 1983',
    subtitle: 'Agosto — Nº 53'
  },

{
    id: 'epiplon-1983-agosto-n53-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 1',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/01.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/01.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 2',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/02.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/02.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 3',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/03.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/03.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 4',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/04.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/04.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 5',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/05.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/05.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 6',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/06.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/06.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 7',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/07.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/07.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 8',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/08.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/08.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 9',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/09.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/09.jpg'
  },

{
    id: 'epiplon-1983-agosto-n53-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Agosto, Nº 53)',
    year: '1983',
    title: 'Epíplon 1983 (Agosto, Nº 53) — Página 10',
    type: 'image',
    image: 'img/epiplon/1983-agosto-n53/10.jpg',
    imageFull: 'img/epiplon/1983-agosto-n53/full/10.jpg'
  },



  /* ---- Epíplon 1983 (Outubro, Nº 54) (out/1983) ---- */

{
    id: 'div-epiplon-1983-outubro-n54',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    type: 'divider',
    title: 'Epíplon 1983',
    subtitle: 'Outubro — Nº 54'
  },

{
    id: 'epiplon-1983-outubro-n54-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 1',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/01.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/01.jpg'
  },

{
    id: 'epiplon-1983-outubro-n54-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 2',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/02.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/02.jpg'
  },

{
    id: 'epiplon-1983-outubro-n54-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 3',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/03.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/03.jpg'
  },

{
    id: 'epiplon-1983-outubro-n54-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 4',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/04.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/04.jpg'
  },

{
    id: 'epiplon-1983-outubro-n54-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 5',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/05.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/05.jpg'
  },

{
    id: 'epiplon-1983-outubro-n54-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 6',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/06.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/06.jpg'
  },

{
    id: 'epiplon-1983-outubro-n54-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1983 (Outubro, Nº 54)',
    year: '1983',
    title: 'Epíplon 1983 (Outubro, Nº 54) — Página 7',
    type: 'image',
    image: 'img/epiplon/1983-outubro-n54/07.jpg',
    imageFull: 'img/epiplon/1983-outubro-n54/full/07.jpg'
  },



  /* ---- Epíplon Nº 56 (1983–84 (s/d)) ---- */

{
    id: 'div-epiplon-n56',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    type: 'divider',
    title: 'Epíplon',
    subtitle: 'Nº 56'
  },

{
    id: 'epiplon-n56-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 1',
    type: 'image',
    image: 'img/epiplon/n56/01.jpg',
    imageFull: 'img/epiplon/n56/full/01.jpg'
  },

{
    id: 'epiplon-n56-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 2',
    type: 'image',
    image: 'img/epiplon/n56/02.jpg',
    imageFull: 'img/epiplon/n56/full/02.jpg'
  },

{
    id: 'epiplon-n56-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 3',
    type: 'image',
    image: 'img/epiplon/n56/03.jpg',
    imageFull: 'img/epiplon/n56/full/03.jpg'
  },

{
    id: 'epiplon-n56-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 4',
    type: 'image',
    image: 'img/epiplon/n56/04.jpg',
    imageFull: 'img/epiplon/n56/full/04.jpg'
  },

{
    id: 'epiplon-n56-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 5',
    type: 'image',
    image: 'img/epiplon/n56/05.jpg',
    imageFull: 'img/epiplon/n56/full/05.jpg'
  },

{
    id: 'epiplon-n56-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 6',
    type: 'image',
    image: 'img/epiplon/n56/06.jpg',
    imageFull: 'img/epiplon/n56/full/06.jpg'
  },

{
    id: 'epiplon-n56-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 7',
    type: 'image',
    image: 'img/epiplon/n56/07.jpg',
    imageFull: 'img/epiplon/n56/full/07.jpg'
  },

{
    id: 'epiplon-n56-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 8',
    type: 'image',
    image: 'img/epiplon/n56/08.jpg',
    imageFull: 'img/epiplon/n56/full/08.jpg'
  },

{
    id: 'epiplon-n56-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 9',
    type: 'image',
    image: 'img/epiplon/n56/09.jpg',
    imageFull: 'img/epiplon/n56/full/09.jpg'
  },

{
    id: 'epiplon-n56-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon Nº 56',
    year: 's/d',
    title: 'Epíplon Nº 56 — Página 10',
    type: 'image',
    image: 'img/epiplon/n56/10.jpg',
    imageFull: 'img/epiplon/n56/full/10.jpg'
  },



  /* ---- Epíplon 1984 (Dezembro, Nº 58) (dez/1984) ---- */

{
    id: 'div-epiplon-1984-dezembro-n58',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1984 (Dezembro, Nº 58)',
    type: 'divider',
    title: 'Epíplon 1984',
    subtitle: 'Dezembro — Nº 58'
  },

{
    id: 'epiplon-1984-dezembro-n58-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1984 (Dezembro, Nº 58)',
    year: '1984',
    title: 'Epíplon 1984 (Dezembro, Nº 58) — Página 1',
    type: 'image',
    image: 'img/epiplon/1984-dezembro-n58/01.jpg',
    imageFull: 'img/epiplon/1984-dezembro-n58/full/01.jpg'
  },

{
    id: 'epiplon-1984-dezembro-n58-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1984 (Dezembro, Nº 58)',
    year: '1984',
    title: 'Epíplon 1984 (Dezembro, Nº 58) — Página 2',
    type: 'image',
    image: 'img/epiplon/1984-dezembro-n58/02.jpg',
    imageFull: 'img/epiplon/1984-dezembro-n58/full/02.jpg'
  },

{
    id: 'epiplon-1984-dezembro-n58-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1984 (Dezembro, Nº 58)',
    year: '1984',
    title: 'Epíplon 1984 (Dezembro, Nº 58) — Página 3',
    type: 'image',
    image: 'img/epiplon/1984-dezembro-n58/03.jpg',
    imageFull: 'img/epiplon/1984-dezembro-n58/full/03.jpg'
  },

{
    id: 'epiplon-1984-dezembro-n58-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1984 (Dezembro, Nº 58)',
    year: '1984',
    title: 'Epíplon 1984 (Dezembro, Nº 58) — Página 4',
    type: 'image',
    image: 'img/epiplon/1984-dezembro-n58/04.jpg',
    imageFull: 'img/epiplon/1984-dezembro-n58/full/04.jpg'
  },



  /* ---- Epíplon 1989 (Abril) (abr/1989) ---- */

{
    id: 'div-epiplon-1989-abril',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1989 (Abril)',
    type: 'divider',
    title: 'Epíplon 1989',
    subtitle: 'Abril'
  },

{
    id: 'epiplon-1989-abril-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1989 (Abril)',
    year: '1989',
    title: 'Epíplon 1989 (Abril) — Página 1',
    type: 'image',
    image: 'img/epiplon/1989-abril/01.jpg',
    imageFull: 'img/epiplon/1989-abril/full/01.jpg'
  },

{
    id: 'epiplon-1989-abril-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1989 (Abril)',
    year: '1989',
    title: 'Epíplon 1989 (Abril) — Página 2',
    type: 'image',
    image: 'img/epiplon/1989-abril/02.jpg',
    imageFull: 'img/epiplon/1989-abril/full/02.jpg'
  },



  /* ---- Epíplon 1993 (Dezembro) (dez/1993) ---- */

{
    id: 'div-epiplon-1993-dezembro',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    type: 'divider',
    title: 'Epíplon 1993',
    subtitle: 'Dezembro'
  },

{
    id: 'epiplon-1993-dezembro-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 1',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/01.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/01.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 2',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/02.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/02.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 3',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/03.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/03.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 4',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/04.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/04.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 5',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/05.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/05.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 6',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/06.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/06.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 7',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/07.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/07.jpg'
  },

{
    id: 'epiplon-1993-dezembro-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1993 (Dezembro)',
    year: '1993',
    title: 'Epíplon 1993 (Dezembro) — Página 8',
    type: 'image',
    image: 'img/epiplon/1993-dezembro/08.jpg',
    imageFull: 'img/epiplon/1993-dezembro/full/08.jpg'
  },



  /* ---- Epíplon 1997 (1997) ---- */

{
    id: 'div-epiplon-1997',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    type: 'divider',
    title: 'Epíplon 1997'
  },

{
    id: 'epiplon-1997-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 1',
    type: 'image',
    image: 'img/epiplon/1997/01.jpg',
    imageFull: 'img/epiplon/1997/full/01.jpg'
  },

{
    id: 'epiplon-1997-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 2',
    type: 'image',
    image: 'img/epiplon/1997/02.jpg',
    imageFull: 'img/epiplon/1997/full/02.jpg'
  },

{
    id: 'epiplon-1997-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 3',
    type: 'image',
    image: 'img/epiplon/1997/03.jpg',
    imageFull: 'img/epiplon/1997/full/03.jpg'
  },

{
    id: 'epiplon-1997-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 4',
    type: 'image',
    image: 'img/epiplon/1997/04.jpg',
    imageFull: 'img/epiplon/1997/full/04.jpg'
  },

{
    id: 'epiplon-1997-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 5',
    type: 'image',
    image: 'img/epiplon/1997/05.jpg',
    imageFull: 'img/epiplon/1997/full/05.jpg'
  },

{
    id: 'epiplon-1997-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 6',
    type: 'image',
    image: 'img/epiplon/1997/06.jpg',
    imageFull: 'img/epiplon/1997/full/06.jpg'
  },

{
    id: 'epiplon-1997-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 7',
    type: 'image',
    image: 'img/epiplon/1997/07.jpg',
    imageFull: 'img/epiplon/1997/full/07.jpg'
  },

{
    id: 'epiplon-1997-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 8',
    type: 'image',
    image: 'img/epiplon/1997/08.jpg',
    imageFull: 'img/epiplon/1997/full/08.jpg'
  },

{
    id: 'epiplon-1997-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 9',
    type: 'image',
    image: 'img/epiplon/1997/09.jpg',
    imageFull: 'img/epiplon/1997/full/09.jpg'
  },

{
    id: 'epiplon-1997-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon 1997',
    year: '1997',
    title: 'Epíplon 1997 — Página 10',
    type: 'image',
    image: 'img/epiplon/1997/10.jpg',
    imageFull: 'img/epiplon/1997/full/10.jpg'
  },



  /* ---- Epíplon 2000 (2000) ---- */

{
    id: 'div-epiplon-2000',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    type: 'divider',
    title: 'Epíplon 2000'
  },

{
    id: 'epiplon-2000-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 1',
    type: 'image',
    image: 'img/epiplon/2000/01.jpg',
    imageFull: 'img/epiplon/2000/full/01.jpg'
  },

{
    id: 'epiplon-2000-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 2',
    type: 'image',
    image: 'img/epiplon/2000/02.jpg',
    imageFull: 'img/epiplon/2000/full/02.jpg'
  },

{
    id: 'epiplon-2000-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 3',
    type: 'image',
    image: 'img/epiplon/2000/03.jpg',
    imageFull: 'img/epiplon/2000/full/03.jpg'
  },

{
    id: 'epiplon-2000-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 4',
    type: 'image',
    image: 'img/epiplon/2000/04.jpg',
    imageFull: 'img/epiplon/2000/full/04.jpg'
  },

{
    id: 'epiplon-2000-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 5',
    type: 'image',
    image: 'img/epiplon/2000/05.jpg',
    imageFull: 'img/epiplon/2000/full/05.jpg'
  },

{
    id: 'epiplon-2000-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 6',
    type: 'image',
    image: 'img/epiplon/2000/06.jpg',
    imageFull: 'img/epiplon/2000/full/06.jpg'
  },

{
    id: 'epiplon-2000-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 7',
    type: 'image',
    image: 'img/epiplon/2000/07.jpg',
    imageFull: 'img/epiplon/2000/full/07.jpg'
  },

{
    id: 'epiplon-2000-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 8',
    type: 'image',
    image: 'img/epiplon/2000/08.jpg',
    imageFull: 'img/epiplon/2000/full/08.jpg'
  },

{
    id: 'epiplon-2000-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 9',
    type: 'image',
    image: 'img/epiplon/2000/09.jpg',
    imageFull: 'img/epiplon/2000/full/09.jpg'
  },

{
    id: 'epiplon-2000-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2000',
    year: '2000',
    title: 'Epíplon 2000 — Página 10',
    type: 'image',
    image: 'img/epiplon/2000/10.jpg',
    imageFull: 'img/epiplon/2000/full/10.jpg'
  },



  /* ---- Epíplon 2001 (2001) ---- */

{
    id: 'div-epiplon-2001',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    type: 'divider',
    title: 'Epíplon 2001'
  },

{
    id: 'epiplon-2001-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 1',
    type: 'image',
    image: 'img/epiplon/2001/01.jpg',
    imageFull: 'img/epiplon/2001/full/01.jpg'
  },

{
    id: 'epiplon-2001-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 2',
    type: 'image',
    image: 'img/epiplon/2001/02.jpg',
    imageFull: 'img/epiplon/2001/full/02.jpg'
  },

{
    id: 'epiplon-2001-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 3',
    type: 'image',
    image: 'img/epiplon/2001/03.jpg',
    imageFull: 'img/epiplon/2001/full/03.jpg'
  },

{
    id: 'epiplon-2001-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 4',
    type: 'image',
    image: 'img/epiplon/2001/04.jpg',
    imageFull: 'img/epiplon/2001/full/04.jpg'
  },

{
    id: 'epiplon-2001-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 5',
    type: 'image',
    image: 'img/epiplon/2001/05.jpg',
    imageFull: 'img/epiplon/2001/full/05.jpg'
  },

{
    id: 'epiplon-2001-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 6',
    type: 'image',
    image: 'img/epiplon/2001/06.jpg',
    imageFull: 'img/epiplon/2001/full/06.jpg'
  },

{
    id: 'epiplon-2001-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 7',
    type: 'image',
    image: 'img/epiplon/2001/07.jpg',
    imageFull: 'img/epiplon/2001/full/07.jpg'
  },

{
    id: 'epiplon-2001-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 8',
    type: 'image',
    image: 'img/epiplon/2001/08.jpg',
    imageFull: 'img/epiplon/2001/full/08.jpg'
  },

{
    id: 'epiplon-2001-p09',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 9',
    type: 'image',
    image: 'img/epiplon/2001/09.jpg',
    imageFull: 'img/epiplon/2001/full/09.jpg'
  },

{
    id: 'epiplon-2001-p10',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 10',
    type: 'image',
    image: 'img/epiplon/2001/10.jpg',
    imageFull: 'img/epiplon/2001/full/10.jpg'
  },

{
    id: 'epiplon-2001-p11',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 11',
    type: 'image',
    image: 'img/epiplon/2001/11.jpg',
    imageFull: 'img/epiplon/2001/full/11.jpg'
  },

{
    id: 'epiplon-2001-p12',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 12',
    type: 'image',
    image: 'img/epiplon/2001/12.jpg',
    imageFull: 'img/epiplon/2001/full/12.jpg'
  },

{
    id: 'epiplon-2001-p13',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 13',
    type: 'image',
    image: 'img/epiplon/2001/13.jpg',
    imageFull: 'img/epiplon/2001/full/13.jpg'
  },

{
    id: 'epiplon-2001-p14',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2001',
    year: '2001',
    title: 'Epíplon 2001 — Página 14',
    type: 'image',
    image: 'img/epiplon/2001/14.jpg',
    imageFull: 'img/epiplon/2001/full/14.jpg'
  },



  /* ---- Epíplon 2009 (Nº 112) (2009) ---- */

{
    id: 'div-epiplon-2009-n112',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    type: 'divider',
    title: 'Epíplon 2009',
    subtitle: 'Nº 112'
  },

{
    id: 'epiplon-2009-n112-p01',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 1',
    type: 'image',
    image: 'img/epiplon/2009-n112/01.jpg',
    imageFull: 'img/epiplon/2009-n112/full/01.jpg'
  },

{
    id: 'epiplon-2009-n112-p02',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 2',
    type: 'image',
    image: 'img/epiplon/2009-n112/02.jpg',
    imageFull: 'img/epiplon/2009-n112/full/02.jpg'
  },

{
    id: 'epiplon-2009-n112-p03',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 3',
    type: 'image',
    image: 'img/epiplon/2009-n112/03.jpg',
    imageFull: 'img/epiplon/2009-n112/full/03.jpg'
  },

{
    id: 'epiplon-2009-n112-p04',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 4',
    type: 'image',
    image: 'img/epiplon/2009-n112/04.jpg',
    imageFull: 'img/epiplon/2009-n112/full/04.jpg'
  },

{
    id: 'epiplon-2009-n112-p05',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 5',
    type: 'image',
    image: 'img/epiplon/2009-n112/05.jpg',
    imageFull: 'img/epiplon/2009-n112/full/05.jpg'
  },

{
    id: 'epiplon-2009-n112-p06',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 6',
    type: 'image',
    image: 'img/epiplon/2009-n112/06.jpg',
    imageFull: 'img/epiplon/2009-n112/full/06.jpg'
  },

{
    id: 'epiplon-2009-n112-p07',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 7',
    type: 'image',
    image: 'img/epiplon/2009-n112/07.jpg',
    imageFull: 'img/epiplon/2009-n112/full/07.jpg'
  },

{
    id: 'epiplon-2009-n112-p08',
    theme: 'O Epíplon',
    chapter: 'Epíplon 2009 (Nº 112)',
    year: '2009',
    title: 'Epíplon 2009 (Nº 112) — Página 8',
    type: 'image',
    image: 'img/epiplon/2009-n112/08.jpg',
    imageFull: 'img/epiplon/2009-n112/full/08.jpg'
  }
];
