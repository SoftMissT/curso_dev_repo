# 📚 Jornada de Aprendizado - Calendário Animado

Uma aplicação web interativa que transforma o progresso de estudos em uma experiência visual única, com páginas de calendário sendo "arrancadas" de forma animada.

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte de um curso de desenvolvimento, demonstrando habilidades em:

- **React.js** com Hooks (useState, useEffect)
- **Next.js** para renderização e roteamento
- **CSS-in-JS** para estilização dinâmica
- **Animações CSS** complexas e fluidas
- **Design Responsivo** e experiência do usuário

## ✨ Funcionalidades

- **📅 Calendário Animado**: Visualização única do progresso com páginas sendo removidas
- **📊 Barra de Progresso**: Indicador visual em tempo real do progresso total
- **🔄 Ciclo Automático**: Reinicia automaticamente após completar todos os dias
- **🎨 Animações Fluidas**: Transições suaves e efeitos visuais profissionais
- **📱 Design Responsivo**: Interface adaptável para diferentes tamanhos de tela

## 🚀 Tecnologias Utilizadas

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
</div>

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/curso_dev_repo.git
   cd curso_dev_repo
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Abra o navegador**

   Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## 🎨 Estrutura do Projeto

```
curso_dev_repo/
├── pages/
│   ├── index.js          # Página principal com o calendário animado
│   ├── _app.js           # Configuração global do Next.js
│   └── _document.js      # Estrutura HTML customizada
├── public/                 # Arquivos estáticos
├── styles/
│   └── globals.css       # Estilos globais
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## 💡 Como Funciona

### Animação de Páginas

A aplicação utiliza uma combinação de:

- **Estados React** para controle do progresso
- **CSS Animations** para o efeito de "arrancar" páginas
- **Transformações 3D** para criar profundidade e realismo
- **Timing preciso** para sincronizar animações

### Lógica de Progresso

```javascript
const progress = (displayDay / totalDias) * 100;
```

O progresso é calculado automaticamente baseado no dia atual em relação ao total de dias configurado.

## 🎯 Personalização

Você pode personalizar facilmente:

- **Dia Final**: Altere `const diaFinal = 8;` no componente
- **Total de Dias**: Modifique `const totalDias = 50;`
- **Velocidade da Animação**: Ajuste os timeouts em `useEffect`
- **Cores e Estilos**: Edite o objeto `styles` no componente

## 🌟 Demonstração

A aplicação demonstra:

- ✅ Uso avançado de React Hooks
- ✅ Implementação de animações complexas
- ✅ Gerenciamento de estado em tempo real
- ✅ Design de interface criativa e funcional
- ✅ Integração perfeita entre lógica e apresentação

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Adicionar novas funcionalidades

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Inspirado em calendários de mesa tradicionais
- Desenvolvido como parte de estudos em React/Next.js
- Design criado para demonstrar habilidades em animações web

---

<div align="center">
  <p>Desenvolvido com ❤️ e ☕ durante a jornada de aprendizado</p>
  <p><strong>Keep learning, keep growing! 🚀</strong></p>
</div>
