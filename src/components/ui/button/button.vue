<template>
    <button :type="submit ? 'submit' : 'button'"
            :disabled="disabled"
            @click="$emit('click')">
        <span v-if="type === 'gradient'" class="bg-pressed" />

        <span class="slot">
            <slot />
        </span>

        <span v-if="loading">Loading...</span>
    </button>
</template>

<style lang="scss" src="./button.scss" scoped></style>
<script src="./button.js"></script>
