# 💈 Sistema de Control de Inventario para Salón Blush

Sistema completo para rastrear el consumo de productos en mililitros (ML) en salones de belleza.

## 🚀 Características

- ✅ **351 productos** del inventario real completo
- 💾 **Guardado automático** con localStorage
- 📊 **Analíticas en tiempo real** por estilista
- ⚠️ **Alertas de stock bajo** (menos del 30%)
- 📥 **Exportación** a CSV y JSON para reportes
- 📱 **Responsive** - funciona en móviles, tablets y computadoras
- 🎨 **Interfaz moderna** con colores del salón

## 📋 Estructura del Proyecto

```
salon-inventory/
├── package.json          # Dependencias del proyecto
├── vite.config.js        # Configuración de Vite
├── index.html            # HTML principal
├── README.md             # Este archivo
└── src/
    ├── main.jsx          # Punto de entrada React
    └── App.jsx           # Componente principal (toda la lógica)
```

## 🌐 Despliegue en Vercel

Este proyecto está configurado para desplegarse fácilmente en Vercel:

1. Sube todos estos archivos a tu repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
3. Importa tu repositorio `blush-losolivos-inventory`
4. Selecciona **Framework: Vite**
5. Click en **Deploy**
6. ¡Listo! Tu app estará en línea en 2 minutos

## 🛠️ Instalación Local (Opcional)

Si quieres probar localmente antes de subir a Vercel:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

Abre: `http://localhost:5173`

## 📊 Uso del Sistema

### 1. Ver Inventario
- Pestaña **"Inventario"**
- Busca productos por nombre o SKU
- Ve el stock disponible en ML
- Códigos de color:
  - 🟢 Verde: Stock saludable (>60%)
  - 🟡 Amarillo: Stock medio (30-60%)
  - 🔴 Rojo: Stock crítico (<30%)

### 2. Registrar Consumo
- Pestaña **"Registrar"**
- Selecciona el producto
- Ingresa los ML consumidos
- (Opcional) Agrega el nombre del estilista
- Click en "Registrar Consumo"
- ✅ Se guarda automáticamente

### 3. Ver Historial
- Pestaña **"Historial"**
- Ve todos los consumos registrados
- Fecha, producto, cantidad y estilista
- Se guarda automáticamente en el navegador

### 4. Analíticas
- Pestaña **"Analíticas"**
- Resumen general de consumos
- Ranking de estilistas por ML consumidos
- Estadísticas de productos

### 5. Exportar Reportes
Dos botones en la parte superior:

**Backup JSON** (botón azul):
- Descarga TODOS los datos
- Útil para respaldos diarios/semanales
- Guárdalo en un lugar seguro

**CSV** (botón verde):
- Descarga reporte de consumos
- Se puede abrir en Excel
- Perfecto para análisis mensual

### 6. Reset
- Botón rojo "Reset"
- Borra TODOS los datos
- ⚠️ **¡Haz backup antes!**
- Útil para empezar de cero cada mes

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en el navegador (localStorage):
- ✅ Permanecen aunque cierres la pestaña
- ✅ Se mantienen en el mismo dispositivo/navegador
- ⚠️ No se sincronizan entre dispositivos
- ⚠️ Se pueden perder si limpias el caché del navegador

**RECOMENDACIÓN:** Descarga backup JSON cada día o semana.

## 🎨 Productos Incluidos

El sistema incluye:
- Tintes LOREAL INOA (diferentes tonos)
- Tintes KUUL COLOR (colores, neones, metálicos)
- Productos L'Oréal Professionnel
- Productos Redken
- Productos Tigi
- Y más...

Total: **351 productos** con control de ML

## 📝 Agregar Más Productos

Para agregar productos, edita el array `RAW_DATA` en `src/App.jsx`:

```javascript
const RAW_DATA = [
  [ID, "Nombre del Producto", "SKU", Unidades, CapacidadML, Precio],
  // Ejemplo:
  [352, "NUEVO PRODUCTO", "SKEXKT9999", 3, 60, 25],
  // Agrega más productos aquí...
];
```

Formato:
- **ID**: Número único (siguiente al último)
- **Nombre**: Nombre del producto
- **SKU**: Código único del producto
- **Unidades**: Cantidad de unidades en stock
- **CapacidadML**: Mililitros por unidad (null si no aplica)
- **Precio**: Precio unitario

## 🔧 Tecnologías Usadas

- **React 18** - Framework principal
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilos (vía CDN)
- **Lucide React** - Iconos modernos
- **localStorage** - Almacenamiento del navegador

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ Móviles iOS y Android
- ✅ Tablets
- ⚠️ Requiere JavaScript habilitado

## 🆘 Solución de Problemas

**Problema:** Los datos desaparecieron
- **Causa:** Se limpió el caché del navegador
- **Solución:** Importar el último backup JSON

**Problema:** No se registra el consumo
- **Causa:** Producto sin ML definido o stock insuficiente
- **Solución:** Verifica que el producto tenga ML y stock disponible

**Problema:** La app no carga
- **Causa:** Error en despliegue de Vercel
- **Solución:** Verifica que seleccionaste "Vite" como framework

## 📞 Soporte

Para ayuda con el sistema, contacta al desarrollador o consulta la documentación de:
- [Vercel](https://vercel.com/docs)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)

## 📄 Licencia

Uso privado para Salón Blush - Los Olivos.

---

**Desarrollado con cariño para Salón Blush**

**Última actualización:** Octubre 2025