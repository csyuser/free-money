<template>
  <div class="label">
    <Nav navTitle="标签管理" icon-name="addLabel" class="labelMain">
      <div class="manageLabel">
        <span class="status" @click="toggleStatus">{{ status }}</span>
        <ul>
          <li @click="manageLabel(label)" v-for="(label) in labelList" :key="label.id">
            <span class="checkbox" v-show="checkbox">
              <svg class="icon" v-show="selectedLabels.indexOf(label)<0">
                <use xlink:href="#icon-unselected"/>
              </svg>
              <svg class="icon selectedIcon" v-show="selectedLabels.indexOf(label)>=0">
                <use xlink:href="#icon-selected"/>
              </svg>
            </span>
            {{ label.name }}
          </li>
        </ul>
      </div>
      <div class="manage" v-show="checkbox">
          <span class="checkbox" @click="selectAll">
              <svg class="icon" v-show="!selected">
                <use xlink:href="#icon-unselected"/>
              </svg>
              <svg class="icon selectedIcon" v-show="selected">
                <use xlink:href="#icon-selected"/>
              </svg>
            全选
          </span>
        <div>
          <div class="edit button">编辑</div>
          <div class="delet button">删除</div>
        </div>
      </div>
    </Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Group',
  components: {Nav},
  data() {
    return {
      status: '管理',
      selected: false,
      checkbox: false,
      selectedLabels: [],
      labelList: [
        {name: '标签1', id: '1',},
        {name: '标签1', id: '2',},
        {name: '标签1', id: '3',},
        {name: '标签1', id: '4',}
      ]
    }
  },
  methods: {
    manageLabel(tag) {
      if (!this.checkbox) { return } else {
        const index = this.selectedLabels.indexOf(tag)
        if (index >= 0) {
          this.selectedLabels.splice(index, 1)
        } else {
          this.selectedLabels.push(tag)
        }
      if (this.labelList.length === this.selectedLabels.length){
        this.selected = true
      }
      }

    },
    addLabel() {

    },
    toggleStatus() {
      if (this.status === '管理') {
        this.checkbox = true
        this.status = '完成'
      } else {
        this.checkbox = false
        this.status = '管理'
        this.selectedLabels = []
        this.selected = false
      }
    },
    selectAll() {
      if (this.selected){
        this.selectedLabels = []
        this.selected = false
      }else{
        this.selectedLabels = this.labelList
        this.selected = true
      }
    },
  }
}
</script>

<style scoped lang="scss">

.label {
  height: 100%;

  .labelMain {
    position: relative;
    .manageLabel {
      padding: 3rem 2rem 0;
      position: relative;

      > .status {
        position: absolute;
        top: 10px;
        right: 2rem;
        font-size: 1.2rem;
        color: #666666;
      }

      > ul {
        > li {
          padding-bottom: 5px;
          padding-left: 5px;
          border-bottom: 1px solid #e6e6e6;
          margin-bottom: 1em;

          > .checkbox > .icon {
            font-size: 1.1em;
            color: #dcdcdc;
            margin-right: 5px;

            &.selectedIcon {
              color: #ffc7c7
            }
          }
        }
      }

    }
    .manage {
      position: absolute;
      bottom: 4.4rem;
      width: 100%;
      display: flex;
      align-items: center;
      background: #fafafa;
      justify-content:space-between;
      > span {
        display: inline-block;
        padding: 1.5rem 2.5rem;
        color: #666666;
        > .icon {
          font-size: 1.1em;
          color: #dcdcdc;
          margin-right: 5px;

          &.selectedIcon {
            color: #ffc7c7
          }
        }
      }
      >div{
        display: flex;
        padding-right: 2rem;
        > .button{
          &:first-child{ margin-right: 1em;}
          padding: 0 6px;
          color: #ffc7c7;
          border: 1px solid #ffc7c7;
          border-radius: 10px;

        }
      }
    }
  }


}

</style>