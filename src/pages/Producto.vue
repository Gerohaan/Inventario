<template>
  <div class="row">
    <div class="col-12">
      <p
        class="text-bold text-primary text-h5"
        style="margin: 10px 0px 0px 40px"
      >
        Producto
      </p>
    </div>
  </div>
  <div class="row">
    <List :datapi="this.apilist" />
    <Add
      :apibodega="this.apilist3"
      :apicategoria="this.apilist2"
      :apipresent="this.apilist4"
    />
  </div>
</template>

<script>
import List from '../components/Producto/List.vue'
import Add from '../components/Producto/Add.vue'
import axios from 'axios'
import { Global } from '../Global'
import { Headers } from '../../Headers'
export default {
  name: 'Producto',
  components: {
    List,
    Add
  },
  data () {
    return {
      apilist: [],
      apilist2: [],
      apilist3: [],
      apilist4: []
    }
  },
  mounted () {
    this.listProducto()
    this.listCategoria()
    this.ListBodega()
    this.ListPresent()
  },
  updated () {
    this.listProducto()
  },

  methods: {
    async listProducto (req, res) {
      try {
        let list = await axios.get(Global.url + 'producto/list', Headers)
        this.apilist = list.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    },

    async listCategoria (req, res) {
      try {
        let list2 = await axios.get(Global.url + 'categoria/list', Headers)
        this.apilist2 = list2.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    },
    async ListBodega (req, res) {
      try {
        let list3 = await axios.get(Global.url + 'bodega/list', Headers)
        this.apilist3 = list3.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    },

    async ListPresent (req, res) {
      try {
        let list4 = await axios.get(Global.url + 'presentacion/list', Headers)
        this.apilist4 = list4.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    }
  }
}
</script>
