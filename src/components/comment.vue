<template>
  <div
    v-if="comment"
    class="comment"
  >
    <div class="avatar">
      <img :src="$utils.genImgUrl(comment.user.avatarUrl, 80)" />
    </div>
    <div
      class="content"
      :class="{ border }"
    >
      <p class="comment-text">
        <span class="username">
          {{comment.user.nickname}}:
        </span>
        <span class="text">
          {{comment.content}}
        </span>
      </p>
      <div
        class="replied"
        v-if="comment.beReplied.length"
      >
        <p class="comment-text">
          <span class="username">
            {{comment.beReplied[0].user.nickname}}:
          </span>
          <span class="text">
            {{comment.beReplied[0].content}}
          </span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">
          {{$utils.formatDate(comment.time)}}
        </span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['comment', 'border']
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  padding-top: 20px;

  .avatar {
    @include img-wrap(40px);
    margin-right: 12px;

    img {
      border-radius: 50%;
    }
  }

  .content {
    padding-bottom: 20px;
    width: 100%;
    font-size: $font-size-sm;

    &.border {
      border-bottom: 1px solid var(--border);
    }

    .replied {
      padding: 8px;
      margin-top: 8px;
      background: var(--song-shallow-grey-bg);
      border-radius: 4px;
    }

    .comment-text {
      .username {
        color: $blue;
      }

      .text {
        line-height: 1.5;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      .date {
        color: var(--font-color-grey-shallow);
      }
    }
  }
}
</style>
