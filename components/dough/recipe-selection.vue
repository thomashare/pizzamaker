<template>
  <header class="recipe-selection" id="dough-recipe-selection">    
    <div>
      <label for="dough-recipe"><span class="hidden">dough </span>recipe</label>
      <select id="dough-recipe" v-model="doughRecipeSelection">
        <option value="custom">custom</option>
        <option value="gabriele-bonci">Gabriele Bonci</option>
        <option value="king-arthur">King Arthur</option>
        <option value="lucali">Lucali's</option>
        <option value="mellow-mushroom">Mellow Mushroom</option>
        <option value="papa-johns">Pete-zza's Papa Johns</option>
        <option value="bianco">Pizzeria Bianco</option>
        <option value="roberta">Roberta's</option>
        <option value="roccos">Rocco's Little Chicago</option>
        <option value="scott123s-easy-new-york">Scott123s Easy New York</option>
        <option value="kenjis">Kenji's New York</option>
        <option value="wolfgang-puck">Wolfgang Puck</option>
        <option value="ogdred123">ogdred123's New York</option>
      </select>
    </div>
    
    <MeasureSwitch />
  </header>
</template>

<script>
import { mapState } from 'vuex'
import MeasureSwitch from '@/components/measure-switch.vue'

export default {
  components: {
    MeasureSwitch
  },
  watch: {
    doughRecipeSelection() {
      // custom dough
      if (this.doughRecipeSelection === 'custom') {
        this.$store.commit('ratios/SET_HYDRATION', 65)
        this.$store.commit('ratios/SET_OIL_PERCENT',1.3)
        this.$store.commit('ratios/SET_SALT_PERCENT', 2.61)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.65)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.65)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
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
      // Pizzeria Bianco's dough
      else if (this.doughRecipeSelection === 'bianco') {
        this.$store.commit('ratios/SET_HYDRATION', 73.9)
        this.$store.commit('ratios/SET_OIL_PERCENT', 0)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.78)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 0)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 1)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 1)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.$store.commit('recipe/SET_STEPS', [
          'Combine the yeast and water in a large bowl.',
          'When the yeast has dissolved, stir in 3 cups of the flour, mixing gently until smooth. Slowly add 2 cups more flour, working it in gently. Then add the salt.',
          'Begin kneading the dough until it‘s noticeably easier to handle. Continue until it‘s smooth and stretchy. This should take about 10 minutes.',
          'Shape the dough into a ball and put it in a lightly greased big bowl. Roll the dough around to coat it with oil, then cover the bowl with plastic wrap and let the dough rest in a warm place until it doubles in size, 2 to 2 1/2 hours. When you press the fully proofed dough with your finger, the indentation should remain.',
          'Turn the proofed dough out onto a floured work surface and cut it into 4 pieces. Roll the pieces into balls and dust them with flour. Cover with plastic wrap and let them rest for another hour, or until they have doubled in size.',
          'The dough is ready to be shaped, topped, and baked. If you don’t want to make 4 pizzas at a time, the dough balls can be wrapped well and refrigerated for up 8 hours or frozen for up to 3 weeks; thaw in the refrigerator and let come to room temperature before proceeding.'
        ])
      }
      // Rocco's dough
      else if (this.doughRecipeSelection === 'roccos') {
        this.$store.commit('ratios/SET_HYDRATION', 57.8)
        this.$store.commit('ratios/SET_OIL_PERCENT', 10.7)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.7)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 4.9)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 2.7)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 2.7)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'ADY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'ADY')
        this.$store.commit('recipe/SET_STEPS', [
          'Dissolve the yeast and sugar in the warm water and allow to proof for about 10 minutes.',
          'Mix together the flour and salt in a large mixing bowl. Add the yeast mixture to the flour and stir until ingredients are roughly combined.',
          'Add the oil and mix together. If you‘re kneading by hand, turn the dough out onto a cutting board and knead until fairly smooth, adding flour if dough is overly sticky. If you‘re using a stand mixer, mix about 4 minutes until the dough ball starts to become smooth, adding a little flour if it isn‘t pulling away from the sides.',
          'Form the dough into a ball and place it in a large bowl greased with a small amount of oil.',
          'Sprinkle the top with some flour and then cover with plastic wrap.',
          'Allow the dough to rise slowly in the refrigerator for 8 to 24 hours, or allow it to rise in a warm place for 1 to 2 hours. The cold-rise method yields a better product with a finer texture and flavor, but sometimes you just want to eat a pizza!'
        ])
      }

      // Kenji's dough
      else if (this.doughRecipeSelection === 'kenjis') {
        this.$store.commit('ratios/SET_HYDRATION', 66)
        this.$store.commit('ratios/SET_OIL_PERCENT', 5.1)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.59)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 2.38)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 1.59)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 1.59)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [
          'Combine flour, sugar, salt, and yeast in a bowl. Mix the ingredients to combine.',
          'Add the lukewarm water. Once fully incorporated, add in the oil.',
          'Let the dough rest for 30 minutes and then knead the dough for 5 minutes.',
          'Form your dough balls and refrigerate them for 24 hours.'
        ])
      }

      // ogdred123's dough
      else if (this.doughRecipeSelection === 'ogdred123') {
        this.$store.commit('ratios/SET_HYDRATION', 57)
        this.$store.commit('ratios/SET_OIL_PERCENT', 0)
        this.$store.commit('ratios/SET_SALT_PERCENT', 1.75)
        this.$store.commit('ratios/SET_SUGAR_PERCENT', 2)
        this.$store.commit('ingredients/SET_SUGAR_TYPE', 'sugar')
        this.$store.commit('ratios/SET_YEAST_PERCENT', 0.4)
        this.$store.commit('ratios/SET_RECIPE_YEAST_PERCENT', 0.4)
        this.$store.commit('ingredients/SET_YEAST_TYPE', 'IDY')
        this.$store.commit('ingredients/SET_RECIPE_YEAST_TYPE', 'IDY')
        this.$store.commit('recipe/SET_STEPS', [
          'Mix all of the ingredients in a large bowl until combined.',
          'Let the dough rest for 10 minutes.',
          'Knead in the bowl for 5 minutes.',
          'let the dough rest for another 5 to 10 minutes.',
          'Finish kneading for another 5 minutes.',
          'Form two tight round balls and store them in lightly-oiled, round containers.',
          'Put them in the fridge for at least 24 hours or up to 5 days.',
          'Take the dough balls out 1 to 2 hours before stretching.'
        ])
      }

      // overwrite recipe values if certain query params are set.
      if (this.$route.query.sugarType !== undefined) this.$store.dispatch('ingredients/setSugarType', this.$route.query.sugarType)
      if (this.$route.query.yeastType !== undefined) this.$store.dispatch('ingredients/setYeastType', this.$route.query.yeastType)
    }
  },
  computed: {
    ...mapState({
      sauceRecipeSelection: state => state.sauce_recipe.selection
    }),
    doughRecipeSelection: {
      get() {
        return this.$store.state.recipe.selection
      },
      set(val) {
        this.$store.commit('recipe/SET_SELECTION', val)

        if (this.doughRecipeSelection !== 'custom') {
          this.$router.push({ path: this.$route.path, query: { dough: val } })

          if (this.sauceRecipeSelection !== 'custom') {
            this.$router.push({ path: this.$route.fullPath, query: { sauce: this.sauceRecipeSelection } })
          }
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.dough !== undefined) this.$store.commit('recipe/SET_SELECTION', this.$route.query.dough)
  }
}
</script>