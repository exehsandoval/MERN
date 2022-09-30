// Este código opcional se usa para registrar un trabajador de servicio.
// no se llama a register() por defecto.

// Esto permite que la aplicación se cargue más rápido en visitas posteriores en producción y da
// sus capacidades fuera de línea. Sin embargo, también significa que los desarrolladores (y usuarios)
// solo verá actualizaciones implementadas en visitas posteriores a una página, después de todo el
// las pestañas existentes abiertas en la página se han cerrado, ya que se almacenaron previamente en caché
// los recursos se actualizan en segundo plano.

// Para obtener más información sobre los beneficios de este modelo e instrucciones sobre cómo
// opt-in, leer https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] es la IPv6 localhost direccion.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 es considerado localhost por IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // El constructor de URL está disponible en todos los navegadores que admiten SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Nuestro trabajador de servicio no funcionará si PUBLIC_URL está en un origen diferente
      // de lo que se sirve nuestra página. Esto podría suceder si se utiliza una CDN para
      // servidor activo; ver https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Esto se está ejecutando en localhost. Verifiquemos si todavía existe un trabajador de servicio o no.checkValidServiceWorker(swUrl, config);

        // Agregue algo de registro adicional a localhost, apuntando a los desarrolladores al
        // Documentación del trabajador de servicio/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // No es localhost. Simplemente registre el trabajador de servicio
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // En este punto, se ha obtenido el contenido precaché actualizado,
              // pero el trabajador de servicio anterior seguirá sirviendo al mayor
              // contenido hasta que se cierren todas las pestañas del cliente.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Executar callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // En este punto, todo ha sido precaché.
              // Es el momento perfecto para mostrar un
              // "El contenido se almacena en caché para su uso sin conexión". mensaje.
              console.log('Content is cached for offline use.');

              // Executar callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Comprobar si se puede encontrar el trabajador del servicio. Si no puede recargar la página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Asegúrese de que existe el trabajador del servicio y que realmente estamos obteniendo un archivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No se encontró ningún trabajador de servicio. Probablemente una aplicación diferente. Vuelva a cargar la página.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
       // Trabajador de servicio encontrado. Proceda con normalidad.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
