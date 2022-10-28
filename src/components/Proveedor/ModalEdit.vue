<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      flat
      class="text-primary bg-white"
      style="width: 500px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar proveedor</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="updateProveedor()">
          <div class="row q-col-gutter-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="apiedit.status_prov"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="ACTIVO"
                label="ACTIVO"
              />
              <q-radio
                dense
                v-model="apiedit.status_prov"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="INACTIVO"
                label="INACTIVO"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col col-12">
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="apiedit.personaId"
                :options="apipersona"
                :option-label="
                  apipersona =>
                    apipersona === null
                      ? null
                      : apipersona.nombres_per + ' ' + apipersona.apellidos_per
                "
                :option-value="
                  apipersona => (apipersona === null ? null : apipersona.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Persona "
                hint="Seleccione persona"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col col-12">
              <q-select
                dense
                standout
                bg-color="accent"
                v-model="apiedit.empresaId"
                :options="apiempresa"
                :option-label="
                  apiempresa =>
                    apiempresa === null
                      ? null
                      : apiempresa.nombre_empre +
                        '  Rif:' +
                        apiempresa.rif_empre
                "
                :option-value="
                  apiempresa => (apiempresa === null ? null : apiempresa.id)
                "
                emit-value
                map-options
                filled
                label="Empresa"
                hint="Seleccione una empresa"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-select>
            </div>
          </div>

          <div class="col col-12 q-pt-md">
            <q-input
              dense
              color="black"
              bg-color="accent"
              v-model="apiedit.detalle_prov"
              label="Detalles"
              hint="Escriba algún detalle"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Detalle no valido']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Guardar" no-caps type="submit" color="primary" />
        <q-btn
          no-caps
          label="Cancelar"
          color="primary"
          flat
          @click="closeModal()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  props: {
    persistent: Boolean,
    apiedit: '',
    apipersona: Array,
    apiempresa: Array
  },
  name: 'ModalEdit',
  data () {
    return {}
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
            message: 'Proveedor actualizado!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar el proveedor!',
          color: 'warning',
          position: 'center'
        })
      }
    },
    closeModal () {
      let persistent = false
      this.$emit('closeModel', persistent)
    }
  }
}
</script>
