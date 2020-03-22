<template>
  <div id="container">
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      nightMode: state => state.settings.nightMode
    })
  },
  mounted() {
    // if user has dark mode, set night mode by default
    if (localStorage.nightMode === undefined && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // set dark mode
      this.$store.dispatch('settings/setNightMode', 'true')
    }

    // user doesn't have night mode enabled
    else {
      if (localStorage.nightMode !== undefined && localStorage.nightMode === 'true') {
        // set dark mode
        this.$store.dispatch('settings/setNightMode', true)
      }
    }
  }
}
</script>

<style lang="stylus">
  @import url('../node_modules/normalize-css/normalize.css')
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Overlock&display=swap')

  body
    font-family: 'Open Sans', sans-serif
    font-weight: 300
    width: 100%

    &.fullscreen
      overflow: hidden
      position: fixed

    @media screen and (max-width: 1200px)
      font-size: 0.9em

  #container
    min-height: 100vh
    padding: 15px 12px

  h2
    color: #384259
    font-size: 1.3em
    font-weight: 300
    letter-spacing: 0.03em

  select
    background-color: #ffffff
    border-color: #E0E0E0
    border-radius: 5px
    color: #404040

  button
    // plus and minus buttons
    &.minus, &.plus
      background: none
      border-color: currentColor
      border-radius: 50%
      box-sizing: border-box
      color: #5E5E5E
      display: block
      height: 24px
      padding: 0
      position: relative
      width: 24px
      &:disabled
        color: lighten(#5E5E5E, 50)

      &::before
        background-color: currentColor
        border-radius: 1px
        box-sizing: border-box
        content: ''
        display: block
        height: 2px
        left: 4px
        position: absolute
        top: 10px
        width: 14px

    &.plus::after
        background-color: currentColor
        border-radius: 1px
        box-sizing: border-box
        content: ''
        display: block
        height: 14px
        left: 10px
        position: absolute
        top: 4px
        width: 2px

  body.night-mode
    background: #303030
    color: #EAEAEA
    color: rgba(255,255,255,0.85)

    header, h2, #donate, #ingredients header h2, #ingredients header #close
      color: inherit

    button.minus, button.plus, #ingredients header #print
      color: #FFF

    #ingredients ul li
      color: #FFF

      .ingredient
        color: #EEE

    #instructions
      ol
        background-color: #202020
        border-color: #101010

    #print-dialog #dialog
      background: #303030
</style>