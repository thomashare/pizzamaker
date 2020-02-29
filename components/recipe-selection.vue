<template>
  <select id="recipe-selection" v-model="recipeSelection">
      <option value="custom">custom</option>
      <option value="papa-johns">Pete-zza's Papa Johns</option>
      <option value="scott123s-easy-new-york">Scott123s Easy New York</option>
      <option value="mellow-mushroom">Mellow Mushroom</option>
      <option value="lucalis">Lucali's</option>
      <option value="robertas">Roberta's</option>
      <option value="king-arthur">King Arthur</option>
    </select>
</template>

<script>
export default {
  data() {
    return {
      recipeSelection: 'custom'
    }
  },
  watch: {
    recipeSelection() {
      if (this.recipeSelection === 'custom') this.recipeSteps = null

      this.$router.push({ path: this.$route.path, query: { recipe: this.recipeSelection } })
      this.setRecipeRatios()
    }
  },
  methods: {
    setRecipeRatios() {
      // Papa Johns dough
      if (this.recipeSelection === 'papa-johns') {
        this.$store.commit('ratios/SET_HYDRATION', 56)
        this.$store.commit('ratios/SET_OIL_PERCENT', 7)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 4)
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.14)
        this.$store.commit('ratios/SET_RECIPE_YEAST', 0.14)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). This dough can be refrigerated for up to 8 days.'
        ]
      }
      // Scott123s Easy New York dough
      if (this.recipeSelection === 'scott123s-easy-new-york') {
        this.$store.commit('ratios/SET_HYDRATION', 63)
        this.$store.commit('ratios/SET_OIL_PERCENT', 3)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 1)
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.5)
        this.$store.commit('ratios/SET_RECIPE_YEAST', 0.5)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 2 days.'
        ]
      }
      // Mellow Mushroom dough
      if (this.recipeSelection === 'mellow-mushroom') {
        this.$store.commit('ratios/SET_HYDRATION', 56)
        this.$store.commit('ratios/SET_OIL_PERCENT', 7)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 8.84)
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.14)
        this.$store.commit('ratios/SET_RECIPE_YEAST', 0.14)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.sugarType = 'molasses'
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). This dough can be refrigerated for up to 8 days.'
        ]
      }
      // Lucali's dough
      if (this.recipeSelection === 'lucalis') {
        this.$store.commit('ratios/SET_HYDRATION', 57.5)
        this.$store.commit('ratios/SET_OIL_PERCENT', 1.5)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.1)
        this.$store.commit('ratios/SET_RECIPE_YEAST', 0.1)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.recipeSteps = null
      }
      // Roberta's dough
      if (this.recipeSelection === 'robertas') {
        this.$store.commit('ratios/SET_HYDRATION', 57.5)
        this.$store.commit('ratios/SET_OIL_PERCENT', 1.3)
        this.$store.commit('ratios/SET_SALT_PERCENT', 2.61)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.65)
        this.$store.commit('ratios/SET_RECIPE_YEAST', 0.65)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 3-4 hours at room temperature or 8-24 hours in the fridge.'
        ]
      }
      // King Arthur dough
      if (this.recipeSelection === 'king-arthur') {
        this.$store.commit('ratios/SET_HYDRATION', 70)
        this.$store.commit('ratios/SET_OIL_PERCENT', 6.9)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.9)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ratios/SET_YEAST_PERCENT', 3.2)
        this.$store.commit('ratios/SET_RECIPE_YEAST', 3.2)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.recipeSteps = [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 45 minutes at room temperature.',
          'Place the dough balls in the fridge to rise an additional 4-24 hours.'
        ]
      }
    }
  }
}
</script>

<style>

</style>