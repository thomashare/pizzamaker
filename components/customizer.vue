<template>
  <div id="customize">
    <span class="ingredient">salt</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="saltPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">sugar</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="sugarPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">oil</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="oilPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">yeast</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="yeastPercent" @change="setCustom()">
    <span>%</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      recipe: state => state.recipe.selection,
      sauceRecipeSelection: state => state.sauce_recipe.selection,
      sugarType: state => state.ingredients.sugarType,
      yeastType: state => state.ingredients.yeastType
    }),
    saltPercent: {
      get() {
        return this.$store.state.ratios.saltPercent
      },
      set(val) {
        this.$store.dispatch('ratios/setSaltPercent', val)
      }
    },
    sugarPercent: {
      get() {
        return this.$store.state.ratios.sugarPercent
      },
      set(val) {
        this.$store.dispatch('ratios/setSugarPercent', val)
      }
    },
    oilPercent: {
      get() {
        return this.$store.state.ratios.oilPercent
      },
      set(val) {
        this.$store.dispatch('ratios/setOilPercent', val)
      }
    },
    yeastPercent: {
      get() {
        return this.$store.state.ratios.yeastPercent
      },
      set(val) {
        this.$store.dispatch('ratios/setYeastPercent', val)
      }
    }
  },
  mounted() {
    this.setQueryParams()
  },
  methods: {
    setQueryParams() {
      // Salt percent
      if (this.$route.query.salt !== undefined) this.$store.dispatch('ratios/setSaltPercent', this.$route.query.salt)

      // Sugar percent
      if (this.$route.query.sugar !== undefined) this.$store.dispatch('ratios/setSugarPercent', this.$route.query.sugar)

      // Oil percent
      if (this.$route.query.oil !== undefined) this.$store.dispatch('ratios/setOilPercent', this.$route.query.oil)

      // Salt percent
      if (this.$route.query.yeast !== undefined) this.$store.dispatch('ratios/setYeastPercent', this.$route.query.yeast)
    },
    updateQueryParams() {
      this.$router.push({
        path: this.$route.fullPath,
        query: {
          salt: this.saltPercent,
          sugar: this.sugarPercent,
          oil: this.oilPercent,
          yeast: this.yeastPercent,
        }
      })
    },
    setCustom() {
      this.$store.commit('recipe/SET_SELECTION', 'custom')

      this.updateQueryParams()
      this.setQueryParams()
    }
  }
}
</script>

<style lang="stylus" scoped>
  #customize
    align-items: center
    display: grid
    grid-column-gap: 8px
    grid-row-gap: 8px
    grid-template-columns: 1fr 8ch 1fr

    .ingredient
      text-align: right

    .value
      appearance: none
      border: solid #DDDDDD 1px
      border-radius: 3px
      padding: 3px
      text-align: center
</style>