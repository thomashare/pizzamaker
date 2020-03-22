<template>
  <div id="recipe-selection">
    <span>recipe</span>
    <select v-model="recipeSelection">
      <option value="custom">custom</option>
      <option value="papa-johns">Pete-zza's Papa Johns</option>
      <option value="scott123s-easy-new-york">Scott123s Easy New York</option>
      <option value="mellow-mushroom">Mellow Mushroom</option>
      <option value="lucalis">Lucali's</option>
      <option value="robertas">Roberta's</option>
      <option value="king-arthur">King Arthur</option>
    </select>
  </div>
</template>

<script>
export default {
  watch: {
    recipeSelection() {
      // custom dough
      if (this.recipeSelection === 'custom') {
        this.$store.commit('ratios/SET_HYDRATION', 56)
        this.$store.commit('ratios/SET_OIL_PERCENT', 7)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 4)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.14)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.14)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [])
      }
      // Papa Johns dough
      else if (this.recipeSelection === 'papa-johns') {
        this.$store.commit('ratios/SET_HYDRATION', 56)
        this.$store.commit('ratios/SET_OIL_PERCENT', 7)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 4)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.14)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.14)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). This dough can be refrigerated for up to 8 days.'
        ])
      }
      // Scott123s Easy New York dough
      else if (this.recipeSelection === 'scott123s-easy-new-york') {
        this.$store.commit('ratios/SET_HYDRATION', 63)
        this.$store.commit('ratios/SET_OIL_PERCENT', 3)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 1)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.5)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.5)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 2 days.'
        ])
      }
      // Mellow Mushroom dough
      else if (this.recipeSelection === 'mellow-mushroom') {
        this.$store.commit('ratios/SET_HYDRATION', 56)
        this.$store.commit('ratios/SET_OIL_PERCENT', 7)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 7.14)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'molasses')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.14)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.14)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). This dough can be refrigerated for up to 8 days.',
          'After preparing the pizza crust base, brush it with olive oil. Then add your sauce and toppings.',
          'Sprinkle grated parmesan cheese over the pizza before serving.'
        ])
      }
      // Lucali's dough
      else if (this.recipeSelection === 'lucalis') {
        this.$store.commit('ratios/SET_HYDRATION', 57.5)
        this.$store.commit('ratios/SET_OIL_PERCENT', 1.5)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.1)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.1)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 3-4 hours at room temperature or 8-24 hours in the fridge.',
          'Roll out the pizza crust using a wine bottle (if possible) or a rolling pin.',
          'After preparing the pizza crust base, add your sauce and toppings.',
          'Sprinkle grated parmigiano reggiano cheese over the pizza.',
          'Place fresh basil leaves around the pizza before serving.'
        ])
      }
      // Roberta's dough
      else if (this.recipeSelection === 'robertas') {
        this.$store.commit('ratios/SET_HYDRATION', 57.5)
        this.$store.commit('ratios/SET_OIL_PERCENT', 1.3)
        this.$store.commit('ratios/SET_SALT_PERCENT', 2.61)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.65)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.65)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 3-4 hours at room temperature or 8-24 hours in the fridge.'
        ])
      }
      // King Arthur dough
      else if (this.recipeSelection === 'king-arthur') {
        this.$store.commit('ratios/SET_HYDRATION', 70)
        this.$store.commit('ratios/SET_OIL_PERCENT', 6.9)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.9)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 3.2)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 3.2)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 45 minutes at room temperature.',
          'Place the dough balls in the fridge to rise an additional 4-24 hours.'
        ])
      }
    }
  },
  computed: {
    recipeSelection: {
      get() {
        return this.$store.state.recipe.selection
      },
      set(val) {
        this.$store.commit('recipe/SET_SELECTION', val)
        
        this.$router.push({ path: this.$route.path, query: { recipe: this.recipeSelection } })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #recipe-selection
    align-items: center
    display: flex

    span
      margin-right: 10px

    select
      display: block
      height: 35px
      max-width: 120px
</style>