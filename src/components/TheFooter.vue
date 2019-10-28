<template>
  <b-container class="text-center py-2">
    <b-link :href="parent">
      🦄
    </b-link>
    <b-link :href="bugs">
      🐞
    </b-link>
  </b-container>
</template>

<script>
export default {
  props: {
    parent: String,
    bugs: String
  }
}
</script>
