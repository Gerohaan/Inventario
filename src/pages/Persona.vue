<template>
  <div class="row">
    <div class="col-12">
      <p
        class="text-bold text-primary text-h5"
        style="margin: 10px 0px 0px 40px"
      >
        Personas
      </p>
      <!--       <pre>{{this.apiListPer}}</pre>
 -->
    </div>
  </div>
  <div class="row">
    <List :apiList="this.apiListPer" />
    <Add />
  </div>
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
