<template>
    <span class="p-float-label">
        <InputText id="server" v-model="server" />
        <label for="server">Serveur</label>
    </span>
    <Button @click="tryToConnect">Connexion</Button>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import NextDomApi from '../services/NextDomApi'
import StateUpdater from '../services/StateUpdater';

export default {
    name: 'Login',
    components: {
        InputText,
        Button
    },
    data: () => {
        return {
            server: ''
        }
    },
    methods: {
        tryToConnect() {
            if (this.server !== '') {
                NextDomApi.getInstance().connect({server: this.server}, this.$store).then((_) => {
                    StateUpdater.start(this.$store);
                    this.$router.replace('/');
                });
            }
        }
    }
}
</script>

<style>

</style>