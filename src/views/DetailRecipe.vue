<template>
    <v-main>
        <v-container>
            <h1>Recipe Title</h1>
            <v-container>
                <v-row
                :align="align"
                
                dense
                >
                    <v-col
                    class="pa-2"
                    md="2">
            <v-rating
            :value="2"
            color="amber"
            dense
            half-increments
            readonly
            size="20">
            </v-rating>
                    </v-col>
                    <v-col
                    class="pa-2"
                    md="2">
                        <div>4 Ratings | </div>
                    </v-col>
                    <v-col
                    class="pa-2"
                    md="2">
            <div>
                <a>rate this recipe</a>
            </div>
                    </v-col>
                </v-row>
                <div>
                    Boneless, skinless chicken breast, again? Amp up the flavor of your 
                    chicken with bacon! These are butterflied: either do it yourself or 
                    ask your butcher to do it for you. You can then stuff them with cheese 
                    and asparagus, wrap them up in a bacon blanket, and air fry! While they
                     cook, toss a green salad, add a veggie or potato, and some bread, and 
                     you'll be enjoying your dinner in no time.
                </div>
                <br/>
                <v-row justify="start">
                    <v-col md="1">
                        <v-avatar
                        class="mb-4"
                        color="grey darken-1"
                        size="44"
                        ></v-avatar>
                    </v-col>
                    <v-col md="4">
                        <div>By Eyosias Desta</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                    <v-img
                    height="300"
                    max-width="300"
                    src></v-img>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-main>
</template>
<script> 
export default {
    name: "DetailRecipe"
}
</script>