<template>
  <div id="ingredient-adjustor">
    <header>
      <h2>Customize Your Sauce</h2>
    </header>

    <span class="ingredient">basil sprigs</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="basilSprigCount" @change="setCustom()">
    <span></span>

    <span class="ingredient">dry oregano</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="dryOreganoPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">fresh basil</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="freshBasilPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">fresh oregano</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="freshOreganoPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">garlic</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="garlicPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">oil</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="oilPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">pepper</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="pepperPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">red pepper flakes</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="redPepperFlakesPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">salt</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="saltPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">sugar</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="sugarPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">unsalted butter</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="unsaltedButterPercent" @change="setCustom()">
    <span>%</span>

    <span class="ingredient">yellow onions</span>
    <input class="value" inputMode="decimal" max="100" min="0" step="0.5" type="number" v-model="yellowOnionCount" @change="setCustom()">
    <span></span>
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
    basilSprigCount: {
      get() {
        return this.$store.state.sauce_recipe.basilSprigCount
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_BASIL_SPRIG_COUNT', val)
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
    },
    sugarPercent: {
      get() {
        return this.$store.state.sauce_recipe.sugarPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_SUGAR_PERCENT', val)
      }
    },
    butterPercent: {
      get() {
        return this.$store.state.sauce_recipe.butterPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_BUTTER_PERCENT', val)
      }
    },
    unsaltedButterPercent: {
      get() {
        return this.$store.state.sauce_recipe.unsaltedButterPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_UNSALTED_BUTTER_PERCENT', val)
      }
    },
    redPepperFlakesPercent: {
      get() {
        return this.$store.state.sauce_recipe.redPepperFlakesPercent
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_RED_PEPPER_FLAKES_PERCENT', val)
      }
    },
    yellowOnionCount: {
      get() {
        return this.$store.state.sauce_recipe.yellowOnionCount
      },
      set(val) {
        this.$store.commit('sauce_recipe/SET_YELLOW_ONION_COUNT', val)
      }
    }
  },
  methods: {
    setCustom() {
      this.$store.commit('sauce_recipe/SET_SELECTION', 'custom')

      this.$router.push({ path: this.$route.fullPath, query: { sauce: 'custom' } })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #ingredient-adjustor
    align-items: center
    display: grid
    grid-column-gap: 10px
    grid-row-gap: 25px
    grid-template-columns: 15ch 7ch 1ch 15ch 7ch 1ch
    justify-content: center
    padding: 0 5px
    
    @media screen and (max-width: 720px)
      grid-template-columns: 10ch 7ch 1ch 10ch 7ch 1ch

    header
      grid-column: 1/-1
      text-align: center

    .ingredient
      text-align: right

    .value
      text-align: center
</style>