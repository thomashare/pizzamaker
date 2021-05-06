<template>
  <div id="mode-switch" v-if="doughRecipe !== 'custom'">
    <label for="mode-switch">basic</label>
    <input
      :aria-checked="(modeSwitch === 0) ? 'false' : 'true'"
      :aria-label="(modeSwitch === 0) ? `basic mode` : `advanced mode`"
      id="mode-switch"
      role="switch"
      type="checkbox"
      v-model="modeSwitch"
    >
    <label for="mode-switch">advanced</label>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      doughRecipe: state => state.recipe.selection,
    }),
    modeSwitch: {
      get() {
        return (this.$store.state.recipe.modeSwitch === 'basic') ? 1 : 0 
      },
      set(val) {
        let setting = (val === false) ? 'basic' : 'advanced'

        this.$store.commit('recipe/SET_MODE', setting)
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  #mode-switch
    display: grid
    grid-column-gap: 10px
    grid-template-columns: 1fr auto 1fr

    span
      margin-right: 0

    label:first-of-type
      text-align: right
    
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

      &:focus
        box-shadow: inset 0 0 0 1px #2265d4
        outline: none

    &.basic
      & > input
        transform: rotate(4deg)

    & > span:nth-of-type(2)
      text-align: left
</style>