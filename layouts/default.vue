<template>
  <div :class="{ 'night-mode': nightMode }" id="container">
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
      console.log('boom!')
    }

    // user doesn't have night mode enabled
    else {
      if (localStorage.nightMode !== undefined && localStorage.nightMode === 'true') {
        // set dark mode
        this.$store.dispatch('settings/setNightMode', 'true')
      }
    }
  }
}
</script>

<style lang="stylus">
  @import url('../node_modules/normalize-css/normalize.css')
  @import url('https://fonts.googleapis.com/css2?family=Caveat&family=Open+Sans:wght@300;400&display=swap')

  body
    font-family: 'Open Sans', sans-serif

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
    background-color: #FAFAFA
    border-color: #7ac7c4
    border-radius: 5px
    color: #404040

  button
    // plus and minus buttons
    &.minus, &.plus
      background: none
      border: solid #384259 1px
      border-color: currentColor
      border-radius: 50%
      box-sizing: border-box
      color: #384259
      display: block
      height: 24px
      padding: 0
      position: relative
      width: 24px
      &:disabled
        color: lighten(#384259, 50)

      &::before
        background-color: lighten(desaturate(#C44D58, 10), 5)
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
        background-color: lighten(desaturate(#C44D58, 10), 5)
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

  #container.night-mode
    background: #303030
    color: #EAEAEA
    color: rgba(255,255,255,0.85)

    h2, #donate, #ingredients header h2, #ingredients header #close
      color: inherit

    button.minus, button.plus, #ingredients header #print
      color: #FFF

    #ingredients ul li
      color: #FFF

      .ingredient
        color: #EEE

    #more-info
      border-color: #202020

      h2
        color: #B0B0B0

      #notes, #info
        background-color: #202020

      #info
        color: #D0D0D0

  #container.night-mode #print-dialog #dialog
    background: #303030
</style>