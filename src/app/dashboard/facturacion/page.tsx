"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  FileText,
  Printer,
  Download,
  DollarSign,
  Receipt,
  Banknote,
  Smartphone,
  Plus,
  Search,
} from "lucide-react"

const facturasData = [
  {
    id: "F001-2024",
    cliente: "María García",
    fecha: "2024-12-24",
    hora: "14:30",
    mesa: "Mesa 12",
    items: [
      { nombre: "Bandeja Paisa", cantidad: 2, precio: 45000 },
      { nombre: "Sancocho", cantidad: 1, precio: 38000 },
      { nombre: "Coca Cola", cantidad: 2, precio: 5000 },
    ],
    subtotal: 138000,
    propina: 20700,
    impuestos: 22080,
    total: 180780,
    metodoPago: "tarjeta",
    estado: "pagada",
    numeroTransaccion: "TXN123456789",
  },
  {
    id: "F002-2024",
    cliente: "Carlos López",
    fecha: "2024-12-24",
    hora: "15:45",
    mesa: "Mesa 7",
    items: [
      { nombre: "Ajiaco", cantidad: 1, precio: 38000 },
      { nombre: "Arepa con Queso", cantidad: 2, precio: 8000 },
    ],
    subtotal: 54000,
    propina: 8100,
    impuestos: 8640,
    total: 70740,
    metodoPago: "efectivo",
    estado: "pagada",
    numeroTransaccion: null,
  },
]

const metodosPago = [
  { id: "efectivo", nombre: "Efectivo", icon: Banknote, color: "bg-green-100 text-green-700" },
  { id: "tarjeta", nombre: "Tarjeta", icon: CreditCard, color: "bg-blue-100 text-blue-700" },
  { id: "transferencia", nombre: "Transferencia", icon: Smartphone, color: "bg-purple-100 text-purple-700" },
  { id: "qr", nombre: "Código QR", icon: Smartphone, color: "bg-orange-100 text-orange-700" },
]

export default function Facturacion() {
  const [selectedTab, setSelectedTab] = useState("facturas")
  const [searchTerm, setSearchTerm] = useState("")

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pagada":
        return <Badge className="bg-green-100 text-green-700">Pagada</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
      case "cancelada":
        return <Badge className="bg-red-100 text-red-700">Cancelada</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const getMetodoPagoBadge = (metodo: string) => {
    const metodoPago = metodosPago.find((m) => m.id === metodo)
    if (!metodoPago) return <Badge variant="outline">{metodo}</Badge>

    return (
      <Badge className={metodoPago.color}>
        <metodoPago.icon className="mr-1 h-3 w-3" />
        {metodoPago.nombre}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturación y Pagos</h1>
          <p className="text-muted-foreground">Sistema de facturación electrónica y métodos de pago</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Factura
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Día</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${facturasData.reduce((acc, f) => acc + f.total, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{facturasData.length} facturas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Propinas</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${facturasData.reduce((acc, f) => acc + f.propina, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">15% promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos con Tarjeta</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((facturasData.filter((f) => f.metodoPago === "tarjeta").length / facturasData.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Del total de ventas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impuestos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${facturasData.reduce((acc, f) => acc + f.impuestos, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">IVA 16%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="facturas">Facturas</TabsTrigger>
          <TabsTrigger value="nueva">Nueva Factura</TabsTrigger>
          <TabsTrigger value="metodos">Métodos de Pago</TabsTrigger>
          <TabsTrigger value="dian">DIAN</TabsTrigger>
        </TabsList>

        <TabsContent value="facturas" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar facturas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {facturasData.map((factura) => (
              <Card key={factura.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-lg">Factura {factura.id}</h3>
                        {getEstadoBadge(factura.estado)}
                        {getMetodoPagoBadge(factura.metodoPago)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-muted-foreground">Cliente</Label>
                          <p className="font-medium">{factura.cliente}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Mesa</Label>
                          <p className="font-medium">{factura.mesa}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Fecha</Label>
                          <p className="font-medium">
                            {factura.fecha} {factura.hora}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Total</Label>
                          <p className="font-bold text-lg">${factura.total.toLocaleString()}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Items</Label>
                        <div className="mt-1 space-y-1">
                          {factura.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.cantidad}x {item.nombre}
                              </span>
                              <span>${(item.cantidad * item.precio).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm border-t pt-2">
                        <div>
                          <Label className="text-muted-foreground">Subtotal</Label>
                          <p>${factura.subtotal.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Propina</Label>
                          <p>${factura.propina.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Impuestos</Label>
                          <p>${factura.impuestos.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nueva" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Factura</CardTitle>
              <CardDescription>Crear una nueva factura para un pedido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" placeholder="Nombre del cliente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mesa">Mesa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mesa1">Mesa 1</SelectItem>
                      <SelectItem value="mesa2">Mesa 2</SelectItem>
                      <SelectItem value="barra">Barra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Método de Pago</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {metodosPago.map((metodo) => (
                    <Button key={metodo.id} variant="outline" className="h-16 flex-col gap-2">
                      <metodo.icon className="h-6 w-6" />
                      <span className="text-sm">{metodo.nombre}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Crear Factura</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metodos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metodosPago.map((metodo) => (
              <Card key={metodo.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${metodo.color}`}>
                      <metodo.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{metodo.nombre}</h3>
                      <p className="text-sm text-muted-foreground">
                        {Math.round(
                          (facturasData.filter((f) => f.metodoPago === metodo.id).length / facturasData.length) * 100,
                        )}
                        % de ventas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integración DIAN</CardTitle>
              <CardDescription>Configuración de facturación electrónica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estado de Conexión</Label>
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-700">Conectado</Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Facturas Enviadas Hoy</Label>
                    <p className="text-2xl font-bold mt-1">{facturasData.length}</p>
                  </div>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">Panel de configuración DIAN - Próximamente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
