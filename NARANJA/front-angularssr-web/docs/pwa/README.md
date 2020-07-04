## PWA

  Son básicamente páginas web, pero mediante el uso de Service Workers y otras tecnologías se comportan más como aplicaciones nativas. Es decir, que nos brinda una experiencia de usabilidad como si fuera una aplicación nativa mobile.
### Qué es... entonces?
Es una aplicación web que progresivamente incorpora:

- Push notification
- Se actualiza constantemente (nosotros tenemos el control de actualizar)
- Usa características del dispositivo
- Es estética - altamente responsive, adjusts the layout according to the device -
- Pesa muy poco (Lightweight ),  muy rápida en cargar
- Es confiable (segura, https)
- Funcionan sin conexión (offline mode)
### Service Workers

Es alguien que esta trabajando en el medio, en forma de interceptor, es como un proxy.

- Corre en el background, es independiente del hilo de web.
- Nuestra aplicación debe estar corriendo sobre un servidor https.
- Se compone de muchos eventListeners:
      self.addEventListener(install|activate|fetch..., event => { })

#### Ciclo de vida SW

#### **Instalación** *(self.addEventListener('install', event => {}))*:} 
> Descarga los asset, creamos la cache. Una vez instalado, si recargó la página, no se ejecuta de nuevo. Siempre se ejecutará si existe una nueva versión del SW. 

#### **Activación** ( self.addEventListener('activate', event => {}) ):
> Cuando el Service Workers toma el control. Se puede borrar la cache en este momento.

#### **Fetch** ( self.addEventListener('fetch', event => {}) ):
> Manejo de peticiones HTTP. Aplicar estrategias: cacheFirst, networkFirst, staleWhileRevalidate

#### **Sync** ( self.addEventListener('sync', event => {}) ): 
> Recuperamos la conexión a internet. Aquí usamos la base de datos, para generar un post que quedó almacenado en una queue.

#### **Push** ( self.addEventListener('push', event => {}) ):
> Maneja las push notifications.

### Diagrama de ciclo de vida
![redux-flow](./sw-lifecycle.png)

