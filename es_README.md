# JSwipe
###### v 1.0

![Swipe Drawer Screenshot](screenshots/JSwipe.png "Swipe Drawer ss")

Crea un bonito y práctico nav drawer facilmente

Links directos:
* https://eliseog.github.io/js-wipe/drawer.min.js
* https://eliseog.github.io/js-wipe/drawer.min.css

## Requerimientos

Para el correcto funcionamiento es necesario cargar los [material icons](https://material.io/icons/) y la fuente [Roboto](https://fonts.google.com/specimen/Roboto) puedes revisar aquí: https://eliseog.github.io/js-wipe/ un ejemplo, los gestos solo funcionan en **dispositivos móviles**

![Swipe Drawer Screenshot](screenshots/ss.png "Swipe Drawer ss")
---

## Uso

Para comenzar necesitaremos incluir 2 etiquetas en nuestro documento, estas servirán como referencia para que se incluya el resto del menú

```HTML
<span class="__modal_drawer"></span> <!-- 1 -->
<div id="drawer_js"></div> <!-- 2 -->
```

1. ( __modal_drawer ) se trata de el fondo semi-transparente que aparece cuando el menú se despliega, para que se pueda interactuar con el resto del sitio cuando el drawer esté activo
2. ( drawer_js ) El contenedor principal del drawer

---

Nuestro drawer se inicializa con el metodo `init` del objeto `Drawer`, y recive como parámetro un objeto con 2 nodos principales: sección de cabecera llamada `main` y items del menú llamados `menu`, ej.

```JS
Drawer.init({
  main: // header,
  menu: // menu-items
})

```
El nodo `main` debe contener un objeto con los siguientes nodos

```JS
main: {
  background: 'sources/bg.jpg',        // <- path del fondo de la sección de header
  photo: 'sources/cobie-smulders.jpg', // <- path de la foto de perfil
  title: 'Cobie Smulders',             // <- Nombre del usuario
  subtitle: 'exam@mail.com',           // <- Correo o identificador del usuario
}
```

El nodo `menu` recibe un arreglo de objetos, donde cada uno define un item

```JS
menu: [{
    icon: 'account circle', // <- define el ícono del item
    label: 'Mi perfil',     // <- define label del item
    action: '/profile'      // <- URL a la que enviará este boton o la funcion que ejecutará
  },
  {
    separator: 'settings'  // <- separador
  },
  {
    icon: 'share',
    label: 'Compartir',
    action: share   // <- agrega un apuntador a la función `share()` y se ejecutará con el evento click
}]
```

1. `icon:` recibe un string con el nombre correspondiente del mismo en la librería de [material icons](https://material.io/icons/)
2. `label:` recibe un string con el nombre que queremos escribir en el item
3. `action:` este elemento puede recivir una ruta o URL o una función a ejecutar con un click, ej. para asignar `function share() { ...` le asignamos el nombre de la función sin comillas ni paréntesis, de forma que actúe como un apuntador a la misma, no es posible asignar funciones anónimas
4. `separator:` este nodo recibe un string que utilizará como título de una sección

## Final

Recapitulando, el hash que recibe como parámetro `Drawer.init` de ser añadido directamente en el método, se vería así:

```JS
Drawer.init({
  main: {
    background: 'sources/bg.jpg',
    photo: 'sources/cobie-smulders.jpg',
    title: 'Cobi Smulders',
    subtitle: 'exam@mail.com'
  },
  menu: [{
    icon: 'account_circle',
    label: 'Mi perfil',
    action: '/profile'
  },{
    icon: 'favorite',
    label: 'Favoritos',
    action: '/profile'
  },{
    icon: 'share',
    label: 'Compartir',
    action: share
  },{
    separator: 'settings'
  },{
    icon: 'settings_applications',
    label: 'Ajustes',
    action: '/profile'
  }]
})
```
---

Es posible incluir un botón que despliegue el drawer, añadiendo el id **mdrawer_trgger** a cualquier etiqueta, en caso de desktop donde los geston no funcionan, o por simple comodidad

```HTML
<button id="mdrawer_trgger">menú</button>
```

