<template lang="pug">
  .user-page.container
    p.error(v-if="error") {{ error }}
    signup-form(@submit="updateUser"
      :user="user"
      title='Dados do Usuário'
      :passwordRequired="false"
      buttonName="Salvar"
      textLink="Desconectar"
      @foot-lnk="leave"
    )
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'User',
  components: {
    SignupForm
  },
  methods: {
    ...mapActions(['update', 'logout']),
    async updateUser(payload) {
      await this.update(payload)
      if(!this.error) {
        this.$router.go(`/${this.user.userName}`)
      }
    },
    leave() {
      this.logout()
    }
  },
  computed: {
    ...mapGetters(['user', 'error']),
  }
}
</script>

<style lang="scss">
.user-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  form {
    .group {
      .input {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        color: #34495E;
        border-bottom: 2px solid rgba(52, 73, 94, 0.0);
        &:focus {
          border-bottom-color: #34495E;
        }
        &.invalid {
          border-color: red;
        }
      }
    }
  }
}
</style>
