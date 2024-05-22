<script>
const Header = {
  data() {
    return {}
  },
  template: `
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
                ><router-link to="/"><a class="navbar-caption text-black display-4" href="unknow1" id="naming">SpasAlert</a></router-link></span
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
              <div class="navbar-buttons mbr-section-btn">
              </div>
            </div>
          </div>
        </nav>
      </section>
    `
}

export default Header
</script>
