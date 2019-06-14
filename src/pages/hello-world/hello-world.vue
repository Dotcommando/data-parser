<template>
    <div class="hello">
        <div class="inner">
            <h1>Flexbox</h1>
            <p>Макет сделан при помощи Flexbox. Работает, начиная с IE 10. В IE пофикшено переполнение главной секции по вертикали и случающееся при этом пробитие подвала контентом из основной части.</p>
            <h2>Если вы удалили папку .git</h2>
            <p>Нужно настроить pre-commit хук, чтобы файлы автоматически линтировались Eslintом и Stylelintом перед отправкой в репозиторий. Для этого:</p>
            <ol>
                <li>Удаляем папку <code>.git</code> из проекта.</li>
                <li><code>git init</code> &mdash; заново инициализируем репозиторий.</li>
                <li>
                    <code>yarn remove husky -D</code> &mdash; удаляем husky.
                </li>
                <li>
                    <code>yarn add husky -D</code> &mdash; устанавливаем husky.
                </li>
                <li>Теперь хук pre-commit должен работать как надо.</li>
            </ol>
            <h2>SCSS</h2>
            <p>Преднастройки SCSS находятся в <code>src/assets/scss/</code>. В макет импортируется файл <code>src/assets/scss/global.scss</code>. Остальные файлы в этой директории импортируются в него. </p>
            <p>Файлы директории <code>src/assets/scss/</code>:</p>
            <ul class="list">
                <li><code>global.scss</code> &mdash; содержит подключения всех файлов из этой директории.</li>
                <li><code>colors.scss</code> &mdash; константы уветов.</li>
                <li><code>layout.scss</code> &mdash; основные настройки макета.</li>
                <li><code>sizes.scss</code> &mdash; константы размеров. Граничные значения для адаптива, т.н. &laquo;точки преломления&raquo;.</li>
            </ul>
            <h2>Настройка скриптов</h2>
            <p>Переопределить порт можно в <code>package.json</code> в разделе <code>scripts.serve</code>.</p>
            <p>Отменить автоматическое открытие в браузере можно в <code>package.json</code>, удалив параметр <code>--open</code> в разделе <code>scripts.serve</code>.</p>
            <ul>
                <li>
                    <code>yarn serve</code> &mdash; запускает проект на порту 8999 и открывает в новой вкладке браузера.
                </li>
                <li>
                    <code>yarn lint:js-vue</code> &mdash; указывает несоответствия разметки с правилами в vue- и js-файлах проекта.
                </li>
                <li>
                    <code>yarn lint:js-vue:fix</code> &mdash; фиксит в соответствии с правилами vue- и js-файлы проекта.
                </li>
                <li>
                    <code>yarn lint:css</code> &mdash; указывает несоответствия разметки с правилами в scss-файлах проекта.
                </li>
                <li>
                    <code>yarn lint:css:fix</code> &mdash; фиксит в соответствии с правилами scss-файлы проекта.
                </li>
            </ul>
            <h2>Файловая структура</h2>
            <p><code>src/app/</code> &mdash; корневой компонент.</p>
            <p><code>src/assets/</code> &mdash; статичные файлы, изображения, глобальные стили.</p>
            <p><code>src/components/</code> &mdash; компоненты.</p>
            <ul>
                <li><code>modals/</code> &mdash; конкретные образцы модальных окон</li>
                <li><code>partials/</code> &mdash; структурные компоненты шаблона: шапка, подвал, сайдбары и т.п.</li>
                <li><code>ui/</code> &mdash; элементы интерфейса, в т.ч. общий предок всех модальных окон в папке <code>modal</code>.</li>
            </ul>
            <p><code>src/pages/</code> &mdash; страницы.</p>
            <p><code>src/router/</code> &mdash; роутер.</p>
            <p><code>src/store/</code> &mdash; Vuex-хранилище.</p>
            <h2>Модальные окна</h2>
            <p>Модальные окна управляются через Vuex. <span class="pseudolink" @click="$store.commit('modal/open', {name: 'alert', data: true})">Вызвать окно</span></p>
            <h2>Проблемы, которые решает этот бойлерплейт</h2>
            <ol>
                <li>Интеграция SCSS в Vue. Подключение стартовых настроек SCSS.</li>
                <li>Линтинг SCSS/Vue/JS-файлов.</li>
                <li>Полифиллы для IE10.</li>
                <li>Базовая кроссбраузерная flexbox-вёрстка с прижатым к низу подвалом.</li>
                <li>Подключение и настройка Vue-роутера.</li>
                <li>Линтинг кода перед отправкой в git-репозиторий.</li>
                <li>Настроенный пример Vuex.</li>
                <li>Пример интеграции Vuex и роутера.</li>
                <li>Централизованное управление окнами через Vuex.</li>
            </ol>
        </div>
    </div>
</template>

<script src="./hello-world.js"></script>
<style lang="scss" src="./hello-world.scss"></style>
