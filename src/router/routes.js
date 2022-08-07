
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Login', name:'Login', component: () => import('pages/Login.vue') },
      { path: 'Persona', name:'Persona', component: () => import('pages/Persona.vue') },
      { path: 'Cliente', name:'Cliente', component: () => import('pages/Cliente.vue') },
      { path: 'Proveedor', name:'Proveedor', component: () => import('pages/Proveedor.vue') },
      { path: 'Categoria', name:'Categoria', component: () => import('pages/Categoria.vue') },
      { path: 'Almacen', name:'Almacen', component: () => import('pages/Almacen.vue') },
      { path: 'Empresa', name:'Empresa', component: () => import('pages/Empresa.vue') }





    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
