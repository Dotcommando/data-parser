<template>
    <header>
        <div class="inner">
            <router-link :to="'/'">
                <img class="logo" src="../../../assets/logo-white.svg" alt="" />
            </router-link>
            <ul class="menu">
                <li>
                    <router-link :to="'/'">
                        Главная
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/sample-page'">
                        Пример страницы
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/else-one-sample'">
                        Ещё один
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/else-one-sample/2'">
                        Ещё один 2
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/else-one-sample/3'">
                        Ещё один 3
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script src="./header.js"></script>
<style lang="scss" src="./header.scss"></style>
