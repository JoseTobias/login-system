<template lang="pug">
  .form-content
    h3 Login
    form.signup-form(action="#" @submit.prevent="submit")
      .group
        label(:class="{ invalid: $v.userName.$dirty && $v.userName.$invalid }" for="signup-user" class="label") Nome de usuário
        input(@input="$v.userName.$touch()" :class="{ invalid: $v.userName.$dirty && $v.userName.$invalid }" id="signup-user-name" type="text" class="input" v-model="userName")

      .group
        label(:class="{ invalid: $v.password.$dirty && $v.password.$invalid }" for="signup-pass1" class="label") Senha
        input(@input="$v.password.$touch()" :class="{ invalid: $v.password.$dirty && $v.password.$invalid }" id="signup-pass1" type="password" class="input" data-type="password" v-model="password")
      
      .group
        input(type="submit" class="button" value="Sign in")

      .foot-lnk
        a(href="#" @click.prevent="cadastrar") Cadastrar
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'login-form',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['clearError']),
    submit () {
      if (!this.$v.$invalid) {
        this.$emit('signin', { ...this.$data })
      } else {
        this.$v.$touch()
      }
    },
    cadastrar() {
      this.clearError()
      this.$router.push('/signup')
    }
  },
  validations: {
    userName: {
      required,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>

