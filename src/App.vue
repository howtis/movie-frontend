<template>
  <router-view/>
</template>

<style lang="scss">
@import '@/assets/scss/theme.scss';

body {
  font-family: $globalFont;
  background-color: $backgroundColor;
}

main {
  min-height: calc(100vh - $footerheight);
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
}

section.content {
  width: 100%;
  max-width: $maxContentWidth;
}

section > div {
  margin: 1rem;
  @media (max-width: 992px) { margin: 0.5rem }
}
</style>
