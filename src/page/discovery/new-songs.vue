<template>
  <div class="new-songs">
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div class="list"
           :key="listIndex"
           v-for="(list, listIndex) in thunkedList">
        <StripedList v-if="list.length"
                     :source="list">
          <NewSongCard v-for="(item,index) in list"
                       :order="getSongOrder(listIndex, index)"
                       :key="item.id"
                       :img="item.song.album.blurPicUrl"
                       :name="item.name"
                       :artists="item.song.artists" />
        </StripedList>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/base/title";
import StripedList from "@/base/striped-list";
import NewSongCard from "@/components/new-song-card";

const songsLimit = 10;
export default {
  async created() {
    const { result } = await this.$request(
      `/personalized/newsong?limit=${songsLimit}`
    );
    this.list = result;
  },
  data() {
    return {
      chunkLimit: Math.ceil(songsLimit / 2),
      list: []
    };
  },
  methods: {
    getSongOrder(listIndex, index) {
      return listIndex * this.chunkLimit + index + 1;
    }
  },
  computed: {
    thunkedList() {
      return [
        this.list.slice(0, this.chunkLimit),
        this.list.slice(this.chunkLimit, this.list.length)
      ];
    }
  },
  components: { Title, StripedList, NewSongCard }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  display: flex;

  .list {
    flex: 1;
  }
}
</style>