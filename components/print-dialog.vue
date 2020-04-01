<template>
  <div id="print-dialog">
    <div id="shade" @click="showPrintDialog = false"></div>
    <div id="dialog">
      <Ingredients v-if="printDialog === 'ingredients'" />
      <Instructions v-if="printDialog === 'dough-instructions'" />
      <SauceIngredients v-if="printDialog === 'sauce-ingredients'" />
      <SauceInstructions v-if="printDialog === 'sauce-instructions'" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Ingredients from '~/components/ingredients'
import Instructions from '~/components/instructions'
import SauceIngredients from '~/components/sauce-ingredients'
import SauceInstructions from '~/components/sauce-instructions'

export default {
  components: {
    Ingredients,
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
      background-color: #ffffff
      border-radius: 5px
      box-sizing: border-box
      padding: 12px
      position: absolute
      top: 0

  >>> #ingredients
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
      font-size: 1.2em
      grid-row-gap: 20px
      line-height: 1em
      list-style-type: none
      max-height: 70vh
      padding: 12px

      .ingredient
        font-size: 0.8em

      @media screen and (min-width: 501px)
        font-size: 1.75em
        grid-row-gap: 5px
        line-height: normal

  >>> #ingredients, >>> #instructions
    margin-top: 0
    max-width: 680px

    ol, ul
      grid-template-columns: 1fr
      overflow-y: scroll

      li
        grid-template-columns: minmax(10ch, auto) 1fr

      @media screen and (max-width: 680px)
        max-height: 70vh
</style>