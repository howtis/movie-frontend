<template>
  <footer>
    <a href='https://github.com/howtis' target='_blank'>
      <img src="@/assets/github.svg" alt="Github"> Github
    </a>
    <span class="mail">
      📧<a href='mailto:p01076322603@gmail.com'>p01076322603@gmail.com</a>
    </span>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/theme.scss';

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  background-color: #d0d0d0;
  height: $footerheight;
  width: 100%;

  img { width: 24px; height: 24px; }
  .mail { margin-left: 1rem; }
}
</style>
