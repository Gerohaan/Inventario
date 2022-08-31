<template>
  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-item class="bg-primary" dark>
          <q-item-section>
            <q-item-label>
              <q-btn
                dense
                label="stock"
                icon-right="edit"
                flat
                glossy
                class="full-width"
                @click="openModal()"
              ></q-btn
            ></q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="col-6" vertical>
            <q-item-label caption class="q-pb-md q-pt-sm"
              >Cantidad inicial:
            </q-item-label>
            <q-item-label caption>Cantidad dispinible: </q-item-label>
            <q-item-label caption class="q-pt-md"
              >Notificar antes de:
            </q-item-label>
          </q-card-section>
          <q-card-section class="col-6" vertical>
            <q-item-label overline class="text-bold">
              <q-chip size="md" dark dense color="warning">{{
                apiId.cantidad_inicial
              }}</q-chip></q-item-label
            >
            <q-item-label overline class="text-bold"
              ><q-chip size="md" dark dense color="positive">{{ apiId.cantidad_actual }}</q-chip></q-item-label
            >
            <q-item-label overline class=" text-bold"><q-chip  size="md" dark dense color="red" >{{
              apiId.cantidad_reservda
            }}</q-chip></q-item-label>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <ModalEditCosto
    :persistent="persistent"
    :apiedit="this.apiId"
    @closeModel="persistent = $event"
  />
</template>
<script>
import ModalEditCosto from './ModalEditCosto.vue'
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  name: 'Stock',
  components: {
      ModalEditCosto
  },
  props: {
    editApi: ''
  },
  mounted () {
    this.stockId(this.$route.params.id)
  },
  data () {
    return {
      persistent: false,
      apiId: {}
    }
  },
  methods: {
    openModal () {
      this.persistent = true
    },

    async stockId (req, res) {
      try {
        let list = await axios.get(
          Global.url + 'stock/showId/' + `${req}`,
          Headers
        )
        this.apiId = list.data
        //  console.log(this.apiId)
      } catch (error) {
        //console.log(this.editApi.id)
        throw new Error('error en la consulta', error)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 550px
  height: 170px
  //max-width: 350px
</style>
