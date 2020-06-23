<template>
  <div id="print-dialog">
    <div id="shade" @click="showPrintDialog = false"></div>
    <div id="dialog">
      <DoughIngredients v-if="printDialog === 'dough-ingredients'" />
      <Instructions v-if="printDialog === 'dough-instructions'" />
      <SauceIngredients v-if="printDialog === 'sauce-ingredients'" />
      <SauceInstructions v-if="printDialog === 'sauce-instructions'" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DoughIngredients from '~/components/dough-ingredients'
import Instructions from '~/components/instructions'
import SauceIngredients from '~/components/sauce-ingredients'
import SauceInstructions from '~/components/sauce-instructions'

export default {
  components: {
    DoughIngredients,
    Instructions,
    SauceIngredients,
    SauceInstructions
  },
  computed: {
    ...mapState({
      printDialog: state => state.interactive.printDialog
    }),
    showPrintDialog: {
      get() {
        return this.$store.interactive.showPrintDialog
      },
      set(val) {
        this.$store.commit('interactive/SET_SHOW_PRINT_DIALOG', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>> .ingredients
    font-size: 2.25em
    list-style-type: none
    max-width: 100%
    width: 100%

    header
      justify-content: space-between
      margin-bottom: 15px

      h2
        color: #384259
        font-size: 0.7em

    ul
      grid-row-gap: 5px
      line-height: 1em
      list-style-type: none
      padding: 12px

      .ingredient
        font-size: 0.8em

      @media screen and (min-width: 501px)
        font-size: 1.75em
        line-height: normal

  >>> .ingredients, >>> .instructions
    height: 100%
    margin-top: 0
    max-width: 850px

    ol, ul
      box-sizing: border-box
      grid-template-columns: 1fr
      max-height: 75vh
      overflow-y: scroll

      li
        align-items: center
        grid-template-columns: minmax(10ch, auto) 1fr

        span
          margin-right: 8px

      @media screen and (min-width: 650px)
        grid-template-columns: 1fr 1fr

    ul
      font-size: 1.25em

      li
        display: flex

    ol
      font-size: 1.35em
      padding-left: 3ch

  #print-dialog
    align-items: flex-start
    box-sizing: border-box
    display: flex
    justify-content: center
    left: 0
    height: 100%
    position: absolute
    top: 0
    width: 100%

    #shade
      background-color: rgba(0,0,0,0.8)
      height: 100%
      left: 0
      position: relative
      top: 0
      width: 100%

    #dialog
      box-sizing: border-box
      position: absolute
      top: 0
      width: 100%

      .ingredients, .instructions
        background-color: #ffffff
        border-radius: 5px
        box-sizing: border-box
        margin: 0 auto
        padding: 12px
</style>