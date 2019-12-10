<script>
export default {
  name: 'container',
  data () {
    return {

    }
  },
  methods: {
    openBaidu () {
      window.open('app://test?name=xin')
    }
  }
}
</script>

<template>
<div>
  <button type="button" @click="openBaidu">open baidu</button>
  <button>open yunzhijia</button>
</div>
  
</template>
