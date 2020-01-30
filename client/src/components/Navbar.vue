<template>
    <div class="w-full bg-white">
        <div class="w-full h-2 bg-indigo-500"></div>
        <div class="flex w-full">
            <div class="flex justify-between w-full max-w-4xl mx-auto p-4">
                <router-link to="/" class="text-gray-600 font-bold"><span class="text-indigo-500">Wish</span>Book</router-link>
                <div v-if="!$auth.loading">
                    <button v-if="!$auth.isAuthenticated" @click="login" class="text-gray-600">Login</button>
                    <button v-if="$auth.isAuthenticated" class="text-gray-600" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login () {
            this.$auth.loginWithRedirect();
        },

        logout () {
            this.$auth.logout({
                returnTo: this.$router.push('/')
            });
        }
    }
}
</script>