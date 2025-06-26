"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Star, Phone, Mail, MapPin, Calendar, Gift, Eye } from "lucide-react"

const clientesData = [
  {
    id: 1,
    nombre: "María García",
    email: "maria.garcia@email.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Bogotá",
    fechaRegistro: "2024-01-15",
    totalPedidos: 23,
    totalGastado: 1250000,
    puntosFidelidad: 1250,
    ultimaVisita: "2024-12-20",
    estado: "activo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nombre: "Carlos López",
    email: "carlos.lopez@email.com",
    telefono: "+57 301 987 6543",
    direccion: "Carrera 45 #12-34, Medellín",
    fechaRegistro: "2024-02-20",
    totalPedidos: 15,
    totalGastado: 890000,
    puntosFidelidad: 890,
    ultimaVisita: "2024-12-18",
    estado: "activo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nombre: "Ana Rodríguez",
    email: "ana.rodriguez@email.com",
    telefono: "+57 302 456 7890",
    direccion: "Avenida 80 #23-45, Cali",
    fechaRegistro: "2024-03-10",
    totalPedidos: 8,
    totalGastado: 420000,
    puntosFidelidad: 420,
    ultimaVisita: "2024-12-15",
    estado: "inactivo",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const historialPedidos = [
  {
    id: "1234",
    fecha: "2024-12-20",
    total: 85000,
    items: ["2x Bandeja Paisa", "1x Sancocho"],
    estado: "completado",
  },
  {
    id: "1235",
    fecha: "2024-12-15",
    total: 45000,
    items: ["1x Ajiaco", "2x Arepa con Queso"],
    estado: "completado",
  },
]

export default function GestionClientes() {
  const [selectedTab, setSelectedTab] = useState("lista")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCliente, setSelectedCliente] = useState<any>(null)

  const getEstadoBadge = (estado: string) => {
    return estado === "activo" ? (
      <Badge className="bg-green-100 text-green-700">Activo</Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-700">
        Inactivo
      </Badge>
    )
  }

  const getNivelFidelidad = (puntos: number) => {
    if (puntos >= 1000) return { nivel: "Oro", color: "bg-yellow-100 text-yellow-700" }
    if (puntos >= 500) return { nivel: "Plata", color: "bg-gray-100 text-gray-700" }
    return { nivel: "Bronce", color: "bg-orange-100 text-orange-700" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Clientes</h1>
          <p className="text-muted-foreground">Base de datos de clientes y programa de fidelización</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesData.length}</div>
            <p className="text-xs text-muted-foreground">
              {clientesData.filter((c) => c.estado === "activo").length} activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes VIP</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesData.filter((c) => c.puntosFidelidad >= 1000).length}</div>
            <p className="text-xs text-muted-foreground">Nivel Oro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${clientesData.reduce((acc, c) => acc + c.totalGastado, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Por clientes registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Cliente</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {Math.round(
                clientesData.reduce((acc, c) => acc + c.totalGastado, 0) / clientesData.length,
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Gasto promedio</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="fidelidad">Programa Fidelidad</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {clientesData.map((cliente) => (
              <Card key={cliente.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={cliente.avatar || "/placeholder.svg"} alt={cliente.nombre} />
                        <AvatarFallback>{cliente.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{cliente.nombre}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {cliente.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {cliente.telefono}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {getEstadoBadge(cliente.estado)}
                          <Badge className={getNivelFidelidad(cliente.puntosFidelidad).color}>
                            {getNivelFidelidad(cliente.puntosFidelidad).nivel}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cliente.totalPedidos} pedidos • ${cliente.totalGastado.toLocaleString()}
                        </p>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCliente(cliente)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalles del Cliente</DialogTitle>
                            <DialogDescription>Información completa y historial de pedidos</DialogDescription>
                          </DialogHeader>
                          {selectedCliente && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Información Personal</Label>
                                  <div className="mt-2 space-y-2">
                                    <p>
                                      <strong>Nombre:</strong> {selectedCliente.nombre}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {selectedCliente.email}
                                    </p>
                                    <p>
                                      <strong>Teléfono:</strong> {selectedCliente.telefono}
                                    </p>
                                    <p>
                                      <strong>Dirección:</strong> {selectedCliente.direccion}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Estadísticas</Label>
                                  <div className="mt-2 space-y-2">
                                    <p>
                                      <strong>Total Pedidos:</strong> {selectedCliente.totalPedidos}
                                    </p>
                                    <p>
                                      <strong>Total Gastado:</strong> ${selectedCliente.totalGastado.toLocaleString()}
                                    </p>
                                    <p>
                                      <strong>Puntos Fidelidad:</strong> {selectedCliente.puntosFidelidad}
                                    </p>
                                    <p>
                                      <strong>Última Visita:</strong> {selectedCliente.ultimaVisita}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label>Historial de Pedidos</Label>
                                <div className="mt-2 space-y-2">
                                  {historialPedidos.map((pedido) => (
                                    <div
                                      key={pedido.id}
                                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                      <div>
                                        <p className="font-medium">Orden #{pedido.id}</p>
                                        <p className="text-sm text-muted-foreground">{pedido.items.join(", ")}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold">${pedido.total.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">{pedido.fecha}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fidelidad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Programa de Fidelización</CardTitle>
              <CardDescription>Niveles y beneficios para clientes frecuentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-orange-700">Bronce</h3>
                      <p className="text-2xl font-bold text-orange-600">0-499 puntos</p>
                      <p className="text-sm text-orange-600 mt-2">5% descuento en pedidos</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-700">Plata</h3>
                      <p className="text-2xl font-bold text-gray-600">500-999 puntos</p>
                      <p className="text-sm text-gray-600 mt-2">10% descuento + bebida gratis</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-yellow-700">Oro</h3>
                      <p className="text-2xl font-bold text-yellow-600">1000+ puntos</p>
                      <p className="text-sm text-yellow-600 mt-2">15% descuento + postre gratis</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
