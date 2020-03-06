<template>
  <div id="app">
    <h1>Pizza Maker</h1>

    <RecipeSelection />
    
    <main>
      <Adjustor />
      
      <div id="ingredients">
        <h2>Ingredients</h2>
        <ul>
          <li>{{ flour }}g flour</li>
          <li>{{ oil }}g oil</li>
          <li>{{ salt }}g salt</li>
          <li>{{ sugar }}g {{ sugarType }}</li>
          <li>{{ water }}g water</li>
          <li>{{ yeast }}g yeast {{ yeastType }}</li>
        </ul>
      </div>
    </main>

    <div id="more-info">
      <Customizer />

      <div id="notes" v-if="hasRecipe">
        <h2>Recipe Info</h2>
        <ol>
          <li v-for="(step, n) in recipeSteps" :key="n">{{ step }}</li>
        </ol>
      </div>

      <div id="info" v-if="measureSwitch === 'diameter'">
        <p>Dough ball weight: {{ doughballWeight }}g</p>
      </div>
    </div>

    <div id="share">
      <label for="share">share</label>
      <input id="share-url" type="text" :value="shareURL" @focus="$event.target.select()">
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import RecipeSelection from '@/components/recipe-selection.vue'
import Adjustor from '@/components/adjustor.vue'
import Customizer from '@/components/customizer.vue'

export default {
  components: {
    RecipeSelection,
    Adjustor,
    Customizer
  },
  watch: {
    count() {
      this.$router.push({ path: this.$route.fullPath, query: { count: this.count } })
    },
    size() {
      this.$router.push({ path: this.$route.fullPath, query: { size: this.size } })
    },
    yeastType() {
      if (this.recipeSelection !== 'custom') return false
      this.$router.push({ path: this.$route.fullPath, query: { yeastType: this.yeastType } })
    }
  },
	computed: {
    ...mapState({
      measureSwitch: state => state.sizing.measureSwitch,
      count: state => state.sizing.count,
      size: state => state.sizing.size,
      crustThickness: state => state.sizing.crustThickness,
      recipeSteps: state => state.recipe.steps,
      hydration: state => state.ratios.hydration,
      oilPercent: state => state.ratios.oilPercent,
      saltPercent: state => state.ratios.saltPercent,
      sugarPercent: state => state.ratios.sugarPercent,
      sugarType: state => state.ingredients.sugarType,
      yeastPercent: state => state.ratios.yeastPercent,
      yeastType: state => state.ingredients.yeastType,
      recipeSelection: state => state.recipe.selection,
      recipeYeastType: state => state.ingredients.recipeYeastType
    }),
    flour() {
      // if measureSwitch is set to diameter, calculate by diameter measurement
      if (this.measureSwitch === 'diameter') {
        const diameter = Math.PI * (this.size/5 + this.size/5)
        return this.finalVal((diameter * this.crustThickness * this.count) * 21)
      }

      // else if measureSwitch is set to weight, calculate flour by weight.
      const totalIngredientPercentages = 100 + this.hydration + this.oilPercent + this.saltPercent + this.sugarPercent + this.yeastPercent
      return this.finalVal((this.$store.state.sizing.doughBallWeight / (totalIngredientPercentages/100)) * this.count)
    },
    oil() {
      return this.finalVal(this.flour * (this.oilPercent / 100))
    },
    salt() {
      return this.finalVal(this.flour * (this.saltPercent / 100))
    },
    sugar() {
      return this.finalVal(this.flour * (this.sugarPercent / 100))
    },
    yeast() {
      const value = this.flour * (this.yeastPercent / 100)

      if (this.yeastType === 'ADY' && this.recipeYeastType === 'IDY') {
        console.log('ADY to IDY')
        return this.finalVal(this.ADYToIDY(value))
      }
      
      else if (this.yeastType === 'IDY' && this.recipeYeastType === 'ADY') {
        console.log('ADY to IDY')
        return this.finalVal(this.IDYToADY(value))
      }

      else return this.finalVal(value)
    },
    water() {
      return this.finalVal(this.flour * (this.hydration / 100))
    },
    shareURL() {
      return location.origin+this.$route.fullPath.slice(1,this.$route.fullPath.length)
    },
    doughballWeight() {
      return this.finalVal((parseFloat(this.flour) + parseFloat(this.oil) + parseFloat(this.salt) + parseFloat(this.sugar) + parseFloat(this.water) + parseFloat(this.yeast)) / this.count)
    },
    hasRecipe() {
      if (this.recipeSteps === undefined || this.recipeSteps !== undefined && this.recipeSteps.length === 0 ) return false
      return true
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
    if (this.$route.query.sugar !== undefined) this.$store.commit('ratios/SET_SUGAR_PERCENT', this.$route.query.sugar)
    if (this.$route.query.yeast !== undefined) this.$store.commit('ratios/SET_YEAST_PERCENT', this.$route.query.yeast)
    if (this.$route.query.yeastType !== undefined) this.$store.commit('ingredients/SET_YEAST_TYPE', this.$route.query.yeastType)
  },
	methods: {
		finalVal(val) {
      return parseFloat(val).toFixed(1)
    },
    ADYToIDY(amount) {
      return amount += amount*0.75
    },
    IDYToADY(amount) {
      return amount -= amount*0.75
    }
	}
}
</script>

<style lang="stylus" scoped>
  h1
    color: #C44D58
    font-family: 'Caveat', sans-serif
    font-size: 2em
    font-weight: 300
    letter-spacing: 0.07em
    margin: 0
    text-align: center

  #warning
    background-color: #FF6
    margin: 20px 0
    padding: 5px
    text-align: center
    
  #recipe-selection
    background-color: #FAFAFA
    border: solid #D0D0D0 1px
    border-radius: 5px
    color: #404040
    display: block
    height: 40px
    margin: 10px auto
    padding: 10px
    width: 300px

  main
    display: grid
    grid-column-gap: 50px
    grid-template-columns: 1fr 1fr
    margin-top: 25px
    width: 100%

    @media screen and (max-width: 960px)
      grid-column-gap: 25px

  h2
    color: #556270
    font-family: 'Oswald', sans-serif
    font-size: 1.4em
    font-weight: 300
    letter-spacing: 0.03em
    margin: 0 0 10px

  #ingredients
    ul
      margin: 0
      padding: 0 0 0 16px

      li:not(:first-child)
        margin-top: 8px

  #more-info
    border-top: solid #F0F0F0 1px
    margin-top: 25px
    padding-top: 20px

    h2
      color: #5A5A5A
      margin: 0 auto

    #notes
      background-color: #F9F9F9
      border-radius: 5px
      box-sizing: border-box
      margin: 25px auto
      max-width: 575px
      padding: 30px

      ol
        line-height: 1.5em
        padding: 0 0 0 15px

        li:not(:first-child)
          margin-top: 15px

    #info
      border-top: solid #F0F0F0 1px
      color: #C44D58
      font-size: 1.25em
      grid-column: 1/-1
      margin-top: 20px
      text-align: center

  #share
    display: flex
    margin: 40px auto 0
    width: 100%

    @media screen and (min-width: 1200px)
      max-width: 450px

    label
      margin-right: 5px

    input
      border: solid #EAEAEA 1px
      width: 100%
</style>