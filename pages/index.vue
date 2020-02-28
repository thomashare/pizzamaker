<template>
  <div id="app">
    <h1>Pizza Maker</h1>

    <select id="recipe-selection" v-model="recipeSelection">
      <option value="custom">custom</option>
      <option value="papa-johns">Pete-zza's Papa Johns</option>
      <option value="scott123s-easy-new-york">Scott123s Easy New York</option>
      <option value="lucalis">Lucali's</option>
      <option value="robertas">Roberta's</option>
      <option value="king-arthur">King Arthur</option>
    </select>

    <main>
      <div id="adjustor">
        <div>
          <span>pies</span>
          <button @click.prevent="--count" :disabled="count <= 1"><i class="fas fa-minus-circle"></i></button>
          <input max="50" min="1" type="number" v-model="count">
          <button @click.prevent="++count" :disabled="count >= 50"><i class="fas fa-plus-circle"></i></button>
        </div>
        <div>
          <span>size (in)</span>
          <button @click.prevent="--size" :disabled="size <= 3"><i class="fas fa-minus-circle"></i></button>
          <input max="100" min="3" type="number" v-model="size">
          <button @click.prevent="++size" :disabled="size >= 100"><i class="fas fa-plus-circle"></i></button>
        </div>
        <div>
          <span>crust thickness (in)</span>
          <button @click.prevent="crustThickness -= 0.05" :disabled="crustThickness <= 0.1"><i class="fas fa-minus-circle"></i></button>
          <input max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
          <button @click.prevent="crustThickness += 0.05"><i class="fas fa-plus-circle"></i></button>
        </div>
        <div>
          <span>hydration (%)</span>
          <button @click.prevent="--hydration"><i class="fas fa-minus-circle"></i></button>
          <input type="number" v-model="hydration">
          <button @click.prevent="++hydration"><i class="fas fa-plus-circle"></i></button>
        </div>
        <div id="yeast-type">
          <span>yeast type</span>
          <select v-model="yeastType" @change="convertYeastAmount()">
            <option value="ADY">ADY</option>
            <option value="IDY">IDY</option>
          </select>
        </div>
      </div>
      
      <div id="ingredients">
        <h2>Ingredients</h2>
        <ul>
          <li>{{ flour }}g flour</li>
          <li>{{ oil }}g oil</li>
          <li>{{ salt }}g salt</li>
          <li>{{ sugar }}g sugar</li>
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
          <span class="ingredient">sugar</span>
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
export default {
  data() {
		return {
      count: 1,
      hydration: 56,
      oilPercent: 7,
      recipeSelection: 'custom',
      saltPercent: 1.75,
      size: 12,
      crustThickness: 0.35,
      sugarPercent: 4,
      yeastPercent: 0.14,
      yeastType: 'ADY',
      recipeYeast: 0,
      recipeYeastType: null,
      recipeSteps: null,
    }
  },
  watch: {
    recipeSelection() {
      if (this.recipeSelection === 'custom') this.recipeSteps = null

      this.$router.push({ path: this.$route.path, query: { recipe: this.recipeSelection } })
      this.setRecipeRatios()
    },
    count() {
      this.$router.push({ path: this.$route.fullPath, query: { count: this.count } })
    },
    size() {
      this.$router.push({ path: this.$route.fullPath, query: { size: this.size } })
    },
    crustThickness() {
      this.$router.push({ path: this.$route.fullPath, query: { crustThickness: this.crustThickness } })
      this.crustThickness = Math.round(this.crustThickness * 100) / 100
    },
    hydration() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { hydration: this.hydration } })
      }, 1000)
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
        this.$router.push({ path: this.$route.fullPath, query: { yeast: this.yeastPercent, yeastType: this.yeastPercentType } })
      }, 1000)
    },
    yeastType() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { yeastType: this.yeastPercentType } })
      }, 1000)
    }
  },
	computed: {
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
    if (this.$route.query.crustThickness !== undefined) this.crustThickness = this.$route.query.crustThickness
    if (this.$route.query.hydration !== undefined) this.hydration = this.$route.query.hydration
    if (this.$route.query.oil !== undefined) this.oilPercent = this.$route.query.oil
    if (this.$route.query.salt !== undefined) this.saltPercent = this.$route.query.salt
    if (this.$route.query.size !== undefined) this.size = this.$route.query.size
    if (this.$route.query.sugar !== undefined) this.size = this.$route.query.sugar
    if (this.$route.query.yeast !== undefined) this.yeastPercent = this.$route.query.yeast
    if (this.$route.query.yeastType !== undefined) this.yeastType = this.$route.query.yeastType
  },
	methods: {
		finalVal(val) {
      if (val === 0) return 'no'
			else return parseFloat(val).toFixed(1)
    },
    setCustom() {
      this.recipeSelection = 'custom'
    },
    setRecipeRatios() {
      // Papa Johns dough
      if (this.recipeSelection === 'papa-johns') {
        this.hydration = 56
        this.oilPercent = 7
        this.saltPercent = 1.75
        this.sugarPercent = 4
        this.recipeYeastType = 'IDY'
        this.yeastPercentType = 'IDY'
        this.recipeYeast = 0.14
        this.yeastPercent = 0.14
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). This dough can be refrigerated for up to 8 days.'
        ]
      }
      // Scott123s Easy New York dough
      if (this.recipeSelection === 'scott123s-easy-new-york') {
        this.hydration = 61
        this.oilPercent = 3
        this.saltPercent = 1.75
        this.sugarPercent = 1
        this.recipeYeastType = 'IDY'
        this.yeastPercentType = 'IDY'
        this.recipeYeast = 0.5
        this.yeastPercent = 0.5
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 2 days.'
        ]
      }
      // Lucali's dough
      if (this.recipeSelection === 'lucalis') {
        this.hydration = 57.5
        this.oilPercent = 1.5
        this.saltPercent = 1.75
        this.sugarPercent = 0
        this.recipeYeastType = 'IDY'
        this.yeastPercentType = 'IDY'
        this.recipeYeast = 0.1
        this.yeastPercent = 0.1
        this.recipeSteps = null
      }
      // Roberta's dough
      if (this.recipeSelection === 'robertas') {
        this.hydration = 57.5
        this.oilPercent = 1.3
        this.saltPercent = 2.61
        this.sugarPercent = 0
        this.recipeYeastType = 'ADY'
        this.yeastPercentType = 'ADY'
        this.recipeYeast = 0.65
        this.yeastPercent = 0.65
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 3-4 hours at room temperature or 8-24 hours in the fridge.'
        ]
      }
      // King Arthur dough
      if (this.recipeSelection === 'king-arthur') {
        this.hydration = 70
        this.oilPercent = 6.9
        this.saltPercent = 1.9
        this.sugarPercent = 0
        this.recipeYeastType = 'ADY'
        this.yeastPercentType = 'ADY'
        this.recipeYeast = 3.2
        this.yeastPercent = 3.2
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 45 minutes at room temperature.',
          'Place the dough balls in the fridge to rise an additional 4-24 hours.'
        ]
      }
    },
    convertYeastAmount() {
      if (this.recipeSelection === 'custom') return false

      if (this.yeastPercentType === 'ADY' && this.recipeYeastType === 'IDY') {
        this.yeastPercent = this.ADYToIDY(this.recipeYeast)
      }
      if (this.yeastPercentType === 'IDY' && this.recipeYeastType === 'ADY') {
        this.yeastPercent = this.IDYToADY(this.recipeYeast)
      }
      if (this.yeastPercentType === 'ADY' && this.recipeYeastType === 'ADV' ||
          this.yeastPercentType === 'IDY' && this.recipeYeastType === 'IDY') {
        this.yeastPercent = this.recipeYeast
      }
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

  #adjustor
    margin-top: 20px

    & > div
      align-items: center
      display: grid
      grid-column-gap: 10px
      grid-template-columns: 1fr auto 9ch auto

      &:not(:first-child)
        margin-top: 20px

      span
        text-align: right

      input
        appearance: none
        border: solid #EAEAEA 1px
        border-radius: 5px
        box-sizing: border-box
        font-size: 1.1em
        max-width: 100%
        padding: 3px 2px
        text-align: center

      button
        background: none
        border: none
        box-sizing: border-box
        color : #C44D58
        font-size: 1.2em
        padding: 0
        &:disabled
          color: lighten(desaturate(#C44D58, 30), 25)

    #yeast-type
      display: grid
      grid-column-gap: 10px
      grid-template-columns: minmax(65px, auto) 10ch
      margin-top: 25px

      select
        border: solid #A0A0A0 1px
        padding: 5px

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