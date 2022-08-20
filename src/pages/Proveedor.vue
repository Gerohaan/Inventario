<template>
  <div class="row">
    <div class="col-12">
      <p
        class="text-bold text-primary text-h5"
        style="margin: 10px 0px 0px 40px"
      >
        Proveedor
      </p>
    </div>
  </div>
  <div class="row">
    <List :datapi="this.apilist" :apipersona="this.apilist3" :apiempresa="this.apilist2" />
    <Add :apiempresa="this.apilist2" :apipersona="this.apilist3" />
  </div>
</template>

<script>
import List from '../components/Proveedor/List.vue'
import Add from '../components/Proveedor/Add.vue'
import axios from 'axios'
import { Global } from '../Global'
import { Headers } from '../../Headers'
export default {
  name: 'Proveedor',
  components: {
    List,
    Add
  },
  data () {
    return {
      apilist: [],
      apilist2: [],
      apilist3: []
    }
  },
  mounted () {
    this.listProveedor()
    this.ListEmpresa()
    this.ListPersona()

  },
  updated () {
    this.listProveedor()
  },

  methods: {
    async listProveedor (req, res) {
      try {
        let list = await axios.get(Global.url + 'proveedor/list', Headers)
        this.apilist = list.data
      } catch (error) {
        console.log(error)
      }
    },

    async ListEmpresa (req, res) {
      try {
        let list2 = await axios.get(Global.url + 'empresa/list', Headers)
        this.apilist2 = list2.data
      } catch (error) {
        console.log(error)
      }
    },
    async ListPersona (req, res) {
      try {
        let list3 = await axios.get(Global.url + 'persona/list', Headers)
        this.apilist3 = list3.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
