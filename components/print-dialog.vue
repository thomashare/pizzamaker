<template>
  <div id="print-dialog">
    <div id="shade" @click="showPrintDialog = false"></div>
    <dialog
      aria-modal="true"
      aria-labelledby="dialog-title"
      tabindex="-1">
      <DoughIngredients v-if="printDialog === 'dough-ingredients'" />
      <DoughInstructions v-if="printDialog === 'dough-instructions'" />
      <SauceIngredients v-if="printDialog === 'sauce-ingredients'" />
      <SauceInstructions v-if="printDialog === 'sauce-instructions'" />
    </dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DoughIngredients from '~/components/dough/ingredients'
import DoughInstructions from '~/components/dough/instructions'
import SauceIngredients from '~/components/sauce/ingredients'
import SauceInstructions from '~/components/sauce/instructions'

export default {
  components: {
    DoughIngredients,
    DoughInstructions,
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
  },
  mounted() {
    document.getElementById('dialog-title').focus()
    console.log('focused!')
  }
}
</script>

<style lang="stylus" scoped>
  >>> .ingredients
    font-size: 2em
    list-style-type: none
    max-width: 100%
    width: 100%

    ul
      grid-row-gap: 5px
      line-height: 1em
      list-style-type: none
      padding: 12px

      .ingredient
        font-size: 0.8em

  >>> .ingredients, >>> .instructions
    height: 100%
    margin-top: 0
    max-width: 960px

    header
      justify-content: space-between
      margin-top: 8px

      h2
        color: #384259

    ol, ul
      box-sizing: border-box
      display: grid
      max-height: 75vh
      overflow-y: scroll

      li
        align-items: center
        grid-column-gap: 12px !important
        grid-template-columns: minmax(8ch, 1fr) minmax(6ch, 1fr)

    ul
      font-size: 1.3em !important
      grid-column-gap: 10px
      grid-row-gap: 0.85rem
      grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr))

      @media screen and (min-width: 700px)
        grid-template-columns: repeat(2, 1fr)

    ol
      font-size: 1.6em !important
      grid-template-columns: 1fr
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

    dialog
      box-sizing: border-box
      display: block
      max-width: 980px
      position: absolute
      top: 0
      width: 100%

      .ingredients, .instructions
        background-color: #ffffff
        border-radius: 5px
        box-sizing: border-box
        margin: 0 auto
        padding: 12px

  @media screen and (min-width: 760px)
    >>> #dough-ingredients
      ul
        grid-template-columns: repeat(2, 1fr)
</style>