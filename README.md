# 📚 Jornada de Aprendizado — curso.dev

<div align="center">

Registro da minha experiência com o [curso.dev](https://curso.dev) do Filipe Deschamps.

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>

</div>

---

## ✨ O que é

Uma dashboard interativa de estudos com duas áreas principais:

- **📅 Calendário Animado** — Páginas de calendário são "arrancadas" com animação fluida, mostrando o progresso dos dias de estudo
- **📝 Painel de Notas** — Área lateral para registrar o que você está estudando, projetando ou idealizando, com tags coloridas e persistência local

### Funcionalidades

| Feature | Descrição |
|---------|-----------|
| 🔄 Animação tear-off | Páginas voam do calendário em loop contínuo |
| 📊 Barra de progresso | Gradient `purple → cyan` com glow |
| 🏷️ Tags de notas | 📚 Estudando · 🔧 Projetando · 💡 Ideias |
| 💾 Persistência | Notas salvas em `localStorage` |
| 🎨 Glassmorphism | Cards translúcidos com `backdrop-filter` |
| 🌙 Dark mode | Design escuro com paleta premium |
| 📱 Responsivo | Grid de 2 colunas em desktop, stack em mobile |

---

## 🔧 Como rodar

```bash
# Clone
git clone https://github.com/SoftMissT/curso_dev_repo.git
cd curso_dev_repo

# Instale
npm install

# Execute
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 📁 Estrutura

```
curso_dev_repo/
├── pages/
│   ├── _app.js          # App wrapper (importa CSS global)
│   └── index.js         # Dashboard: CalendarCard + NotesPanel
├── globals.css           # Design system, keyframes, tokens
├── package.json
└── README.md
```

---

## 🎨 Design System

Paleta baseada no tema **Omni**:

| Token | Cor | Uso |
|-------|-----|-----|
| `--omni-purple` | `#A855F7` | Accent principal, tags "Estudando" |
| `--omni-blue` | `#00D9FF` | Secondary, tags "Projetando" |
| `--omni-gold` | `#FFD700` | Tags "Ideias" |
| `--bg-dark` | `#0a0a0f` | Background principal |

Fonte: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

---

## 📖 Sobre o curso.dev

<details>
<summary>FAQ completo (clique para expandir)</summary>

### Quem é Filipe Deschamps?

Profissional de tecnologia há mais de 10 anos. Foi CTO do Pagar.me, criador do TabNews, canal no YouTube com 45M+ views. O curso.dev é a reconstrução do TabNews do zero.

### Objetivo do curso

Tornar o aluno o melhor programador que pode ser, construindo um projeto real (180k+ acessos mensais) com os problemas reais que criam senioridade.

### Público alvo

Quem sabe o básico de programação e HTML/CSS, mas quer prática real de mercado, construir sistemas complexos e ser valorizado profissionalmente.

### Tecnologias abordadas

Git, GitHub, JavaScript, Node.js, Next.js, React, PostgreSQL, Docker, Vercel, GitHub Actions, Jest, TDD, REST APIs, segurança (bcrypt, SQL injection, sessions), e muito mais ao longo de 245+ aulas.

### Acesso e valor

- Acesso vitalício (renovação automática)
- R$ 2.700 (ou 12x R$ 270, desconto de 33% pré-lançamento)
- 30 dias de garantia de reembolso
- Certificado de conclusão ao completar 80% das aulas

</details>

---

<div align="center">

**SoftMissT** · Feito com 💜 durante o [curso.dev](https://curso.dev)

</div>
