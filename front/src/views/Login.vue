<template lang="pug">
  .signin-page.container
    p.error(v-if="error") {{ error }}
    login-form(@signin="signin")
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['login']),
    async signin(payload) {
      await this.login(payload)
      if(!this.error) {
        this.$router.push(`/${this.user.userName}`)
      }
    }
  },
  computed: {
    ...mapGetters(['error', 'user']),
  }
}
</script>

<style lang="scss" scoped>
.signin-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>
