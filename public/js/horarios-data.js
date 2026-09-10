/* ══════════════════════════════════════════════════════════
   DADOS E RENDERIZAÇÃO — Grade de Horários DAGV
   Adaptado a partir de horarios.html (base) para o site
   principal, corrigindo a disciplina sem correspondência
   na tabela do 6º período ("Sessão Anatomo-Clínica").
   ══════════════════════════════════════════════════════════ */
const baseUrl = "https://sistemas.uftm.edu.br/integrado/?to=magic%3A";
const secret = "&secret=uftm";

const HORAS_A = ["7h10 – 8h", "8h – 8h50", "8h50 – 9h40"];
const HORAS_B = ["10h – 10h50", "10h50 – 11h40", "11h40 – 12h30"];
const HORAS_C = ["13h10 – 14h", "14h – 14h50", "14h50 – 15h40"];
const HORAS_D = ["16h – 16h50", "16h50 – 17h40", "17h40 – 18h30"];
const HORAS_ALL = [HORAS_A, HORAS_B, HORAS_C, HORAS_D];
const INTERVALOS = ["9h40 – 10h", "12h30 – 13h10", "15h40 – 16h"];
const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const periodos = [
  {
    n: 1, code: "05e8f51b13f56f5a9558c4a9", tipo: "grade",
    disciplinas: [
      ["Anatomia Humana I", "Luciano Gonçalves"],
      ["Antropologia", "Ana Keila Pinezi Viana"],
      ["Bases Celulares e Morfofisiológicas I", "Javier Emilio, Maria Laura Pinto, Maria das Graças Reis"],
      ["Introdução à Ética Médica e Conteúdos Humanísticos", "Douglas Reis Abdalla"],
      ["Metodologia Científica", "Mario Alfredo Silveira Miranzi"],
      ["Psicologia", "Luciana Maria da Silva"],
      ["Vivências I", "Cláudia de Azevedo, Pollyana Cristina, Luciana Cristina Caetano"],
    ],
    blocos: [
      [
        ["Anatomia Humana I", "Anatomia Humana I", "", "", "Introdução à Ética Médica e Cont. Humanísticos"],
        ["Anatomia Humana I", "Anatomia Humana I", "Anatomia Humana I", "Vivências I", "Introdução à Ética Médica e Cont. Humanísticos"],
        ["Anatomia Humana I", "Anatomia Humana I", "Anatomia Humana I", "Vivências I", ""],
      ],
      [
        ["Metodologia Científica", "Bases Celulares e Morfofisiológicas I", "Metodologia Científica", "Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I"],
        ["Metodologia Científica", "Bases Celulares e Morfofisiológicas I", "Metodologia Científica", "Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I"],
        ["", "Bases Celulares e Morfofisiológicas I", "", "Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I"],
      ],
      [
        ["Bases Celulares e Morfofisiológicas I", "", "", "", ""],
        ["Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I", "Psicologia", "", ""],
        ["Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I", "Psicologia", "", ""],
      ],
      [
        ["Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I", "Antropologia", "Medicina e Espiritualidade (eletiva)", ""],
        ["Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I", "Antropologia", "Medicina e Espiritualidade (eletiva)", ""],
        ["Bases Celulares e Morfofisiológicas I", "Bases Celulares e Morfofisiológicas I", "Antropologia", "", ""],
      ],
    ],
  },
  {
    n: 2, code: "c3df9ad1bc53b0a07d67df2a", tipo: "grade",
    disciplinas: [
      ["Inserção na Rede Básica", "Gabriella Stefenoni Kruger"],
      ["Saúde e Sociedade", "Ana Keila Pinezi Viana"],
      ["Urgências e Emergências I", "Hudson Henrique Gomes Pires"],
      ["Anatomia Humana II", "Daniel Ventura Dias, Leonardo Augusto Lombardi"],
      ["Bases Celulares e Morfofisiológicas II", "Maria das Graças Reis"],
      ["Bioquímica e Biofísica", "Rodrigo Magrin de Andrade"],
    ],
    blocos: [
      [
        ["Inserção na Rede Básica", "Bases Celulares e Morfofisiológicas II", "", "", ""],
        ["Inserção na Rede Básica", "Bases Celulares e Morfofisiológicas II", "Bioquímica e Biofísica", "Urgências e Emergências I", "Bioquímica e Biofísica"],
        ["Inserção na Rede Básica", "Bases Celulares e Morfofisiológicas II", "Bioquímica e Biofísica", "Urgências e Emergências I", "Bioquímica e Biofísica"],
      ],
      [
        ["Inserção na Rede Básica", "Urgências e Emergências I", "Saúde e Sociedade", "Bioquímica e Biofísica", "Urgências e Emergências I"],
        ["Inserção na Rede Básica", "Urgências e Emergências I", "Saúde e Sociedade", "Bioquímica e Biofísica", "Urgências e Emergências I"],
        ["Inserção na Rede Básica", "", "Saúde e Sociedade", "", ""],
      ],
      [
        ["Bases Celulares e Morfofisiológicas II", "", "Bases Celulares e Morfofisiológicas II", "", ""],
        ["Bases Celulares e Morfofisiológicas II", "Bioquímica e Biofísica", "Bases Celulares e Morfofisiológicas II", "Bases Celulares e Morfofisiológicas II", ""],
        ["Bases Celulares e Morfofisiológicas II", "Bioquímica e Biofísica", "Anatomia Humana II", "", ""],
      ],
      [
        ["Anatomia Humana II", "Anatomia Humana II", "Anatomia Humana II", "", ""],
        ["Anatomia Humana II", "Anatomia Humana II", "Anatomia Humana II", "", ""],
        ["", "", "", "", ""],
      ],
    ],
  },
  {
    n: 3, code: "bfcde809e8f0a6760398c2c1", tipo: "grade",
    disciplinas: [
      ["Bioquímica Clínica", "Roseli Aparecida da Silva Gomes"],
      ["Bases Celulares e Morfofisiológicas III", "Maria das Graças Reis"],
      ["Neuroanatomia", "Leonardo Augusto Lombardi"],
      ["Bioética", "Edna Maria Alves Valim"],
      ["Vivências II", "Cláudia A. Aguiar, Pollyana Santos, Luciana Caetano"],
      ["Direitos Fundamentais", "Andre Octavio Nicolau Sanches"],
      ["Atenção à Saúde de Populações Especiais (ASPE)", "Gabriella Stefenoni Kruger"],
      ["Bioestatística", "Ana Paula Fernandes"],
      ["Informática Médica", "Siomar de Castro Soares"],
    ],
    blocos: [
      [
        ["", "", "Vivências II", "ASPE", "Bases Celulares e Morfofisiológicas III"],
        ["Bioquímica Clínica", "Bioquímica Clínica", "Vivências II", "ASPE", "Bases Celulares e Morfofisiológicas III"],
        ["Bioquímica Clínica", "Bioquímica Clínica", "Vivências II", "ASPE", "Bases Celulares e Morfofisiológicas III"],
      ],
      [
        ["Bioestatística", "Bioquímica Clínica", "Bioquímica Clínica", "ASPE", ""],
        ["Bioestatística", "Bioquímica Clínica", "Bioquímica Clínica", "ASPE", ""],
        ["", "", "", "ASPE", ""],
      ],
      [
        ["Bases Celulares e Morfofisiológicas III", "Neuroanatomia", "Bases Celulares e Morfofisiológicas III", "Bases Celulares e Morfofisiológicas III", ""],
        ["Bases Celulares e Morfofisiológicas III", "Neuroanatomia", "Bases Celulares e Morfofisiológicas III", "Bases Celulares e Morfofisiológicas III", ""],
        ["", "Direitos Fundamentais", "", "Informática Médica", ""],
      ],
      [
        ["Bioética", "Direitos Fundamentais", "Bioética", "Informática Médica", ""],
        ["Bioética", "Bioestatística", "Bioética", "Informática Médica", ""],
        ["", "Bioestatística", "", "Informática Médica", ""],
      ],
    ],
  },
  {
    n: 4, code: "7f2bc8686593eaf2159a7bd8", tipo: "grade",
    disciplinas: [
      ["Semiologia", "Ana Flávia Carrijo Chiovato"],
      ["Medicina Legal", "Lucinda Calheiros"],
      ["Saúde do Idoso", "Guilherme Rocha Pardi"],
      ["Saúde Mental", "Renato Oliveira e Silva"],
      ["Medicina Baseada em Evidências", "Gabriella Stefenoni Kruger"],
      ["Vivências III", "Cláudia de Azevedo Aguiar"],
      ["Psicologia Médica", "Ricardo Pastore, Adriana Cristina Nicolussi"],
      ["Epidemiologia", "Sybelle de Souza Castro"],
      ["Técnica Cirúrgica e Cirurgia Experimental", "Luciana Maria Silva"],
    ],
    blocos: [
      [
        ["", "Saúde Mental", "", "Epidemiologia", ""],
        ["Epidemiologia", "Saúde Mental", "Técnica Cirúrgica e Cirurgia Experimental", "Epidemiologia", ""],
        ["Epidemiologia", "Saúde Mental", "Técnica Cirúrgica e Cirurgia Experimental", "Epidemiologia", ""],
      ],
      [
        ["Semiologia", "Epidemiologia", "Medicina Legal", "Técnica Cirúrgica e Cirurgia Experimental", "Semiologia"],
        ["Semiologia", "Técnica Cirúrgica e Cirurgia Experimental", "Medicina Legal", "Técnica Cirúrgica e Cirurgia Experimental", "Semiologia"],
        ["Semiologia", "Técnica Cirúrgica e Cirurgia Experimental", "Técnica Cirúrgica e Cirurgia Experimental", "", "Semiologia"],
      ],
      [
        ["Medicina Baseada em Evidências", "Psicologia Médica", "Semiologia", "Semiologia", "Vivências III"],
        ["Medicina Baseada em Evidências", "Psicologia Médica", "Semiologia", "Semiologia", "Vivências III"],
        ["Medicina Baseada em Evidências", "Psicologia Médica", "Semiologia", "Semiologia", "Vivências III"],
      ],
      [
        ["Medicina Baseada em Evidências", "Saúde do Idoso", "Semiologia", "", ""],
        ["Medicina Baseada em Evidências", "Saúde do Idoso", "Semiologia", "", ""],
        ["Medicina Baseada em Evidências", "", "", "", ""],
      ],
    ],
  },
  {
    n: 5, code: "3bef7647b6ac60444369c60c", tipo: "grade",
    disciplinas: [
      ["Propedêutica", "Andre Octavio Nicolau Sanches"],
      ["Microbiologia", "Iara Rossi Gonçalves, Anderson Assunção Andrade"],
      ["Parasitologia", "Eliane Silva, Marcia Oliveira, Marcos Vinicius da Silva"],
      ["Princípios Básicos de Oncologia", "Guilherme Freire Angotti Carrara"],
      ["Direitos Médicos e Cuidados Paliativos", "Andre Octavio Nicolau Sanches"],
      ["Farmacologia", "Heloísa Vilela, Karina Devienne, Matheus Marcon"],
      ["Imunologia", "Márcia Antoniazi Michelin, Virmondes Rodrigues Junior"],
    ],
    blocos: [
      [
        ["Farmacologia", "Farmacologia", "Farmacologia", "Princípios Básicos de Oncologia", ""],
        ["Farmacologia", "Farmacologia", "Farmacologia", "Parasitologia", "Microbiologia"],
        ["Farmacologia", "Farmacologia", "Farmacologia", "Parasitologia", "Microbiologia"],
      ],
      [
        ["Imunologia", "Farmacologia", "Microbiologia", "Imunologia", "Microbiologia"],
        ["Imunologia", "Farmacologia", "Microbiologia", "Imunologia", "Microbiologia"],
        ["", "Direitos Médicos e Cuidados Paliativos", "", "", ""],
      ],
      [
        ["Propedêutica", "Direitos Médicos e Cuidados Paliativos", "", "", ""],
        ["Propedêutica", "Microbiologia", "Parasitologia", "Imunologia", ""],
        ["Propedêutica", "Microbiologia", "Parasitologia", "Imunologia", ""],
      ],
      [
        ["Propedêutica", "", "Parasitologia", "Parasitologia", ""],
        ["Propedêutica", "", "Parasitologia", "Parasitologia", ""],
        ["Propedêutica", "", "", "", ""],
      ],
    ],
  },
  {
    n: 6, code: "6da426dd33ed65098e8e3bfa", tipo: "grade",
    disciplinas: [
      ["Psiquiatria", "Vinicius dos Santos Sguerri"],
      ["Urgências e Emergências II", "Hudson Henrique Gomes Pires"],
      ["Genética", "Roseane Lopes, Fernanda Rodrigues, Alessandra Bernadete Trovo"],
      ["Imagenologia", "Luis Ronan Marquez Ferreira"],
      ["Patologia", "Glaucia Eloisa, Adilha Rua, Bruna Zaidan, Regia Caroline, Lucinda Calheiros"],
      ["Anestesiologia", "Luciano Alves Matias da Silveira, Ariele Patrícia Silva"],
      ["Clínica Médica I", "Daurin Narciso, Geisa Perez, Meire Soares, Ricardo Aparecido, Barbara Elias e outros"],
      ["Ética Profissional", "Andre Octavio Nicolau Sanches"],
    ],
    blocos: [
      [
        ["Clínica Médica I", "Anestesiologia", "Urgências e Emergências II", "Clínica Médica I", "Anestesiologia"],
        ["Clínica Médica I", "Anestesiologia", "Urgências e Emergências II", "Clínica Médica I", "Anestesiologia"],
        ["Clínica Médica I", "", "Urgências e Emergências II", "Clínica Médica I", "Anestesiologia"],
      ],
      [
        ["Clínica Médica I", "Genética", "Clínica Médica I", "Genética", ""],
        ["Clínica Médica I", "Genética", "Patologia (Sessão Anatomo-Clínica)", "Clínica Médica I", "Genética"],
        ["", "", "", "", "Anestesiologia"],
      ],
      [
        ["Patologia", "Psiquiatria", "Anestesiologia", "Urgências e Emergências II", "Patologia"],
        ["Patologia", "Psiquiatria", "Patologia", "Urgências e Emergências II", "Patologia"],
        ["Patologia", "Psiquiatria", "Patologia", "Urgências e Emergências II", "Patologia"],
      ],
      [
        ["Patologia", "Imagenologia", "Patologia", "Imagenologia", "Patologia"],
        ["Patologia", "Anestesiologia", "Patologia", "Ética Profissional", "Patologia"],
        ["Patologia", "Anestesiologia", "Patologia", "Ética Profissional", "Patologia"],
      ],
    ],
  },
  {
    n: 7, code: "241266cd1cff4026188e69cb", tipo: "rodizio",
    disciplinas: [
      ["Clínica Cirúrgica I", "Julio Claudio, Rolf Carvalho, Adriana Cartafina, Paulo Ricardo"],
      ["Clínica Médica II", "Reginaldo Botelho, Cristiana da Cunha, Luciana de Almeida, Mário Leon, Rodrigo Juliano"],
      ["Saúde da Criança", "Luciano Borges Santiago"],
      ["Introdução à Saúde da Mulher", "Marco Trovo, Cleber Sergio, Rosekeila Simões, Paula Crispin"],
    ],
    rotColunas: ["Bloco", "Clínica Cirúrgica I", "Saúde da Criança", "Saúde da Mulher", "Clínica Médica II"],
    rotLinhas: [
      ["10/08/26 – 08/09/26", "P1", "P2", "P3", "P4"],
      ["09/09/26 – 07/10/26", "P2", "P3", "P4", "P1"],
      ["08/10/26 – 11/11/26", "P3", "P4", "P1", "P2"],
      ["12/11/26 – 14/12/26", "P4", "P1", "P2", "P3"],
    ],
    notaRodizio: "Dentro da estação de Clínica Médica II, a turma se divide ainda entre DIP (Doenças Infecciosas e Parasitárias) e Reumatologia, alternando a cada bloco.",
  },
  {
    n: 8, code: "6d2496562911ffa8fbe7cfed", tipo: "rodizio",
    disciplinas: [
      ["Pediatria Geral", "Valeria Cardoso Alves Cunali"],
      ["Urgências e Emergências III", "Hudson Henrique Gomes Pires"],
      ["Clínica Cirúrgica II", "Roberto Alexandre Dezena, Roberto da Mata Lenza, Luciano Pelegrinelli, Rayssa Barbieri"],
      ["Clínica Médica III", "Beatriz Pires, Alex Eduardo, Alfredo Leboreiro, Beatriz Hallal, Gabrielle Patrícia"],
      ["Ginecologia e Obstetrícia", "Rosekeila Simões, Ana Cristina Macedo, Alberto Borges Peixoto, Cleber Sérgio"],
    ],
    rotColunas: ["Bloco", "Pediatria", "GO", "Clínica Cirúrgica II", "Clínica Médica III"],
    rotLinhas: [
      ["10/08/26 – 08/09/26", "P1", "P2", "P3", "P4"],
      ["09/09/26 – 07/10/26", "P4", "P1", "P2", "P3"],
      ["08/10/26 – 11/11/26", "P3", "P4", "P1", "P2"],
      ["12/11/26 – 14/12/26", "P2", "P3", "P4", "P1"],
    ],
    notaRodizio: "Além dos rodízios principais, a semana inclui sessões fixas de Urgências e Emergências III, sessão clínica e subespecialidades de Clínica Cirúrgica II (torácica, coloproctologia, CAD).",
  },
];
;

