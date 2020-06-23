<template>
  <div id="app">
    <header>
      <h1>Pizza Maker App</h1>
      <button @click="nightMode = !nightMode"><i class="dark-mode-toggle" title="toggle night mode"></i></button>
    </header>

    <div id="dough-settings">
      <DoughRecipeSelection />
      <MeasureSwitch />
    </div>
    
    <main>
      <DoughAdjustor />
      <DoughCustomizer />
      <IngredientSubstitutes />
    </main>

    <section :class="{ 'no-recipe': recipe === 'custom' }">
      <DoughIngredients />
      <Instructions />
    </section>

    <div id="sauce-settings">
      <SauceRecipeSelection />
      <SauceCustomizer />
      <SauceIngredients />
      <SauceInstructions />
    </div>

    <div id="share">
      <label for="share">share</label>
      <input id="share-url" type="text" :value="shareURL" @focus="$event.target.select()">
    </div>

    <Footer />

    <PrintDialog v-if="showPrintDialog" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import DoughRecipeSelection from '@/components/dough-recipe-selection.vue'
import SauceRecipeSelection from '@/components/sauce-recipe-selection.vue'
import SauceCustomizer from '@/components/sauce-customizer.vue'
import SauceIngredients from '@/components/sauce-ingredients.vue'
import SauceInstructions from '@/components/sauce-instructions.vue'
import MeasureSwitch from '@/components/measure-switch.vue'
import DoughAdjustor from '@/components/dough-adjustor.vue'
import DoughIngredients from '@/components/dough-ingredients.vue'
import Instructions from '@/components/instructions.vue'
import IngredientSubstitutes from '@/components/ingredient-substitutes.vue'
import DoughCustomizer from '@/components/dough-customizer.vue'
import PrintDialog from '@/components/print-dialog.vue'
import Footer from '@/components/footer.vue'

export default {
  components: {
    DoughRecipeSelection,
    SauceRecipeSelection,
    SauceCustomizer,
    SauceIngredients,
    SauceInstructions,
    MeasureSwitch,
    DoughAdjustor,
    DoughIngredients,
    Instructions,
    IngredientSubstitutes,
    DoughCustomizer,
    PrintDialog,
    Footer
  },
	computed: {
    ...mapState({
      showPrintDialog: state => state.interactive.showPrintDialog,
      recipe: state => state.recipe.selection
    }),
    shareURL() {
      return location.origin+this.$route.fullPath.slice(1,this.$route.fullPath.length)
    },
    nightMode: {
      get() {
        return this.$store.state.settings.nightMode
      },
      set(val) {
        this.$store.dispatch('settings/setNightMode', val)
      }
    }
  },
	methods: {
		finalVal(val) {
      const newVal = parseFloat(val).toFixed(1)

      if (newVal.split('.')[1] <= 0) return newVal.split('.')[0]
      else return newVal
    }
	}
}
</script>

<style lang="stylus" scoped>
  header
    color: #384259
    display: flex
    justify-content: center

    h1
      font-family: 'Overlock', sans-serif
      font-size: 1.75em
      font-weight: 500
      letter-spacing: 0.07em
      margin: 0 auto
      text-align: center

    button
      background: none
      border: none
      color: inherit

    .dark-mode-toggle
      box-sizing: border-box
      position: relative
      display: block
      transform: scale(1.15)
      border: 2px solid
      border-radius: 100px
      width: 20px
      height: 20px

      &::after, &::before
        content: ""
        box-sizing: border-box
        position: absolute
        display: block

      &::before
        border:5px solid
        border-top-left-radius: 100px
        border-bottom-left-radius: 100px
        border-right: 0
        width: 9px
        height: 18px
        top: -1px
        left: -1px

      &::after
        border: 4px solid
        border-top-right-radius: 100px
        border-bottom-right-radius: 100px
        border-left: 0
        width: 4px
        height: 8px
        right: 4px
        top: 4px

  #dough-settings
    align-items: center
    display: flex
    justify-content: center
    margin-top: 15px

    #measure-switch
      margin-left: 15px

  main
    align-items: start
    display: grid
    grid-column-gap: 25px
    grid-template-columns: repeat(2, 1fr)
    margin: 20px auto 0
    max-width: 600px
    width: 100%

  section
    display: grid
    grid-column-gap: 20px
    grid-row-gap: 20px
    margin: 0 auto
    max-width: 100%
    
    @media screen and (min-width: 681px)
      max-width: 30ch

    &:not(.no-recipe)
      grid-template-columns: 3fr 5fr
      max-width: 800px

      @media screen and (max-width: 680px)
        grid-template-columns: 1fr

  #sauce-settings
    border-top: solid #E0E0E0 1px
    margin-top: 10px
    padding: 12px 0

    #sauce-recipe-selection
      display: flex
      flex-wrap: wrap
      justify-content: center
    
  #share
    align-items: center
    display: flex
    margin: 40px auto 0
    width: 100%

    @media screen and (min-width: 1200px)
      max-width: 450px

    label
      margin-right: 5px

    input
      border: solid #EAEAEA 1px
      font-weight: 300
      width: 100%

  @media screen and (max-width: 750px)
    main
      font-size: 0.9em
      grid-column-gap: 20px
      grid-template-columns: 2fr 1fr
</style>