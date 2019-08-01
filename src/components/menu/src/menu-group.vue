<template>
    <ul class="xj-menu__item-group">
        <li class="xj-menu__item-group-title">{{ title }}</li>
        <ul class="xj-menu__item-group-list"><slot></slot></ul>
    </ul>
</template>

<script>
    export default {
        name: 'MenuItemGroup',
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>
