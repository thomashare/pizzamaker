<template>
  <div id="print-dialog">
    <div id="shade" @click="showPrintDialog = false"></div>
    <div id="dialog">
      <Ingredients />
    </div>
  </div>
</template>

<script>
import Ingredients from '~/components/ingredients'

export default {
  components: {
    Ingredients
  },
  computed: {
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
    display: flex
    height: 100%
    justify-content: center
    left: 0
    position: absolute
    top: 0
    width: 100%

    #shade
      background-color: rgba(0,0,0,0.8)
      height: 100%
      left: 0
      position: absolute
      top: 0
      width: 100%

    #dialog
      background-color: #ffffff
      border-radius: 5px
      box-sizing: border-box
      padding: 12px
      position: absolute
      top: 15px
      max-width: 100%

  >>> #ingredients
    font-size: 2.25em
    list-style-type: none
    width: 100%

    header
      justify-content: space-between
      margin-bottom: 15px

      h2
        color: #384259
        font-size: 0.7em

    ul
      font-size: 1.2em
      list-style-type: none
      padding: 12px

      @media screen and (min-width: 501px)
        font-size: 1.75em

      li
        padding: 5px

        &:not(:first-child)
          margin-top: 0px
</style>