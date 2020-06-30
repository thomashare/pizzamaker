<template>
  <div class="instructions" id="dough-instructions" v-if="hasRecipe">
    <header>
      <h2>Dough Instructions</h2>
      <button id="print" v-if="!showPrintDialog" @click="$store.dispatch('interactive/setPrintDialog', 'dough-instructions')"><i class="gg-maximize"></i></button>
      <button id="close" v-else @click="closePrintDialog"><i class="gg-close"></i></button>
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
  },
  methods: {
    closePrintDialog() {
      this.showPrintDialog = false
      this.viewMore = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  #dough-instructions
    margin: 0 auto
    max-width: 750px

    #view-more
      background: none
      border: none
      color: #4285F4
      display: block
      font-size: 0.9em
      font-weight: 300
      justify-self: center
      margin: 10px auto
      padding: 0
</style>