<template>
    <transition :name="animation">
        <div ref="modal"
             class="modal"
             @click="onClose">
            <div ref="modalWrapper" class="modal-wrapper">
                <div class="modal-container">
                    <div class="icon-close" @click="onClose">
                        &times;
                    </div>
                    <div v-if="title" ref="modalTitle" class="title">
                        {{ title }}
                    </div>
                    <div ref="modalContent" class="modal-content">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" src="./modal.scss" scoped></style>
<script src="./modal.js"></script>
