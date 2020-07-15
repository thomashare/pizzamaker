<template>
  <div class="ingredients" id="dough-ingredients">
    <header>
      <h2 id="dialog-title">Dough Ingredients</h2>
      <button aria-label="expand dough ingredients full screen" id="print" v-if="!showPrintDialog" @click="$store.dispatch('interactive/setPrintDialog', 'dough-ingredients')"><i class="gg-maximize"></i></button>
      <button aria-label="close" id="close" tabindex="1" v-else @click="showPrintDialog = !showPrintDialog" @keydown.esc="showPrintDialog = !showPrintDialog"><i class="gg-close"></i></button>
    </header>
    <ul>
      <li v-if="flour > 0"><span class="ingredient">flour:</span>{{ flour }}g</li>
      <li v-if="oil > 0"><span class="ingredient">oil:</span>{{ oil }}g</li>
      <li v-if="salt > 0"><span class="ingredient">salt:</span>{{ salt }}g</li>
      <li v-if="sugar > 0"><span class="ingredient">{{ sugarType }}:</span>{{ sugar }}g</li>
      <li v-if="water > 0"><span class="ingredient">water:</span>{{ water }}g</li>
      <li v-if="yeast > 0"><span class="ingredient">{{ yeastType }} yeast:</span>{{ yeast }}g</li>
    </ul>
    <p id="weight">dough ball weight: <span>{{ finalVal(flour/count + oil/count + salt/count + sugar/count + water/count + yeast/count) }}g</span></p>
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

      else {
        return this.finalVal(this.flour * (this.yeastPercent / 100))
      }
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
      else return parseFloat(newVal)
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