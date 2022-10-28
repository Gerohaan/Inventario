<template>
  <div class="col row">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
      <div class="q-pa-md">
        <q-carousel
          swipeable
          height="170px"
          animated
          v-model="slide"
          :autoplay="autoplay"
          ref="carousel"
          infinite
        >
          <q-carousel-slide :name="1" img-src="../assets/trade07.jpg" />
          <q-carousel-slide :name="2" img-src="../assets/trade08.jpg" />

          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[20, 20]"
              class="q-gutter-xs"
            >
              <q-btn
                push
                round
                dense
                color="primary"
                text-color="black"
                icon="arrow_left"
                @click="$refs.carousel.previous()"
              />
              <q-btn
                push
                round
                dense
                color="primary"
                text-color="black"
                icon="arrow_right"
                @click="$refs.carousel.next()"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
    </div>
    <Caracteristicas :editApi="this.editApi" />
    <Precio :editApi="this.editApi" />
  </div>
  <div class="row">
    <Movimiento />
    <Stock  :editApi="editApi" />
  </div>
</template>
<script>

import Precio from '../components/ProductoEdit/Precio.vue'
import Caracteristicas from '../components/ProductoEdit/Caracteristicas.vue'
import Movimiento from '../components/ProductoEdit/Movimiento.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
import { Notify } from 'quasar'
import Stock from 'src/components/ProductoEdit/Stock.vue'

export default {
  props: {
    apiedit: '',
    apipersona: Array,
    apiempresa: Array
  },
  components: {
    Caracteristicas,
    Precio,
    Movimiento,
    Stock
},
  name: 'ModalEdit',
  data () {
    return {
      slide: 1,
      autoplay: true,
      editApi: []
    }
  },
  mounted () {
    this.editProducto(this.$route.params.id)
  },
  /*  updated () {
    this.editProducto(this.$route.params.id)

  }, */
  methods: {
    async updateProducto (req, res) {
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
    },
    async editProducto (req, res) {
      try {
        let list = await axios.get(
          Global.url + 'producto/show/' + `${req}`,
          Headers
        )
        this.editApi = list.data
        //console.log(this.editApi)
      } catch (error) {
        // console.log(this.$route.params.id)
        throw new Error('error en la lista', error)
      }
    }
  }
}
</script>

