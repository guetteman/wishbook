<template>
    <div>
        <div class="flex-shrink-0" :class="[sm ? 'w-20' : 'w-32']">
            <div class="relative" :class="[sm ? 'py-16' : 'py-24']">
                <img class="absolute inset-0 h-full rounded-lg object-cover border" src="https://covers.openlibrary.org/b/id/9256153-L.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sm: {
            type: Boolean,
            default: false
        }
    }
}
</script>