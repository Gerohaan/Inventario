<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
<!--     <pre>{{vialist}}</pre>
 -->    <q-card flat>
      <q-card-section>
        <q-table
          :rows="vialist"
          :columns="columns"
          :row-key="row => row.id"
          separator="none"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
          style="margin: 10px 0px 0px 20px"
        >
          <template v-slot:top-left>
            <q-input
              color="primary"
              class="text-secondary q-mb-lg q-mt-sm"
              standout
              round
              bg-color="accent"
              dense
              debounce="300"
              v-model="filter"
              placeholder="Búsqueda"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                dense
                icon="visibility"
                size="xs"
                class="q-ma-none"
                color="primary"
              />
              <q-btn
                flat
                dense
                icon="edit"
                size="xs"
                color="primary"
                class="q-ma-none"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="props.row.id;"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
const columns = [
  {
    name: 'nombre_bodega',
    required: true,
    label: 'Nombre de la Bodega',
    align: 'center',
    field: row => row.nombre_bodega,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'descripcion_bodega',
    align: 'center',
    label: 'Descripción',
    field: 'descripcion_bodega'
  },
  {
    name: 'ubicacion_bodega',
    label: 'Ubicación',
    align: 'center',
    field: 'ubicacion_bodega'
  },
  {
    name: 'status_bodega',
    label: 'Status',
    align: 'center',
    field: 'status_bodega'
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]

const rows = []
export default {
  name: 'List',

  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns,
      rows,
      filter: ''
    }
  },
  props: ['vialist']
}
</script>
