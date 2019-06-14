<template>
    <div id="app" class="app">
        <Header />
        <div class="main">
            <router-view />
        </div>
        <Footer />
        <div class="modals">
            <modal-alert v-if="modal.alert"
                         name="alert"
                         title="Заголовок"
                         message="Текстовое сообщение"
                         @close="$store.commit('modal/close', 'alert')"/>
        </div>
    </div>
</template>

<script src="./app.js"></script>
<style lang="scss" src="./app.scss"></style>
