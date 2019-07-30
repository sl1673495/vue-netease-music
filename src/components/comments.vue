<template>
  <div class="comment">
    <template v-if="loading">
      <Loading :loading="loading" />
    </template>
    <template v-else>
      <div
        class="block"
        v-if="hotComments.length && currentPage === 1"
      >
        <p class="title">
          精彩评论
        </p>
        <Comment
          :key="comment.id"
          :comment="comment"
          :border="!$utils.isLast(index, hotComments)"
          v-for="(comment, index) in hotComments"
        />
      </div>
      <div
        class="block"
        v-if="comments.length"
      >
        <p
          class="title"
          ref="commentTitle"
        >
          最新评论 <span class="count">({{total}})</span>
        </p>
        <Comment
          :key="comment.id"
          :comment="comment"
          :border="!$utils.isLast(index, comments)"
          v-for="(comment,index) in comments"
        />
      </div>
      <div
        v-if="comments.length"
        class="pagination"
      >
        <el-pagination
          layout="prev, pager, next"
          :page-size="PAGE_SIZE"
          :total="total"
          :current-page.sync="currentPage"
          @current-change="onPageChange"
        />
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSongComment, getPlaylistComment, getHotComment } from '@/api/comment'
import Comment from './comment'

const SONG_TYPE = 'song'
const PLAYLIST_TYPE = 'playlist'
const PAGE_SIZE = 20
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: SONG_TYPE
    }
  },
  created() {
    this.PAGE_SIZE = PAGE_SIZE
  },
  data() {
    return {
      loading: false,
      hotComments: [],
      comments: [],
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    async getComment() {
      this.loading = true
      const commentReuqest = ({
        [PLAYLIST_TYPE]: getPlaylistComment,
        [SONG_TYPE]: getSongComment
      })[this.type]
      const { hotComments = [], comments = [], total } = await commentReuqest(
        {
          id: this.id,
          pageSize: PAGE_SIZE,
          offset: (this.currentPage - 1) * PAGE_SIZE
        })
        .finally(() => {
          this.loading = false
        })
      // 歌单的热评需要重新获取
      if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
        const { hotComments: exactHotComments = [] } = await getHotComment({
          id: this.id,
          type: 2 // 歌单type
        })
        this.hotComments = exactHotComments
      } else {
        this.hotComments = hotComments
      }
      this.comments = comments
      this.total = total
      this.$emit('update', { comments, hotComments, total })
    },
    async onPageChange() {
      await this.getComment()
      this.$nextTick(() => {
        this.$refs.commentTitle.scrollIntoView({ behavior: "smooth" })
      })
    }
  },
  watch: {
    id: {
      handler(newId) {
        if (newId) {
          this.getComment()
        }
      },
      immediate: true
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 48px;

  .title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-bottom: 4px;

    .count {
      font-size: $font-size;
    }
  }
}

.pagination {
  text-align: right;
  margin-bottom: 36px;
}
</style>
