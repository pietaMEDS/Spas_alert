<script>
import axios from 'axios'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()

export default {
  data() {
    return {
      login: '',
      password: '',
      errorMessage: '',
      displayName: '',
      fullName: '',
      addres: '',
      phone: '',
      ret_password: ''
    }
  },
  methods: {
    submit() {
      //  Validation

      if (this.login.length < 6) {
        this.errorMessage = 'Длинна логина не должна быть меньше 6'
        return ''
      } else if (this.displayName < 2) {
        this.errorMessage = 'Длинна отоброжаемого имени не должна быть меньше 2'
        return
      } else if (this.fullName < 5) {
        this.errorMessage = 'Длинна полного имени не должна быть меньше 5'
        return
      } else if (this.addres < 3) {
        this.errorMessage = 'Длинна Города не должна быть меньше 3'
        return
      } else if (this.phone < 11) {
        this.errorMessage = 'Не валидный номер телефона'
        return
      } else if (this.password != this.ret_password) {
        this.errorMessage = 'Пароли не совпадают'
        return
      }

      this.errorMessage = 'Ожидайте..'

      // Create user

      axios
        .get('https://spas-alert.local', {
          params: {
            Action: 'create',
            Table: 'users',
            login: this.login,
            password: this.password,
            displayName: this.displayName,
            fullName: this.fullName,
            addres: this.addres,
            phone: this.phone
          }
        })
        .then((response) => {
          if (response.data.length == 11) {
            LoggerStore.auth(response.data)
            this.$router.push('/')
          } else if (response.data) {
            this.errorMessage = response.data.Error
          } else {
            this.errorMessage =
              'Произошла ошибка! Попробуйте ещё раз или свяжитесь с тех.поддержкой!'
          }
        })
    }
  }
}
</script>

