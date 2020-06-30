<template>
  <div :class="measureSwitch === 0 ? 'diameter' : 'weight'" id="measure-switch">
    <span>diameter</span>
    <input type="checkbox" v-model="measureSwitch">
    <span>weight</span>
  </div>
</template>

<script>
export default {
  computed: {
    measureSwitch: {
      get() {
        return (this.$store.state.sizing.measureSwitch === 'diameter') ? 0 : 1 
      },
      set(val) {
        let setting = (val === true) ? 'weight' : 'diameter'

        this.$store.dispatch('sizing/toggleMeasureSwitch', setting)
      }
    }
  },
  mounted() {
    if (this.$route.query.measure !== undefined) this.$store.commit('sizing/TOGGLE_MEASURE_SWITCH', this.$route.query.measure)
  }
}
</script>

<style lang="stylus" scoped>
  #measure-switch
    align-items: center
    display: grid
    grid-column-gap: 10px
    grid-template-columns: 1fr auto 1fr

    span
      margin-right: 0
    
    & > input
      align-items: center
      appearance: none
      background-color: #FFF
      border: solid #ECECEC 1px
      border-radius: 25px
      box-sizing: border-box
      cursor: pointer
      display: flex
      height: 22px
      outline: none
      padding: 0
      position: relative
      transition: transform 0.1s ease-in
      width: 45px
      &::before
        background: #4285F4
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