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
    <div>
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
      recipe: state => state.recipe.selection,
      recipeYeastType: state => state.ingredients.recipeYeastType,
      recipeYeastPercent: state => state.ratios.recipeYeastPercent,
      yeastType: state => state.ingredients.yeastType
    }),
    yeastType: {
      get() {
        return this.$store.state.ingredients.yeastType
      },
      set(val) {
        this.$store.commit('ingredients/SET_YEAST_TYPE', val)

        if (this.recipe !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { yeastType: this.yeastType } })
      }
    },
    recipeYeastType: {
      get() {
        return this.$store.state.ratios.recipeYeastType
      },
      set(val) {
        this.$store.commit('ratios/SET_RECIPE_YEAST_TYPE', val)
      }
    },
    sugarType: {
      get() {
        return this.$store.state.ingredients.sugarType
      },
      set(val) {
        this.$store.commit('ingredients/SET_SUGAR_TYPE', val)
        
        this.$router.push({ path: this.$route.fullPath, query: { sugarType: this.sugarType } })
      }
    }
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
      margin: 0 0 20px
      text-align: center
      width: 100%

    & > div
      &:not(:first-of-type)
        margin-left: 25px
</style>