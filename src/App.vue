<script setup lang="ts">
import { RouterView } from 'vue-router'
import moment from 'moment-timezone'

import Toast from '@/components/Toast.vue'

moment.tz.setDefault('Asia/Tashkent')
</script>

<template>
  <RouterView />
  <Toast />
</template>
