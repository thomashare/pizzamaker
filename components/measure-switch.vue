<template>
  <div :class="measureSwitch === 'diameter' ? 'diameter' : 'weight'" id="measure-switch">
    <span>diameter</span>
    <input type="checkbox" :checked="measureSwitch === 'weight'" @change="$store.commit('sizing/TOGGLE_MEASURE_SWITCH')">
    <span>weight</span>
  </div>
</template>

<script>
export default {
  watch: {
    measureSwitch() {
      if (this.measureSwitch === 'weight') this.$router.push({ path: this.$route.fullPath, query: { doughBallWeight: this.doughBallWeight } })
      if (this.measureSwitch === 'diameter') this.$router.push({ path: this.$route.path })
    }
  },
  computed: {
    measureSwitch: {
      get() {
        return this.$store.state.sizing.measureSwitch
      },
      set(val) {
        this.$store.commit('sizing/TOGGLE_MEASURE_SWITCH', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #measure-switch
    display: grid
    grid-column-gap: 10px
    grid-template-columns: 1fr auto 1fr
    
    & > input
      align-items: center
      appearance: none
      background-color: #FFF
      border: solid #ECECEC 1px
      border-radius: 25px
      box-sizing: border-box
      display: flex
      height: 22px
      outline: none
      padding: 0
      position: relative
      transition: transform 0.1s ease-in
      width: 45px
      &::before
        background: #09A9B4
        border-radius: 50%
        content: ''
        display: block
        height: 100%
        position: absolute
        transition: 0.1s ease-in-out
        width: 20px
      &:checked::before
        transform: translateX(23px)

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

    & > span:nth-of-type(2)
      text-align: left
</style>