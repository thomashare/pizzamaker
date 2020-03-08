<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="stylus">
  @import url('../node_modules/normalize-css/normalize.css')
  @import url('https://fonts.googleapis.com/css2?family=Caveat&family=Open+Sans:wght@300;400&display=swap')

  body
    font-family: 'Open Sans', sans-serif
    padding: 15px 12px

    @media screen and (max-width: 1200px)
      font-size: 0.9em

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
</style>