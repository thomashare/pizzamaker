<template>
  <div id="adjustor">
    <div :class="measureSwitch === 'diameter' && switched ? 'diameter' : switched ? 'weight' : null" id="measure-switch">
      <span>Diameter</span>
      <input type="checkbox" :checked="measureSwitch === 'weight'" @change="$store.commit('sizing/TOGGLE_MEASURE_SWITCH')">
      <span>Weight</span>
    </div>
    <template v-if="measureSwitch === 'diameter'">
      <div>
        <span>pies</span>
        <button class="minus" @click="$store.commit('sizing/SET_COUNT', count-1)" :disabled="count <= 1"></button>
        <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
        <button class="plus" @click="$store.commit('sizing/SET_COUNT', count+1)" :disabled="count >= 50"></button>
      </div>
      <div>
        <span>size (in)</span>
        <button class="minus" @click="$store.commit('sizing/SET_SIZE', size-1)" :disabled="size <= 3"></button>
        <input inputMode="decimal" max="100" min="3" type="number" v-model="size">
        <button class="plus" @click="$store.commit('sizing/SET_SIZE', size+1)" :disabled="size >= 100"></button>
      </div>
      <div>
        <span>crust thickness (in)</span>
        <button class="minus" @click="$store.commit('sizing/SET_CRUST_THICKNESS', crustThickness-0.05)" :disabled="crustThickness <= 0.1"></button>
        <input inputMode="decimal" max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
        <button class="plus" @click="$store.commit('sizing/SET_CRUST_THICKNESS', crustThickness+0.05)"></button>
      </div>
    </template>
    <template v-else>
      <div>
        <span>dough balls</span>
        <button class="minus" @click="$store.commit('sizing/SET_COUNT', count-1)" :disabled="count <= 1"></button>
        <input inputMode="decimal" max="50" min="1" type="number" v-model="count">
        <button class="plus" @click="$store.commit('sizing/SET_COUNT', count+1)" :disabled="count >= 50"></button>
      </div>
      <div>
        <span>dough ball weight (g)</span>
        <button class="minus" @click="$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', doughBallWeight-1)" :disabled="doughBallWeight <= 20"></button>
        <input inputMode="decimal" min="20" type="number" v-model="doughBallWeight">
        <button class="plus" @click="$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', doughBallWeight+1)"></button>
      </div>
    </template>
    <div>
      <span>hydration (%)</span>
      <button class="minus" @click="$store.commit('ratios/SET_HYDRATION', hydration-1)" :disabled="hydration <= 1"></button>
      <input inputMode="decimal" max="100" min="0" type="number" v-model="hydration">
      <button class="plus" @click="$store.commit('ratios/SET_HYDRATION', hydration+1)" :disabled="hydration >= 100"></button>
    </div>
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
    measureSwitch() {
      if (this.measureSwitch === 'weight') this.$router.push({ path: this.$route.fullPath, query: { doughBallWeight: this.doughBallWeight } })
      if (this.measureSwitch === 'diameter') this.$router.push({ path: this.$route.path })
      this.switched = true
    },
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
    & > div
      align-items: center
      display: grid
      grid-column-gap: 10px
      grid-template-columns: 1fr 24px 9ch 24px

      &:not(:first-child)
        margin-top: 20px

      &#measure-switch
        grid-template-columns: 1fr auto auto auto
        margin-bottom: 30px
        
        & > input
          align-items: center
          background-color: lighten(#c4edde, 12)
          border: solid #D0D0D0 1px
          border-radius: 25px
          box-sizing: border-box
          display: flex
          height: 22px
          outline: none
          padding: 0
          position: relative
          transition: transform 0.1s ease-in
          width: 50px
          &::before
            background: #7ac7c4
            border-radius: 50%
            box-sizing: inherit
            content: ''
            display: block
            height: 100%
            position: absolute
            transition: 0.1s ease-in-out
            width: 20px
          &:checked::before
            transform: translateX(28px)

        &.diameter
          & > input::before
            animation: pie 0.1s ease-in forwards

            @keyframes pie
              25%
                height: 50%
                left: 1px
                width: 10px
              100%
                height: 100%
                width: 20px

        &.weight
          & > input
            transform: rotate(4deg)

      span
        text-align: right

      input
        appearance: none
        border: solid #EAEAEA 1px
        border-radius: 5px
        box-sizing: border-box
        font-size: 1.1em
        max-width: 100%
        padding: 3px 2px
        text-align: center

    #yeast-type
      display: grid
      grid-column-gap: 10px
      grid-template-columns: minmax(65px, auto) 10ch
      margin-top: 25px

      select
        border: solid #A0A0A0 1px
        padding: 5px
</style>