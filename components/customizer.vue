<template>
  <div id="customize">
    <h2>Ingredient Percentages</h2>
    <div>
      <span class="ingredient">salt</span>
      <input class="value" max="100" min="0" step="0.05" type="number" v-model="saltPercent" @change="setCustom()">
      <span>%</span>
    </div>
    <div>
      <span class="ingredient">{{ sugarType }}</span>
      <input class="value" max="100" min="0" step="0.05" type="number" v-model="sugarPercent" @change="setCustom()">
      <span>%</span>
    </div>
    <div>
      <span class="ingredient">oil</span>
      <input class="value" max="100" min="0" step="0.05" type="number" v-model="oilPercent" @change="setCustom()">
      <span>%</span>
    </div>
    <div>
      <span class="ingredient">yeast</span>
      <input class="value" max="100" min="0" step="0.05" type="number" v-model="yeastPercent" @change="setCustom()">
      <span>%</span>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    oilPercent() {
      if (this.recipeSelection !== 'custom') return false
      this.$router.push({ path: this.$route.fullPath, query: { oil: this.oilPercent } })
    },
    saltPercent() {
      if (this.recipeSelection !== 'custom') return false
      this.$router.push({ path: this.$route.fullPath, query: { salt: this.saltPercent } })
    },
    sugarPercent() {
      if (this.recipeSelection !== 'custom') return false
      this.$router.push({ path: this.$route.fullPath, query: { sugar: this.sugarPercent } })
    },
    yeastPercent() {
      if (this.recipeSelection !== 'custom') return false
      this.$router.push({ path: this.$route.fullPath, query: { yeast: this.yeastPercent, yeastType: this.yeastType } })
    }
  },
  computed: {
    oilPercent: {
      get() {
        return this.$store.state.ratios.oilPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_OIL_PERCENT', val)
      }
    },
    saltPercent: {
      get() {
        return this.$store.state.ratios.saltPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_SALT_PERCENT', val)
      }
    },
    sugarPercent: {
      get() {
        return this.$store.state.ratios.sugarPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_SUGAR_PERCENT', val)
      }
    },
    sugarType: {
      get() {
        return this.$store.state.ingredients.sugarType
      },
      set(val) {
        this.$store.commit('ratios/SET_SUGAR_TYPE', val)
      }
    },
    yeastPercent: {
      get() {
        return this.$store.state.ratios.yeastPercent
      },
      set(val) {
        this.$store.commit('ratios/SET_YEAST_PERCENT', val)
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
      color: #5A5A5A
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
        max-width: 5ch
        width: 100%

      .value
        appearance: none
        border: solid lighten(desaturate(#C44D58, 15), 20) 1px
        border-radius: 5px
        margin: 0 5px
        padding: 5px
        text-align: center
        width: 7ch
</style>