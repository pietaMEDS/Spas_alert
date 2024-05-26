<script>
import axios from 'axios'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()

export default {
  data() {
    return {
      name: 'Undefined',
      role: 'Undefined',
      addres: 'Undefined',
      fullName: 'Undefined',
      email: 'Undefined',
      phone: 'Undefined'
    }
  },
  created() {
    if (!LoggerStore.isLogged) {
      this.$router.push('/auth')
    }

    axios
      .get('https://spas-alert.local', {
        params: {
          Action: 'get',
          Table: 'users',
          Advanced: 'where public_key = "' + LoggerStore.publicKey + '"'
        }
      })
      .then((response) => {
        this.name = response.data[0].name
        this.role = response.data[0].role
        this.addres = response.data[0].addres
        this.fullName = response.data[0].fullName
        this.email = response.data[0].email
        this.phone = response.data[0].phone

        axios
          .get('https://spas-alert.local', {
            params: {
              Action: 'get',
              Table: 'roles',
              Advanced: 'where id = ' + this.role
            }
          })
          .then((response) => {
            this.role = response.data[0].role
          })
      })
  }
}
</script>

<template>
  <main>
    <div class="container">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <div
                    src=""
                    alt="ICON"
                    style="font-size: 5lvw; border: 2px solid black; width: 10lvw; height: 10lvw"
                    class="rounded-circle"
                  >
                    {{ this.name[0] + this.name[1] }}
                  </div>
                  <div class="mt-3">
                    <h4>{{ this.name }}</h4>
                    <p class="text-secondary mb-1">{{ this.role }}</p>
                    <p class="text-muted font-size-sm">{{ this.addres }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Полное имя</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ this.fullName }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Почта</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ this.email }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Телефон</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ this.phone }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Аддрес</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ this.addres }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-12">
                    <div class="btn btn-info">Редактировать</div>
                    <router-link to="/application" class="btn btn-info" style="margin-left: 1lvw"
                      >Создать заявления
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gutters-sm">
              <div class="cards col-sm-12 mb-6">
                <div class="card h-100">
                  <div class="card-header">Заявки в ожидании</div>
                  <!-- <div class="card-body">
                    <div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <div class="row">
                            <div class="col-md-4">
                              <img
                                class="img-fluid rounded-start"
                                src="../../assets/ph.png"
                                alt=""
                              />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">Cart title</h5>
                                <p class="card-text">Description</p>
                                <p class="card-text"><small class="text-muted">Статус: </small></p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div> -->
                </div>
              </div>

              <div class="col-sm-12 mb-6">
                <div class="card h-100">
                  <div class="card-header">Ваши заявления</div>
                  <!-- <div class="card-body">
                    <div>
                      
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <div class="row">
                            <div class="col-md-4">
                              <img
                                class="img-fluid rounded-start"
                                src="../../assets/ph.png"
                                alt=""
                              />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">Cart title</h5>
                                <p class="card-text">Description</p>
                                <p class="card-text"><small class="text-muted">Статус: </small></p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.cards {
  margin-bottom: 0.5lh;
}
</style>
