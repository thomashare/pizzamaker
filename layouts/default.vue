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

  input
    appearance: none
    border: solid #DDDDDD 1px
    border-radius: 3px
    box-sizing: border-box
    max-width: 100%
    padding: 3px

  #container
    min-height: 100vh
    padding: 15px 12px

  h2, h3
    color: #384259
    font-size: 1.5rem
    font-weight: 300
    letter-spacing: 0.03em
    margin: 0

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
      box-sizing: content-box
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
        left: 5px
        position: absolute
        top: 11px
        width: 14px

    &.plus::after
        background-color: currentColor
        border-radius: 1px
        box-sizing: border-box
        content: ''
        display: block
        height: 14px
        left: 11px
        position: absolute
        top: 5px
        width: 2px

  #print
    background: none
    border: none
    box-sizing: border-box
    color: #09A9B4
    padding: 0

    .gg-maximize
      box-sizing: border-box
      position: relative
      display: block
      transform: scale(var(--ggs,1))
      width: 14px
      height: 14px
      box-shadow:
        -6px -6px 0 -4px,
        6px 6px 0 -4px,
        6px -6px 0 -4px,
        -6px 6px 0 -4px
        
  #close
    background: none
    border: none
    box-sizing: border-box
    padding: 0

    .gg-close
      box-sizing: border-box
      position: relative
      display: block
      transform: scale(var(--ggs,1))
      width: 22px
      height: 22px
      border: 2px solid transparent
      border-radius: 40px

      &::after, &::before
        content: ''
        display: block
        box-sizing: border-box
        position: absolute
        width: 16px
        height: 2px
        background: currentColor
        transform: rotate(45deg)
        border-radius: 5px
        top: 8px
        left: 1px

      &::after
        transform: rotate(-45deg)

  body.night-mode
    background: #303030
    color: #EAEAEA
    color: rgba(255,255,255,0.85)

    header, h2, h3, #donate, #ingredients header h2, footer
      color: inherit

    h2, h3
      font-size: 1.5rem
      font-weight: 300

    button.minus, button.plus, .gg-close
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

    #logo
      & > path
        fill: currentColor

  #instructions
    font-size: 1.15em

    header
      display: flex
      justify-content: space-between
      margin-bottom: 8px

      h2
        font-weight: 300
        margin: 0

    ol
      background-color: #F4F4F4
      border: solid #EDEDED 1px
      border-radius: 5px
      line-height: 1.75em
      margin: 12px 0 0
      padding: 15px 15px 15px 30px

      li:not(:first-child)
        margin-top: 20px
</style>