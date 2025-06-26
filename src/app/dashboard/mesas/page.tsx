"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Users, Clock, DollarSign, MapPin, Plus, Settings } from "lucide-react"

const mesasData = [
  {
    id: 1,
    numero: "Mesa 1",
    capacidad: 4,
    estado: "ocupada",
    clientes: 3,
    pedido: "#1234",
    tiempo: "25 min",
    total: 85000,
  },
  { id: 2, numero: "Mesa 2", capacidad: 2, estado: "libre", clientes: 0, pedido: null, tiempo: null, total: 0 },
  { id: 3, numero: "Mesa 3", capacidad: 6, estado: "reservada", clientes: 0, pedido: null, tiempo: "19:30", total: 0 },
  {
    id: 4,
    numero: "Mesa 4",
    capacidad: 4,
    estado: "ocupada",
    clientes: 4,
    pedido: "#1235",
    tiempo: "15 min",
    total: 45000,
  },
  { id: 5, numero: "Mesa 5", capacidad: 2, estado: "libre", clientes: 0, pedido: null, tiempo: null, total: 0 },
  {
    id: 6,
    numero: "Mesa 6",
    capacidad: 8,
    estado: "ocupada",
    clientes: 6,
    pedido: "#1236",
    tiempo: "30 min",
    total: 120000,
  },
  {
    id: 7,
    numero: "Barra 1",
    capacidad: 1,
    estado: "ocupada",
    clientes: 1,
    pedido: "#1237",
    tiempo: "10 min",
    total: 25000,
  },
  { id: 8, numero: "Barra 2", capacidad: 1, estado: "libre", clientes: 0, pedido: null, tiempo: null, total: 0 },
]

export default function GestionMesas() {
  const [selectedMesa, setSelectedMesa] = useState<any>(null)

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ocupada":
        return "bg-red-500 hover:bg-red-600"
      case "libre":
        return "bg-green-500 hover:bg-green-600"
      case "reservada":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "limpieza":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "ocupada":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Ocupada</Badge>
      case "libre":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Libre</Badge>
      case "reservada":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Reservada</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Mesas</h1>
          <p className="text-muted-foreground">Vista general del salón y estado de las mesas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configurar Salón
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Mesa
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesas Ocupadas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/8</div>
            <p className="text-xs text-muted-foreground">50% ocupación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Personas en el restaurante</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22 min</div>
            <p className="text-xs text-muted-foreground">Por mesa ocupada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Activas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$275,000</div>
            <p className="text-xs text-muted-foreground">En mesas ocupadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Plano del salón */}
      <Card>
        <CardHeader>
          <CardTitle>Plano del Salón</CardTitle>
          <CardDescription>Haz clic en una mesa para ver más detalles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            {mesasData.map((mesa) => (
              <Dialog key={mesa.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${getEstadoColor(mesa.estado)} text-white`}
                  >
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold">{mesa.numero}</h3>
                        <div className="text-sm opacity-90">
                          <p>{mesa.capacidad} personas</p>
                          {mesa.estado === "ocupada" && (
                            <>
                              <p>{mesa.clientes} clientes</p>
                              <p>{mesa.tiempo}</p>
                            </>
                          )}
                          {mesa.estado === "reservada" && <p>Reserva: {mesa.tiempo}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{mesa.numero}</DialogTitle>
                    <DialogDescription>Detalles y acciones disponibles para esta mesa</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Estado</Label>
                        <div className="mt-1">{getEstadoBadge(mesa.estado)}</div>
                      </div>
                      <div>
                        <Label>Capacidad</Label>
                        <p className="mt-1">{mesa.capacidad} personas</p>
                      </div>
                    </div>

                    {mesa.estado === "ocupada" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Clientes</Label>
                            <p className="mt-1">{mesa.clientes} personas</p>
                          </div>
                          <div>
                            <Label>Tiempo</Label>
                            <p className="mt-1">{mesa.tiempo}</p>
                          </div>
                        </div>
                        <div>
                          <Label>Pedido</Label>
                          <p className="mt-1">
                            {mesa.pedido} - ${mesa.total.toLocaleString()}
                          </p>
                        </div>
                      </>
                    )}

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">Ver Pedido</Button>
                      <Button variant="outline">Cambiar Estado</Button>
                      <Button className="bg-orange-600 hover:bg-orange-700">Asignar Cliente</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
