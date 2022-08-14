<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-xl">
        Bodega
      </p>
    </div>
  </div>
  <div class="row">
    <Add :vialist="this.apiList"/>
    <List  />
  </div>
</template>

<script>
import List from '../components/Almacen/Add.vue'
import Add from '../components/Almacen/List.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
export default {
  name: 'Almacen',
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
    this.ListBodega()
  },

  updated () {
    this.ListBodega()
  },

  methods: {
    async ListBodega (req, res) {
      try {
        let list = await axios.get(Global.url + 'bodega/list', Headers)
        this.apiList = list.data
        //console.log(this.apiList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
