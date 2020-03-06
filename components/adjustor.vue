<template>
  <div id="adjustor">
    <div id="measure-switch">
      <span>Diameter</span>
      <input type="checkbox" :checked="measureSwitch === 'weight'" @change="$store.commit('sizing/TOGGLE_MEASURE_SWITCH')">
      <span>Weight</span>
    </div>
    <template v-if="measureSwitch === 'diameter'">
      <div>
        <span>pies</span>
        <button @click.prevent="$store.commit('sizing/SET_COUNT', $store.state.sizing.count-1)" :disabled="count <= 1"><i class="fas fa-minus-circle"></i></button>
        <input max="50" min="1" type="number" v-model="count">
        <button @click.prevent="$store.commit('sizing/SET_COUNT', $store.state.sizing.count+1)" :disabled="count >= 50"><i class="fas fa-plus-circle"></i></button>
      </div>
      <div>
        <span>size (in)</span>
        <button @click.prevent="$store.commit('sizing/SET_SIZE', $store.state.sizing.size-1)" :disabled="size <= 3"><i class="fas fa-minus-circle"></i></button>
        <input max="100" min="3" type="number" v-model="size">
        <button @click.prevent="$store.commit('sizing/SET_SIZE', $store.state.sizing.size+1)" :disabled="size >= 100"><i class="fas fa-plus-circle"></i></button>
      </div>
      <div>
        <span>crust thickness (in)</span>
        <button @click.prevent="$store.commit('sizing/SET_CRUST_THICKNESS', $store.state.sizing.crustThickness-0.05)" :disabled="crustThickness <= 0.1"><i class="fas fa-minus-circle"></i></button>
        <input max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
        <button @click.prevent="$store.commit('sizing/SET_CRUST_THICKNESS', $store.state.sizing.crustThickness+0.05)"><i class="fas fa-plus-circle"></i></button>
      </div>
    </template>
    <template v-else>
      <div>
        <span>dough balls</span>
        <button @click.prevent="$store.commit('sizing/SET_COUNT', $store.state.sizing.count-1)" :disabled="count <= 1"><i class="fas fa-minus-circle"></i></button>
        <input max="50" min="1" type="number" v-model="count">
        <button @click.prevent="$store.commit('sizing/SET_COUNT', $store.state.sizing.count+1)" :disabled="count >= 50"><i class="fas fa-plus-circle"></i></button>
      </div>
      <div>
        <span>dough ball weight (g)</span>
        <button @click.prevent="$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', $store.state.sizing.doughBallWeight-1)" :disabled="doughBallWeight <= 20"><i class="fas fa-minus-circle"></i></button>
        <input min="20" type="number" v-model="doughBallWeight">
        <button @click.prevent="$store.commit('sizing/SET_DOUGH_BALL_WEIGHT', $store.state.sizing.doughBallWeight+1)"><i class="fas fa-plus-circle"></i></button>
      </div>
    </template>
    <div>
      <span>hydration (%)</span>
      <button @click.prevent="$store.commit('ratios/SET_HYDRATION', $store.state.ratios.hydration-1)"><i class="fas fa-minus-circle"></i></button>
      <input type="number" v-model="hydration">
      <button @click.prevent="$store.commit('ratios/SET_HYDRATION', $store.state.ratios.hydration+1)"><i class="fas fa-plus-circle"></i></button>
    </div>
    <div id="yeast-type">
      <span>yeast type</span>
      <select v-model="yeastType">
        <option value="ADY">ADY</option>
        <option value="IDY">IDY</option>
      </select>
    </div>
  </div>
</template>

<script>
// doughball weight should be 187.1g
import { mapState } from 'vuex'

export default {
  watch: {
    measureSwitch() {
      if (this.measureSwitch === 'weight') this.$router.push({ path: this.$route.fullPath, query: { doughBallWeight: this.doughBallWeight } })
      if (this.measureSwitch === 'diameter') this.$router.push({ path: this.$route.path })
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
      recipeSelection: state => state.recipe.selection,
      recipeYeastType: state => state.ingredients.recipeYeastType,
      recipeYeastPercent: state => state.ratios.recipeYeastPercent,
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
    },
    yeastType: {
      get() {
        return this.$store.state.ingredients.yeastType
      },
      set(val) {
        this.$store.commit('ingredients/SET_YEAST_TYPE', val)
      }
    },
    recipeYeastType: {
      get() {
        return this.$store.state.ratios.recipeYeastType
      },
      set(val) {
        this.$store.commit('ratios/SET_RECIPE_YEAST_TYPE', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #adjustor
    margin-top: 10px

    & > div
      align-items: center
      display: grid
      grid-column-gap: 10px
      grid-template-columns: 1fr auto 9ch auto

      &:not(:first-child)
        margin-top: 20px

      &#measure-switch
        grid-template-columns: 1fr auto auto auto
        
        & > input
          background-color: #F8F8F8
          border: solid #D0D0D0 1px
          border-radius: 25px
          box-sizing: border-box
          height: 22px
          padding: 0
          position: relative
          width: 50px
          &::before
            background: desaturate(#C44D58, 10)
            border-radius: 50%
            box-shadow: 1px 0 1px darken(desaturate(#C44D58, 10), 20)
            box-sizing: inherit
            content: ''
            display: block
            height: 100%
            position: absolute
            transition: 0.1s ease-in-out
            width: 20px
          &:checked::before
            box-shadow: -1px 0 1px darken(desaturate(#C44D58, 10), 20)
            transform: translateX(28px)

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

      button
        background: none
        border: none
        box-sizing: border-box
        color : #C44D58
        font-size: 1.2em
        padding: 0
        &:disabled
          color: lighten(desaturate(#C44D58, 30), 25)

    #yeast-type
      display: grid
      grid-column-gap: 10px
      grid-template-columns: minmax(65px, auto) 10ch
      margin-top: 25px

      select
        border: solid #A0A0A0 1px
        padding: 5px
</style>