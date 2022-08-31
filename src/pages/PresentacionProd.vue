<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-xl">
        Presentaciones
      </p>
    </div>
  </div>
  <div class="row">
    <List :vialist="this.apiList" :apilista="this.apiLista"/>
    <Add :apilista="this.apiLista" />
  </div>
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
