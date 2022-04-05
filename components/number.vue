<template>
    <div>
         <v-text-field v-on:keyup="$emit('enterNumber', myNumber)" id="input" v-model="myNumber" />
    </div>
</template>

<script>
export default {
    name: "comp",
    // data: function() {
    //     return{
    //         myNumber: ""
    //     };
    // },
    props: {
        myNumber: {
            type: Number,
         //   default: 0
        },
        origNums: {
            
        }
    }
};
</script>

