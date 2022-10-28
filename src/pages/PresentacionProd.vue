<template>
  <q-page class="fondo">
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-md q-pl-md">
        Presentaciones
      </p>
    </div>
  </div>
  <div class="row">
    <List :vialist="apiList" :apilista="apiLista"/>
    <Add :apilista="apiLista" />
  </div>
</q-page>
</template>

<script>
import List from '../components/PresentacionProd/List.vue'
import Add from '../components/PresentacionProd/Add.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
export default {
  name: 'PresentacionProd',
  components: {
    List,
    Add
  },
  data () {
    return {
      apiList: [],
      apiLista: []
    }
  },
  mounted () {
    this.ListPresentacion()
    this.ListUnidad()
  },

  updated () {
    this.ListPresentacion()
  },

  methods: {
    async ListPresentacion (req, res) {
      try {
        let list = await axios.get(Global.url + 'presentacion/list', Headers)
        this.apiList = list.data
        //console.log(this.apiList)
      } catch (error) {
        console.log(error)
      }
    },

    async ListUnidad (req, res) {
      try {
        let lista = await axios.get(Global.url + 'unidad/list', Headers)
          this.apiLista = lista.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.fondo{
  background-image: url('src/assets/bambu4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
