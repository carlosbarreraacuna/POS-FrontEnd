"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, Phone, CheckCircle, XCircle, AlertCircle, Plus } from "lucide-react"

const reservasData = [
  {
    id: 1,
    cliente: "María García",
    telefono: "+57 300 123 4567",
    fecha: "2024-12-24",
    hora: "19:30",
    personas: 4,
    mesa: "Mesa 12",
    estado: "confirmada",
    observaciones: "Celebración de cumpleaños",
    origen: "telefono",
  },
  {
    id: 2,
    cliente: "Carlos López",
    telefono: "+57 301 987 6543",
    fecha: "2024-12-24",
    hora: "20:00",
    personas: 2,
    mesa: "Mesa 5",
    estado: "pendiente",
    observaciones: "Cena romántica",
    origen: "whatsapp",
  },
  {
    id: 3,
    cliente: "Ana Rodríguez",
    telefono: "+57 302 456 7890",
    fecha: "2024-12-25",
    hora: "13:00",
    personas: 6,
    mesa: "Mesa 8",
    estado: "cancelada",
    observaciones: "Almuerzo familiar",
    origen: "web",
  },
]

const pedidosOnline = [
  {
    id: "PO001",
    cliente: "Juan Pérez",
    telefono: "+57 303 111 2222",
    items: ["2x Bandeja Paisa", "1x Sancocho", "3x Coca Cola"],
    total: 125000,
    tipo: "domicilio",
    direccion: "Calle 45 #12-34, Bogotá",
    estado: "preparando",
    tiempoEstimado: "45 min",
    origen: "app",
  },
  {
    id: "PO002",
    cliente: "Laura Martínez",
    telefono: "+57 304 555 6666",
    items: ["1x Ajiaco", "2x Empanadas", "1x Jugo Natural"],
    total: 65000,
    tipo: "recoger",
    direccion: "Recoger en restaurante",
    estado: "listo",
    tiempoEstimado: "0 min",
    origen: "whatsapp",
  },
]

export default function ReservasOnline() {
  const [selectedTab, setSelectedTab] = useState("reservas")

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmada
          </Badge>
        )
      case "pendiente":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "cancelada":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelada
          </Badge>
        )
      case "preparando":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <Clock className="mr-1 h-3 w-3" />
            Preparando
          </Badge>
        )
      case "listo":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Listo
          </Badge>
        )
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const getOrigenBadge = (origen: string) => {
    const origenMap: Record<string, { label: string; color: string }> = {
      telefono: { label: "Teléfono", color: "bg-blue-100 text-blue-700" },
      whatsapp: { label: "WhatsApp", color: "bg-green-100 text-green-700" },
      web: { label: "Web", color: "bg-purple-100 text-purple-700" },
      app: { label: "App", color: "bg-orange-100 text-orange-700" },
    }

    const config = origenMap[origen] || { label: origen, color: "bg-gray-100 text-gray-700" }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas y Pedidos Online</h1>
          <p className="text-muted-foreground">Gestión de reservas y pedidos para llevar/domicilio</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Reserva
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservasData.filter((r) => r.fecha === "2024-12-24").length}</div>
            <p className="text-xs text-muted-foreground">
              {reservasData.filter((r) => r.fecha === "2024-12-24" && r.estado === "confirmada").length} confirmadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Online</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidosOnline.length}</div>
            <p className="text-xs text-muted-foreground">
              {pedidosOnline.filter((p) => p.estado === "preparando").length} en preparación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personas Esperadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reservasData.filter((r) => r.estado === "confirmada").reduce((acc, r) => acc + r.personas, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Para hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Online</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pedidosOnline.reduce((acc, p) => acc + p.total, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Hoy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reservas">Reservas ({reservasData.length})</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos Online ({pedidosOnline.length})</TabsTrigger>
          <TabsTrigger value="calendario">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="reservas" className="space-y-4">
          <div className="grid gap-4">
            {reservasData.map((reserva) => (
              <Card key={reserva.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-lg">{reserva.cliente}</h3>
                        {getEstadoBadge(reserva.estado)}
                        {getOrigenBadge(reserva.origen)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {reserva.fecha}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {reserva.hora}
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {reserva.personas} personas
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {reserva.telefono}
                        </div>
                      </div>
                      {reserva.observaciones && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Observaciones:</strong> {reserva.observaciones}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pedidos" className="space-y-4">
          <div className="grid gap-4">
            {pedidosOnline.map((pedido) => (
              <Card key={pedido.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-lg">
                          {pedido.cliente} - #{pedido.id}
                        </h3>
                        {getEstadoBadge(pedido.estado)}
                        {getOrigenBadge(pedido.origen)}
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">
                          {pedido.tipo === "domicilio" ? "Domicilio" : "Recoger"}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <strong>Items:</strong> {pedido.items.join(", ")}
                        </p>
                        <p className="text-sm">
                          <strong>Dirección:</strong> {pedido.direccion}
                        </p>
                        <p className="text-sm">
                          <strong>Teléfono:</strong> {pedido.telefono}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold">${pedido.total.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        <Clock className="inline mr-1 h-3 w-3" />
                        {pedido.tiempoEstimado}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Actualizar Estado
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Reservas</CardTitle>
              <CardDescription>Vista mensual de todas las reservas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">Calendario de reservas - Próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
