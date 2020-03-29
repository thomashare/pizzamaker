<template>
  <div id="ingredients">
    <span class="ingredient">salt</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="saltPercent">
    <span>%</span>

    <span class="ingredient">oil</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="oilPercent">
    <span>%</span>

    <span class="ingredient">pepper</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="pepperPercent">
    <span>%</span>

    <span class="ingredient">garlic</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="garlicPercent">
    <span>%</span>

    <span class="ingredient">fresh basil</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="freshBasilPercent">
    <span>%</span>

    <span class="ingredient">fresh oregano</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="freshOreganoPercent">
    <span>%</span>

    <span class="ingredient">dry oregano</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="dryOreganoPercent">
    <span>%</span>
  </div>
</template>

<script>
export default {
  computed: {
    saltPercent: {
      get() {
        return this.$store.state.sauce_recipe.saltPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_SALT_PERCENT', val)
      }
    },
    oilPercent: {
      get() {
        return this.$store.state.sauce_recipe.oilPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_OIL_PERCENT', val)
      }
    },
    pepperPercent: {
      get() {
        return this.$store.state.sauce_recipe.pepperPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_PEPPER_PERCENT', val)
      }
    },
    saltPercent: {
      get() {
        return this.$store.state.sauce_recipe.saltPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_SALT_PERCENT', val)
      }
    },
    garlicPercent: {
      get() {
        return this.$store.state.sauce_recipe.garlicPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_GARLIC_PERCENT', val)
      }
    },
    freshBasilPercent: {
      get() {
        return this.$store.state.sauce_recipe.freshBasilPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_FRESH_BASIL_PERCENT', val)
      }
    },
    freshOreganoPercent: {
      get() {
        return this.$store.state.sauce_recipe.freshOreganoPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_FRESH_OREGANO_PERCENT', val)
      }
    },
    dryOreganoPercent: {
      get() {
        return this.$store.state.sauce_recipe.dryOreganoPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_DRY_OREGANO_PERCENT', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #ingredients
    align-items: center
    display: grid
    grid-column-gap: 8px
    grid-row-gap: 8px
    grid-template-columns: 1fr 8ch 1fr
    margin: 25px auto 0
    max-width: 680px

    @media screen and (min-width: 681px)
      grid-template-columns: 1fr 8ch 1fr 1fr 8ch 1fr

    .ingredient
      text-align: right

    .value
      appearance: none
      border: solid #DDDDDD 1px
      border-radius: 3px
      padding: 3px
      text-align: center
</style>