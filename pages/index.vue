<template>
  <div id="app" :class="`${recipeToggle}-recipe`">
    <Header/>

    <fieldset id="recipe-toggle">
      <legend hidden>Select dough or sauce recipes</legend>
      <div role="radiogroup">
        <button
          role="radio"
          :aria-checked="(recipeToggle === 'dough') ? 'true' : 'false'"
          :class="{ active : (recipeToggle === 'dough') }"
          @click="setRecipeToggle('dough')"
        >Dough</button>
        <span class="sep">/</span>
        <button
          role="radio"
          :aria-checked="(recipeToggle === 'sauce') ? 'true' : 'false'"
          :class="{ active : (recipeToggle === 'sauce') }"
          @click="setRecipeToggle('sauce')"
        >Sauce</button>
      </div>
    </fieldset>

    <template v-if="recipeToggle === 'dough'">
      <DoughRecipeSelection />

      <div id="dough-editor">
        <header>
          <h2>Customize Your Dough</h2>
        </header>
        <DoughAdjustor />
        <DoughCustomizer />
        <DoughIngredientSubstitutes />
      </div>

      <DoughIngredients />
      <DoughInstructions />
    </template>

    <template v-else>
      <SauceRecipeSelection />
      <SauceCustomizer />
      <SauceIngredients />
      <SauceInstructions />
    </template>

    <div id="share">
      <label for="share">share</label>
      <input aria-label="shareable dough and sauce recipe URL" id="share-url" type="text" :value="shareURL" @focus="$event.target.select()">
    </div>

    <Footer />

    <PrintDialog v-if="showPrintDialog" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/header.vue'
import DoughRecipeSelection from '@/components/dough/recipe-selection.vue'
import SauceRecipeSelection from '@/components/sauce/recipe-selection.vue'
import SauceCustomizer from '@/components/sauce/customizer.vue'
import SauceIngredients from '@/components/sauce/ingredients.vue'
import SauceInstructions from '@/components/sauce/instructions.vue'
import DoughAdjustor from '@/components/dough/adjustor.vue'
import DoughIngredients from '@/components/dough/ingredients.vue'
import DoughInstructions from '@/components/dough/instructions.vue'
import DoughIngredientSubstitutes from '@/components/dough/ingredient-substitutes.vue'
import DoughCustomizer from '@/components/dough/customizer.vue'
import PrintDialog from '@/components/print-dialog.vue'
import Footer from '@/components/footer.vue'

export default {
  components: {
    Header,
    DoughRecipeSelection,
    SauceRecipeSelection,
    SauceCustomizer,
    SauceIngredients,
    SauceInstructions,
    DoughAdjustor,
    DoughIngredients,
    DoughInstructions,
    DoughIngredientSubstitutes,
    DoughCustomizer,
    PrintDialog,
    Footer
  },
	computed: {
    ...mapState({
      showPrintDialog: state => state.interactive.showPrintDialog,
      recipeToggle: state => state.interactive.recipeToggle
    }),
    shareURL() {
      return location.origin+this.$route.fullPath.slice(1,this.$route.fullPath.length)
    }
  },
	methods: {
		finalVal(val) {
      const newVal = parseFloat(val).toFixed(1)

      if (newVal.split('.')[1] <= 0) return newVal.split('.')[0]
      else return newVal
    },
    setRecipeToggle(val) {
      this.$store.commit('interactive/SET_RECIPE_TOGGLE', val)
    }
	}
}
</script>

<style lang="stylus" scoped>
  >>> h2
    grid-column: 1/-1
    text-align: center

  >>> .recipe-selection
    align-items: center
    display: flex
    flex-wrap: wrap
    justify-content: center
    margin-top: 0

    h2
      margin: 0
      width: 100%

    & > div
      margin: 10px 8px 0

    span
      margin-right: 5px

  >>> select
    height: 32px

  #header
    margin-top: 0

  header
    grid-column: 1/-1

  #recipe-toggle
    border: none
    grid-column: 1/-1
    margin: 20px 0 8px
    padding: 0

    div
      align-items: center
      display: flex

    button
      background: #FFFFFF
      border: solid #F0F0F0 1px
      border-radius: 25px
      color: #606060
      font-weight: 300
      padding: 4px 12px
      transition: color 0.1s ease, background 0.3s ease

      &:focus
        outline: solid red 1px

      &.active
        background-color: #2265D4
        border-color: transparent
        color: #FFFFFF

    .sep
      color: #F0F0F0
      font-size: 1.65em
      margin: 0 8px

  #dough-settings
    align-items: center
    display: flex
    flex-wrap: wrap
    grid-column: 1/-1
    justify-content: center

    & > div
      margin: 0 15px

    #measure-switch
      align-items: center

  #dough-editor
    align-content: start
    align-items: start
    display: grid
    grid-column-gap: 15px
    grid-row-gap: 20px
    grid-template-columns: 1fr 1fr
    padding: 0 5px

    @media screen and (max-width: 720px)
      font-size: 0.9em

  #dough-info
    display: grid
    grid-column-gap: 20px
    grid-row-gap: 20px
    max-width: 100%

    &:not(.no-recipe)
      grid-template-columns: 3fr 5fr
      max-width: 800px
    
  #share
    align-items: center
    box-sizing: border-box
    display: flex
    grid-column: 1/-1
    margin-top: 20px
    max-width: 720px
    padding: 0 10px
    width: 100%

    label
      margin-right: 5px

    input
      border: solid #EAEAEA 1px
      font-weight: 300
      width: 100%
</style>