<template>
  <header class="recipe-selection" id="sauce-recipe-selection">
    <div id="sauce">
      <label for="sauce-recipe">recipe</label>
      <select id="sauce-recipe" v-model="sauceRecipeSelection">
        <option value="custom">custom</option>
        <option value="chef-john">Chef John</option>
        <option value="kenjis">Kenji's New York Style</option>
        <option value="lucalis">Lucali's</option>
      </select>
    </div>

    <div id="amount">
      <label for="sauce-amount">amount</label>
      <input id="sauce-amount" inputMode="decimal" max="10000" min="4" type="number" v-model="amount">
      <span>oz</span>
    </div>

    <ModeSwitch v-if="sauceRecipe !== 'custom'" />
  </header>
</template>

<script>
import { mapState } from 'vuex'
import ModeSwitch from '@/components/mode-switch.vue'

export default {
  components: {
    ModeSwitch,
  },
  watch: {
    amount() {
      // on amount change, update the recipe instructions depending on the desired amount.
      // Chef John recipe
      if (this.sauceRecipeSelection === 'chef-john') {
        this.$store.commit('sauce_recipe/SET_STEPS', [
          'Heat the olive oil over medium-low heat in a saucepan.',
          `Optionally stir ${ (this.amount/14 < 1) ? 1 : Math.round(this.amount/14) } anchovy ${ (this.amount/14 > 1) ? 'fillets' : 'fillet' } into the olive oil and cook, stirring often, until the fillets begin to sizzle.`,
          'Mix garlic into the oil and cook it 1 minute more, just until fragrant.',
          'Add the fresh oregano and reduce the heat to low; cook for half a minute until the oregano is a little wilted.',
          'Mix red pepper flakes, dried oregano, and tomatoes into olive oil mixture.',
          'Bring sauce to a simmer and season with salt, sugar, and black pepper.',
          'Turn the heat to low and simmer your sauce 35 to 40 minutes until thickened and the oil rises to the top, stirring occasionally.',
          'Optionally, add a pinch of baking soda into the sauce to decrease the acidity, mixing until thoroughly combined.'
        ])
      }
      // Kenji's New York recipe
      if (this.sauceRecipeSelection === 'kenjis') {
        this.$store.commit('sauce_recipe/SET_YELLOW_ONION_COUNT', Math.round(this.amount / 2 / 14 * 2) / 2)
        this.$store.commit('sauce_recipe/SET_BASIL_SPRIG_COUNT', Math.round(this.amount / 14 * 2) / 2)
      }
    },
    sauceRecipeSelection() {
      // custom
      if (this.sauceRecipeSelection === 'custom') this.$store.commit('sauce_recipe/SET_STEPS', [])
      // Chef John sauce
      if (this.sauceRecipeSelection === 'chef-john') {
        this.$store.commit('sauce_recipe/SET_SALT_PERCENT', 0.04)
        this.$store.commit('sauce_recipe/SET_OIL_PERCENT', 3.22)
        this.$store.commit('sauce_recipe/SET_PEPPER_PERCENT', 0.04)
        this.$store.commit('sauce_recipe/SET_GARLIC_PERCENT', 0.38)
        this.$store.commit('sauce_recipe/SET_FRESH_BASIL_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_BASIL_SPRIG_COUNT', 0)
        this.$store.commit('sauce_recipe/SET_FRESH_OREGANO_PERCENT', 0.77)
        this.$store.commit('sauce_recipe/SET_DRY_OREGANO_PERCENT', 0.06)
        this.$store.commit('sauce_recipe/SET_SUGAR_PERCENT', 0.79)
        this.$store.commit('sauce_recipe/SET_BUTTER_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_UNSALTED_BUTTER_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_RED_PEPPER_FLAKES_PERCENT', 0.13)
        this.$store.commit('sauce_recipe/SET_YELLOW_ONION_COUNT', 0)
        this.$store.commit('sauce_recipe/SET_STEPS', [
          'Heat the olive oil over medium-low heat in a saucepan.',
          `Optionally stir ${ (this.amount/14 < 1) ? 1 : Math.round(this.amount/14) } anchovy ${ (this.amount/14 > 1) ? 'fillets' : 'fillet' } into the olive oil and cook, stirring often, until the fillets begin to sizzle.`,
          'Mix garlic into the oil and cook it 1 minute more, just until fragrant.',
          'Add the fresh oregano and reduce the heat to low; cook for half a minute until the oregano is a little wilted.',
          'Mix red pepper flakes, dried oregano, and tomatoes into olive oil mixture.',
          'Bring sauce to a simmer and season with salt, sugar, and black pepper.',
          'Turn the heat to low and simmer your sauce 35 to 40 minutes until thickened and the oil rises to the top, stirring occasionally.',
          'Optionally, add a pinch of baking soda into the sauce to decrease the acidity, mixing until thoroughly combined.'
        ])
      }
      // Kenji's New York Style sauce
      if (this.sauceRecipeSelection === 'kenjis') {
        this.$store.commit('sauce_recipe/SET_SALT_PERCENT', 0.04)
        this.$store.commit('sauce_recipe/SET_OIL_PERCENT', 1.68)
        this.$store.commit('sauce_recipe/SET_PEPPER_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_GARLIC_PERCENT', 0.71)
        this.$store.commit('sauce_recipe/SET_FRESH_BASIL_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_BASIL_SPRIG_COUNT', Math.round(this.amount / 14 * 2) / 2)
        this.$store.commit('sauce_recipe/SET_FRESH_OREGANO_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_DRY_OREGANO_PERCENT', 0.23)
        this.$store.commit('sauce_recipe/SET_SUGAR_PERCENT', 0.89)
        this.$store.commit('sauce_recipe/SET_UNSALTED_BUTTER_PERCENT', 1.78)
        this.$store.commit('sauce_recipe/SET_RED_PEPPER_FLAKES_PERCENT', 0.04)
        this.$store.commit('sauce_recipe/SET_YELLOW_ONION_COUNT', Math.round(this.amount / 2 / 14 * 2) / 2)
        this.$store.commit('sauce_recipe/SET_STEPS', [
          'Process tomatoes and their juice through food mill, pulse in food processor until pureed, or puree with hand blender. Puree should not be completely smooth, but should have no chunks larger than 1/16 of an inch. Set tomatoes aside.',
          `Peel and split the onion in half.`,
          'Combine butter and oil in medium saucepan and heat over medium-low heat until butter is melted. Add garlic, oregano, red pepper flakes, and salt.',
          'Cook for about 3 minutes, stirring frequently until fragrant but not browned.',
          'Add tomatoes, basil sprigs, onion halves, and sugar. Bring to a simmer, reduce heat to lowest setting (bubbles should barely be breaking the surface), and cook, stirring occasionally, until reduced by 1/2, about 1 hour.',
          'Discard onions and basil stems. Season to taste with salt.',
          'Allow to cool and store in covered container in the refrigerator for up to 2 weeks.'
        ])
      }
      // Lucali's sauce
      if (this.sauceRecipeSelection === 'lucalis') {
        this.$store.commit('sauce_recipe/SET_SALT_PERCENT', 0.05)
        this.$store.commit('sauce_recipe/SET_OIL_PERCENT', 1.68)
        this.$store.commit('sauce_recipe/SET_PEPPER_PERCENT', 0.05)
        this.$store.commit('sauce_recipe/SET_GARLIC_PERCENT', 0.76)
        this.$store.commit('sauce_recipe/SET_FRESH_BASIL_PERCENT', 0.31)
        this.$store.commit('sauce_recipe/SET_BASIL_SPRIG_COUNT', 0)
        this.$store.commit('sauce_recipe/SET_FRESH_OREGANO_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_DRY_OREGANO_PERCENT', 0.23)
        this.$store.commit('sauce_recipe/SET_SUGAR_PERCENT', 0.8)
        this.$store.commit('sauce_recipe/SET_BUTTER_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_UNSALTED_BUTTER_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_RED_PEPPER_FLAKES_PERCENT', 0)
        this.$store.commit('sauce_recipe/SET_YELLOW_ONION_COUNT', 0.5)
        this.$store.commit('sauce_recipe/SET_STEPS', [
          'Prepare your tomatoes. Use the entire can, mashing the tomatoes by hand.',
          'Add your salt, pepper, basil, oregano, and sugar to the sauce.',
          'Mince your garlic and add to the sauce.',
          'Finely chop your onion and add it to the sauce',
          'Bring the tomato sauce to a boil.',
          'Let the tomato sauce cool for about 15 minutes. Then bring to another boil.',
          'Let the sauce cool until cool enough to store in the fridge or add to your pizza.',
        ])
      }

      // reset recipe mode to 'basic' if not custom
      if (this.sauceRecipeSelection !== 'custom') {
        this.$store.commit('recipe/SET_MODE', 'basic')
      }
    }
  },
  computed: {
    ...mapState({
      sauceRecipe: state => state.sauce_recipe.selection,
      yellowOnionCount: state => state.sauce_recipe.yellowOnionCount
    }),
    sauceRecipeSelection: {
      get() {
        return this.$store.state.sauce_recipe.selection
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_SELECTION', val)
        
        this.$router.push({ path: this.$route.fullPath, query: { sauce: val } })
      }
    },
    amount: {
      get() {
        return this.$store.state.sauce_recipe.amount
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_AMOUNT', val)
      }
    }
  },
  mounted() {
    if (this.$route.query.sauce !== undefined) this.$store.commit('sauce_recipe/SET_SELECTION', this.$route.query.sauce)
  }
}
</script>

<style lang="stylus" scoped>
  #sauce-recipe-selection
    align-items: center
    grid-column: 1/-1
    width: 100%
</style>