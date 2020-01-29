<template>
    <div id="app" class="h-screen overflow-y-auto pb-20 bg-gray-200">
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
