"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, DollarSign, TrendingUp, TrendingDown, FileText, Download, Calculator, PieChart } from "lucide-react"

const ventasData = [
  { fecha: "2024-12-24", ventas: 2847500, gastos: 1200000, utilidad: 1647500 },
  { fecha: "2024-12-23", ventas: 2156000, gastos: 950000, utilidad: 1206000 },
  { fecha: "2024-12-22", ventas: 1890000, gastos: 890000, utilidad: 1000000 },
  { fecha: "2024-12-21", ventas: 2340000, gastos: 1100000, utilidad: 1240000 },
]

const arqeoCaja = {
  fecha: "2024-12-24",
  turno: "Noche",
  cajero: "María García",
  ventasEfectivo: 1200000,
  ventasTarjeta: 1647500,
  totalVentas: 2847500,
  gastos: 150000,
  fondoInicial: 200000,
  fondoFinal: 1250000,
  diferencia: 0,
}

const gastosData = [
  { categoria: "Ingredientes", monto: 800000, porcentaje: 66.7 },
  { categoria: "Servicios", monto: 200000, porcentaje: 16.7 },
  { categoria: "Personal", monto: 150000, porcentaje: 12.5 },
  { categoria: "Otros", monto: 50000, porcentaje: 4.1 },
]

export default function ModuloContable() {
  const [selectedTab, setSelectedTab] = useState("libro-ventas")
  const [selectedPeriod, setSelectedPeriod] = useState("hoy")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Módulo Contable</h1>
          <p className="text-muted-foreground">Reportes contables, arqueo de caja y libro de ventas</p>
        </div>
        <div className="flex space-x-2">
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
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> vs ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200,000</div>
            <p className="text-xs text-muted-foreground">42% de las ventas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilidad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,647,500</div>
            <p className="text-xs text-muted-foreground">58% margen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arqueo de Caja</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Sin diferencias</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="libro-ventas">Libro de Ventas</TabsTrigger>
          <TabsTrigger value="arqueo">Arqueo de Caja</TabsTrigger>
          <TabsTrigger value="gastos">Control de Gastos</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="libro-ventas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Libro Diario de Ventas</CardTitle>
              <CardDescription>Registro detallado de ventas por día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ventasData.map((dia, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{dia.fecha}</p>
                        <p className="text-sm text-muted-foreground">
                          Utilidad: ${dia.utilidad.toLocaleString()} ({Math.round((dia.utilidad / dia.ventas) * 100)}%)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${dia.ventas.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Gastos: ${dia.gastos.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arqueo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Arqueo de Caja - {arqeoCaja.fecha}</CardTitle>
              <CardDescription>
                Turno {arqeoCaja.turno} - Cajero: {arqeoCaja.cajero}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold">Ventas del Turno</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Ventas en Efectivo:</span>
                      <span className="font-medium">${arqeoCaja.ventasEfectivo.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ventas con Tarjeta:</span>
                      <span className="font-medium">${arqeoCaja.ventasTarjeta.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total Ventas:</span>
                      <span className="font-semibold">${arqeoCaja.totalVentas.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Control de Caja</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Fondo Inicial:</span>
                      <span className="font-medium">${arqeoCaja.fondoInicial.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gastos del Turno:</span>
                      <span className="font-medium text-red-600">-${arqeoCaja.gastos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fondo Final:</span>
                      <span className="font-medium">${arqeoCaja.fondoFinal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Diferencia:</span>
                      <span
                        className={`font-semibold ${arqeoCaja.diferencia === 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        ${arqeoCaja.diferencia.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Imprimir Arqueo
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Cerrar Turno</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gastos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Control de Gastos</CardTitle>
              <CardDescription>Distribución de gastos por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gastosData.map((gasto, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{gasto.categoria}</span>
                      <span>
                        ${gasto.monto.toLocaleString()} ({gasto.porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${gasto.porcentaje}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reportes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Disponibles</CardTitle>
                <CardDescription>Generar reportes contables y financieros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Reporte de Ventas Diarias
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="mr-2 h-4 w-4" />
                    Análisis de Gastos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Estado de Resultados
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="mr-2 h-4 w-4" />
                    Balance General
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exportar Datos</CardTitle>
                <CardDescription>Exportar información contable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar a Excel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Exportar a PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Enviar a Contador
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
