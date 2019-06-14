<template>
    <modal :name="name"
           :title="title"
           class="modal-info"
           @close="$emit('close')">
        <div class="message">
            {{ message }}
        </div>
        <div class="btns">
            <v-button type="hh-yellow" @click="$emit('close')">
                OK
            </v-button>
        </div>
    </modal>
</template>

<script src="./alert.js"></script>
<style lang="scss" src="./alert.scss" scoped></style>
