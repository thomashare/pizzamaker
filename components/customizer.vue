<template>
  <div id="customize">
    <h2>Ingredient Percentages</h2>
    <div>
      <span class="ingredient">salt</span>
      <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="saltPercent" @change="setCustom()">
      <span>%</span>
    </div>
    <div>
      <span class="ingredient">{{ sugarType }}</span>
      <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="sugarPercent" @change="setCustom()">
      <span>%</span>
    </div>
    <div>
      <span class="ingredient">oil</span>
      <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="oilPercent" @change="setCustom()">
      <span>%</span>
    </div>
    <div>
      <span class="ingredient">yeast</span>
      <input class="value" inputMode="decimal" max="100" min="0" step="0.05" type="number" v-model="yeastPercent" @change="setCustom()">
      <span>%</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      recipe: state => state.recipe.selection,
      sugarType: state => state.ingredients.sugarType,
      yeastType: state => state.ingredients.yeastType
    }),
    oilPercent: {
      get() {
        return this.$store.state.ratios.oilPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_OIL_PERCENT', val)

        if (this.recipe !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { recipe: 'custom', oil: this.oilPercent } })
      }
    },
    saltPercent: {
      get() {
        return this.$store.state.ratios.saltPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_SALT_PERCENT', val)

        if (this.recipe !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { recipe: 'custom', salt: this.saltPercent } })
      }
    },
    sugarPercent: {
      get() {
        return this.$store.state.ratios.sugarPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_SUGAR_PERCENT', val)

        if (this.recipe !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { sugar: this.sugarPercent } })
      }
    },
    yeastPercent: {
      get() {
        return this.$store.state.ratios.yeastPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_YEAST_PERCENT', val)

        if (this.recipe !== 'custom') return false
        this.$router.push({ path: this.$route.fullPath, query: { yeast: this.yeastPercent, yeastType: this.yeastType } })
      }
    }
  },
  methods: {
    setCustom() {
      this.$store.commit('recipe/SET_SELECTION', 'custom')
    }
  }
}
</script>

<style lang="stylus" scoped>
  #customize
    display: flex
    flex-wrap: wrap
    justify-content: center
    margin: 0 auto
    width: 100%

    @media screen and (max-width: 1200px)
      display: grid
      grid-template-columns: repeat(2, 1fr)

    h2
      grid-column: 1/-1
      margin: 5px 0 20px
      text-align: center
      width: 100%

      @media screen and (max-width: 1200px)
        margin: 0

    & > div
      align-items: center
      display: flex
      justify-content: center

      &:not(:first-of-type)
        margin-left: 20px

      @media screen and (max-width: 1200px)
        margin-top: 20px

        &:not(:first-of-type)
          margin-left: 0

      .ingredient
        text-align: right
        max-width: 8ch
        width: 100%

      .value
        appearance: none
        border: solid #7ac7c4 1px
        border-radius: 5px
        margin: 0 5px
        padding: 5px
        text-align: center
        width: 7ch
</style>