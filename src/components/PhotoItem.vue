<template>
  <div class="photo-wrapper">
    <div class="content-top">
      <img class="user-pic" :src="item.user_icon_src" />
      <div class="user-name">{{ item.full_name }}</div>
      <a class="user-link" :href="item.user_link" target="_blank">{{ item.user_name }}</a>
    </div>
    <img class="content-middle" :width="PREVIEW_W + 'px'" :src="preview_src" :alt="item.alt" />
    <div class="content-bottom">
      <span class="likes-count">{{ likes_with_spaces }}</span>
      <img class="eye" src="../assets/eye.svg" />
    </div>
  </div>
</template>

<script>
import constants from '@/constants';

// чтобы мыла на телефонах не было
const multiplier = window.devicePixelRatio;

export default {
  props: {
    item: Object,
  },
  computed: {
    preview_src() {
      return `${this.item.src}&w=${constants.PREVIEW_W * multiplier}&fit=max`
    },
    likes_with_spaces() {
      return this.item.likes.toLocaleString();
    }
  },
  created() {
    this.PREVIEW_W = constants.PREVIEW_W;
  },
}
</script>

<style lang="scss" scoped>
  .photo-wrapper {
    display: flex;
    flex-direction: column;
    font-size: 12px;
  }

  .content-top {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    height: 50px;
    padding: 10px;
  }

  .content-middle {
    max-width: 100vw;
  }

  .content-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
  }

  .user-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    font-weight: 700;
  }

  .user-link {
    color: #8D8D8D;
    text-decoration: none;
  }

  .likes-count {
    font-weight: 700;
    color: #8D8D8D;
    margin-right: 5px
  }

  .eye {
    width: 18px;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    .content-top {
      padding-left: 0;
    }

    .content-bottom {
      padding-right: 0;
    }
  }
</style>