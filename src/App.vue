<template>
  <masonry-wall
    :items="getList"
    :ssr-columns="2"
    :column-width="setColWidth"
    :gap="gap"
  >
    <template #default="{ item, index }">
      <img :src="item.download_url" />
      <div class="content">
        <h5 class="author">{{ index + 1 }}. {{ item.author }}</h5>
        <p class="id">Id: {{ item.id }}</p>
      </div>
    </template>
  </masonry-wall>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "App",
  data() {
    return {
      windowWidth: null,
      getList: [],
      containerId: 1,
      gap: 16,
      page: 1,
    };
  },
  computed: {
    setColWidth() {
      const w = this.windowWidth / 2 - this.gap * 3;
      return w;
    },
  },
  created() {
    this.windowWidth = window.innerWidth;
    this.getItems();
    window.addEventListener("resize", this.resizeListener);
    window.addEventListener("scroll", this.addScrollListener);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeListener);
    window.removeEventListener("scroll", this.addScrollListener);
  },
  methods: {
    resizeListener() {
      this.windowWidth = window.innerWidth;
    },
    addScrollListener() {
      const docEl = document.documentElement;
      if (!docEl.scrollTop) return;
      if (docEl.scrollTop + window.innerHeight >= docEl.scrollHeight - 100) {
        this.page += 1;
        this.getItems();
      }
    },
    async getItems() {
      const limit = 10;
      await axios
        .get(`https://picsum.photos/v2/list?page=${this.page}&limit=${limit}`)
        .then((response) => {
          const existList = [...this.getList];
          const newList = [...response.data];
          this.getList = existList.concat(newList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/main.scss";
</style>
