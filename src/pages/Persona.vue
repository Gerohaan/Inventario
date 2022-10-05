<template>
  <q-page class="fondo">
    <div class="row">
      <div class="col-12 q-ml-md q-mt-md text-bold text-primary text-h5">
        Personas
      </div>
    </div>
  <div class="row">
    <List :apiList="apiListPer" />
    <Add />
  </div>
  </q-page>
</template>

<script>
import List from '../components/Personas/List.vue'
import Add from '../components/Personas/Add.vue'
import { Global } from '../Global'
import { Headers } from '../../Headers'
import axios from 'axios'

export default {
  name: 'Persona',
  components: {
    List,
    Add
  },
  data () {
    return {
      apiListPer: []
    }
  },
  mounted () {
    this.listPer()
  },

  updated () {
    this.listPer()
  },

  methods: {
    async listPer (req, res) {
      try {
        let list = await axios.get(Global.url + 'persona/list', Headers)
        this.apiListPer = list.data
        //console.log(this.apiListPer)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.fondo{
  background-image: url('src/assets/fondo2.jpg');
}
</style>
