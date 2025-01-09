<template>
  <div class="sidebar">
    <div class="brand">
      <img src="/img/logosofia.png" class="brand-logo" alt="" />
      <h1>DESPENSA SOFIA</h1>
    </div>
    <ul class="menu">
      <li v-for="(menu, mi) of menus" :key="mi">
        <template v-if="menu.children && menu.children.length">
          <ul :id="`deep-${menu.title.toLowerCase().replaceAll(' ', '-')}`">
            <li v-for="(submenu, smi) of menu.children" :key="smi">
              <router-link
                :class="{
                  disabled: !submenu.to
                }"
                :to="submenu.to || '#'"
              >
                <i class="icon" :class="submenu.icon" />
                {{ submenu.title }}
              </router-link>
            </li>
          </ul>
          <a
            href="/"
            :data-target="`deep-${menu.title.toLowerCase().replaceAll(' ', '-')}`"
            @click.prevent="toggleTarget"
          >
            <i class="icon" :class="menu.icon" />
            {{ menu.title }}
            <i class="fa-solid fa-angle-right arrow" v-if="menu.children && menu.children.length" />
          </a>
        </template>
        <router-link
          v-else
          active-class="active"
          :class="{ disabled: !menu.to }"
          :to="menu.to || '/'"
          @click="closeSubmenus"
        >
          <div class="icon">
            <i :class="menu.icon" />
          </div>
          {{ menu.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import menus from '@/router/menus.js'

export default {
  setup() {
    const toggleTarget = (e) => {
      const others = document.querySelectorAll('ul.menu > li > ul')
      const t = document.getElementById(e.target.dataset.target)
      const canOpen = !t.classList.contains('opened')

      others.forEach((x) => {
        x.classList.remove('opened')
      })

      if (canOpen) {
        t.classList.add('opened')
      }
    }
    const closeSubmenus = () => {
      const others = document.querySelectorAll('ul.menu > li > ul')
      others.forEach((x) => {
        x.classList.remove('opened')
      })
    }

    return { toggleTarget, closeSubmenus, menus }
  }
}
</script>
