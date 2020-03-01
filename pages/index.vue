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
      <div id="customize">
        <h2>Customize</h2>
        <div>
          <span class="ingredient">salt</span>
          <input class="value" max="100" min="0" step="0.05" type="number" v-model="salt" @change="setCustom()">
          <span>%</span>
        </div>
        <div>
          <span class="ingredient">{{ sugarType }}</span>
          <input class="value" max="100" min="0" step="0.05" type="number" v-model="sugar" @change="setCustom()">
          <span>%</span>
        </div>
        <div>
          <span class="ingredient">oil</span>
          <input class="value" max="100" min="0" step="0.05" type="number" v-model="oil" @change="setCustom()">
          <span>%</span>
        </div>
        <div>
          <span class="ingredient">yeast</span>
          <input class="value" max="100" min="0" step="0.05" type="number" v-model="yeast" @change="setCustom()">
          <span>%</span>
        </div>
      </div>

      <div id="notes" v-if="recipeSteps !== null">
        <h2>Recipe Info</h2>
        <ol>
          <li v-for="(step, n) in recipeSteps" :key="n">{{ step }}</li>
        </ol>
      </div>

      <div id="info">
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

export default {
  components: {
    RecipeSelection,
    Adjustor,
  },
  data() {
		return {
      sugarType: 'sugar',
      recipeSteps: null,
    }
  },
  watch: {
    count() {
      this.$router.push({ path: this.$route.fullPath, query: { count: this.count } })
    },
    size() {
      this.$router.push({ path: this.$route.fullPath, query: { size: this.size } })
    },
    crustThickness() {
      this.$router.push({ path: this.$route.fullPath, query: { crustThickness: this.crustThickness } })
    },
    hydration() {
      this.$router.push({ path: this.$route.fullPath, query: { hydration: this.hydration } })
    },
    oilPercent() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { oil: this.oilPercent } })
      }, 1000)
    },
    saltPercent() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { salt: this.saltPercent } })
      }, 1000)
    },
    sugarPercent() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { sugar: this.sugarPercent } })
      }, 1000)
    },
    yeastPercent() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { yeast: this.yeastPercent, yeastType: this.yeastType } })
      }, 1000)
    },
    yeastType() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { yeastType: this.yeastType } })
      }, 1000)
    }
  },
	computed: {
    ...mapState({
      count: state => state.sizing.count,
      size: state => state.sizing.size,
      hydration: state => state.ratios.hydration,
      oilPercent: state => state.ratios.oilPercent,
      saltPercent: state => state.ratios.saltPercent,
      sugarPercent: state => state.ratios.sugarPercent,
      yeastPercent: state => state.ratios.yeastPercent,
      yeastType: state => state.ingredients.yeastType,
      crustThickness: state => state.sizing.crustThickness
    }),
    flour() {
      const diameter = Math.PI * (this.size/5 + this.size/5)
      return this.finalVal((diameter * this.crustThickness * this.count) * 21)
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
      return this.finalVal(this.flour * (this.yeastPercent / 100))
    },
    water() {
      return this.finalVal(this.flour * (this.hydration / 100))
    },
    shareURL() {
      return location.origin+this.$route.fullPath.slice(1,this.$route.fullPath.length)
    },
    doughballWeight() {
      return this.finalVal((parseFloat(this.flour) + parseFloat(this.oil) + parseFloat(this.salt) + parseFloat(this.sugar) + parseFloat(this.water) + parseFloat(this.yeast)) / this.count)
    }
  },
  mounted() {
    if (this.$route.query.count !== undefined) this.count = this.$route.query.count
    if (this.$route.query.crustThickness !== undefined) this.$store.commit('sizing/SET_CRUST_THICKNESS', this.$route.query.crustThickness)
    if (this.$route.query.hydration !== undefined) this.$store.commit('ratios/SET_HYDRATION', this.$route.query.hydration)
    if (this.$route.query.oil !== undefined) this.$store.commit('ratios/SET_OIL_PERCENT', this.$route.query.oil)
    if (this.$route.query.salt !== undefined) this.$store.commit('ratios/SET_SALT_PERCENT', this.$route.query.salt)
    if (this.$route.query.size !== undefined) this.$store.commit('sizing/SET_SIZE', this.$route.query.size)
    if (this.$route.query.sugar !== undefined) this.$store.commit('ratios/SET_SUGAR', this.$route.query.sugar)
    if (this.$route.query.yeast !== undefined) this.$store.commit('ratios/SET_YEAST_PERCENT', this.$route.query.yeast)
    if (this.$route.query.yeastType !== undefined) this.$store.commit('ingredients/SET_YEAST_TYPE', this.$route.query.yeastType)
  },
	methods: {
		finalVal(val) {
      return parseFloat(val).toFixed(1)
    },
    setCustom() {
      this.recipeSelection = 'custom'
    }
	}
}
</script>

<style lang="stylus" scoped>
  h1
    color: #C44D58
    font-family: 'Oswald', sans-serif
    font-size: 1.5em
    font-weight: 300
    letter-spacing: 0.07em
    margin: 0
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
    display: grid
    grid-column-gap: 30px
    grid-template-columns: 1fr 2fr
    margin: 20px auto 0
    max-width: 500px
    padding-top: 20px

    h2
      color: #5A5A5A
      margin: 0 auto

    #customize
      h2
        text-align: center

      & > div
        align-items: center
        display: flex
        justify-content: center

        @media screen and (max-width: 1200px)
          width: 100%

        &:not(:first-child)
          margin-top: 20px

        .ingredient
          text-align: right
          max-width: 5ch
          width: 100%

        .value
          appearance: none
          border: solid #E0E0E0 1px
          border-radius: 5px
          margin: 0 5px
          padding: 5px
          text-align: center
          width: 7ch

    #notes
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