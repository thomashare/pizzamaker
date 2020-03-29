<template>
  <div id="sauce-recipe-selection">
    <h2>Sauce</h2>

    <div id="selection">
      <div id="sauce">
        <span>sauce</span>
        <select v-model="sauceRecipeSelection">
          <option value="custom">custom</option>
          <option value="chef-john">Chef John</option>
        </select>
      </div>

      <div id="amount">
        <span>amount</span>
        <input inputMode="decimal" max="100" min="0" type="number" v-model="amount">
        <span>oz</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    sauceRecipeSelection() {
      // custom sauce
      if (this.sauceRecipeSelection === 'custom') {
        this.$store.commit('sauce_recipe/SET_STEPS', [])
      }
      // Chef John sauce
      if (this.sauceRecipeSelection === 'chef-john') {
        this.$store.commit('sauce_recipe/SET_SALT_PERCENT', 0.04)
        this.$store.commit('sauce_recipe/SET_OIL_PERCENT', 3.22)
        this.$store.commit('sauce_recipe/SET_PEPPER_PERCENT', 0.04)
        this.$store.commit('sauce_recipe/SET_GARLIC_PERCENT', 0.38)
        this.$store.commit('sauce_recipe/SET_FRESH_BASIL_PERCENT', 0.31)
        this.$store.commit('sauce_recipe/SET_FRESH_OREGANO_PERCENT', 0.77)
        this.$store.commit('sauce_recipe/SET_DRY_OREGANO_PERCENT', 0.06)
        this.$store.commit('sauce_recipe/SET_STEPS', [
          'Heat the olive oil over medium-low heat in a saucepan.',
          'Mix garlic into the oil and cook it 1 minute more, just until fragrant.',
          'Add the fresh oregano and reduce the heat to low; cook 2 or 3 more minutes until the oregano is wilted.',
          'Mix red pepper flakes, dried oregano, and tomatoes into olive oil mixture. Bring sauce to a simmer and season with salt, sugar, and black pepper.',
          'Turn the heat to low and simmer your sauce 35 to 40 minutes until thickened and the oil rises to the top, stirring occasionally.',
          'Optionally, add a pinch of baking soda into the sauce to decrease the acidity, mixing until thoroughly combined.'
        ])
      }
    }
  },
  computed: {
    sauceRecipeSelection: {
      get() {
        return this.$store.state.sauce_recipe.selection
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_SELECTION', val)
        
        this.$router.push({ path: this.$route.path, query: { sauce: this.sauceRecipeSelection } })
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
  }
}
</script>

<style lang="stylus" scoped>
  #sauce-recipe-selection
    align-items: center

    h2
      font-size: 1.5em
      text-align: center
      width: 100%

    #selection
      display: flex
      margin-top: 15px

      #sauce, #amount
        align-items: center
        display: grid
        grid-column-gap: 10px

        select
          display: block
          height: 35px
          
          @media screen and (max-width: 500px)
            max-width: 120px

      #sauce
        grid-template-columns: auto auto

      #amount
        grid-template-columns: auto 6ch auto
        margin-left: 15px

        input
          text-align: center
</style>