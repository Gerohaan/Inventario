<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-pl-sm q-pr-sm q-pt-none q-pb-none" align="left">
        <p class="text-bold text-secondary text-h5">Clientes</p>
      </div>
    </div>

    <div class="row">
      <div class="col col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 q-pa-sm">
        <q-card flat>
          <q-card-section>
            <q-table
              :data="data"
              :columns="columns"
              row-key="name"
              flat 
              separator="none"
              dense
            >
            <template v-slot:top-left>
                <q-input 
                  color="primary" 
                  class="q-mb-lg q-mt-sm"
                  standout
                  round 
                  bg-color="warning" 
                  dense 
                  debounce="300" 
                  v-model="filter" 
                  placeholder="Búsqueda">
                  <template v-slot:prepend>
                    <q-icon color="primary" name="search" />
                  </template>
                </q-input>
            </template>
             <template v-slot:body="props">
               <q-tr :props="props">
                  <q-td auto-width>
                    1
                  </q-td>
                  <q-td auto-width>
                    1234567890
                  </q-td>
                  <q-td auto-width>
                    Jhon Doe
                  </q-td>
                  <q-td auto-width>
                    300 123 45 67
                  </q-td>
                  <q-td auto-width>
                    cliente@correo.com
                  </q-td>
                  <q-td auto-width>
                    Abejorral (ANT)
                  </q-td>
                  <q-td auto-width>
                    <q-btn
                      flat
                      dense
                      icon="img:IconsClients\eyes.svg"
                      size="xs"
                      class="q-ma-none"
                    />
                    <q-btn
                      flat
                      dense
                      icon="img:IconsClients\pencil.svg"
                      size="xs"
                      class="q-ma-none"
                    />
                    <q-btn
                      flat
                      dense
                      icon="img:IconsClients\recicle.svg"
                      size="xs"
                      class="q-ma-none"
                    />
                  </q-td>
               </q-tr>
             </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      
      <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
        <q-card flat class="q-pa-md">
          <div class="row">
            <div class="col text-center text-bold text-secondary text-h5">
              Agregar cliente
            </div>
          </div>
          <div class="row q-pa-md">
            <div class="col">
              <div class="text-h6 text-subtitle1 text-primary">Tipo de persona</div>
              <div class="row" align="center">
                <div class="col">
                  <q-radio v-model="tipoPersona" color="secondary" val="natural" left-label label="Persona natural" />
                </div>
                <div class="col">
                  <q-radio v-model="tipoPersona" color="secondary" val="juridica" left-label label="Persona jurídica" />
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm">
                  <p class="text-primary text-weight-medium">
                    Nombres
                  </p>
                  <div>
                    <q-input 
                      label="Nombres"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon color="primary" name="img:IconsClients\person.svg" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="col q-pa-sm">
                  <p class="text-primary text-weight-medium">
                    Apellidos
                  </p>
                  <div>
                    <q-input 
                      label="Apellidos"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon color="primary" name="img:IconsClients\person.svg" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm text-no-wrap">
                  <p class="text-primary text-weight-medium">
                    Documento
                  </p>
                  <div>
                    <q-input
                      label=""
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round
                      bg-color="warning" 
                      dense  
                      v-model="filter"
                    >
                    <template v-slot:prepend>
                     <q-icon color="primary" class="q-mr-sm" name="img:IconsClients\document.svg" />
                     <q-btn-dropdown dense flat color="primary"  no-caps label="Tipo" class="q-mr-none q-ml-none">
                      <q-list>
                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>N</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>E</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>T</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                    <span class="text-black">|</span>
                    </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm text-no-wrap">
                  <p class="text-primary text-weight-medium">
                    Tipo de regimen
                  </p>
                  <div>
                    <q-select 
                      label="Seleccionar"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon class="q-pr-md" color="primary" name="img:IconsClients\cert.svg" />
                      </template>
                    </q-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm">
                  <p class="text-primary text-weight-medium">
                    Correo
                  </p>
                  <div>
                    <q-input 
                      label="Correo"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon color="primary" name="img:IconsClients\mail.svg" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col q-pa-sm">
                  <p class="text-primary text-weight-medium">
                    Teléfono
                  </p>
                  <div>
                    <q-input 
                      label="Teléfono"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon color="primary" name="img:IconsClients\phone.svg" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm">
                  <p class="text-primary text-weight-medium">
                    Ciudad *
                  </p>
                  <div>
                   <q-btn-dropdown padding="8px 17px 8px 14px" icon="img:IconsClients\point.svg" class="q-mt-sm shadow-0 bg-warning" flat text-color="primary" no-caps label="Ciudad">
                      <q-list>
                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>Bogota</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>Cali</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>Medellin</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                </div>
                <div class="col q-pa-sm">
                  <p class="text-primary text-weight-medium">
                    Barrio *
                  </p>
                  <div>
                    <q-input 
                      label="Barrio"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon color="primary" name="img:IconsClients\point.svg" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pa-sm text-no-wrap">
                  <p class="text-primary text-weight-medium">
                    Dirección *
                  </p>
                  <div>
                    <q-input 
                      type="textarea"
                      input-style="height: 2px;"
                      label="Dirección"
                      color="primary" 
                      class="q-mt-sm"
                      standout
                      round 
                      bg-color="warning" 
                      dense 
                      debounce="300" 
                      v-model="filter">
                      <template v-slot:prepend>
                        <q-icon class="q-pr-md" color="primary" name="img:IconsClients\point.svg" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-card-section class="q-ma-none">
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>