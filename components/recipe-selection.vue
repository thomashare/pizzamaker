<template>
  <div id="dough-recipe-selection">
    <span>dough</span>
    <select v-model="doughRecipeSelection">
      <option value="custom">custom</option>
      <option value="papa-johns">Pete-zza's Papa Johns</option>
      <option value="scott123s-easy-new-york">Scott123s Easy New York</option>
      <option value="mellow-mushroom">Mellow Mushroom</option>
      <option value="lucali">Lucali</option>
      <option value="roberta">Roberta</option>
      <option value="king-arthur">King Arthur</option>
      <option value="wolfgang-puck">Wolfgang Puck</option>
      <option value="gabriele-bonci">Gabriele Bonci</option>
    </select>
  </div>
</template>

<script>
export default {
  watch: {
    doughRecipeSelection() {
      // custom dough
      if (this.doughRecipeSelection === 'custom') {
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
      else if (this.doughRecipeSelection === 'papa-johns') {
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
          'Stir the ingredients with a metal spoon until it\'s too stiff to stir.',
          'Knead by hand or by machine until the dough is just about smooth (3-6 minutes).',
          'Form your dough balls and place them in lightly oiled, large round disposable covered containers.',
          'Refrigerate your dough balls for 3-5 days (5 days being optimal). (This dough can be refrigerated for up to 8 days).',
          'Remove from fridge 3 hours before baking.'
        ])
      }
      // Scott123s Easy New York dough
      else if (this.doughRecipeSelection === 'scott123s-easy-new-york') {
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
      else if (this.doughRecipeSelection === 'mellow-mushroom') {
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
      else if (this.doughRecipeSelection === 'lucali') {
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
      else if (this.doughRecipeSelection === 'roberta') {
        this.$store.commit('ratios/SET_HYDRATION', 65)
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
      else if (this.doughRecipeSelection === 'king-arthur') {
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
      // Wolfgang Pucks dough
      else if (this.doughRecipeSelection === 'wolfgang-puck') {
        this.$store.commit('ratios/SET_HYDRATION', 62)
        this.$store.commit('ratios/SET_OIL_PERCENT', 3.5)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.5)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 1.3)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'honey')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 1.8)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 1.8)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.$store.commit('recipe/SET_STEPS', [
          'Knead and shape your dough balls.',
          'Let the dough balls rise 45 minutes at room temperature.',
          'Place the dough balls in the fridge to rise an additional 4-24 hours.'
        ])
      }
      // Gabriele Bonci's dough
      else if (this.doughRecipeSelection === 'gabriele-bonci') {
        this.$store.commit('ratios/SET_HYDRATION', 70)
        this.$store.commit('ratios/SET_OIL_PERCENT', 4)
        this.$store.commit('ratios/SET_SALT_PERCENT', 2)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.7)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.7)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.$store.commit('recipe/SET_STEPS', [
          'Mix the flour, yeast and water in a large bowl, using a spoon. When it is almost mixed, and the lumps are mostly gone, add the salt, and then the oil. It will seem very wet. Don’t be scared. The wetter the dough, the better.',
          'Flip it out onto a lightly floured surface and knead it gently by folding the dough in half, over itself, towards you. Grab the dough by the two corners facing you, and pick it up like an envelope, and turn it 90 degrees, and place it back on the floured board. Repeat this motion a few times, without really kneading the bread. Fold and turn, fold and turn. It will seem very sticky at first, but when you get the hang of it, it gets easier.',
          'Place the dough back in a lightly oiled bowl and let it rest another 15 minutes. Do this 2 or 3 more times. This is the step that Bonci calls “regenerating the dough”. Don’t over knead. In fact, don’t knead at all. By the 3rd time the dough will be springy and not sticky.',
          'When this is done, measure and form your dough balls.',
          'Place the dough balls on a tray or container and cover very tightly to rise in the fridge for 24 hours.',
          'Finally, take the dough balls out of the fridge and let them come to room temperature for 3 hours before forming your crust.'
        ])
      }
    }
  },
  computed: {
    doughRecipeSelection: {
      get() {
        return this.$store.state.recipe.selection
      },
      set(val) {
        this.$store.commit('recipe/SET_SELECTION', val)
        
        this.$router.push({ path: this.$route.path, query: { dough: this.doughRecipeSelection } })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #dough-recipe-selection
    align-items: center
    display: flex

    span
      margin-right: 10px

    select
      display: block
      height: 35px
      
      @media screen and (max-width: 500px)
        max-width: 120px
</style>