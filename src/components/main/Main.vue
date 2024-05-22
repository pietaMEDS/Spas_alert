<script>
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async'

export default {
  data() {
    return {
      logoPath: '/src/assets/logo.svg',
      phrase: '',
      landingCarousel: {
        countImages: 3,
        image: 1,
        path: `url(/src/assets/back-images/image` + 1 + `.png)`
      }
    }
  },
  methods: {
    updateCarousel() {
      if (this.landingCarousel.image >= this.landingCarousel.countImages) {
        this.landingCarousel.image = 1
      } else {
        this.landingCarousel.image++
      }
      this.landingCarousel.path =
        `url(/src/assets/back-images/image` + this.landingCarousel.image + `.png)`
    }
  },
  async created() {
    try {
      const response = await axios.get('/src/Data/landing.json')

      this.phrase = response.data.phrase
    } catch (error) {
      console.error(error)
    }

    setIntervalAsync(async () => {
      this.updateCarousel()
    }, 7000)
  },
  computed: {}
}
</script>

<template>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      <link rel="shortcut icon" href="/src/assets/logo.png" type="image/x-icon" />
      <meta
        name="description"
        content="SpasAlert - информационная система для поиска пропавших людей."
      />
      <title>Система поиска людей</title>
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&display=swap&display=swap"
        as="style"
        onload="this.onload=null;this.rel='stylesheet'"
      />
      <noscript
        ><link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&display=swap&display=swap"
      /></noscript>
    </head>
    <body>
      <section
        data-bs-version="5.1"
        class="header18 cid-ucoNxe1cd8 mbr-fullscreen"
        id="hero-16-ucoNxe1cd8"
        :style="{ 'background-image': this.landingCarousel.path }"
      >
        <div class="mbr-overlay" style="opacity: 0.5; background-color: rgb(0, 0, 0)"></div>
        <div id="landPhraseCard" class="container-fluid d-inline-flex p-2">
          <div class="row card">
            <div class="content-wrap card-body col-12 col-md-12">
              <h3 class="mbr-section-title mbr-fonts-style mbr-white mb-4 display-3">
                <strong>{{ phrase }}</strong>
              </h3>

              <p class="mbr-fonts-style card-text mbr-text mbr-white mb-4 display-6">
                Поисково-Спасательный отряд "SpasAlert" поможет найти тех кто был близок
              </p>
              <div class="mbr-section-btn">
                <router-link to="/application">
                  <a class="btn btn-primary card-link btn-white-outline display-7" href="#"
                    >Оставить заявку!</a
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-bs-version="5.1" class="article4 cid-ucoNxe1dza" id="about-us-4-ucoNxe1dza">
        <div class="container">
          <div class="row justify-content-around">
            <div class="col-12 col-md-12 col-lg-6 image-wrapper">
              <img class="w-100" :src="logoPath" alt="Mobirise Website Builder" />
            </div>
            <div class="col-12 col-md-12 col-lg">
              <div class="text-wrapper align-left">
                <h1 class="mbr-section-title mbr-fonts-style mb-4 display-2">
                  <strong>Наша Миссия</strong>
                </h1>
                <p class="mbr-text mbr-fonts-style mb-3 display-7">
                  SpasAlert - это не просто сайт, это команда отважных искателей и героев, готовых
                  спасать жизни и приводить людей домой.
                </p>

                <p class="mbr-text mbr-fonts-style mb-3 display-7">
                  Мы объединяем усилия для быстрого реагирования на чрезвычайные ситуации и
                  обеспечиваем поддержку в поиске пропавших.
                </p>
                <p class="mbr-text mbr-fonts-style mb-3 display-7">
                  Присоединяйтесь к нам сегодня и станьте частью нашей неразрушимой команды
                  спасения!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-bs-version="5.1" class="features023 cid-ucoNxe1VHe" id="metrics-1-ucoNxe1VHe">
        <div class="content-relative-center container">
          <div class="row content-relative-center content-row justify-content-center">
            <div class="item features-without-image col-12 col-md-6 col-lg-6 item-mb">
              <div class="item-wrapper">
                <div class="title mb-2 mb-md-3">
                  <span class="num mbr-fonts-style display-1"> <strong>500+</strong></span>
                </div>
                <h4 class="card-title mbr-fonts-style display-6">
                  <strong>Спасенных Людей</strong>
                </h4>
              </div>
            </div>
            <div class="item features-without-image col-12 col-md-6 col-lg-6 item-mb">
              <div class="item-wrapper">
                <div class="title mb-2 mb-md-3">
                  <span class="num mbr-fonts-style display-1"> <strong>24/7</strong></span>
                </div>
                <h4 class="card-title mbr-fonts-style display-6">
                  <strong>Поддержка</strong>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-bs-version="5.1" class="social03 cid-ucoTxfODI7" id="social03-2">
        <div class="content-relative-center container">
          <div class="media-container-row">
            <div class="col-12">
              <h3
                class="mbr-section-title d-flex justify-content-center mb-4 align-center mbr-fonts-style display-2"
              >
                <strong>Вы тоже можете помочь!</strong>
              </h3>
              <p
                class="mbr-section-text d-flex justify-content-center mb-5 align-center mbr-fonts-style display-7"
              >
                Подключайте бота в телеграмм и узнавайте о пропажах одни из первых!<br />
              </p>
              <div>
                <div class="mbr-social-likes d-flex justify-content-center align-center">
                  <span class="btn btn-social socicon-bg-twitter m-2">
                    <router-link to="/">
                      <img src="/src/assets/tg.svg" alt="tg" width="10%" />
                    </router-link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-bs-version="5.1"
        class="header12 cid-ucoNxe2AYk"
        id="call-to-action-8-ucoNxe2AYk"
      >
        <div class="content-relative-center text-center container-fluid">
          <div class="row mb-4 justify-content-center">
            <div class="col-12 col-md-4">
              <img src="/src/assets/invite.png" alt="invite" width="50%" />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-12 content-head">
              <h1 class="mbr-section-title mbr-fonts-style mb-4 display-2">
                <strong>Присоединяйтесь к нам сегодня!</strong>
              </h1>
              <p class="mbr-text mbr-fonts-style mb-4 display-7">
                Станьте частью команды, спасающей жизни и возвращающей надежду.
              </p>
              <div class="mbr-section-btn mt-4">
                <router-link class="btn btn-primary display-7" to="/join"
                  >Присоединиться</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-bs-version="5.1"
        class="contacts03 cid-ucoNxe5NWr mbr-parallax-background"
        id="contacts-11-ucoNxe5NWr"
      >
        <div class="mbr-overlay" style="opacity: 0.7; background-color: rgb(255, 255, 255)"></div>
        <div class="container content-relative-center">
          <div class="row justify-content-center">
            <div class="col-lg-4">
              <div class="col-12 col-md-12">
                <h5 class="mbr-section-title mbr-fonts-style mt-0 mb-4 display-2">
                  <strong>Контакты</strong>
                </h5>
                <p class="mbr-section-subtitle mbr-fonts-style mt-0 mb-4 display-7">
                  Телефон: +1 (800) 123-4567
                  <br />Email: info@spasalert.com <br />Адрес: ул. Поиска, 123, Город-на-Реке
                  <br />Часы работы: Пн-Пт: 9:00 - 18:00
                </p>
              </div>
            </div>
            <div class="col-lg-8 side-features">
              <div class="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4002.402117360623!2d59.00183289433311!3d53.38186682203236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d12fac71abe5bf%3A0xcd4b3c16853810ed!2z0JrQsNGE0LXQtNGA0LDQu9GM0L3Ri9C5INGB0L7QsdC-0YAg0JLQvtC30L3QtdGB0LXQvdC40Y8g0JPQvtGB0L_QvtC00L3Rjw!5e0!3m2!1sru!2sru!4v1715524174229!5m2!1sru!2sru"
                  width="600"
                  height="450"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-bs-version="5.1"
        class="footer2 cid-ucoNxe67CN"
        once="footers"
        id="footer-5-ucoNxe67CN"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg center mt-2 mb-3">
              <p class="mbr-fonts-style copyright mb-0 display-7">
                © 2024 SpasAlert. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </section>
    </body>
  </html>
