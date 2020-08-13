<template lang="pug">
  .signup-page.container
    p.error(v-if="error") {{ error }}
    signup-form(
      @submit="signup"
      title='Signup'
      :passwordRequired="true"
      buttonName="Cadastrar"
      textLink="Já possui uma conta?"
      @foot-lnk="login"
      )
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Signup',
  components: {
    SignupForm
  },
  methods: {
    ...mapActions(['register', 'clearError']),
    async signup(payload) {
      await this.register(payload)
      if(!this.error) {
        this.$router.push(`/${this.user.userName}`)
      }
    },
    login() {
      this.clearError()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['error', 'user']),
  }
}
</script>

<style lang="scss" scoped>
.signup-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
