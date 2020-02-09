<template>
    <div>
        <div class="flex-shrink-0 w-32">
            <div class="relative py-24">
                <label class="relative z-10 px-1">
                    <input class="hidden" type="file" accept="image/*" @change="selectImage($event)" id="file-input">
                    <span class="w-full px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-700 text-indigo-100 cursor-pointer">Select image</span>
                </label>
                <img v-if="previewUrl" class="absolute inset-0 h-full rounded-lg object-cover" :src="previewUrl" alt="">
                <img v-if="!previewUrl" class="absolute inset-0 h-full rounded-lg object-cover" :src="imageUrl" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            uploadUrl: null,
            imageUrl: null,
            value: null
        },
        data () {
            return {
                previewUrl: null
            }
        },
        methods: {
            selectImage(event) {
                const file = event.target.files[0];

                this.$emit('input', file);

                this.previewUrl = URL.createObjectURL(file);
            }
        }
    }
</script>