</template>

<style>
*,
html,
body {
  padding: 0;
  margin: 0;
}
body {
  display: block;
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

#hero-16-ucoNxe1cd8 {
  background-size: cover;
  background-attachment: fixed;
  color: black;
}
#landPhraseCard {
  position: absolute;
  top: 50%;
  left: 1%;
  transform: translateY(-50%);
}
#landPhraseCard .card {
  background-color: rgba(255, 255, 255, 0.4);
}

#about-us-4-ucoNxe1dza {
  background-color: white;
  color: black;
  border-top: 7px solid rgb(57, 96, 255);
}
#about-us-4-ucoNxe1dza .container {
  position: relative;
  top: 50%;
  left: 1%;
  transform: translateY(-50%);
  width: 100%;
}

/*  */
#metrics-1-ucoNxe1VHe {
  background-color: white;
  height: 20lvh;
}
#metrics-1-ucoNxe1VHe .item {
  display: flex;
}
#metrics-1-ucoNxe1VHe .item-wrapper {
  padding-right: 2lh;
  padding-left: 2lh;
  border-radius: 15px;
  color: black;
  border: 5px solid rgba(255, 255, 255, 0.746);
  background-color: rgba(255, 255, 255, 0.294);
}
#metrics-1-ucoNxe1VHe .title {
  display: flex;
  justify-content: center;
}
.num {
  color: rgb(57, 96, 255);
  font-weight: bold;
}
/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */

#social03-2 {
  border-top: 7px solid rgb(57, 96, 255);
  border-bottom: 7px solid rgb(57, 96, 255);
  background-color: white;
  color: white;
  background-image: url('/src/assets/back-images/connect.png');
  background-size: cover;
  background-attachment: fixed;
}

#call-to-action-8-ucoNxe2AYk {
  background-color: white;
  color: black;
}
#call-to-action-8-ucoNxe2AYk img {
  border-top:;
  border-radius: 25px;
}

#contacts-11-ucoNxe5NWr {
  background-color: white;
  color: black;
  height: 50lvh;
}

#footer-5-ucoNxe67CN {
  height: 1lvh;
}
.copyright {
  text-align: center;
}

section {
  height: 80lvh;
}
.content-relative-center {
  position: relative;
  top: 50%;
  left: 1%;
  transform: translateY(-50%);
}
.google-map iframe {
  border-radius: 25px;
  border: 5px double black;
}
</style>
