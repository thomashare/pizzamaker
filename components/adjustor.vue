<template>
  <div id="adjustor">
    <template v-if="measureSwitch === 'diameter'">
      <span>pies</span>
      <button class="minus" @click="$store.commit('sizing/SET_COUNT', count-1)" :disabled="count <= 1"></button>
      <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button class="plus" @click="$store.commit('sizing/SET_COUNT', count+1)" :disabled="count >= 50"></button>

      <span>size (in)</span>
      <button class="minus" @click="$store.commit('sizing/SET_SIZE', size-1)" :disabled="size <= 3"></button>
      <input inputMode="decimal" max="100" min="3" type="number" v-model="size">
      <button class="plus" @click="$store.commit('sizing/SET_SIZE', size+1)" :disabled="size >= 100"></button>

      <span>crust thickness (in)</span>
      <button class="minus" @click="$store.commit('sizing/SET_CRUST_THICKNESS', crustThickness-0.05)" :disabled="crustThickness <= 0.1"></button>
      <input inputMode="decimal" max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
      <button class="plus" @click="$store.commit('sizing/SET_CRUST_THICKNESS', crustThickness+0.05)"></button>
    </template>

    <template v-else>
      <span>dough balls</span>
      <button class="minus" @click="$store.commit('sizing/SET_COUNT', count-1)" :disabled="count <= 1"></button>
      <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
      <button class="plus" @click="$store.commit('sizing/SET_COUNT', count+1)" :disabled="count >= 50"></button>

      <span>dough ball weight (g)</span>
      <button class="minus" @click="$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', doughBallWeight-1)" :disabled="doughBallWeight <= 20"></button>
      <input inputMode="decimal" min="20" type="number" v-model="doughBallWeight">
      <button class="plus" @click="$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', doughBallWeight+1)"></button>
    </template>

    <span>hydration (%)</span>
    <button class="minus" @click="$store.commit('ratios/SET_HYDRATION', hydration-1)" :disabled="hydration <= 1"></button>
    <input inputMode="decimal" max="100" min="0" type="number" v-model="hydration">
    <button class="plus" @click="$store.commit('ratios/SET_HYDRATION', hydration+1)" :disabled="hydration >= 100"></button>
  </div>
</template>

<script>
// doughball weight should be 187.1g
import { mapState } from 'vuex'

export default {
  data() {
    return {
      switched: false
    }
  },
  watch: {
    doughBallWeight() {
      this.$router.push({ path: this.$route.fullPath, query: { doughBallWeight: this.doughBallWeight } })
    },
    hydration() {
      this.$router.push({ path: this.$route.fullPath, query: { hydration: this.hydration } })
    },
    crustThickness() {
      this.$router.push({ path: this.$route.fullPath, query: { crustThickness: this.crustThickness } })
    }
  },
  computed: {
    ...mapState({
      recipeSelection: state => state.recipe.selection
    }),
    measureSwitch: {
      get() {
        return this.$store.state.sizing.measureSwitch
      },
      set(val) {
        this.$store.commit('sizing/TOGGLE_MEASURE_SWITCH', val)
      }
    },
    count: {
      get() {
        return this.$store.state.sizing.count
      },
      set(val) {
        this.$store.commit('sizing/SET_COUNT', val)
      }
    },
    size: {
      get() {
        return this.$store.state.sizing.size
      },
      set(val) {
        this.$store.commit('sizing/SET_SIZE', val)
      }
    },
    crustThickness: {
      get() {
        return this.$store.state.sizing.crustThickness
      },
      set(val) {
        this.$store.commit('sizing/SET_CRUST_THICKNESS', val)
      }
    },
    doughBallWeight: {
      get() {
        return this.$store.state.sizing.doughBallWeight
      },
      set(val) {
        this.$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', val)
      }
    },
    hydration: {
      get() {
        return this.$store.state.ratios.hydration
      },
      set(val) {
        this.$store.commit('ratios/SET_HYDRATION', val)
      }
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
      appearance: none
      border: solid #DDDDDD 1px
      border-radius: 3px
      padding: 3px
      text-align: center
</style>