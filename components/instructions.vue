<template>
  <div id="instructions" v-if="hasRecipe">
    <header>
      <h2>Instructions</h2>
      <button id="print" v-if="!showPrintDialog" @click="$store.dispatch('interactive/setPrintDialog', 'dough-instructions')"><i class="gg-maximize"></i></button>
      <button id="close" v-else @click="showPrintDialog = !showPrintDialog"><i class="gg-close"></i></button>
    </header>
    <ol v-if="printDialog === 'dough-instructions'">
      <li v-for="(step, n) in steps" :key="n">{{ step }}</li>
    </ol>
    <ol v-else>
      <li v-for="(step, n) in steps.slice(0, visibleSteps)" :key="n">{{ step }}</li>
    </ol>
    <button id="view-more" @click="viewMore = !viewMore" v-if="visibleSteps !== steps.length && !printDialog">Read More</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      visibleSteps: 3,
      viewMore: false
    }
  },
  watch: {
    viewMore() {
      if (this.viewMore) this.visibleSteps = this.steps.length
    }
  },
  computed: {
    ...mapState({
      steps: state => state.recipe.steps,
      printDialog: state => state.interactive.printDialog
    }),
    hasRecipe() {
      if (this.steps === undefined || this.steps !== undefined && this.steps.length === 0 ) return false
      return true
    },
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