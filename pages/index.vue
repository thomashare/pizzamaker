<template>
  <div id="app">
    <header>
      <h1>Pizza Maker App</h1>
      <button @click="nightMode = !nightMode"><i class="dark-mode-toggle" title="toggle night mode"></i></button>
    </header>

    <div id="dough-settings">
      <RecipeSelection />
      <MeasureSwitch />
    </div>
    
    <main>
      <Adjustor />
      <Customizer />
      <IngredientSubstitutes />
    </main>

    <section :class="{ 'no-recipe': recipe === 'custom' }">
      <Ingredients />
      <Instructions />
    </section>

    <div id="share">
      <label for="share">share</label>
      <input id="share-url" type="text" :value="shareURL" @focus="$event.target.select()">
    </div>

    <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KYFVEQ6EJF376&source=url" id="donate" target="_blank">Donate if this tool helped you</a>

    <PrintDialog v-if="showPrintDialog" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import RecipeSelection from '@/components/recipe-selection.vue'
import MeasureSwitch from '@/components/measure-switch.vue'
import Adjustor from '@/components/adjustor.vue'
import Ingredients from '@/components/ingredients.vue'
import Instructions from '@/components/instructions.vue'
import IngredientSubstitutes from '@/components/ingredient-substitutes.vue'
import Customizer from '@/components/customizer.vue'
import PrintDialog from '@/components/print-dialog.vue'

export default {
  components: {
    RecipeSelection,
    MeasureSwitch,
    Adjustor,
    Ingredients,
    Instructions,
    IngredientSubstitutes,
    Customizer,
    PrintDialog
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
  mounted() {
    if (this.$route.query.recipe !== undefined) this.$store.commit('recipe/SET_SELECTION', this.$route.query.recipe)
    if (this.$route.query.doughBallWeight !== undefined) {
      this.$store.commit('sizing/TOGGLE_MEASURE_SWITCH', 'weight')
      this.$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', this.$route.query.doughBallWeight)
    }
    if (this.$route.query.count !== undefined) this.$store.commit('sizing/SET_COUNT', this.$route.query.count)
    if (this.$route.query.crustThickness !== undefined) this.$store.commit('sizing/SET_CRUST_THICKNESS', this.$route.query.crustThickness)
    if (this.$route.query.hydration !== undefined) this.$store.commit('ratios/SET_HYDRATION', this.$route.query.hydration)
    if (this.$route.query.oil !== undefined) this.$store.commit('ratios/SET_OIL_PERCENT', this.$route.query.oil)
    if (this.$route.query.salt !== undefined) this.$store.commit('ratios/SET_SALT_PERCENT', this.$route.query.salt)
    if (this.$route.query.size !== undefined) this.$store.commit('sizing/SET_SIZE', this.$route.query.size)
    if (this.$route.query.sugarType !== undefined) this.$store.commit('ingredients/SET_SUGAR_TYPE', this.$route.query.sugarType)
    if (this.$route.query.sugar !== undefined) this.$store.commit('ratios/SET_SUGAR_PERCENT', this.$route.query.sugar)
    if (this.$route.query.yeast !== undefined) this.$store.commit('ratios/SET_YEAST_PERCENT', this.$route.query.yeast)
    if (this.$route.query.yeastType !== undefined) this.$store.commit('ingredients/SET_YEAST_TYPE', this.$route.query.yeastType)
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
      font-size: 1.35em
      font-weight: 300
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
    margin-top: 20px

    #measure-switch
      margin-left: 15px

  main
    display: grid
    grid-column-gap: 25px
    grid-template-columns: repeat(2, 1fr)
    margin: 30px auto 0
    max-width: 600px
    width: 100%

  section
    border-top: solid #E4E4E4 1px
    display: grid
    grid-column-gap: 20px
    grid-row-gap: 20px
    margin: 0 auto
    max-width: 100%
    padding-top: 20px
    @media screen and (min-width: 501px)
      max-width: 300px

    &:not(.no-recipe)
      grid-template-columns: 3fr 5fr
      max-width: 600px

      @media screen and (max-width: 500px)
        grid-template-columns: 1fr
    
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

  #donate
    display: block
    font-size: 1.25em
    margin: 30px auto
    max-width: 500px
    text-align: center
</style>