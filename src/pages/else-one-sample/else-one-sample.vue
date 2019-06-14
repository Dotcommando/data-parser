<template>
    <div class="else-one-sample">
        <div class="inner">
            Ещё один пример {{ $route.params.id ? `страницы с id === ${$route.params.id}` : null }}
        </div>
    </div>
</template>

<script src="./else-one-sample.js"></script>
<style lang="scss" src="./else-one-sample.scss"></style>
