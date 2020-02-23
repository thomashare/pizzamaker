<template>
  <div id="app">
    <h1>Pizza Maker</h1>

    <select id="recipe-selection" v-model="recipeSelection">
      <option value="custom">custom</option>
      <option value="papa-johns">Pete-zza's Papa Johns</option>
      <option value="scott123s-easy-new-york">Scott123s Easy New York</option>
      <option value="lucalis">Lucali's</option>
      <option value="robertas">Roberta's</option>
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
          <button @click.prevent="--size" :disabled="size <= 4"><i class="fas fa-minus-circle"></i></button>
          <input max="50" min="4" type="number" v-model="size">
          <button @click.prevent="++size" :disabled="size >= 50"><i class="fas fa-plus-circle"></i></button>
        </div>
        <div>
          <span>hydration</span>
          <button @click.prevent="--hydration && setCustom()"><i class="fas fa-minus-circle"></i></button>
          <input type="number" v-model="hydration" @change="setCustom()">
          <button @click.prevent="++hydration && setCustom()"><i class="fas fa-plus-circle"></i></button>
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
          <li>{{ flour*count*size }}g flour</li>
          <li>{{ finalVal(oil*(flour*count*size)/100) }} oil</li>
          <li>{{ finalVal(salt*(flour*count*size)/100) }} salt</li>
          <li>{{ finalVal(sugar*(flour*count*size)/100) }} sugar</li>
          <li>{{ finalVal(hydration*(flour*count*size)/100) }} water</li>
          <li>{{ finalVal(yeast*(flour*count*size)/100) }} yeast {{ yeastType }}</li>
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
      count: 2,
      flour: 12.75,
      hydration: 56,
      oil: 7,
      recipeSelection: 'custom',
      salt: 1.75,
      size: 12,
      sugar: 4,
      yeast: 0.14,
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
    hydration() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { hydration: this.hydration } })
      }, 1000)
    },
    oil() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { oil: this.oil } })
      }, 1000)
    },
    salt() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { salt: this.salt } })
      }, 1000)
    },
    sugar() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { sugar: this.sugar } })
      }, 1000)
    },
    yeast() {
      setTimeout(() => {
        if (this.recipeSelection !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { yeast: this.yeast, yeastType: this.yeastType } })
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
    shareURL() {
      return location.origin+this.$route.fullPath.slice(1,this.$route.fullPath.length)
    },
    water() {
      return (this.flour*this.count*this.size)*this.hydration/100
    }
  },
  mounted() {
    if (this.$route.query.count !== undefined) this.count = this.$route.query.count
    if (this.$route.query.hydration !== undefined) this.hydration = this.$route.query.hydration
    if (this.$route.query.oil !== undefined) this.oil = this.$route.query.oil
    if (this.$route.query.salt !== undefined) this.salt = this.$route.query.salt
    if (this.$route.query.size !== undefined) this.size = this.$route.query.size
    if (this.$route.query.sugar !== undefined) this.size = this.$route.query.sugar
    if (this.$route.query.yeast !== undefined) this.yeast = this.$route.query.yeast
    if (this.$route.query.yeastType !== undefined) this.yeastType = this.$route.query.yeastType
  },
	methods: {
		finalVal(val) {
      if (val === 0) return 'no'
			else return parseFloat(val).toFixed(1)+'g'
    },
    setCustom() {
      this.recipeSelection = 'custom'
    },
    setRecipeRatios() {
      // Papa Johns dough
      if (this.recipeSelection === 'papa-johns') {
        this.hydration = 56
        this.oil = 7
        this.salt = 1.75
        this.sugar = 4
        this.recipeYeastType = 'IDY'
        this.yeastType = 'IDY'
        this.recipeYeast = 0.14
        this.yeast = 0.14
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). This dough can be refrigerated for up to 8 days.'
        ]
      }
      // Scott123s Easy New York dough
      if (this.recipeSelection === 'scott123s-easy-new-york') {
        this.hydration = 61
        this.oil = 3
        this.salt = 1.75
        this.sugar = 1
        this.recipeYeastType = 'IDY'
        this.yeastType = 'IDY'
        this.recipeYeast = 0.5
        this.yeast = 0.5
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 2 days.'
        ]
      }
      // Lucali's dough
      if (this.recipeSelection === 'lucalis') {
        this.hydration = 57.5
        this.oil = 1.5
        this.salt = 1.75
        this.sugar = 0
        this.recipeYeastType = 'IDY'
        this.yeastType = 'IDY'
        this.recipeYeast = 0.1
        this.yeast = 0.1
        this.recipeSteps = null
      }
      // Roberta's dough
      if (this.recipeSelection === 'robertas') {
        this.hydration = 57.5
        this.oil = 1.3
        this.salt = 2.61
        this.sugar = 0
        this.recipeYeastType = 'ADY'
        this.yeastType = 'ADY'
        this.recipeYeast = 0.65
        this.yeast = 0.65
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 3-4 hours at room temperature or 8-24 hours in the fridge.'
        ]
      }
    },
    convertYeastAmount() {
      if (this.recipeSelection === 'custom') return false

      if (this.yeastType === 'ADY' && this.recipeYeastType === 'IDY') {
        this.yeast = this.ADYToIDY(this.recipeYeast)
      }
      if (this.yeastType === 'IDY' && this.recipeYeastType === 'ADY') {
        this.yeast = this.IDYToADY(this.recipeYeast)
      }
      if (this.yeastType === 'ADY' && this.recipeYeastType === 'ADV' ||
          this.yeastType === 'IDY' && this.recipeYeastType === 'IDY') {
        this.yeast = this.recipeYeast
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
    margin: 8px 0 0
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

    #yeast-type
      display: grid
      grid-column-gap: 10px
      grid-template-columns: minmax(65px, auto) 10ch

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