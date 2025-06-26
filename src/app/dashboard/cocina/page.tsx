"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChefHat, Clock, CheckCircle, AlertTriangle, Flame, Coffee } from "lucide-react"

const pedidosCocina = [
  {
    id: "1234",
    mesa: "Mesa 12",
    items: [
      { nombre: "Bandeja Paisa", cantidad: 2, estado: "preparando", tiempo: 8 },
      { nombre: "Sancocho", cantidad: 1, estado: "preparando", tiempo: 12 },
    ],
    prioridad: "normal",
    tiempoTotal: 15,
    observaciones: "Sin cebolla en la bandeja",
  },
  {
    id: "1235",
    mesa: "Mesa 7",
    items: [
      { nombre: "Ajiaco", cantidad: 1, estado: "listo", tiempo: 0 },
      { nombre: "Arepa con Queso", cantidad: 2, estado: "listo", tiempo: 0 },
    ],
    prioridad: "alta",
    tiempoTotal: 0,
    observaciones: "",
  },
]

const pedidosBar = [
  {
    id: "1236",
    mesa: "Barra 1",
    items: [
      { nombre: "Mojito", cantidad: 2, estado: "preparando", tiempo: 3 },
      { nombre: "Cerveza Corona", cantidad: 1, estado: "listo", tiempo: 0 },
    ],
    prioridad: "normal",
    tiempoTotal: 5,
    observaciones: "Mojito sin azúcar",
  },
]

export default function GestionCocina() {
  const [selectedTab, setSelectedTab] = useState("cocina")

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "border-l-4 border-red-500 bg-red-50"
      case "media":
        return "border-l-4 border-yellow-500 bg-yellow-50"
      default:
        return "border-l-4 border-green-500 bg-green-50"
    }
  }

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
      default:
        return <Badge variant="outline">Pendiente</Badge>
    }
  }

  const marcarListo = (pedidoId: string, itemIndex: number) => {
    // Lógica para marcar item como listo
    console.log(`Marcando listo: ${pedidoId} - item ${itemIndex}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Cocina/Bar</h1>
          <p className="text-muted-foreground">Pantalla de preparación y seguimiento de pedidos</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Pedidos en cola</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Preparación</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Platos en cocina</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Para entregar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 min</div>
            <p className="text-xs text-muted-foreground">Por plato</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Tiempo excedido</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cocina" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Cocina (5)
          </TabsTrigger>
          <TabsTrigger value="bar" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Bar (3)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cocina" className="space-y-4">
          <div className="grid gap-4">
            {pedidosCocina.map((pedido) => (
              <Card key={pedido.id} className={`${getPrioridadColor(pedido.prioridad)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Orden #{pedido.id}</CardTitle>
                      <CardDescription>{pedido.mesa}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant={pedido.prioridad === "alta" ? "destructive" : "outline"}>
                        {pedido.prioridad === "alta" ? "URGENTE" : "NORMAL"}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Clock className="inline mr-1 h-3 w-3" />
                        {pedido.tiempoTotal} min
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pedido.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {item.cantidad}x {item.nombre}
                            </h4>
                            {getEstadoBadge(item.estado)}
                          </div>
                          {item.estado === "preparando" && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                                <span>Progreso</span>
                                <span>{item.tiempo} min restantes</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          {item.estado === "preparando" ? (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => marcarListo(pedido.id, index)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marcar Listo
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Listo
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {pedido.observaciones && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-1">Observaciones:</h4>
                        <p className="text-sm text-yellow-700">{pedido.observaciones}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bar" className="space-y-4">
          <div className="grid gap-4">
            {pedidosBar.map((pedido) => (
              <Card key={pedido.id} className={`${getPrioridadColor(pedido.prioridad)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Orden #{pedido.id}</CardTitle>
                      <CardDescription>{pedido.mesa}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant={pedido.prioridad === "alta" ? "destructive" : "outline"}>
                        {pedido.prioridad === "alta" ? "URGENTE" : "NORMAL"}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Clock className="inline mr-1 h-3 w-3" />
                        {pedido.tiempoTotal} min
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pedido.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {item.cantidad}x {item.nombre}
                            </h4>
                            {getEstadoBadge(item.estado)}
                          </div>
                        </div>
                        <div className="ml-4">
                          {item.estado === "preparando" ? (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => marcarListo(pedido.id, index)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marcar Listo
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Listo
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {pedido.observaciones && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-1">Observaciones:</h4>
                        <p className="text-sm text-yellow-700">{pedido.observaciones}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
