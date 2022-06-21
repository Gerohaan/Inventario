<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Categorias
      </p>
    </div>
  </div>
  <div class="row">
    <List :papiList="this.apiList" />
    <Add />
  </div>
</template>

<script>
import List from '../components/Categorias/List.vue'
import Add from '../components/Categorias/Add.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
export default {
  name: 'Categoria',
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
    this.listCategoria()
  },
  updated () {
    this.listCategoria()
  },
  methods: {
    async listCategoria (req, res) {
      try {
        let list = await axios.get(Global.url + 'categoria/list', Headers)
        this.apiList = list.data
        //console.log(this.apiList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
