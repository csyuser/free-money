<template>
  <div class="label">
    <Nav navTitle="标签管理" icon-name="addLabel" class="labelMain" @navIconClicked="addLabel">
      <div class="manageLabel">
        <span class="status" @click="toggleStatus">{{ status }}</span>
        <ul v-for="listGroup in labelList" :key="listGroup.type">
          <div class="title">{{ formatLabel(listGroup.type) }}</div>
          <li @click="manageLabel(list)" v-for="list in listGroup.list" :key="list.id">
            <span class="checkbox" v-show="checkbox">
              <svg class="icon" v-show="selectedLabels.indexOf(list)<0">
                <use xlink:href="#icon-unselected"/>
              </svg>
              <svg class="icon selectedIcon" v-show="selectedLabels.indexOf(list)>=0">
                <use xlink:href="#icon-selected"/>
              </svg>
            </span>
            {{ list['Title'] }}
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
          <div class="edit button" @click="updateLabel">编辑</div>
          <div class="delet button" @click="deleteLabel">删除</div>
        </div>
      </div>
      <van-dialog class="updateDialog" v-model="showUpdateDialog" :title="dialogTitle" @confirm="changeName"
                  show-cancel-button>
        <van-field v-model="labelName" placeholder="标签名"/>
        <van-field v-model="description" placeholder="描述"/>
      </van-dialog>
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
      labelName: '',
      showUpdateDialog: false,
      dialogTitle: '',
      description: '',
      labelList: [],
      allList: []
    }
  },
  mounted() {
    this.$store.commit('fetch')
    this.axios.get(this.prefixAddr + '/tag/list', {
      params: {token: this.$store.state.token}
    }).then(res => {
      if (res.data['Code'] === 0) {
        const resData = res.data.Res
        resData.sort((a, b) => a.Type - b.Type)
        const result = []
        result.push({type: resData[0].Type, list: [resData[0]]})
        for (let i = 1; i < resData.length; i++) {
          const last = result[result.length - 1]
          if (resData[i].Type === last.type) {
            last.list.push(resData[i])
          } else {
            result.push({type: resData[i].Type, list: [resData[i]]})
          }
        }
        this.labelList = result
        this.allList = res.data.Res
      } else {
        this.$toast.fail(res.data.Msg)
      }
    })
        .catch()
  },
  methods: {
    formatLabel(type) {
      if (type === 1) {
        return '心情'
      } else if (type === 2) {
        return '天气'
      }else {
        return '其他'
      }
    },
    manageLabel(tag) {
      if (!this.checkbox) { return } else {
        const index = this.selectedLabels.indexOf(tag)
        if (index >= 0) {
          this.selectedLabels.splice(index, 1)
        } else {
          this.selectedLabels.push(tag)
        }
        if (this.allList.length === this.selectedLabels.length) {
          this.selected = true
        }
      }
    },
    addLabel() {
      this.dialogTitle = '添加标签'
      this.labelName = ''
      this.showUpdateDialog = true
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
      if (this.selected) {
        this.selectedLabels = []
        this.selected = false
      } else {
        this.selectedLabels = this.allList
        this.selected = true
      }
    },
    updateLabel() {
      if (this.selectedLabels.length === 1) {
        this.dialogTitle = '编辑标签'
        this.showUpdateDialog = true
        this.labelName = this.selectedLabels[0].name
      } else {
        this.$dialog.alert({
          message: '请选择一个标签',
        })
      }
    },
    changeName() {
      console.log(this.labelName)
      console.log(this.selectedLabels)
    },
    deleteLabel() {
      if (this.selectedLabels.length >= 1) {
        this.$dialog.confirm({
          message: '确定删除标签吗',
        })
            .then(() => {
              console.log(this.selectedLabels)
            })
            .catch(() => {
              // on cancel
            })
      } else {
        this.$dialog.alert({
          message: '请选择至少一个标签',
        })
      }
    }
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
        > .title {
          padding: 1rem 0;
          font-weight: bold;
        }

        > li {
          padding-bottom: 5px;
          padding-left: 10px;
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
      justify-content: space-between;

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

      > div {
        display: flex;
        padding-right: 2rem;

        > .button {
          &:first-child {
            margin-right: 1em;
          }

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