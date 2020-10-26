<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    const screenWidth = window.screen.width
    document.documentElement.style.fontSize = 10*screenWidth/375 + 'px'
  }
}

</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/userVant.scss";


#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
  font-size: 1.4rem;
  height: 100%;
  background: #ffc7c7;

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
