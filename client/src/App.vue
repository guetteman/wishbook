<template>
    <div id="app" class="bg-gray-200 h-screen">
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
    name: 'app',
    components: {
        Navbar
    }
}
</script>
