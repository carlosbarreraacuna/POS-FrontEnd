"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Clock, CheckCircle, XCircle, Edit } from "lucide-react"

const pedidosData = [
  {
    id: "1234",
    mesa: "Mesa 12",
    cliente: "Juan Pérez",
    items: ["2x Bandeja Paisa", "1x Sancocho", "2x Coca Cola"],
    total: 85000,
    estado: "preparando",
    tiempo: "8 min",
    observaciones: "Sin cebolla en la bandeja",
  },
  {
    id: "1235",
    mesa: "Mesa 7",
    cliente: "María García",
    items: ["1x Ajiaco", "2x Arepa con Queso", "1x Jugo Natural"],
    total: 45000,
    estado: "listo",
    tiempo: "15 min",
    observaciones: "",
  },
  {
    id: "1236",
    mesa: "Para llevar",
    cliente: "Carlos López",
    items: ["3x Empanadas", "1x Café"],
    total: 18000,
    estado: "entregado",
    tiempo: "20 min",
    observaciones: "Extra salsa",
  },
]

export default function GestionPedidos() {
  const [selectedTab, setSelectedTab] = useState("activos")
  const [searchTerm, setSearchTerm] = useState("")

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "preparando":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-700">
            Preparando
          </Badge>
        )
      case "listo":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Listo
          </Badge>
        )
      case "entregado":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700">
            Entregado
          </Badge>
        )
      default:
        return <Badge variant="outline">Pendiente</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Pedidos</h1>
          <p className="text-muted-foreground">Administra todos los pedidos del restaurante</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activos">Activos (12)</TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
          <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
          <TabsTrigger value="nuevo">Nuevo Pedido</TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pedidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="grid gap-4">
            {pedidosData.map((pedido) => (
              <Card key={pedido.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <CardTitle className="text-lg">Orden #{pedido.id}</CardTitle>
                        <CardDescription>
                          {pedido.mesa} • {pedido.cliente}
                        </CardDescription>
                      </div>
                      {getEstadoBadge(pedido.estado)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-lg font-semibold">${pedido.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {pedido.tiempo}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Items del pedido:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pedido.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    {pedido.observaciones && (
                      <div>
                        <h4 className="font-medium mb-1">Observaciones:</h4>
                        <p className="text-sm text-muted-foreground">{pedido.observaciones}</p>
                      </div>
                    )}
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Marcar Listo
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

        <TabsContent value="nuevo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nuevo Pedido</CardTitle>
              <CardDescription>Ingresa los detalles del nuevo pedido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mesa">Mesa/Ubicación</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mesa1">Mesa 1</SelectItem>
                      <SelectItem value="mesa2">Mesa 2</SelectItem>
                      <SelectItem value="barra">Barra</SelectItem>
                      <SelectItem value="llevar">Para llevar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" placeholder="Nombre del cliente" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea id="observaciones" placeholder="Observaciones especiales..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Crear Pedido</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
