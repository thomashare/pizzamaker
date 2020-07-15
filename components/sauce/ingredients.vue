<template>
  <div class="ingredients" id="sauce-ingredients">
    <header>
      <h2 id="dialog-title">Sauce Ingredients</h2>
      <button aria-label="expand sauce ingredients full screen" id="print" v-if="!showPrintDialog" @click="$store.dispatch('interactive/setPrintDialog', 'sauce-ingredients')"><i class="gg-maximize"></i></button>
      <button aria-label="close" id="close" tabindex="1" v-else @click="showPrintDialog = !showPrintDialog" @keydown.esc="showPrintDialog = !showPrintDialog"><i class="gg-close"></i></button>
    </header>
    <ul>
      <li v-if="basilSprigCount > 0"><span class="ingredient">basil sprigs:</span>{{ basilSprigCount }}</li>
      <li v-if="dryOregano > 0"><span class="ingredient">dry oregano:</span>{{ dryOregano }}g</li>
      <li v-if="freshBasil > 0"><span class="ingredient">fresh basil:</span>{{ freshBasil }}g</li>
      <li v-if="freshOregano > 0"><span class="ingredient">fresh oregano:</span>{{ freshOregano }}g</li>
      <li v-if="garlic > 0"><span class="ingredient">garlic:</span>{{ garlic }}g</li>
      <li v-if="oil > 0"><span class="ingredient">oil:</span>{{ oil }}g</li>
      <li v-if="pepper > 0"><span class="ingredient">pepper:</span>{{ pepper }}g</li>
      <li v-if="redPepperFlakes > 0"><span class="ingredient">red pepper flakes:</span>{{ redPepperFlakes }}g</li>
      <li v-if="salt > 0"><span class="ingredient">salt:</span>{{ salt }}g</li>
      <li v-if="sugar > 0"><span class="ingredient">sugar:</span>{{ sugar }}g</li>
      <li v-if="amount > 0"><span class="ingredient">tomato:</span>{{ amount }}oz</li>
      <li v-if="unsaltedButter > 0"><span class="ingredient">unsalted butter:</span>{{ unsaltedButter }}g</li>
      <li v-if="yellowOnionCount > 0"><span class="ingredient">yellow onions:</span>{{ yellowOnionCount }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      amount: state => state.sauce_recipe.amount,
      saltPercent: state => state.sauce_recipe.saltPercent,
      oilPercent: state => state.sauce_recipe.oilPercent,
      pepperPercent: state => state.sauce_recipe.pepperPercent,
      freshBasilPercent: state => state.sauce_recipe.freshBasilPercent,
      basilSprigCount: state => state.sauce_recipe.basilSprigCount,
      garlicPercent: state => state.sauce_recipe.garlicPercent,
      freshOreganoPercent: state => state.sauce_recipe.freshOreganoPercent,
      dryOreganoPercent: state => state.sauce_recipe.dryOreganoPercent,
      sugarPercent: state => state.sauce_recipe.sugarPercent,
      redPepperFlakesPercent: state => state.sauce_recipe.redPepperFlakesPercent,
      unsaltedButterPercent: state => state.sauce_recipe.unsaltedButterPercent,
      yellowOnionCount: state => state.sauce_recipe.yellowOnionCount
    }),
    amountGrams() {
      return this.amount * 28.3495
    },
    unsaltedButter() {
      return this.finalVal(this.unsaltedButterPercent * this.amountGrams / 100)
    },
    salt() {
      return this.finalVal(this.saltPercent * this.amountGrams / 100)
    },
    oil() {
      return this.finalVal(this.oilPercent * this.amountGrams / 100)
    },
    pepper() {
      return this.finalVal(this.pepperPercent * this.amountGrams / 100)
    },
    freshBasil() {
      return this.finalVal(this.freshBasilPercent * this.amountGrams / 100)
    },
    basilSprigs() {
      return this.finalVal(this.basilSprigsCount * this.amountGrams / 100)
    },
    garlic() {
      return this.finalVal(this.garlicPercent * this.amountGrams / 100)
    },
    freshOregano() {
      return this.finalVal(this.freshOreganoPercent * this.amountGrams / 100)
    },
    dryOregano() {
      return this.finalVal(this.dryOreganoPercent * this.amountGrams / 100)
    },
    sugar() {
      return this.finalVal(this.sugarPercent * this.amountGrams / 100)
    },
    butter() {
      return this.finalVal(this.butterPercent * this.amountGrams / 100)
    },
    redPepperFlakes() {
      return this.finalVal(this.redPepperFlakesPercent * this.amountGrams / 100)
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
    }
  }
}
</script>