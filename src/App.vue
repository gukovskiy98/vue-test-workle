<template>
  <div id="app">
    <loading-overlay :is_visible="is_loading" />
    <div class="images-wrapper">
      <div class="no-data-message" v-if="!items.length && !is_loading">No data to show</div>
      <photo-item v-for="item in items" :item="item" :key="item.id"/>
    </div>
    <pagination-control class="pagination" @change-page='onPageChange' :start="1" :end="total_pages" :initial_current="current_page"/>
  </div>
</template>

<script>
import constants from '@/constants';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import PaginationControl from "@/components/PaginationControl";
import PhotoItem from "@/components/PhotoItem";

export default {
  name: 'App',
  components: {
    LoadingOverlay,
    PaginationControl,
    PhotoItem
  },
  methods: {
    onPageChange(page) {
      this.current_page = page;
      this.is_loading = true;
      this.updateData()
    },
    async updateData(page = this.current_page) {
      await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=${constants.PER_PAGE}`, {
        method: 'GET',
        headers: {
          'Authorization': `Client-ID ${constants.CLIENT_ID}`,
        }
      }).then(res => {
        this.is_loading = false;

        if (res.ok) {
          return res.json();
        }

        throw new Error('error while fetching images');
      }).then(data => {
        this.items = data.map(el => {
          return {
            id: el.id,
            full_name: el.user.name || '',
            user_name: '@' + el.user.username || '',
            user_icon_src: el.user.profile_image.medium || '',
            user_link: el.user.links.html || '',
            likes: el.likes || 0,
            src: el.urls.raw,
            alt: 'unable to load image',
          }
        })
      }).catch(err => {
        console.error(err);
      });
    }
  },
  updated() {

  },
  async mounted() {
    await this.updateData();
  },
  data() {
    return {
      is_loading: true,
      current_page: 1,
      total_pages: constants.TOTAL_PAGES,
      items: [],
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
  max-width: 660px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.pagination  {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.images-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 60px;
  justify-content: center;
}

.no-data-message {
  font-size: 28px;
  margin: auto;
}
</style>
