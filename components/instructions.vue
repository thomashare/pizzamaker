<template>
  <div id="instructions" v-if="hasRecipe">
    <h2>Instructions</h2>
    <ol>
      <li v-for="(step, n) in recipeSteps" :key="n">{{ step }}</li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      recipeSteps: state => state.recipe.steps
    }),
    hasRecipe() {
      if (this.recipeSteps === undefined || this.recipeSteps !== undefined && this.recipeSteps.length === 0 ) return false
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
  #instructions
    h2
      margin: 0

    ol
      background-color: #F4F4F4
      border: solid #EDEDED 1px
      border-radius: 5px
      margin: 12px 0 0
      padding: 15px 15px 15px 30px

      li:not(:first-child)
        margin-top: 12px
</style>