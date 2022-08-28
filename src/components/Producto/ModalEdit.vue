<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">


      </div>
  </div>
</template>
<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  props: {
    apiedit: '',
    apipersona: Array,
    apiempresa: Array
  },
  name: 'ModalEdit',
  data () {
    return {
      slide: 1,
      autoplay: false
    }
  },
  methods: {
    async updateProveedor (req, res) {
      let params = {
        personaId: this.apiedit.personaId,
        empresaId: this.apiedit.empresaId,
        status_prov: this.apiedit.status_prov,
        detalle_prov: this.apiedit.detalle_prov
      }
      let persistent = false
      try {
        let edit = await axios.put(
          Global.url + 'proveedor/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (edit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Proveedor Actualizado!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar el Proveedor!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
