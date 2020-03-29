<template>
  <div id="instructions" v-if="steps.length > 0">
    <header>
      <h3>Instructions</h3>
      <button id="print" v-if="!showPrintDialog" @click="$store.dispatch('interactive/setPrintDialog', 'sauce-instructions')"><i class="gg-maximize"></i></button>
      <button id="close" v-else @click="showPrintDialog = !showPrintDialog"><i class="gg-close"></i></button>
    </header>
    <ol v-if="printDialog === 'sauce-instructions'">
      <li v-for="(step, n) in steps" :key="n">{{ step }}</li>
    </ol>
    <ol v-else>
      <li v-for="(step, n) in steps" :key="n">{{ step }}</li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      steps: state => state.sauce_recipe.steps
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
  #instructions
    margin: 20px auto 0
    max-width: 680px
</style>