<template>
  <div id="auth-page">
    <div class="login-root">
      <div
        class="box-root flex-flex flex-direction--column"
        style="min-height: 100vh; flex-grow: 1"
      >
        <div class="loginbackground box-background--white padding-top--64">
          <div class="loginbackground-gridContainer">
            <div class="box-root flex-flex" style="grid-area: top / start / 8 / end">
              <div
                class="box-root"
                style="
                  background-image: linear-gradient(white 0%, rgb(247, 250, 252) 33%);
                  flex-grow: 1;
                "
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5">
              <div
                class="box-root box-divider--light-all-2 animationLeftRight tans3s"
                style="flex-grow: 1"
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 6 / start / auto / 2">
              <div class="box-root box-background--blue800" style="flex-grow: 1"></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 7 / start / auto / 4">
              <div
                class="box-root box-background--blue animationLeftRight"
                style="flex-grow: 1"
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6">
              <div
                class="box-root box-background--gray100 animationLeftRight tans3s"
                style="flex-grow: 1"
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 2 / 15 / auto / end">
              <div
                class="box-root box-background--cyan200 animationRightLeft tans4s"
                style="flex-grow: 1"
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 3 / 14 / auto / end">
              <div
                class="box-root box-background--blue animationRightLeft"
                style="flex-grow: 1"
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 4 / 17 / auto / 20">
              <div
                class="box-root box-background--gray100 animationRightLeft tans4s"
                style="flex-grow: 1"
              ></div>
            </div>
            <div class="box-root flex-flex" style="grid-area: 5 / 14 / auto / 17">
              <div
                class="box-root box-divider--light-all-2 animationRightLeft tans3s"
                style="flex-grow: 1"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="box-root padding-top--24 flex-flex flex-direction--column"
          style="flex-grow: 1; z-index: 9"
        >
          <div
            class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"
          >
            <h1>
              <router-link to="/"><a>SpasAlert</a></router-link>
            </h1>
          </div>
          <div class="formbg-outer">
            <div class="formbg">
              <div class="formbg-inner padding-horizontal--48">
                <span class="padding-bottom--15">Создайте свой профиль</span>
                <div class="form" id="stripe-login">
                  <div class="field padding-bottom--24">
                    <label for="displayName">Отображаемое имя</label>
                    <input v-model="displayName" type="text" name="displayName" />
                  </div>
                  <div class="field padding-bottom--24">
                    <label for="fullName">Полное имя</label>
                    <input v-model="fullName" type="text" name="fullName" />
                  </div>
                  <div class="field padding-bottom--24">
                    <label for="login">Логин</label>
                    <input v-model="login" type="text" name="login" />
                  </div>
                  <div class="field padding-bottom--24">
                    <label for="addres"
                      >Ваш город
                      <span style="font-size: 0.5lh" class="text-muted">Это важно!!</span></label
                    >
                    <input v-model="addres" type="text" name="addres" />
                  </div>
                  <div class="field padding-bottom--24">
                    <label for="phone">Номер телефона</label>
                    <input v-model="phone" type="number" name="phone" />
                  </div>
                  <div class="field padding-bottom--24">
                    <div class="grid--50-50">
                      <label for="password">Пароль</label>
                    </div>
                    <input v-model="password" type="password" name="password" />
                  </div>
                  <div class="field padding-bottom--24">
                    <div class="grid--50-50">
                      <label for="password">Повторите пароль</label>
                    </div>
                    <input v-model="ret_password" type="password" name="password" />
                  </div>
                  <div class="field field-checkbox padding-bottom--24 flex-flex align-center"></div>
                  <div class="field padding-bottom--24 submitdiv">
                    <button @click="submit" class="btn submit">Продолжить</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-link padding-top--24">
              <span>Уже есть аккаунт? <router-link to="/auth">Авторизуйся!</router-link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="errorMessage"
    style="
      width: 100%;
      position: absolute;
      top: 10%;
      bottom: auto;
      display: flex;
      justify-content: center;
    "
  >
    <div
      style="
        padding: 1lh;
        z-index: 300;
        border-radius: 5px;
        width: 5lw;
        background-color: rgba(253, 62, 62, 0.852);
        display: flex;
        justify-content: center;
      "
    >
      <span>
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Ubuntu,
    sans-serif;
}
#menu06-1 {
  position: absolute;
  left: 0;
  margin-bottom: 15%;
}
body {
  min-height: 100%;
  background-color: #ffffff;
}
h1 {
  letter-spacing: -1px;
}
a {
  color: #5469d4;
  text-decoration: unset;
}
.login-root {
  background: #fff;
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.loginbackground {
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
}
.flex-flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.center-center {
  align-items: center;
  justify-content: center;
}
.box-root {
  box-sizing: border-box;
}
.flex-direction--column {
  -ms-flex-direction: column;
  flex-direction: column;
}
.loginbackground-gridContainer {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: [start] 1fr [left-gutter] (86.6px) [16] [left-gutter] 1fr [end];
  grid-template-columns: [start] 1fr [left-gutter] repeat(16, 86.6px) [left-gutter] 1fr [end];
  -ms-grid-rows: [top] 1fr [top-gutter] (64px) [8] [bottom-gutter] 1fr [bottom];
  grid-template-rows: [top] 1fr [top-gutter] repeat(8, 64px) [bottom-gutter] 1fr [bottom];
  justify-content: center;
  margin: 0 -2%;
  transform: rotate(-12deg) skew(-12deg);
}
.box-divider--light-all-2 {
  box-shadow: inset 0 0 0 2px #e3e8ee;
}
.box-background--blue {
  background-color: #5469d4;
}
.box-background--white {
  background-color: #ffffff;
}
.box-background--blue800 {
  background-color: #212d63;
}
.box-background--gray100 {
  background-color: #e3e8ee;
}
.box-background--cyan200 {
  background-color: #7fd3ed;
}
.padding-top--64 {
  padding-top: 64px;
}
.padding-top--24 {
  padding-top: 24px;
}
.padding-top--48 {
  padding-top: 48px;
}
.padding-bottom--24 {
  padding-bottom: 24px;
}
.padding-horizontal--48 {
  padding: 48px;
}
.padding-bottom--15 {
  padding-bottom: 15px;
}

.flex-justifyContent--center {
  -ms-flex-pack: center;
  justify-content: center;
}

.formbg {
  margin: 0px auto;
  width: 100%;
  max-width: 448px;
  background: white;
  border-radius: 4px;
  box-shadow:
    rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
}
span {
  display: block;
  font-size: 20px;
  line-height: 28px;
  color: #1a1f36;
}
label {
  margin-bottom: 10px;
}
.reset-pass a,
label {
  font-size: 14px;
  font-weight: 600;
  display: block;
}
.reset-pass > a {
  text-align: right;
  margin-bottom: 10px;
}
.grid--50-50 {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
}

.field input {
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: rgb(255, 255, 255);
  box-shadow:
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}

.submit {
  background-color: rgb(84, 105, 212);
  box-shadow:
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
    rgb(84, 105, 212) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.submitdiv {
  display: flex;
  justify-content: center;
}

.field-checkbox input {
  width: 20px;
  height: 15px;
  margin-right: 5px;
  box-shadow: unset;
  min-height: unset;
}
.field-checkbox label {
  display: flex;
  align-items: center;
  margin: 0;
}
a.ssolink {
  display: block;
  text-align: center;
  font-weight: 600;
}
.footer-link span {
  font-size: 14px;
  text-align: center;
}
.listing a {
  color: #697386;
  font-weight: 600;
  margin: 0 10px;
}

.animationRightLeft {
  animation: animationRightLeft 2s ease-in-out infinite;
}
.animationLeftRight {
  animation: animationLeftRight 2s ease-in-out infinite;
}
.tans3s {
  animation: animationLeftRight 3s ease-in-out infinite;
}
.tans4s {
  animation: animationLeftRight 4s ease-in-out infinite;
}

@keyframes animationLeftRight {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes animationRightLeft {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
