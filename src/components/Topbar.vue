<template>
  <div class="topbar">
    <ul class="topbar-buttons">
      <li>
        <i class="fa-solid fa-power-off" @click="$store.dispatch('logout')"></i>
      </li>
    </ul>
  </div>
</template>
