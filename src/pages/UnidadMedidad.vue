<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-xl">
        Unidad de Medidad
      </p>
    </div>
  </div>
  <div class="row">
     <List :vialist="this.apiList" />
    <Add />
  </div>
</template>

<script>
import List from '../components/UnidadMedidad/List.vue'
import Add from '../components/UnidadMedidad/Add.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
export default {
  name: 'UnidadMedidad',
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
    this.ListUnidad()
  },

  updated () {
    this.ListUnidad()
  },

  methods: {
    async ListUnidad (req, res) {
      try {
        let list = await axios.get(Global.url + 'unidad/list', Headers)
        this.apiList = list.data
        //console.log(this.apiList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
