<template>
  <div class="row">
    <div class="col-12">
      <p
        class="text-bold text-primary text-h5"
        style="margin: 10px 0px 0px 40px"
      >
        Clientes
      </p>
    </div>
  </div>
  <div class="row">
    <List :pcapiList="this.apiListcliente" :apiList="this.apiListPer" />
    <Add :apiList="this.apiListPer" />
  </div>
</template>

<script>
import List from '../components/Clientes/List.vue'
import Add from '../components/Clientes/Add.vue'
import { Global } from '../Global'
import { Headers } from '../../Headers'
import axios from 'axios'

export default {
  name: 'Cliente',
  components: {
    List,
    Add
  },
  data () {
    return {
      apiListcliente: [],
      apiListPer: []
    }
  },
  mounted () {
    this.listCliente()
    this.listPer()
  },

  updated () {
    this.listCliente()
  },

  methods: {
    async listCliente (req, res) {
      try {
        let list = await axios.get(Global.url + 'cliente/list', Headers)
        this.apiListcliente = list.data
        //console.log(this.apiList)
      } catch (error) {
        console.log(error)
      }
    },
    async listPer (req, res) {
      try {
        let listPersona = await axios.get(Global.url + 'persona/list', Headers)
        this.apiListPer = listPersona.data
        //console.log(this.apiList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
