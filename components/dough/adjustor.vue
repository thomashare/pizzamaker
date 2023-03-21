<template>
  <div id="adjustor">
    <template v-if="measureSwitch === 'diameter'">
      <label for="pie-count">pies</label>
      <button
        class="minus"
        :aria-hidden="count <= 1"
        :aria-label="`decrease pie count to ${finalVal(count-1)}`"
        :disabled="count <= 1"
        :title="`decrease pie count to ${finalVal(count-1)}`"
        @click.Enter="$store.dispatch('sizing/setCount', count-1)"
      ></button>
      <input aria-label="pie count" id="pie-count" inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button
        class="plus"
        :aria-label="`increase pie count to ${finalVal(count+1)}`"
        :title="`increase pie count to ${finalVal(count+1)}`"
        @click="$store.dispatch('sizing/setCount', count+1)"
      ></button>

      <label for="diameter">diameter (in)</label>
      <button
        class="minus"
        :aria-hidden="size <= 3"
        :aria-label="`decrease pie size to ${finalVal(size-1)} inch`"
        :disabled="size <= 3"
        :title="`decrease pie size to ${finalVal(size-1)} inch`"
        @click="$store.dispatch('sizing/setSize', size-1)"
      ></button>
      <input aria-label="pie diameter in inches" id="diameter" inputMode="decimal" max="100" min="3" type="number" v-model="size">
      <button
        class="plus"
        :aria-label="`increase pie size to ${finalVal(size+1)} inch`"
        :title="`increase pie size to ${finalVal(size+1)} inch`"
        @click="$store.dispatch('sizing/setSize', size+1)"
      ></button>

      <label for="thickness">thickness (in)</label>
      <button
        class="minus"
        :aria-hidden="crustThickness <= 0.1"
        :aria-label="`decrease pie thickness to ${finalVal(crustThickness-0.05)} inches`"
        :disabled="crustThickness <= 0.1"
        :title="`decrease pie thickness to ${finalVal(crustThickness-0.05)} inches`"
        @click="$store.dispatch('sizing/setCrustThickness', crustThickness-0.05)"
      ></button>
      <input aria-label="crust thickness" id="thickness" inputMode="decimal" max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
      <button
        class="plus"
        :aria-label="`increase pie thickness to ${finalVal(crustThickness+0.05)} inches`"
        :title="`increase pie thickness to ${finalVal(crustThickness+0.05)} inches`"
        @click="$store.dispatch('sizing/setCrustThickness', crustThickness+0.05)"
      ></button>
    </template>

    <template v-else>
      <label for="dough-balls">dough balls</label>
      <button
        class="minus"
        :aria-hidden="count <= 1"
        :aria-label="`decrease dough ball count to ${finalVal(count-1)}`"
        :disabled="count <= 1"
        :title="`decrease dough ball count to ${finalVal(count-1)}`"
        @click="$store.dispatch('sizing/setCount', count-1)"
      ></button>
      <input aria-label="dough ball count" id="dough-balls" inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button
        class="plus"
        :aria-label="`increase dough ball count to ${finalVal(count+1)}`"
        :title="`decrease dough ball count to ${finalVal(count+1)}`"
        @click="$store.dispatch('sizing/setCount', count+1)"
      ></button>

      <label for="dough-ball-weight">dough ball weight (g)</label>
      <button
        class="minus"
        :aria-hidden="doughBallWeight <= 20"
        :aria-label="`decrease dough ball weight to ${finalVal(doughBallWeight-1)} grams`"
        :disabled="doughBallWeight <= 20"
        :title="`decrease dough ball weight to ${finalVal(doughBallWeight-1)} grams`"
        @click="$store.dispatch('sizing/setDoughBallWeight', doughBallWeight-1)"
      ></button>
      <input aria-label="dough ball weight" id="dough-ball-weight" inputMode="decimal" min="20" type="number" v-model="doughBallWeight">
      <button
        class="plus"
        :aria-label="`increase dough ball weight to ${finalVal(doughBallWeight+1)} grams`"
        :title="`increase dough ball weight to ${finalVal(doughBallWeight+1)} grams`"
        @click="$store.dispatch('sizing/setDoughBallWeight', doughBallWeight+1)"
      ></button>
    </template>

    <label for="hydration">hydration (%)</label>
    <button
      class="minus"
      :aria-hidden="hydration <= 1"
      :aria-label="`decrease dough hydration to ${finalVal(hydration-1)} percent`"
      :disabled="hydration <= 1"
      :title="`decrease dough hydration to ${finalVal(hydration-1)} percent`"
      @click="$store.dispatch('ratios/setHydration', hydration-1)"
    ></button>
    <input aria-label="hydration percentage" id="hydration" inputMode="decimal" max="100" min="0" type="number" v-model="hydration">
    <button
      class="plus"
      :aria-hidden="hydration >= 100"
      :aria-label="`increase dough hydration to ${finalVal(hydration+1)} percent`"
      :disabled="hydration >= 100"
      :title="`increase dough hydration to ${finalVal(hydration+1)} percent`"
      @click="$store.dispatch('ratios/setHydration', hydration+1)"
    ></button>

    <div class="tooltip">
      <label class="activator" for="fermentation">
        <i
          aria-hidden="true"
          class="information icon"
          @click="displayTooltip('fermentation', $event)"
          @mouseout="hideTooltip"
          @mouseover="displayTooltip('fermentation')"
        ></i>
        <div class="popup" v-if="activePopup">
          <p v-for="tip in tips" :key="tip">{{ tip }}</p>
        </div>
        fermentation
      </label>
    </div>

    <select aria-label="dough fermentation time" id="fermentation" name="fermentation" v-model="fermentation">
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
    },
    finalVal(val) {
      return Math.round(val * 100) / 100
    }
  }
}
</script>

<style lang="stylus" scoped>
  #adjustor
    align-items: center
    display: grid
    grid-column-gap: 10px
    grid-row-gap: 25px
    grid-template-columns: 14ch 24px 6ch 24px

    label
      align-items: center
      display: flex
      font-family: 'Open Sans Condensed', sans-serif
      justify-content: flex-end
      text-align: right

    input
      text-align: center

    select
      grid-column: span 3
      padding: 4px 2px
</style>