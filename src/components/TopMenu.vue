<template>
  <nav>
    <router-link to="/" custom v-slot="{ href, isActive }">
      <a :class="isActive ? 'active' : ''" :href="href">
        <i class="fa fa-cubes fa-fw"></i>Device Manager
        <Badge v-if="devicesToManageCount > 0" :value="devicesToManageCount" severity="warning" />
      </a>
    </router-link>
    <router-link to="/render" custom v-slot="{ href, isActive }">
      <a :class="isActive ? 'active' : ''" :href="href">
        <i class="fa fa-desktop fa-fw"></i>Render
      </a>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Badge from 'primevue/badge';

export default defineComponent({
    name: 'TopMenu',
    components: {
        Badge
    },
    computed: {
      /**
       * Les périphériques de type inconnus qui n'ont pas été cachés par l'utilisateur
       */
      devicesToManageCount() {
        return this.$store.getters.devicesToManage().length;
      }
    }
});
</script>

<style>
nav {
    font-family: sans-serif;
    width: 100%;
    text-align: center;
    background-color: white;
}

nav a {
    display: inline-block;
    width: 10rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
    margin: 0 1rem;
    text-decoration: none;
    color: black;
}

nav a.active {
    border-bottom: 1px solid black;
}

nav a:hover {
    border-bottom: 2px solid black;
    background-color: #EEEEEE;
}

nav .fa-fw {
    margin-right: 0.5rem;
}

nav .p-badge {
    position: absolute;
}
</style>
