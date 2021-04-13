<template>
    <InputText v-model="modelValue.config[currentStep]" />
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
    name: 'TextInput',
    components: {
        InputText
    },
    props: {
        modelValue: Object,
        currentStep: Number
    }
}
</script>

<style>

</style>