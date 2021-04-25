<template>
<v-main>
<h2>Add your recipe</h2>
<br/>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required"
      >
        <v-text-field
          v-model="name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="Description"
        :rules="{
          required: true
        }"
      >
        <v-textarea
            v-model="description"
          solo
          :error-messages="errors"
          name="description"
          label="add description"
        ></v-textarea>
      </validation-provider>
      
      <div>
      <v-btn class="primary" @click="uploadImage">Upload</v-btn>
      <input type="file" 
      style="display: none" ref="fileInput" accept="image/*"
       @change="onImageUpload"/>
      </div>
      <v-layout>
        <v-flex xs12 sm6>
      <validation-provider
        v-slot="{ errors }"
        name="Image"
        :rules="{
          required: true
        }"
      >
      <v-text-field v-model="imageUrl" style="display: none"></v-text-field>
      <v-img :src="imageUrl" height="150" :aria-errormessage="errors" width="200"/>
      </validation-provider>
        </v-flex>
      </v-layout>
      <br/>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        Add Recipe
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
</v-main>
    
</template>
<script>
  import { required, digits } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    
  setInteractionMode('eager')


  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })


  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      description: '',
      imageUrl: '',
      image: null
    }),

    methods: {
      submit () {
        if(!this.image) {
          alert('please upload emage')
          this.$refs.observer.reset()
        }
        const recipe_data = {
          name: this.name,
          description: this.description,
          image: this.image
        }
          this.$store.dispatch('addRecipe', recipe_data)
        this.$refs.observer.validate()
        this.name='',
        this.description='',
        this.imageUrl=null,
        this.$refs.observer.reset()
        this.$router.push('/detail-recipe')
      },
      clear () {
        this.name = ''
        this.description = ''
        this.imageUrl = null
        this.$refs.observer.reset()
      },
      uploadImage() {
        this.$refs.fileInput.click()
      },
      onImageUpload(event) {
        const files = event.target.files
        let fileName = files[0].name
        if(fileName.lastIndexOf('.') <= 0) {
          return alert('please add a valid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    },
  }
</script>