"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, AlertTriangle, TrendingDown, TrendingUp, Plus, Search } from "lucide-react"

const inventarioData = [
  {
    id: 1,
    nombre: "Pollo",
    categoria: "Carnes",
    stock: 2,
    stockMinimo: 5,
    unidad: "kg",
    precio: 12000,
    proveedor: "Avícola San Juan",
    estado: "critico",
  },
  {
    id: 2,
    nombre: "Arroz",
    categoria: "Granos",
    stock: 25,
    stockMinimo: 10,
    unidad: "kg",
    precio: 3500,
    proveedor: "Distribuidora Central",
    estado: "normal",
  },
  {
    id: 3,
    nombre: "Frijoles",
    categoria: "Granos",
    stock: 8,
    stockMinimo: 15,
    unidad: "kg",
    precio: 8000,
    proveedor: "Distribuidora Central",
    estado: "bajo",
  },
]

export default function GestionInventario() {
  const [selectedTab, setSelectedTab] = useState("stock")
  const [searchTerm, setSearchTerm] = useState("")

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "critico":
        return <Badge variant="destructive">Crítico</Badge>
      case "bajo":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            Bajo
          </Badge>
        )
      case "normal":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Normal
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getStockProgress = (stock: number, stockMinimo: number) => {
    const percentage = (stock / (stockMinimo * 2)) * 100
    return Math.min(percentage, 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Inventario</h1>
          <p className="text-muted-foreground">Control de stock, insumos y materias primas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <TrendingDown className="mr-2 h-4 w-4" />
            Entrada Stock
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventarioData.length}</div>
            <p className="text-xs text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inventarioData.filter((item) => item.estado === "critico").length}
            </div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {inventarioData.filter((item) => item.estado === "bajo").length}
            </div>
            <p className="text-xs text-muted-foreground">Por debajo del mínimo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${inventarioData.reduce((acc, item) => acc + item.stock * item.precio, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stock">Control de Stock</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
          <TabsTrigger value="alertas">
            Alertas ({inventarioData.filter((item) => item.estado !== "normal").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-4">
            {inventarioData.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-lg">{item.nombre}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.categoria} • {item.proveedor}
                          </p>
                        </div>
                        {getEstadoBadge(item.estado)}
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Stock Actual</Label>
                          <p className="text-lg font-semibold">
                            {item.stock} {item.unidad}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Stock Mínimo</Label>
                          <p className="text-lg">
                            {item.stockMinimo} {item.unidad}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Precio Unitario</Label>
                          <p className="text-lg">${item.precio.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Valor Total</Label>
                          <p className="text-lg font-semibold">${(item.stock * item.precio).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Nivel de Stock</span>
                          <span>{Math.round(getStockProgress(item.stock, item.stockMinimo))}%</span>
                        </div>
                        <Progress
                          value={getStockProgress(item.stock, item.stockMinimo)}
                          className={`h-2 ${item.estado === "critico" ? "[&>div]:bg-red-500" : item.estado === "bajo" ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button variant="outline" size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Entrada
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingDown className="mr-2 h-4 w-4" />
                        Salida
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-4">
          <div className="space-y-4">
            {inventarioData
              .filter((item) => item.estado !== "normal")
              .map((item) => (
                <Card
                  key={item.id}
                  className={`border-l-4 ${item.estado === "critico" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle
                          className={`h-6 w-6 ${item.estado === "critico" ? "text-red-500" : "text-yellow-500"}`}
                        />
                        <div>
                          <h3 className="font-semibold">{item.nombre}</h3>
                          <p className="text-sm text-muted-foreground">
                            Stock actual: {item.stock} {item.unidad} (Mínimo: {item.stockMinimo} {item.unidad})
                          </p>
                        </div>
                      </div>
                      <Button className="bg-orange-600 hover:bg-orange-700">Reabastecer</Button>
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
