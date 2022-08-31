<template>
  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
    <div class="q-pa-md row items-start">
      <q-card class="my-card" flat bordered>
        <q-item class="bg-primary" dark>
          <q-item-section>
            <q-item-label class="text-center text-bold"
              >Nombre producto: {{ editApi.nombre_prod }}</q-item-label
            >
            <q-item-label class="text-right text-bold"
              >Codigo: {{ editApi.codigo_prod }}</q-item-label
            >
            <q-btn
              dense
              flat
              icon-right="edit"
              stretch
              unelevated
              size="sm"
              align="right"
              @click="openModal()"
            ></q-btn>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="col-4">
            <q-item-label>
              Categoria
            </q-item-label>

            <q-card-section>
              <div
                class="text-bold"
                v-for="(items, index) in editApi"
                :key="index"
              >
                {{ items.nombre_categoria }}
              </div>
            </q-card-section>
          </q-card-section>
          <q-separator style="height:120px" vertical />
          <q-card-section class="col-4">
            Presentación
            <q-card-section>
              <div
                class="text-bold"
                v-for="(item, index) in editApi"
                :key="index"
              >
                {{ item.nombre_present }}
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator vertical />
          <q-card-section class="col-4">
            Bodega
            <q-card-section>
              <div
                class="text-bold"
                v-for="(item, index) in editApi"
                :key="index"
              >
                {{ item.nombre_bodega }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <ModalEdit
    :persistent="persistent"
    :apiedit="this.editApi"
    @closeModel="persistent = $event"
  >
  </ModalEdit>
</template>
<script>
import ModalEdit from '../../components/ProductoEdit/ModalEdit.vue'
export default {
  name: 'Caracteristicas',
  components: {
    ModalEdit
  },
  props: { editApi: '' },
  data () {
    return {
      persistent: false,
    }
  },

  methods: {
    openModal () {
      this.persistent = true
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
