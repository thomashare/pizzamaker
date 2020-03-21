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
      background-color: rgba(0,0,0,0.6)
      height: 100%
      left: 0
      position: absolute
      top: 0
      width: 100%

    #dialog
      background-color: #ffffff
      border-radius: 5px
      padding: 20px
      position: absolute
      top: 15px
      min-width: 350px

  >>> #ingredients
    font-size: 2em
    list-style-type: none

    header
      justify-content: space-between
      margin-bottom: 15px

      h2
        color: #384259
        font-size: 0.9em

    ul
      list-style-type: none
      padding: 0

      li
        border: solid #D0D0D0 1px
        border-radius: 3px
        letter-spacing: 0.03em
        padding: 10px 15px

        &:not(:first-child)
          margin-top: 18px
</style>