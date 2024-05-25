<script setup>
import Header from './components/header/main.vue'
import { RouterView } from 'vue-router'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()
</script>

<template>
  <section data-bs-version="5.1" class="menu menu6 cid-ucoPkhxvtB" once="menu" id="menu06-1">
    <nav class="navbar navbar-dropdown opacityScrollOff navbar-fixed-top navbar-expand-lg">
      <div class="container">
        <div class="navbar-brand">
          <span class="navbar-logo">
            <router-link to="/">
              <img src="/src/assets/logo.svg" alt="logo" style="height: 3rem" />
            </router-link>
          </span>
          <span class="navbar-caption-wrap"
            ><router-link to="/"
              ><a class="navbar-caption text-black display-4" href="unknow1" id="naming"
                >SpasAlert</a
              ></router-link
            ></span
          >
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-bs-toggle="collapse"
          data-target="#navbarSupportedContent"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div class="collapse navbar-collapse opacityScrollOff" id="navbarSupportedContent">
          <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
            <li class="nav-item">
              <router-link to="/news" class="nav-link link text-black display-4"
                >Новости</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/forum" class="nav-link link text-black display-4"
                >Форум</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                to="{ name='profile', params: {id:user.id} }"
                class="nav-link link text-black display-4"
                >Профиль</router-link
              >
            </li>
          </ul>
          <div class="navbar-buttons mbr-section-btn"></div>
        </div>
      </div>
    </nav>
  </section>
  <RouterView />
</template>

<style scoped>
body {
  overflow-x: hidden;
}

.navbar {
  z-index: 50;
  position: fixed;
  width: 100%;
  background: rgb(57, 96, 255);
  height: 6svh;
}
.navbar-logo {
  position: absolute;
  top: 50%;
  left: 1%;
  transform: translateY(-50%);
}
.menu {
  height: 6svh;
}
.display-4 {
  font-weight: normal;
}
#navbarSupportedContent {
  display: flex;
  justify-content: right;
}
#navbarSupportedContent ul {
  width: 50%;
  display: flex;
  justify-content: space-around;
}
#naming {
  font-size: calc(0.5rem + 2vw);
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
