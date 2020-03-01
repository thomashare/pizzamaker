<template>
  <div id="adjustor">
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
    <div>
      <span>hydration (%)</span>
      <button @click.prevent="$store.commit('ratios/SET_HYDRATION', $store.state.ratios.hydration-1)"><i class="fas fa-minus-circle"></i></button>
      <input type="number" v-model="hydration">
      <button @click.prevent="$store.commit('ratios/SET_HYDRATION', $store.state.ratios.hydration+1)"><i class="fas fa-plus-circle"></i></button>
    </div>
    <div id="yeast-type">
      <span>yeast type</span>
      <select :value="yeastType" @change="convertYeastAmount()">
        <option value="ADY">ADY</option>
        <option value="IDY">IDY</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      count: state => state.sizing.count,
      size: state => state.sizing.size,
      crustThickness: state => state.sizing.crustThickness,
      hydration: state => state.ratios.hydration,
      yeastType: state => state.ingredients.yeastType,
      recipeYeastType: state => state.ingredients.recipeYeastType,
      recipeYeastPercent: state => state.ratios.recipeYeastPercent
    })
  },
  methods: {
    convertYeastAmount() {
      console.log('changing yeast type')

      if (this.recipeSelection === 'custom') return false

      if (this.yeastType === 'ADY' && this.recipeYeastType === 'IDY') {
        this.$store.commit('ratios/SET_YEAST_PERCENT', this.ADYToIDY(this.recipeYeastPercent))
      }
      if (this.yeastType === 'IDY' && this.recipeYeastType === 'ADY') {
        this.$store.commit('ratios/SET_YEAST_PERCENT', this.IDYToADY(this.recipeYeastPercent))
      }
      if (this.yeastType === 'ADY' && this.recipeYeastType === 'ADV' ||
          this.yeastType === 'IDY' && this.recipeYeastType === 'IDY') {
            this.$store.commit('ratios/SET_YEAST_PERCENT', this.recipeYeastPercent)
      }
    },
    ADYToIDY(amount) {
      return amount += amount*0.75
    },
    IDYToADY(amount) {
      return amount -= amount*0.75
    }
  }
}
</script>

<style lang="stylus" scoped>
  #adjustor
    margin-top: 20px

    & > div
      align-items: center
      display: grid
      grid-column-gap: 10px
      grid-template-columns: 1fr auto 9ch auto

      &:not(:first-child)
        margin-top: 20px

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