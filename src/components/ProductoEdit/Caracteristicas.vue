<template>
<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
      <div class="q-pa-md row items-start">
        <q-card class="my-card" flat bordered>
          <q-item class="bg-primary" dark>
            <q-item-section>
              <q-item-label  class="text-center text-bold"
                >Nombre Producto: {{ editApi.nombre_prod }}</q-item-label
              >
              <q-item-label class="text-right text-bold">Codigo: {{ editApi.codigo_prod }}</q-item-label>
              <q-btn dense flat icon-right="edit" stretch unelevated size="sm" align="right"></q-btn>
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
              Status
              <q-card-section>
                <q-chip dense dark color="positive" text-color="white">
                  ACTIVO
                </q-chip>
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
</template>
<script>
export default {
  name:'Caracteristicas',
  props:{editApi:''

  },
  data() {
    return {

    }

  },
}
</script>
<style lang="sass" scoped>
.my-card
  width: 550px
  height: 170px
  //max-width: 350px
</style>
