"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Edit, Trash2, UtensilsCrossed, Coffee, Cake } from "lucide-react"

const menuItems = [
  {
    id: 1,
    nombre: "Bandeja Paisa",
    categoria: "platos-fuertes",
    precio: 45000,
    descripcion:
      "Plato típico antioqueño con frijoles, arroz, carne molida, chicharrón, chorizo, morcilla, huevo frito, patacón y aguacate",
    disponible: true,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    nombre: "Ajiaco Santafereño",
    categoria: "platos-fuertes",
    precio: 38000,
    descripcion: "Sopa tradicional bogotana con pollo, papas criollas, mazorca y guascas",
    disponible: true,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    nombre: "Mojito",
    categoria: "bebidas",
    precio: 18000,
    descripcion: "Cóctel refrescante con ron, menta, limón y soda",
    disponible: true,
    imagen: "/placeholder.svg?height=200&width=300",
  },
]

const categorias = [
  { id: "entradas", nombre: "Entradas", icon: UtensilsCrossed, color: "bg-green-100 text-green-700" },
  { id: "platos-fuertes", nombre: "Platos Fuertes", icon: UtensilsCrossed, color: "bg-red-100 text-red-700" },
  { id: "bebidas", nombre: "Bebidas", icon: Coffee, color: "bg-blue-100 text-blue-700" },
  { id: "postres", nombre: "Postres", icon: Cake, color: "bg-purple-100 text-purple-700" },
]

export default function MenuDigital() {
  const [selectedTab, setSelectedTab] = useState("items")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menú Digital/Carta</h1>
          <p className="text-muted-foreground">Gestiona los productos, precios y disponibilidad del menú</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="items">Productos ({menuItems.length})</TabsTrigger>
          <TabsTrigger value="categorias">Categorías ({categorias.length})</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src={item.imagen || "/placeholder.svg"}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.nombre}</CardTitle>
                      <CardDescription className="mt-1">{item.descripcion}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <Switch checked={item.disponible} />
                      <Badge variant={item.disponible ? "default" : "secondary"}>
                        {item.disponible ? "Disponible" : "No disponible"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">${item.precio.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        {categorias.find((c) => c.id === item.categoria)?.nombre}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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

        <TabsContent value="categorias" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categorias.map((categoria) => (
              <Card key={categoria.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${categoria.color}`}>
                      <categoria.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{categoria.nombre}</h3>
                      <p className="text-sm text-muted-foreground">
                        {menuItems.filter((item) => item.categoria === categoria.id).length} productos
                      </p>
                    </div>
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
