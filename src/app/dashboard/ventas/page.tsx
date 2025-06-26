"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Users, Clock, Star, Target } from "lucide-react"

const ventasHoy = {
  total: 2847500,
  meta: 3000000,
  porcentajeMeta: 94.9,
  transacciones: 45,
  ticketPromedio: 63278,
  crecimiento: 12.5,
}

const ventasPorHora = [
  { hora: "09:00", ventas: 125000 },
  { hora: "10:00", ventas: 180000 },
  { hora: "11:00", ventas: 220000 },
  { hora: "12:00", ventas: 380000 },
  { hora: "13:00", ventas: 450000 },
  { hora: "14:00", ventas: 420000 },
  { hora: "15:00", ventas: 280000 },
  { hora: "16:00", ventas: 190000 },
  { hora: "17:00", ventas: 240000 },
  { hora: "18:00", ventas: 360000 },
]

const productosTop = [
  { nombre: "Bandeja Paisa", ventas: 23, ingresos: 1035000, porcentaje: 36.4 },
  { nombre: "Sancocho", ventas: 18, ingresos: 684000, porcentaje: 24.0 },
  { nombre: "Ajiaco", ventas: 15, ingresos: 570000, porcentaje: 20.0 },
  { nombre: "Arepa con Queso", ventas: 28, ingresos: 224000, porcentaje: 7.9 },
  { nombre: "Empanadas", ventas: 35, ingresos: 175000, porcentaje: 6.1 },
]

const mesasTop = [
  { mesa: "Mesa 12", ventas: 8, ingresos: 450000, tiempoPromedio: "45 min" },
  { mesa: "Mesa 7", ventas: 6, ingresos: 380000, tiempoPromedio: "38 min" },
  { mesa: "Mesa 15", ventas: 5, ingresos: 320000, tiempoPromedio: "42 min" },
  { mesa: "Barra 1", ventas: 12, ingresos: 280000, tiempoPromedio: "25 min" },
]

const meserosTop = [
  { nombre: "María García", ventas: 12, ingresos: 680000, propinas: 102000 },
  { nombre: "Carlos López", ventas: 10, ingresos: 580000, propinas: 87000 },
  { nombre: "Ana Rodríguez", ventas: 8, ingresos: 450000, propinas: 67500 },
]

export default function DashboardVentas() {
  const [selectedTab, setSelectedTab] = useState("resumen")
  const [selectedPeriod, setSelectedPeriod] = useState("hoy")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Ventas</h1>
          <p className="text-muted-foreground">Análisis de ventas y métricas en tiempo real</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hoy">Hoy</SelectItem>
            <SelectItem value="semana">Esta Semana</SelectItem>
            <SelectItem value="mes">Este Mes</SelectItem>
            <SelectItem value="año">Este Año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Día</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${ventasHoy.total.toLocaleString()}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={ventasHoy.porcentajeMeta} className="flex-1" />
              <span className="text-sm text-muted-foreground">{ventasHoy.porcentajeMeta}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Meta: ${ventasHoy.meta.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ventasHoy.transacciones}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{ventasHoy.crecimiento}%</span> vs ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${ventasHoy.ticketPromedio.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Por transacción</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{ventasHoy.crecimiento}%</div>
            <p className="text-xs text-muted-foreground">Comparado con ayer</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="mesas">Mesas</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Hora</CardTitle>
                <CardDescription>Distribución de ventas durante el día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ventasPorHora.map((hora, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{hora.hora}</span>
                      <div className="flex items-center space-x-2 flex-1 mx-4">
                        <Progress
                          value={(hora.ventas / Math.max(...ventasPorHora.map((h) => h.ventas))) * 100}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-20 text-right">
                          ${hora.ventas.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
                <CardDescription>Indicadores clave de performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Meta Diaria</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">94.9% Completada</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Tiempo Promedio</span>
                    </div>
                    <span className="font-semibold">18 min</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Satisfacción</span>
                    </div>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
              <CardDescription>Ranking de productos por ventas e ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productosTop.map((producto, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{producto.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{producto.ventas} unidades vendidas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${producto.ingresos.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{producto.porcentaje}% del total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mesas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Mesa</CardTitle>
              <CardDescription>Análisis de ventas y rotación por mesa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mesasTop.map((mesa, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{mesa.mesa}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mesa.ventas} servicios • {mesa.tiempoPromedio} promedio
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${mesa.ingresos.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        ${Math.round(mesa.ingresos / mesa.ventas).toLocaleString()} por servicio
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento del Personal</CardTitle>
              <CardDescription>Ventas y propinas por mesero</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meserosTop.map((mesero, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{mesero.nombre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mesero.ventas} servicios • ${mesero.propinas.toLocaleString()} en propinas
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${mesero.ingresos.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        ${Math.round(mesero.ingresos / mesero.ventas).toLocaleString()} por servicio
                      </p>
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
