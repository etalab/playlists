<template>
  <Layout>
    <client-only>
      <group-edit />
    </client-only>
  </Layout>
</template>

<script>
import GroupEdit from '~/components/GroupEdit'

export default {
  components: {
    GroupEdit
  }
}
</script>
