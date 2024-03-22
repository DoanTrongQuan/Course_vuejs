<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Trang chủ',
        items: [{ label: 'Bảng điều khiển', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Quản trị',
        items: [
            { label: 'Quản lí người dùng', icon: 'pi pi-users', to: '/management/user' },
            { label: 'Quản lí khóa học', icon: 'pi pi-briefcase', to: '/management/course' },
            { label: 'Quản lí bài viết', icon: 'pi pi-filter', to: '/management/post' },
            { label: 'Địa chỉ', icon: 'pi pi-map-marker', to: '/management/map' },
            { label: 'Thông báo', icon: 'pi pi-bell', to: '/management/notification', class: 'rotated-icon' },
            { label: 'Công việc', icon: 'pi pi-check-square', to: '/management/task' },
            { label: 'Liên hệ và đánh giá', icon: 'pi pi-phone', to: '/management/contact-evaluation' },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li  v-if="item.separator" class="menu-separator"></li>
        </template>
        <li >
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
