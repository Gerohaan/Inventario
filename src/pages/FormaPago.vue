<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Tipo de pagos
      </p>
    </div>
  </div>
  <div class="row">
    <List :papiList="this.apiList" />
    <Add />
  </div>
</template>

<script>
import List from '../components/FormaPago/List.vue'
import Add from '../components/FormaPago/Add.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
export default {
  name: 'FormaPago',
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
    this.listFormaPago()
  },
  updated () {
    this.listFormaPago()
  },
  methods: {
    async listFormaPago (req, res) {
      try {
        let list = await axios.get(Global.url + 'formaPago/list', Headers)
        this.apiList = list.data
        //console.log(this.apiList)
      } catch (error) {
        throw new Error('error en la consulta', error)
        //console.log(error)
      }
    }
  }
}
</script>
