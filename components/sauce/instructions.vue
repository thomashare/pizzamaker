<template>
  <div id="sauce-instructions" class="instructions" v-if="steps.length > 0">
    <header>
      <h2 id="dialog-title">Sauce Instructions</h2>
      <button aria-label="expand full screen" id="print" v-if="!showPrintDialog" @click="$store.dispatch('interactive/setPrintDialog', 'sauce-instructions')"><i class="gg-maximize"></i></button>
      <button aria-label="close" id="close" tabindex="1" v-else @click="showPrintDialog = !showPrintDialog" @keydown.esc="showPrintDialog = !showPrintDialog"><i class="gg-close"></i></button>
    </header>
    <ol>
      <li v-for="(step, n) in steps" :key="n">{{ step }}</li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      steps: state => state.sauce_recipe.steps,
      amount: state => state.sauce_recipe.amount
    }),
    showPrintDialog: {
      get() {
        return this.$store.state.interactive.showPrintDialog
      },
      set(val) {
        this.$store.commit('interactive/SET_SHOW_PRINT_DIALOG', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .instructions
    margin: 20px auto 0
    max-width: 680px
</style>