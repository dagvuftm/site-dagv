# DAGV – Diretório Acadêmico Gaspar Vianna
### Landing Page Oficial · Medicina UFTM

---

## 📁 Estrutura de arquivos

```
dagv-site/
├── index.html          ← Página principal (landing page)
├── css/
│   └── styles.css      ← Todos os estilos (variáveis, layout, animações)
├── js/
│   └── script.js       ← Interatividade (header, menu, formulário, AOS)
├── img/                ← Pasta para imagens (logos, fotos da equipe, etc.)
└── README.md           ← Este arquivo
```

---

## 🚀 Como rodar localmente

### Opção 1 – Abrir direto no navegador (mais simples)
1. Baixe ou clone este repositório.
2. Dê duplo clique em `index.html`.
3. O site abrirá no seu navegador padrão.

> ⚠️ Algumas funcionalidades externas (ex: fontes Google, ícones Font Awesome, AOS)
> dependem de conexão com a internet.

### Opção 2 – Servidor local com Python
```bash
# Python 3
python -m http.server 8080

# Acesse em: http://localhost:8080
```

### Opção 3 – Servidor local com Node.js (npx)
```bash
npx serve .

# Acesse o endereço exibido no terminal
```

### Opção 4 – VS Code + extensão Live Server
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito em `index.html` → **Open with Live Server**.

---

## 🌐 Como publicar no GitHub Pages

1. **Crie um repositório** no GitHub (ex: `dagv-site`).
2. **Envie os arquivos**:
   ```bash
   git init
   git add .
   git commit -m "chore: site inicial DAGV"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/dagv-site.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**.
4. Em **Source**, selecione `Deploy from a branch` → branch `main` → pasta `/ (root)`.
5. Clique em **Save**.
6. Aguarde 1–2 minutos e acesse: `https://SEU_USUARIO.github.io/dagv-site/`

---

## 🖼️ Como adicionar fotos da diretoria

1. Coloque as fotos na pasta `img/` (ex: `img/presidente.jpg`).
2. No `index.html`, dentro de cada `.team__card`, substitua o placeholder:

```html
<!-- Antes (placeholder) -->
<div class="team__avatar-placeholder">
  <i class="fa-solid fa-user-doctor"></i>
</div>

<!-- Depois (foto real) -->
<img src="img/presidente.jpg" alt="Nome do Presidente" />
```

> Recomendação: imagens quadradas, ao menos **200×200 px**, formato `.jpg` ou `.webp`.

---

## ✏️ Como personalizar conteúdo

| O que alterar | Onde |
|---|---|
| Nome dos membros da diretoria | `index.html` → seção `#team` |
| Eventos e datas | `index.html` → seção `#events` |
| Redes sociais / links | `index.html` → seção `#contact` e `footer` |
| Cores principais | `css/styles.css` → bloco `:root { }` |
| Fontes | `index.html` → `<link>` do Google Fonts + `css/styles.css` variáveis |
| Formulário (envio real) | `js/script.js` → bloco `/* Simula envio */` |

---

## 📬 Como integrar o formulário com envio real

O formulário atual **simula** o envio. Para torná-lo funcional, você pode usar:

### EmailJS (sem backend)
1. Crie uma conta em [emailjs.com](https://www.emailjs.com/).
2. Adicione o SDK e substitua o bloco `setTimeout` no `script.js`:
```js
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
  name:    document.getElementById('name').value,
  email:   document.getElementById('email').value,
  subject: document.getElementById('subject').value,
  message: document.getElementById('message').value,
});
```

### Google Forms (alternativa simples)
Substitua o formulário por um botão que abre o Google Form do DAGV:
```html
<a href="https://forms.gle/PcHVQ6hcJ2NtRVKD7" target="_blank" class="btn btn--primary">
  Acessar formulário
</a>
```

---

## 🛠️ Tecnologias usadas

| Tecnologia | Versão | Propósito |
|---|---|---|
| HTML5 | — | Estrutura semântica |
| CSS3 | — | Layout (Flexbox/Grid), animações |
| JavaScript (ES6+) | — | Interatividade |
| [Google Fonts](https://fonts.google.com/) | — | Playfair Display + DM Sans |
| [Font Awesome](https://fontawesome.com/) | 6.5 | Ícones SVG |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.4 | Animações ao scroll |

---

## 🤝 Contribuição

1. Crie uma branch: `git checkout -b feat/minha-melhoria`
2. Faça suas alterações e commit: `git commit -m "feat: descrição"`
3. Abra um Pull Request no repositório principal.

---

*DAGV – Diretório Acadêmico Gaspar Vianna · Medicina UFTM · Uberaba – MG*
