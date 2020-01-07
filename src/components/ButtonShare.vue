<template lang="pug">
b-button(:href="link")
  .
    partager sur twitter
</template>
<script>
export default {
  props: ['text', 'target', 'via'],
  computed: {
    link () {
      const url = 'https://twitter.com/intent/tweet'
      const text = this.text
      const target = this.target
      const via = this.via

      return `${url}?text=${text}&url=${target}&via=${via}`
    }
  }
}
</script>
