<template>
  <div id="adjustor">
    <template v-if="measureSwitch === 'diameter'">
      <span>pies</span>
      <button class="minus" @click="$store.dispatch('sizing/setCount', count-1)" :disabled="count <= 1"></button>
      <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button class="plus" @click="$store.dispatch('sizing/setCount', count+1)" :disabled="count >= 50"></button>

      <span>diameter (in)</span>
      <button class="minus" @click="$store.dispatch('sizing/setSize', size-1)" :disabled="size <= 3"></button>
      <input inputMode="decimal" max="100" min="3" type="number" v-model="size">
      <button class="plus" @click="$store.dispatch('sizing/setSize', size+1)" :disabled="size >= 100"></button>

      <span>thickness (in)</span>
      <button class="minus" @click="$store.dispatch('sizing/setCrustThickness', crustThickness-0.05)" :disabled="crustThickness <= 0.1"></button>
      <input inputMode="decimal" max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
      <button class="plus" @click="$store.dispatch('sizing/setCrustThickness', crustThickness+0.05)"></button>
    </template>

    <template v-else>
      <span>dough balls</span>
      <button class="minus" @click="$store.dispatch('sizing/setCount', count-1)" :disabled="count <= 1"></button>
      <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button class="plus" @click="$store.dispatch('sizing/setCount', count+1)" :disabled="count >= 50"></button>

      <span>dough ball weight (g)</span>
      <button class="minus" @click="$store.dispatch('sizing/setDoughBallWeight', doughBallWeight-1)" :disabled="doughBallWeight <= 20"></button>
      <input inputMode="decimal" min="20" type="number" v-model="doughBallWeight">
      <button class="plus" @click="$store.dispatch('sizing/setDoughBallWeight', doughBallWeight+1)"></button>
    </template>

    <span>hydration (%)</span>
    <button class="minus" @click="$store.dispatch('ratios/setHydration', hydration-1)" :disabled="hydration <= 1"></button>
    <input inputMode="decimal" max="100" min="0" type="number" v-model="hydration">
    <button class="plus" @click="$store.dispatch('ratios/setHydration', hydration+1)" :disabled="hydration >= 100"></button>

    <div class="tooltip">
      <div class="activator">
        <i class="information icon" @click="displayTooltip('fermentation', $event)" @mouseover="displayTooltip('fermentation')" @mouseout="hideTooltip"></i>
        <div class="popup" v-if="activePopup">
          <p v-for="tip in tips" :key="tip">{{ tip }}</p>
        </div>
        fermentation</div>
    </div>

    <select name="fermentation" v-model="fermentation">
      <option value="custom">custom</option>
      <option value="recipe" v-if="doughRecipeSelection !== 'custom'">recipe</option>
      <option value="3">3 hours</option>
      <option value="24">24 hours</option>
      <option value="48">48 hours</option>
      <option value="72">72 hours</option>
      <option value="120">5 days</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      switched: false,
      tips: [],
      activePopup: null
    }
  },
  computed: {
    ...mapState({
      doughRecipeSelection: state => state.recipe.selection,
      recipeYeastPercent: state => state.ratios.recipeYeastPercent
    }),
    measureSwitch: {
      get() {
        return this.$store.state.sizing.measureSwitch
      },
      set(val) {
        this.$store.dispatch('sizing/toggleMeasureSwitch', val)
      }
    },
    count: {
      get() {
        return this.$store.state.sizing.count
      },
      set(val) {
        this.$store.dispatch('sizing/setCount', val)
      }
    },
    size: {
      get() {
        return this.$store.state.sizing.size
      },
      set(val) {
        this.$store.dispatch('sizing/setSize', val)
      }
    },
    crustThickness: {
      get() {
        return this.$store.state.sizing.crustThickness
      },
      set(val) {
        this.$store.dispatch('sizing/setCrustThickness', val)
      }
    },
    doughBallWeight: {
      get() {
        return this.$store.state.sizing.doughBallWeight
      },
      set(val) {
        this.$store.dispatch('sizing/setDoughBallWeight', val)
      }
    },
    hydration: {
      get() {
        return this.$store.state.ratios.hydration
      },
      set(val) {
        this.$store.dispatch('ratios/setHydration', val)
      }
    },
    fermentation: {
      get() {
        return this.$store.state.recipe.fermentation
      },
      set(val) {
        this.$store.commit('recipe/SET_FERMENTATION', val)

        // if setting to custom, don't bother setting the yeast percent.
        if (val === 'custom') return false

        // if using the 'recipe' option, set the yeast percentage to the recipe yeast percent.
        if (val === 'recipe') {
          this.$store.dispatch('ratios/setYeastPercent', this.recipeYeastPercent)
          return false
        }

        // modify the yeast amount depending on fermentation times.
        const calculatedYeastPercent = Math.round(((7 * 100 - 7 * val) / 1000) * 100) / 100
        if (calculatedYeastPercent <= 0) {
          this.$store.dispatch('ratios/setYeastPercent', 0.1)
        }
        else {
          this.$store.dispatch('ratios/setYeastPercent', calculatedYeastPercent)
        }
      }
    }
  },
  mounted() {
    this.setQueryParams()
  },
  methods: {
    setQueryParams() {
      // Crust thickness
      if (this.$route.query.crustThickness !== undefined) this.$store.dispatch('sizing/setCrustThickness', this.$route.query.crustThickness)

      // Dough ball count
      if (this.$route.query.count !== undefined) this.$store.dispatch('sizing/setCount', this.$route.query.count)

      // Dough ball weight
      if (this.$route.query.doughBallWeight !== undefined) this.$store.dispatch('sizing/setDoughBallWeight', this.$route.query.doughBallWeight)

      // Hydration
      if (this.$route.query.hydration !== undefined) this.$store.dispatch('ratios/setHydration', this.$route.query.hydration)
    },
    displayTooltip(tooltip, e) {
      if (this.activePopup === 'click') {
        this.hideTooltip()
        return false
      }

      if (e !== undefined) {
        this.activePopup = e.type
      }
      else this.activePopup = 'hover'

      if (tooltip === 'fermentation') {
        this.tips = [
          `Fermentation describes how long your dough will rest (or proof) before using.`,
          `A longer fermentation time will create a better tasting crust.`
        ]
      }
    },
    hideTooltip() {
      this.tips = []
      this.activePopup = null
    }
  }
}
</script>

<style lang="stylus" scoped>
  #adjustor
    align-items: center
    display: grid
    grid-column-gap: 10px
    grid-row-gap: 12px
    grid-template-columns: 1fr 24px 6ch 24px

    span
      align-items: center
      display: flex
      font-family: 'Open Sans Condensed', sans-serif
      justify-content: flex-end

    input
      text-align: center

    select
      grid-column: span 3
      padding: 4px 2px
</style>