<script>
import container from './container'
export default {
  name: 'test',
  components: {
    container
  },
  data () {
    return {
       text: ''
    }
  }
}
</script>

<template>
<div>
  <h2>Hello from {{text}}</h2>
  <container></container>
</div>
</template>


