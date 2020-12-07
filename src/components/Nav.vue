<template>
  <div class="nav">
    <header>
      <span></span>
      <div class="title">{{ navTitle }}</div>
      <svg class="icon" @click="$emit('navIconClicked',$event)">
        <use :xlink:href="`#icon-${iconName}`"/>
      </svg>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <router-link to="/diaryList" active-class="selected">
        <svg class="icon">
          <use xlink:href="#icon-diary"/>
        </svg>
      </router-link>
      <router-link to="/label" active-class="selected">
        <svg class="icon">
          <use xlink:href="#icon-label"/>
        </svg>
      </router-link>
      <router-link to="/add" active-class="selected">
        <svg class="icon add">
          <use xlink:href="#icon-add"/>
        </svg>
      </router-link>
      <router-link to="/statistics" active-class="selected">
        <svg class="icon">
          <use xlink:href="#icon-statistics"/>
        </svg>
      </router-link>
      <router-link to="/user" active-class="selected">
        <svg class="icon">
          <use xlink:href="#icon-user"/>
        </svg>
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    navTitle:{
      type:String
    },
    iconName:{
      type: String
    }
  },
}
</script>

<style scoped lang="scss">
$mainColor: #ffc7c7;
$radius: 4px;
$mainPadding: 2rem;
.nav {
  background: #FFF;
  height: 100%;
  display: flex;
  flex-direction: column;

  > header {
    padding: 0 $mainPadding;
    background: $mainColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.4rem;
    flex-shrink: 0;
    font-size: 1.4rem;

    > .icon {
      font-size: 1em;
      color:#666666;
    }
  }

  > main {
    flex-grow: 1;
    overflow: auto;
  }

  > footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.4rem;
    padding: 0 $mainPadding;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;

    > a > .icon {
      font-size: 1.5em;
      color: #707070;

      &.add {
        color: #1989fa;
      }

    }

    > .selected > .icon {
      color: #ffc7c7;
    }
  }
}
</style>