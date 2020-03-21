<template>
  <div id="ingredients">
    <header>
      <h2>Ingredients</h2>
      <button id="print" v-if="!showPrintDialog" @click="showPrintDialog = !showPrintDialog"><i class="gg-list"></i></button>
      <button id="close" v-else @click="showPrintDialog = !showPrintDialog"><i class="gg-close"></i></button>
    </header>
    <ul>
      <li v-if="flour > 0"><span class="ingredient">flour:</span>{{ flour }}g</li>
      <li v-if="oil > 0"><span class="ingredient">oil:</span>{{ oil }}g</li>
      <li v-if="salt > 0"><span class="ingredient">salt:</span>{{ salt }}g</li>
      <li v-if="sugar > 0"><span class="ingredient">{{ sugarType }}:</span>{{ sugar }}g</li>
      <li v-if="water > 0"><span class="ingredient">water</span>{{ water }}g</li>
      <li v-if="yeast > 0"><span class="ingredient">{{ yeastType }} yeast:</span>{{ yeast }}g</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
      recipeYeastType: state => state.ingredients.recipeYeastType,
    }),
    flour() {
      // if measureSwitch is set to diameter, calculate by diameter measurement
      if (this.measureSwitch === 'diameter') {
        const diameter = Math.PI * (this.size/5 + this.size/5)
        return this.finalVal((diameter * this.crustThickness * this.count) * 21)
      }

      // else if measureSwitch is set to weight, calculate flour by weight.
      const totalIngredientPercentages = 100 + this.hydration + this.oilPercent + this.saltPercent + this.sugarPercent + this.yeastPercent
      const flourWeight = this.finalVal((this.$store.state.sizing.doughBallWeight / (totalIngredientPercentages/100)) * this.count)

      // if the return value is NaN, return 0
      if (flourWeight === 'NaN') return 0

      return flourWeight
    },
    oil() {
      return this.finalVal(this.flour * (this.oilPercent / 100))
    },
    salt() {
      return this.finalVal(this.flour * (this.saltPercent / 100))
    },
    sugar() {
      // if sugarType is molasses, convert the sugar percentage to grams of molasses
      if (this.sugarType === 'molasses') {
        return this.finalVal((this.flour * (this.sugarPercent / 100) * 1.33))
      }
      // if sugarType is honey, convert the sugar percentage to grams of honey
      else if (this.sugarType === 'honey') {
        return this.finalVal((this.flour * (this.sugarPercent / 100) * 0.66))
      }
      else return this.finalVal(this.flour * (this.sugarPercent / 100))
    },
    yeast() {
      const value = this.flour * (this.yeastPercent / 100)

      // ADY to IDY conversion
      if (this.yeastType === 'ADY' && this.recipeYeastType === 'IDY') {
        return this.finalVal(this.ADYToIDY(value))
      }
      
      // IDY to ADY conversion
      else if (this.yeastType === 'IDY' && this.recipeYeastType === 'ADY') {
        return this.finalVal(this.IDYToADY(value))
      }

      // fresh to ADY conversion
      else if (this.yeastType === 'fresh' && this.recipeYeastType === 'ADY') {
        return this.finalVal(this.freshToADY(value))
      }

      // fresh to IDY conversion
      else if (this.yeastType === 'fresh' && this.recipeYeastType === 'IDY') {
        return this.finalVal(this.freshToIDY(value))
      }

      else return this.finalVal(value)
    },
    water() {
      return this.finalVal(this.flour * (this.hydration / 100))
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
    finalVal(val) {
      const newVal = parseFloat(val).toFixed(1)

      if (newVal.split('.')[1] <= 0) return newVal.split('.')[0]
      else return newVal
    },
    ADYToIDY(amount) {
      return amount += amount*0.75
    },
    IDYToADY(amount) {
      return amount -= amount*0.75
    },
    freshToADY(amount) {
      return amount / 0.4
    },
    freshToIDY(amount) {
      return amount / 0.33
    },
    ADYToFresh(amount) {
      return amount * 0.4
    },
    IDYToFresh(amount) {
      return amount * 0.33
    }
  }
}
</script>

<style lang="stylus" scoped>
  #ingredients
    font-size: 1.25em
    margin: auto auto 25px auto

    @media screen and (min-width: 560px)
      grid-column: 2
      grid-row: 1

    header
      display: flex
      justify-content: left
      margin-bottom: 10px

      h2
        color: #f73859
        font-weight: 400
        margin: 0

      #print
        background: none
        border: none
        color: #384259
        margin-left: 5px

        .gg-list
          box-sizing: border-box
          position: relative
          display: block
          transform: scale(1.2)
          width: 22px
          height: 20px
          border: 2px solid
          border-radius: 3px
          &::after, &::before
            content: ''
            display: block
            box-sizing: border-box
            position: absolute
            width: 2px
            height: 2px
            background: currentColor
            top: 3px
            left: 3px
            box-shadow:
                0 4px 0,
                0 8px 0
          &::after
            border-radius: 3px
            width: 8px
            left: 7px
            
      #close
        background: none
        border: none

        .gg-close
          box-sizing: border-box
          position: relative
          display: block
          transform: scale(var(--ggs,1))
          width: 22px
          height: 22px
          border: 2px solid transparent
          border-radius: 40px

          &::after, &::before
            content: ''
            display: block
            box-sizing: border-box
            position: absolute
            width: 16px
            height: 2px
            background: currentColor
            transform: rotate(45deg)
            border-radius: 5px
            top: 8px
            left: 1px

          &::after
            transform: rotate(-45deg)

    ul
      font-size: 1.1em
      margin: 0 0 0 10px
      padding: 0 0 0 16px

      li
        &:not(:first-child)
          margin-top: 8px

        .ingredient
          color: darken(#7ac7c4, 20)
          margin-right: 10px
</style>