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
<Caracteristicas :editApi="this.editApi"  />
<Precio  :editApi="this.editApi" />
  </div>
  <div class="row">
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
      <div class="q-pa-md">
        <q-markup-table flat bordered>
          <thead class="bg-grey-6">
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <div class="text-h6 q-ml-md text-white">
                    Movimiento Producto
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Dessert (100g serving)</th>
              <th class="text-right">Calories</th>
              <th class="text-right">Fat (g)</th>
              <th class="text-right">Carbs (g)</th>
              <th class="text-right">Protein (g)</th>
            </tr>
          </thead>
          <tbody class="bg-grey-3">
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">159</td>
              <td class="text-right">6</td>
              <td class="text-right">24</td>
              <td class="text-right">4</td>
            </tr>
            <tr>
              <td class="text-left">Ice cream sandwich</td>
              <td class="text-right">237</td>
              <td class="text-right">9</td>
              <td class="text-right">37</td>
              <td class="text-right">4.3</td>
            </tr>
            <tr>
              <td class="text-left">Eclair</td>
              <td class="text-right">262</td>
              <td class="text-right">16</td>
              <td class="text-right">23</td>
              <td class="text-right">6</td>
            </tr>
            <tr>
              <td class="text-left">Cupcake</td>
              <td class="text-right">305</td>
              <td class="text-right">3.7</td>
              <td class="text-right">67</td>
              <td class="text-right">4.3</td>
            </tr>
            <tr>
              <td class="text-left">Gingerbread</td>
              <td class="text-right">356</td>
              <td class="text-right">16</td>
              <td class="text-right">49</td>
              <td class="text-right">3.9</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>
<script>
import Precio from '../components/ProductoEdit/Precio.vue'
import Caracteristicas from '../components/ProductoEdit/Caracteristicas.vue'
import { Headers } from '../../Headers'
import axios from 'axios'
import { Global } from '../Global'
import { Notify } from 'quasar'

export default {
  props: {
    apiedit: '',
    apipersona: Array,
    apiempresa: Array
  },
  components: {
    Caracteristicas
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

