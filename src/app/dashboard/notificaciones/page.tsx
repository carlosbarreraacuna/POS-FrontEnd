"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Package,
  DollarSign,
  Settings,
  Trash2,
  BookMarkedIcon as MarkAsRead,
} from "lucide-react"

const notificacionesData = [
  {
    id: 1,
    tipo: "alerta",
    titulo: "Stock Bajo - Pollo",
    mensaje: "El stock de pollo está por debajo del mínimo (2kg restantes)",
    fecha: "2024-12-24 14:30",
    leida: false,
    prioridad: "alta",
    categoria: "inventario",
    usuario: "Sistema",
  },
  {
    id: 2,
    tipo: "info",
    titulo: "Nuevo Pedido #1234",
    mensaje: "Se ha creado un nuevo pedido para la Mesa 12",
    fecha: "2024-12-24 14:25",
    leida: false,
    prioridad: "normal",
    categoria: "pedidos",
    usuario: "Carlos López",
  },
  {
    id: 3,
    tipo: "warning",
    titulo: "Tiempo de Espera Excedido",
    mensaje: "La Mesa 15 lleva 25 minutos esperando su pedido",
    fecha: "2024-12-24 14:20",
    leida: true,
    prioridad: "media",
    categoria: "operaciones",
    usuario: "Sistema",
  },
  {
    id: 4,
    tipo: "success",
    titulo: "Factura Procesada",
    mensaje: "Factura F001-2024 procesada exitosamente por $180,780",
    fecha: "2024-12-24 14:15",
    leida: true,
    prioridad: "normal",
    categoria: "finanzas",
    usuario: "Ana Rodríguez",
  },
  {
    id: 5,
    tipo: "info",
    titulo: "Nueva Reserva",
    mensaje: "Reserva confirmada para 4 personas el 25/12 a las 19:30",
    fecha: "2024-12-24 14:10",
    leida: false,
    prioridad: "normal",
    categoria: "reservas",
    usuario: "María García",
  },
]

const configuracionNotificaciones = [
  {
    categoria: "inventario",
    nombre: "Inventario",
    descripcion: "Alertas de stock bajo y vencimientos",
    email: true,
    push: true,
    sonido: true,
    icon: Package,
  },
  {
    categoria: "pedidos",
    nombre: "Pedidos",
    descripcion: "Nuevos pedidos y cambios de estado",
    email: false,
    push: true,
    sonido: true,
    icon: Bell,
  },
  {
    categoria: "operaciones",
    nombre: "Operaciones",
    descripcion: "Tiempos de espera y alertas operativas",
    email: true,
    push: true,
    sonido: false,
    icon: Clock,
  },
  {
    categoria: "finanzas",
    nombre: "Finanzas",
    descripcion: "Facturas, pagos y reportes financieros",
    email: true,
    push: false,
    sonido: false,
    icon: DollarSign,
  },
  {
    categoria: "usuarios",
    nombre: "Usuarios",
    descripcion: "Actividad de usuarios y seguridad",
    email: true,
    push: false,
    sonido: false,
    icon: Users,
  },
]

export default function Notificaciones() {
  const [selectedTab, setSelectedTab] = useState("todas")

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "alerta":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge className="bg-yellow-100 text-yellow-700">Media</Badge>
      case "normal":
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const getCategoriaBadge = (categoria: string) => {
    const categoriaConfig = configuracionNotificaciones.find((c) => c.categoria === categoria)
    return (
      <Badge variant="outline" className="capitalize">
        {categoriaConfig?.nombre || categoria}
      </Badge>
    )
  }

  const notificacionesNoLeidas = notificacionesData.filter((n) => !n.leida).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
          <p className="text-muted-foreground">Centro de notificaciones y alertas del sistema</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MarkAsRead className="mr-2 h-4 w-4" />
            Marcar Todas como Leídas
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notificaciones</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificacionesData.length}</div>
            <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No Leídas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{notificacionesNoLeidas}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificacionesData.filter((n) => n.prioridad === "alta").length}</div>
            <p className="text-xs text-muted-foreground">Prioridad alta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Configuraciones</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{configuracionNotificaciones.length}</div>
            <p className="text-xs text-muted-foreground">Categorías activas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas ({notificacionesData.length})</TabsTrigger>
          <TabsTrigger value="no-leidas">No Leídas ({notificacionesNoLeidas})</TabsTrigger>
          <TabsTrigger value="alertas">
            Alertas ({notificacionesData.filter((n) => n.prioridad === "alta").length})
          </TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <div className="space-y-3">
            {notificacionesData.map((notificacion) => (
              <Card
                key={notificacion.id}
                className={`hover:shadow-md transition-shadow ${
                  !notificacion.leida ? "border-l-4 border-orange-500 bg-orange-50/30" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getIconoTipo(notificacion.tipo)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${!notificacion.leida ? "font-semibold" : ""}`}>
                            {notificacion.titulo}
                          </h3>
                          {getPrioridadBadge(notificacion.prioridad)}
                          {getCategoriaBadge(notificacion.categoria)}
                        </div>
                        <p className="text-sm text-muted-foreground">{notificacion.mensaje}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{notificacion.fecha}</span>
                          <span>Por: {notificacion.usuario}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {!notificacion.leida && (
                        <Button variant="outline" size="sm">
                          <MarkAsRead className="mr-2 h-4 w-4" />
                          Marcar Leída
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="no-leidas" className="space-y-4">
          <div className="space-y-3">
            {notificacionesData
              .filter((n) => !n.leida)
              .map((notificacion) => (
                <Card
                  key={notificacion.id}
                  className="hover:shadow-md transition-shadow border-l-4 border-orange-500 bg-orange-50/30"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getIconoTipo(notificacion.tipo)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{notificacion.titulo}</h3>
                            {getPrioridadBadge(notificacion.prioridad)}
                            {getCategoriaBadge(notificacion.categoria)}
                          </div>
                          <p className="text-sm text-muted-foreground">{notificacion.mensaje}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{notificacion.fecha}</span>
                            <span>Por: {notificacion.usuario}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MarkAsRead className="mr-2 h-4 w-4" />
                          Marcar Leída
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-4">
          <div className="space-y-3">
            {notificacionesData
              .filter((n) => n.prioridad === "alta")
              .map((notificacion) => (
                <Card
                  key={notificacion.id}
                  className="hover:shadow-md transition-shadow border-l-4 border-red-500 bg-red-50/30"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getIconoTipo(notificacion.tipo)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{notificacion.titulo}</h3>
                            {getPrioridadBadge(notificacion.prioridad)}
                            {getCategoriaBadge(notificacion.categoria)}
                          </div>
                          <p className="text-sm text-muted-foreground">{notificacion.mensaje}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{notificacion.fecha}</span>
                            <span>Por: {notificacion.usuario}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Resolver
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Personaliza cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {configuracionNotificaciones.map((config) => (
                  <div key={config.categoria} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <config.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{config.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{config.descripcion}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`email-${config.categoria}`} className="text-sm">
                          Email
                        </Label>
                        <Switch id={`email-${config.categoria}`} checked={config.email} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`push-${config.categoria}`} className="text-sm">
                          Push
                        </Label>
                        <Switch id={`push-${config.categoria}`} checked={config.push} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`sonido-${config.categoria}`} className="text-sm">
                          Sonido
                        </Label>
                        <Switch id={`sonido-${config.categoria}`} checked={config.sonido} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
