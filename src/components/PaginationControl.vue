<template>
  <div class="wrapper">
    <div class="inner">
      <div v-for="(page, index) in available_pages" :key="page + ' ' + index">
        <span class="dots" v-if="index && page - available_pages[index-1] > 1">...</span>
        <a class="link" :class="{ active: page === current }" href="#" @click.prevent="onPageChange(page)">{{ page }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    start: Number,
    end: Number,
    initial_current: Number,
  },
  computed: {
    available_pages() {
      return [...new Set([this.start, this.current - 1, this.current, this.current + 1, this.end])]
          .filter(el => el >= this.start && el <= this.end)
          .sort((a,b) => a-b)
    }
  },
  data() {
    return {
      current: this.initial_current || 1,
    }
  },
  methods: {
    onPageChange(page) {
      this.current = page;
      this.$emit('change-page', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100vw;
    height: 60px;
    background: rgba(0,0,0,0.9);
    color: #fff;
    display: flex;
    z-index: 2;
    user-select: none;
  }

  .inner {
    margin: auto;
    display: flex;
  }

  .dots {
    font-size: 13px;
    margin: 8px;
  }

  .link {
    color: inherit;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    margin: 6px;

    &.active {
      font-size: 18px;
      font-weight: 700;
    }
  }
</style>