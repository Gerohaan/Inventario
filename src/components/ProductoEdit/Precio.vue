<template>
  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-item class="bg-primary" dark>
          <q-item-section>
            <q-item-label>
              <q-btn
                dense
                label="costo"
                icon-right="edit"
                flat
                glossy
                class="full-width"
              ></q-btn
            ></q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="col-6" vertical>
            <q-item-label caption class="q-pb-md">Precio Costo: </q-item-label>
            <q-item-label caption>Precio Venta: </q-item-label>
            <q-item-label caption class="q-pt-md">Impuesto: </q-item-label>
          </q-card-section>
          <q-card-section class="col-6" vertical>
            <q-item-label overline class="q-pb-md text-bold">{{
              editApi.costo_prod
            }}</q-item-label>
            <q-item-label overline class="text-bold">{{
              editApi.precio_prod
            }}</q-item-label>
            <q-item-label overline class="q-pt-md text-bold">{{
              editApi.impuesto_prod
            }}</q-item-label>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Precio',
  props: { editApi: '' },
  data () {
    return {}
  }
}
</script>
