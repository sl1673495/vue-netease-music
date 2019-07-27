<template>
  <div class="comment">
    <div
      class="block"
      v-if="hotComments.length"
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
      <p class="title">
        最新评论
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
  </div>
</template>

<script type="text/ecmascript-6">
import { getSongComment } from '@/api/comment'
import Comment from './comment'

const PAGE_SIZE = 20
export default {
  props: ['id'],
  created() {
    this.PAGE_SIZE = PAGE_SIZE
  },
  data() {
    return {
      hotComments: [],
      comments: [],
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    async getComment() {
      const { hotComments = [], comments = [], total } = await getSongComment({
        id: this.id,
        pageSize: PAGE_SIZE,
        offset: (this.currentPage - 1) * PAGE_SIZE
      })
      this.hotComments = hotComments
      this.comments = comments
      this.total = total
    },
    async onPageChange(page) {
      await this.getComment()
      this.$nextTick(() => {
        this.$emit('pageChange', page)
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
    font-weight: $font-weight-bold;
    margin-bottom: 4px;
  }
}

.pagination {
  text-align: right;
  margin-bottom: 36px;
}
</style>