const tabsEl = document.getElementById("tabs");
const contentEl = document.getElementById("content");

periodos.forEach(p => {
  const btn = document.createElement("button");
  btn.className = "sched-tab";
  btn.textContent = p.n + "º Período";
  btn.addEventListener("click", () => selectPeriod(p.n));
  btn.id = "tab-" + p.n;
  tabsEl.appendChild(btn);
});

function disciplinasList(disciplinas){
  const ul = document.createElement("ul");
  ul.className = "sched-disciplinas";
  disciplinas.forEach(([nome, prof]) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="nome">${nome}</span><span class="prof">${prof}</span>`;
    ul.appendChild(li);
  });
  return ul;
}

function renderGrade(p){
  const wrap = document.createElement("div");
  const scroll = document.createElement("div");
  scroll.className = "sched-table-scroll";
  const table = document.createElement("table");
  table.className = "sched-grade";

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  trh.innerHTML = "<th>Horário</th>" + DIAS.map(d => `<th>${d}</th>`).join("");
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  p.blocos.forEach((bloco, i) => {
    const horas = HORAS_ALL[i];
    bloco.forEach((linha, j) => {
      const tr = document.createElement("tr");
      let cells = `<td class="time">${horas[j]}</td>`;
      linha.forEach(v => { cells += v ? `<td>${v}</td>` : `<td class="empty">—</td>`; });
      tr.innerHTML = cells;
      tbody.appendChild(tr);
    });
    if (i < 3){
      const tri = document.createElement("tr");
      tri.className = "interval";
      tri.innerHTML = `<td class="time">${INTERVALOS[i]}</td><td colspan="5">Intervalo</td>`;
      tbody.appendChild(tri);
    }
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);

  const nota = document.createElement("p");
  nota.className = "sched-note";
  nota.innerHTML = "<strong>Sábado:</strong> Área Verde (atividade prática/comunitária) o dia todo, para todos os períodos.";
  wrap.appendChild(nota);

  return wrap;
}

function renderRodizio(p){
  const wrap = document.createElement("div");

  const info = document.createElement("p");
  info.className = "sched-note";
  info.style.marginTop = "4px";
  info.innerHTML = "Este período funciona em <strong>rodízio por grupo</strong> — a disciplina cursada em cada dia depende do bloco e do grupo (P1–P4) do estudante, não de um dia fixo da semana. Por isso, em vez de uma grade fixa, veja abaixo o calendário de rodízio.";
  wrap.appendChild(info);

  const scroll = document.createElement("div");
  scroll.className = "sched-table-scroll";
  const table = document.createElement("table");
  table.className = "sched-rot";
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr>" + p.rotColunas.map(c => `<th>${c}</th>`).join("") + "</tr>";
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  p.rotLinhas.forEach(linha => {
    tbody.innerHTML += "<tr>" + linha.map(c => `<td>${c}</td>`).join("") + "</tr>";
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);

  if (p.notaRodizio){
    const nota = document.createElement("p");
    nota.className = "sched-note";
    nota.textContent = p.notaRodizio;
    wrap.appendChild(nota);
  }

  return wrap;
}

function selectPeriod(n){
  const p = periodos.find(x => x.n === n);
  document.querySelectorAll(".sched-tab").forEach(t => t.classList.remove("is-active"));
  document.getElementById("tab-" + n).classList.add("is-active");

  contentEl.innerHTML = "";

  const head = document.createElement("div");
  head.className = "sched-panel__header";
  const url = `${baseUrl}${p.code}${secret}`;
  head.innerHTML = `
    <div class="sched-panel__title-wrap">
      <span class="sched-panel__icon"><i class="fa-solid fa-calendar-week"></i></span>
      <div>
        <h3 class="sched-panel__title">${p.n}º Período do Curso de Medicina</h3>
        <span class="sched-panel__label">${p.tipo === "grade" ? "Grade fixa semanal" : "Rodízio por grupo"}</span>
      </div>
    </div>
    <a class="sched-pdf-link" href="${url}" target="_blank" rel="noopener">Ver PDF oficial no Integrado <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
  contentEl.appendChild(head);

  const disclaimer = document.createElement("div");
  disclaimer.className = "sched-disclaimer";
  disclaimer.innerHTML = `<i class="fa-solid fa-circle-info" aria-hidden="true"></i><div><strong>Grade reorganizada a partir do horário oficial do Integrado.</strong> Alguns encaixes de aulas mais curtas foram reconstruídos a partir do PDF original — em caso de dúvida sobre um horário específico, confira o link "Ver PDF oficial" acima.</div>`;
  contentEl.appendChild(disclaimer);

  contentEl.appendChild(p.tipo === "grade" ? renderGrade(p) : renderRodizio(p));

  const title = document.createElement("h3");
  title.className = "sched-section-title";
  title.textContent = "Disciplinas e professores responsáveis";
  contentEl.appendChild(title);
  contentEl.appendChild(disciplinasList(p.disciplinas));
}

selectPeriod(1);
