<template>
  <b-button
    :variant="variant"
    @mouseover="previewChange"
    @mouseleave="restore"
  >
    <b-spinner
      small
      :variant="(isPrivate)?'secondary':'light'"
      v-if="waiting"
    />
    <span v-else>{{ message }}</span>
  </b-button>
</template>

<script>
export default {
  props: {
    isPrivate: {
      type: Boolean,
      default: false
    },
    waiting: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      variant: '',
      message: ''
    }
  },
  created () {
    this.restore()
  },
  watch: {
    waiting: function () {
      if (!this.waiting) this.restore()
      else this.message = ''
    }
  },
  methods: {
    previewChange: function () {
      this.variant = (this.isPrivate) ? 'success' : 'secondary'
      this.message = (this.isPrivate) ? 'publier' : 'dépublier'
    },
    restore: function () {
      this.variant = (this.isPrivate) ? 'outline-secondary' : 'success'
      this.message = (this.isPrivate) ? 'privé' : 'public'
    }
  }
}
</script>
