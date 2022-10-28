<template>
  <q-page class="fondo">
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pl-md">
        Empresas
      </p>
    </div>
  </div>
  <div class="row">
    <List :papiList="apiList" />
    <Add />
  </div>
</q-page>
</template>

<script>
import List from '../components/Empresas/List.vue'
import Add from '../components/Empresas/Add.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
export default {
  name: 'Empresa',
  components: {
    List,
    Add
  },
  data () {
    return {
      apiList: []
    }
  },
  mounted () {
    this.listEmpresa()
  },
  updated () {
    this.listEmpresa()
  },
  methods: {
    async listEmpresa (req, res) {
      try {
        let list = await axios.get(Global.url + 'empresa/list', Headers)
        this.apiList = list.data
        //console.log(this.apiList)
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
