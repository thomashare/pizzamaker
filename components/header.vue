<template>
  <header id="header">
    <h1>Pizza Maker App</h1>
    <nav id="settings">
      <button
        id="dark-mode-btn"
        :aria-label="(nightMode) ? 'toggle light mode' : 'toggle night mode'"
        @click="nightMode = !nightMode"
      ><i class="dark-mode-toggle" :title="(nightMode) ? 'toggle light mode' : 'toggle night mode'"></i></button>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    nightMode: {
      get() {
        return this.$store.state.settings.nightMode
      },
      set(val) {
        this.$store.dispatch('settings/setNightMode', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #header
    align-items: center
    box-sizing: border-box
    color: #384259
    display: flex
    justify-content: space-between
    grid-column: 1/-1
    padding: 0 12px
    width: 100%

    h1
      font-family: 'Overlock', sans-serif
      font-size: 1.75em
      font-weight: 500
      letter-spacing: 0.07em
      margin: 0 auto
      text-align: center

    #settings
      align-items: center
      display: flex

      button
        background-color: #666
        color: #FFF
        padding: 2px

      #dark-mode-btn
        background: none
        border: none
        color: currentColor
        outline: none

    .dark-mode-toggle
      box-sizing: border-box
      position: relative
      display: block
      transform: scale(1.15)
      border: 2px solid
      border-radius: 100px
      width: 20px
      height: 20px

      &::after, &::before
        content: ""
        box-sizing: border-box
        position: absolute
        display: block

      &::before
        border:5px solid
        border-top-left-radius: 100px
        border-bottom-left-radius: 100px
        border-right: 0
        width: 9px
        height: 18px
        top: -1px
        left: -1px

      &::after
        border: 4px solid
        border-top-right-radius: 100px
        border-bottom-right-radius: 100px
        border-left: 0
        width: 4px
        height: 8px
        right: 4px
        top: 4px
</style>