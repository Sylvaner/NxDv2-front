<template>
    <nav>
        <span>
            <i class="fa fa-cubes"></i>
            <router-link to="/">Device Manager</router-link>
        </span>
        <span>
            <i class="fa fa-desktop"></i>
            <router-link to="/render">Render</router-link>
        </span>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TopMenu'
});
</script>
