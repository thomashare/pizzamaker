<template>
  <div id="adjustor">
    <template v-if="measureSwitch === 'diameter'">
      <span>pies</span>
      <button class="minus" @click="$store.dispatch('sizing/setCount', count-1)" :disabled="count <= 1"></button>
      <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button class="plus" @click="$store.dispatch('sizing/setCount', count+1)" :disabled="count >= 50"></button>

      <span>size (in)</span>
      <button class="minus" @click="$store.dispatch('sizing/setSize', size-1)" :disabled="size <= 3"></button>
      <input inputMode="decimal" max="100" min="3" type="number" v-model="size">
      <button class="plus" @click="$store.dispatch('sizing/setSize', size+1)" :disabled="size >= 100"></button>

      <span>crust thickness (in)</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      switched: false
    }
  },
  computed: {
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
      font-family: 'Open Sans Condensed', sans-serif
      text-align: right

    input
      text-align: center
</style>