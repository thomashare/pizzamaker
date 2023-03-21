<template>
  <header id="header">
    <h1>Pizza Maker App</h1>
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

      .sun
        box-sizing: border-box
        position: relative
        display: block
        transform: scale(1)
        width: 24px
        height: 24px
        background: \
          linear-gradient(to bottom, currentColor 4px, transparent 0)\
            no-repeat 5px -6px/2px 6px,
          linear-gradient(to bottom, yellow 4px, transparent 0)\
            no-repeat 5px 14px/2px 6px,
          linear-gradient(to bottom, currentColor 4px, transparent 0)\
            no-repeat -8px 5px/6px 2px,
          linear-gradient(to bottom, currentColor 4px, transparent 0)\
            no-repeat 14px 5px/6px 2px
        border-radius: 100px
        box-shadow: inset 0 0 0 2px
        border: 6px solid transparent

        &::after, &::before
          content: ''
          display: block
          box-sizing: border-box
          position: absolute
          width: 24px
          height: 2px
          border-right: 4px solid
          border-left: 4px solid
          left: -6px
          top: 5px

        &::before
          transform: rotate(-45deg)

        &::after
          transform: rotate(45deg)

      .moon, .moon::after
        display: block
        box-sizing: border-box
        border-radius: 50%

      .moon
        overflow: hidden
        position: relative
        transform: rotate(-135deg) scale(1)
        width: 20px
        height: 20px
        border: 2px solid
        border-bottom-color: transparent

        &::after
          content: ''
          position: absolute
          width: 12px
          height: 18px
          border: 2px solid transparent
          box-shadow: 0 0 0 2px
          top: 8px
          left: 2px
</style>