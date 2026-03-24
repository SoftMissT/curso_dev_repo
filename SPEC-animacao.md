# SPEC: Melhoria da Animação da Folha Voadora

## Contexto

O arquivo `pages/index.js` está com merge conflicts que precisam ser resolvidos. A animação atual é funcional mas precisa de polimento visual para combinar com a estética "Manhwa Dark" do design system.

## Objetivos

- ✅ Resolver merge conflicts (manter `diaFinal = 8`)
- 🎨 Melhorar a fluidez das animações
- ✨ Adicionar efeitos visuais complementares
- 🎯 Criar transições mais orgânicas

## Melhorias Propostas

### 1. Animação da Folha Voando (Enhanced)

**Atual:**

```css
@keyframes tearAndFly {
  0% { transform: rotateX(0deg) rotateZ(0deg) translateY(0); }
  100% { transform: rotateX(-50deg) translateY(400px); }
}
```

**Melhorado:**

- Adicionar `translateX` para efeito parabólico
- Efeito de `filter: blur()` em 30% da animação
- `transform-origin` dinâmico
- Partículas que seguem a folha

### 2. Contagem Animada (Number Counter)

- Transição suave do número `displayDay`
- Efeito de "escala" quando muda de valor
- Opacidade suave durante a transição

### 3. Anéis da Espiral

- Fade-in ao aparecer
- Pulse slow motion (escala: 1.05 → 0.95)
- Opacidade respiratória

### 4. Card Glow

- `shadowPulse` com cor dinâmica baseada no progresso
- Intensifica ao atingir dia final
- Efeito de "brilho de conquista"

### 5. Barra de Progresso

- Glow que se expande contraíndo
- Cor muda de `#4f46e5` para gradiente ao completar
- Efeito de "fill" instantâneo no último dia

## Efeitos de Partículas

```css
/* Partículas que voam com a folha */
@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  20% {
    opacity: 0.8;
    transform: translate(10px, -20px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(200px, 300px) scale(0.2);
  }
}
```

## Implementação

- [ ] Resolver conflicts no git
- [ ] Atualizar `@keyframes` e CSS
- [ ] Adicionar estado de partículas
- [ ] Implementar counter animation
- [ ] Testar e ajustar easing

## Critérios de Aceite

- Animação fluida (60fps)
- Sem lag visual
- Compatível com devices mobile
- Coherência com design system

---
*GSD Step 1/4 - Especificação concluída*
