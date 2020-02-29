<template>
  <div id="adjustor">
    <div>
      <span>pies</span>
      <button @click.prevent="--count" :disabled="count <= 1"><i class="fas fa-minus-circle"></i></button>
      <input max="50" min="1" type="number" v-model="count">
      <button @click.prevent="++count" :disabled="count >= 50"><i class="fas fa-plus-circle"></i></button>
    </div>
    <div>
      <span>size (in)</span>
      <button @click.prevent="--size" :disabled="size <= 3"><i class="fas fa-minus-circle"></i></button>
      <input max="100" min="3" type="number" v-model="size">
      <button @click.prevent="++size" :disabled="size >= 100"><i class="fas fa-plus-circle"></i></button>
    </div>
    <div>
      <span>crust thickness (in)</span>
      <button @click.prevent="crustThickness -= 0.05" :disabled="crustThickness <= 0.1"><i class="fas fa-minus-circle"></i></button>
      <input max="5" min="0.1" step="0.05" type="number" v-model="crustThickness">
      <button @click.prevent="crustThickness += 0.05"><i class="fas fa-plus-circle"></i></button>
    </div>
    <div>
      <span>hydration (%)</span>
      <button @click.prevent="$store.commit('ratios/SET_HYDRATION', $store.state.ratios.hydration-1)"><i class="fas fa-minus-circle"></i></button>
      <input type="number" v-model="hydration">
      <button @click.prevent="$store.commit('ratios/SET_HYDRATION', $store.state.ratios.hydration+1)"><i class="fas fa-plus-circle"></i></button>
    </div>
    <div id="yeast-type">
      <span>yeast type</span>
      <select v-model="yeastType" @change="convertYeastAmount()">
        <option value="ADY">ADY</option>
        <option value="IDY">IDY</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {

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