<template>
  <v-app id="inspire">
    <v-content>
      <div class="text-center">
        <v-progress-circular
        :size="30"
        v-if="progressCircular"
        indeterminate
        color="primary"
        ></v-progress-circular>
      </div>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >Sign in to All Recipes</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form>
                          <v-text-field
                            v-model="loginEmail"
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          />

                          <v-text-field
                            v-model="loginPassword"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" @click="signIn" dark>SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Cooker!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and show us your recipes</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form v-model="valid">
                          <v-text-field
                            v-model="registrationName"
                            label="Name"
                            :rules="nameRules"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            required
                          />
                          <v-text-field
                            v-model="registrationEmail"
                            :rules="emailRules"
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            required
                          />

                          <v-text-field
                            v-model="registrationPassword"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                          <v-text-field
                            v-model="confirmPassword"
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" @click="signUp" dark>SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
        <div>
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            :top="true">
            {{snackbarText}}
          </v-snackbar>
        </div>
        
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    snackbar: false,
    progressCircular: false,
    snackbarText: '',
    timeout: 4000,
    isLoading: false,
    valid: false,
    loginEmail: '',
    loginPassword: '',
    registrationName: '',
    registrationEmail: '',
    registrationPassword: '',
    confirmPassword: '',
    step: 1,
    nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 50 || 'Name must be less than 50 characters',
      ],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
  }),
  methods: {
      signIn() {
        this.progressCircular = true
          this.$store.dispatch("SignIn", {
              email: this.loginEmail,
              password: this.loginPassword
          })
          .then(success=> {
            this.progressCircular = false
            this.$router.push("/")
            // location.reload()
              // console.log("successfully logged in");
          })
          .catch(err => {
            this.progressCircular = false
            this.snackbar = true,
            this.snackbarText = 'Either email or password is incorrect. please try again'
            this.loginEmail = '',
            this.loginPassword = ''
          })
      },
      signUp() {
          this.$store.dispatch("SignUp", {
              fullname: this.registrationName,
              email: this.registrationEmail,
              password: this.registrationPassword
          })
          .then(sucess => {
              this.snackbar = true
              this.snackbarText = 'successfully registered'
              this.step--
          })
          .catch(err => {
            this.snackbarText = 'Error while registration. Please try again'
          })
      }
  },
  props: {
    source: String
  }
};
</script>
