<template>
  <form>
    
    <v-text-field
      v-model="email"
      label="E-mail"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :counter="10"
      :error-messages="passwordErrors"
      label="Password"
      type="password"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      required
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      password: { required, maxLength: maxLength(10) },
      email: { required, email },
    },
    data: () => ({
      email: '',
      password: ''
    }),

    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.maxLength && errors.push('Password must be at most 10 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$store.dispatch("Login", {
          _email: this.email,
          _password: this.password
        })
        .then(success => {
          console.log("success")
        })
        .catch(err => {
          console.log(err)
        })
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password= ''
      },
    },
  }
</script>
