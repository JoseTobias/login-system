<template lang="pug">
  .form-content
    h3 {{ title }}
    form(action="#" @submit.prevent="submit")
      .group
        label(:class="{ invalid: $v.firstName.$dirty && $v.firstName.$invalid }" for="signup-user" class="label") Nome
        input(@input="$v.firstName.$touch()" :class="{ invalid: $v.firstName.$dirty && $v.firstName.$invalid }" id="signup-name" type="text" class="input" v-model="firstName")
      
      .group
        label(:class="{ invalid: $v.lastName.$dirty && $v.lastName.$invalid }" for="signup-user" class="label") Sobrenome
        input(@input="$v.lastName.$touch()" :class="{ invalid: $v.lastName.$dirty && $v.lastName.$invalid }" id="signup-lastName" type="text" class="input" v-model="lastName")

      .group
        label(:class="{ invalid: $v.email.$dirty && $v.email.$invalid }" for="email" class="label") Email
        input(@input="$v.email.$touch()" :class="{ invalid: $v.email.$dirty && $v.email.$invalid }" id="signup-email" type="text" class="input" v-model="email")
      
      .group
        label(:class="{ invalid: $v.userName.$dirty && $v.userName.$invalid }" for="signup-user" class="label") Nome de usuário
        input(@input="$v.userName.$touch()" :class="{ invalid: $v.userName.$dirty && $v.userName.$invalid }" id="signup-user-name" type="text" class="input" v-model="userName")

      .group
        label(:class="{ invalid: $v.cpf.$dirty && $v.cpf.$invalid }" for="signup-user" class="label") CPF
        input(@input="$v.cpf.$touch()" @keyup="formatCPF" :class="{ invalid: $v.cpf.$dirty && $v.cpf.$invalid }" id="signup-cpf" type="text" class="input" v-model="cpf")

      .group
        label(:class="{ invalid: $v.fone.$dirty && $v.fone.$invalid }" for="signup-user" class="label") Celular
        input(@input="$v.fone.$touch()" @keyup="formatFone" :class="{ invalid: $v.fone.$dirty && $v.fone.$invalid }" id="signup-fone" type="text" class="input" v-model="fone")

      .group(v-if="passwordRequired")
        label(:class="{ invalid: $v.password.$dirty && $v.password.$invalid }" for="signup-pass1" class="label") Senha
        input(@input="$v.password.$touch()" :class="{ invalid: $v.password.$dirty && $v.password.$invalid }" id="signup-pass1" type="password" class="input" data-type="password" v-model="password")
      
      .group(v-if="passwordRequired")
        label(:class="{ invalid: $v.password2.$dirty && $v.password2.$invalid }" for="signup-pass2" class="label") Confirme a senha
        input(@input="$v.password2.$touch()" :class="{ invalid: $v.password2.$dirty && $v.password2.$invalid }" id="signup-pass2" type="password" class="input" data-type="password" v-model="password2")
      
      .group
        input(type="submit" class="button" :value="buttonName")

      .foot-lnk
        a(href="#" @click.prevent="emitEvent") {{ textLink }}
      
    </form>
</template>

<script>
import { required, sameAs, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'signup-from',
  props: {
    user: {
      required: false,
      type: Object
    },
    title: {
      required: true,
      type: String
    },
    passwordRequired: {
      required: true,
      type: Boolean
    },
    buttonName: {
      required: true,
      type: String
    },
    textLink: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      userName: '',
      cpf: '',
      fone: '',
      password: '',
      password2: '',
      email: ''
    }
  },
  methods: {
    submit () {
      if (!this.$v.$invalid) {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          cpf: this.cpf.replace(/[^\d]/g, ""),
          fone: this.fone.replace(/[^\d]/g, ""),
          password: this.password,
          email: this.email
        }
        this.$emit('submit', data)
      } else {
        this.$v.$touch()
      }
    },
    emitEvent() {
      this.$emit('foot-lnk')
    },
    formatCPF() {
      let cpf = this.cpf
      cpf = cpf.replace(/[^\d]/g, "")
      this.cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      if(this.cpf.length >= 15){
        this.cpf = this.cpf.slice(0, -1);
      }
    },
    formatFone() {
      let fone = this.fone
      fone = fone.replace(/[^\d]/g, "")
      this.fone = fone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")
      if(this.fone.length >= 17){
        this.fone = this.fone.slice(0, -1);
      }
    },
    copyData() {
      for(const data in this.user) {
        this[data] = this.user[data]
        if(data === 'cpf') {
          this.formatCPF()
        }
        if(data === 'fone') {
          this.formatFone()
        }
      }
    }
  },
  mounted() {
    if(this.user) {
      this.copyData()
    }
  },
  validations() {
    const val = {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      userName: {
        required,
        minLength: minLength(5)
      },
      cpf: {
        required,
        minLength: minLength(14),
        maxLength: maxLength(14)
      },
      fone: {
        required,
        minLength: minLength(16),
        maxLength: maxLength(16)
      },
      email: {
        required,
        email
      },
    }
    if(this.passwordRequired) {
      return {
        ...val,
        password: {
          required,
          minLength: minLength(6)
        },
        password2: {
          required,
          sameAsPassword: sameAs('password')
        },
      }
    } else {
      return val 
    }
  }
}
</script>
