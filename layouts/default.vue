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
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap')

  body
    font-family: 'Roboto', sans-serif
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
    font-size: 16px
    font-weight: 300
    max-width: 100%
    padding: 3px

  .hidden
    display: none

  #app
    align-items: start
    display: grid
    grid-column-gap: 20px
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
    justify-content: center
    justify-items: center
    margin: 0 auto
    max-width: 960px

  #container
    min-height: 100vh
    padding: 15px 12px

  header
    margin-top: 30px

  h2, h3
    color: #384259
    font-size: 1.35rem
    font-weight: 300
    letter-spacing: 0.03em
    margin: 0

  select
    background-color: #ffffff
    border-color: #E0E0E0
    border-radius: 5px
    color: #404040
    font-size: 16px
    font-weight: 300

  .recipe-selection select
    font-size: 16px
    max-width: 350px

    @media screen and (min-width: 480px)
      max-width: none

  .information
    box-sizing: border-box
    position: relative
    display: block
    width: 20px
    height: 20px
    border: 2px solid
    border-radius: 40px

    &::after, &::before
      content: ""
      display: block
      box-sizing: border-box
      position: absolute
      border-radius: 3px
      width: 2px
      background: currentColor
      left: 7px

    &::after
      bottom: 2px
      height: 8px

    &::before
      height: 2px
      top: 2px

  #weight
    color: #202020
    text-align: center

  button
    // plus and minus buttons
    &.minus, &.plus
      background: none
      border-color: currentColor
      border-radius: 50%
      box-sizing: content-box
      border-style: solid
      border-width: 1px
      box-sizing: border-box
      color: #5E5E5E
      display: block
      height: 24px
      padding: 0
      position: relative
      touch-action: manipulation
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

  .ingredients, .instructions
    header
      padding: 0 20px 0 8px

  .ingredients
    border-radius: 5px
    box-sizing: border-box
    color: #FFF
    display: grid
    list-style-type: none
    margin: 0
    padding: 0 8px

    ol, ul
      grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr))
      justify-content: center
      margin: 0

      li
        display: grid
        grid-column-gap: 8px
        grid-template-columns: 12ch 5ch
        justify-content: center

        .ingredient
          text-align: right

  #sauce-ingredients
    li
      grid-template-columns: 12ch 5ch

  .ingredients
    font-size: 1.5em

    @media screen and (max-width: 720px)
      width: 100%

    header
      display: flex
      justify-content: space-between
      margin-bottom: 8px

    ul
      background-color: #2265D4
      box-sizing: border-box
      display: grid
      grid-row-gap: 8px
      padding: 15px
      width: 100%

  #print
    background: none
    border: none
    box-sizing: border-box
    color: #4285F4
    margin-left: 20px
    padding: 0

    &:focus
      animation: grow 0.2s ease forwards

    &:hover
      animation: grow-shrink 0.5s ease

    &:focus
      color: blue
      outline: none

    .gg-maximize
      box-sizing: border-box
      position: relative
      display: block
      transform: scale(1.25)
      width: 14px
      height: 14px
      box-shadow:
        -6px -6px 0 -4px,
        6px 6px 0 -4px,
        6px -6px 0 -4px,
        -6px 6px 0 -4px
        
    @keyframes grow-shrink
      50%
        transform: scale(1.1)

    @keyframes grow
      100%
        transform: scale(1.1)
        
  #close
    background: none
    border: none
    box-sizing: border-box
    padding: 0

    .gg-close
      box-sizing: border-box
      position: relative
      display: block
      transform: scale(1.25)
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

  .tooltip
    display: flex
    justify-content: flex-end

    .activator
      align-items: center
      display: flex
      position: relative

      .information
        color: #808080
        cursor: pointer
        margin-right: 2px
        position: relative
        transform: scale(0.6)
        transition: color 0.3s ease

        &:hover
          color: #404040

        @media screen and (max-width: 750px)
          margin-right: 5px
          transform: scale(0.95)

    .popup
      background-color: #FFFFFF
      border: solid #EAEAEA 1px
      border-radius: 4px
      box-shadow: 10px 0 20px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1)
      box-sizing: border-box
      font-size: 0.9em
      left: 0
      line-height: 1.5em
      min-width: 320px
      padding: 12px
      position: absolute
      top: 30px
      width: 100%
      z-index: 1

      @media screen and (max-width: 1080px)
        font-size: 1.35em

      &::before
        background-color: inherit
        border-left: inherit
        border-top: inherit
        border-top-left-radius: 1px
        box-sizing: inherit
        content: ''
        display: block
        height: 8px
        left: 6px
        position: absolute
        top: -5px
        transform: rotate(45deg)
        width: 8px

      p
        margin: 0

        &:not(:first-child)
          margin-top: 8px

  body.night-mode
    background: #303030
    color: #EAEAEA
    color: rgba(255,255,255,0.85)

    #recipe-toggle
      button
        background-color: #202020
        border-color: #505050
        color: #AFAFAF

    #header, h2, h3, #donate, .ingredients header h2, footer
      color: inherit

    button.minus, button.plus, .gg-close, #dough-ingredients #weight
      color: #FFF

    .instructions
      ol, ul
        background-color: #202020
        border-color: #101010

    #print-dialog dialog
      background: #303030

    #logo
      & > path
        fill: currentColor

    .tooltip
      .activator
        .icon:hover
          color: #EAEAEA

      .popup
        background-color: #222222
        border-color: #606060

    #print-dialog
      dialog
        .ingredients, .instructions
          background-color: #2A2A2A

  .instructions
    font-size: 1.15em
    grid-column: 1/-1
    max-width: 600px
    padding: 0 10px

    a
      color: inherit

    header
      display: flex
      justify-content: space-between
      margin-bottom: 8px

      h2
        margin: 0

    ol, ul
      background-color: #F4F4F4
      border: solid #EDEDED 1px
      border-radius: 5px
      line-height: 1.6em
      margin: 0
      padding: 15px 15px 15px 30px

      li:not(:first-child)
        margin-top: 20px
</style>