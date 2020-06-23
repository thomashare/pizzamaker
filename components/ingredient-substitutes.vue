<template>
  <div id="ingredient-substitutes">
    <h2>Ingredient Substitutes</h2>

    <div>
      <span>yeast type</span>
      <select v-model="yeastType">
        <option value="ADY">ADY</option>
        <option value="IDY">IDY</option>
        <option value="fresh">fresh</option>
      </select>
    </div>
    
    <div v-if="sugar > 0">
      <span>sugar type</span>
      <select v-model="sugarType">
        <option value="sugar">sugar</option>
        <option value="honey">honey</option>
        <option value="molasses">molasses</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      sugar: state => state.ratios.sugarPercent
    }),
    yeastType: {
      get() {
        return this.$store.state.ingredients.yeastType
      },
      set(val) {
        this.$store.dispatch('ingredients/setYeastType', val)
      }
    },
    recipeYeastType: {
      get() {
        return this.$store.state.ratios.recipeYeastType
      },
      set(val) {
        this.$store.dispatch('ratios/setRecipeYeastType', val)
      }
    },
    sugarType: {
      get() {
        return this.$store.state.ingredients.sugarType
      },
      set(val) {
        this.$store.dispatch('ingredients/setSugarType', val)
      }
    }
  },
  mounted() {
    if (this.$route.query.sugarType !== undefined) this.$store.dispatch('ingredients/setSugarType', this.$route.query.sugarType)
    if (this.$route.query.yeastType !== undefined) this.$store.dispatch('ingredients/setYeastType', this.$route.query.yeastType)
  }
}
</script>

<style lang="stylus" scoped>
  #ingredient-substitutes
    display: flex
    flex-wrap: wrap
    grid-column: 1/-1
    justify-content: center
    margin: 30px auto
    max-width: 500px

    h2
      margin: 0 0 10px
      text-align: center
      width: 100%

    & > div
      &:not(:first-of-type)
        margin-left: 25px

    select
      height: 30px
</style>