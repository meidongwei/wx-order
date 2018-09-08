<template>
  <!-- 公告 -->
  <MyDialog ref="dialogRef" title="本店公告">
    <template slot="body">
      <div class="list-group">
        <ul>
          <li v-for="item in activities">
            <span class="fonticon fonticon-red" v-if="item.type === 1">满</span>
            <span class="fonticon fonticon-red" v-if="item.type === 2">赠</span>
            <span class="fonticon fonticon-red" v-if="item.type === 3">特</span>
            <span class="fonticon fonticon-red" v-if="item.type === 4">折</span>
            <span class="fonticon fonticon-red" v-if="item.type === 5">惠</span>
            {{ item.title }}
          </li>
        </ul>
      </div>
    </template>
  </MyDialog>
</template>

<script>
import MyDialog from '@/components/dialog/dialog'
export default {
  components: { MyDialog },
  data () {
    return {
      activities: [], // 公告列表
    }
  },
  methods: {
    show (data) {
      this.activities = data.activities
      this.$refs.dialogRef.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group {
  padding: 15px 20px;
  ul {
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 8px 0;
      position: relative;
      color: #8d8d8d;
      span {
        margin-right: 8px;
      }
    }
    li::after {
      content: '';
      height: 1px;
      background-color: #eeeeee;
      transform: scaleY(.5);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
  }
}
</style>


