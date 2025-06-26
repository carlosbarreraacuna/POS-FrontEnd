"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  FileText,
  Download,
  CalendarIcon,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Filter,
} from "lucide-react"

const reportesDisponibles = [
  {
    id: "ventas-diarias",
    nombre: "Reporte de Ventas Diarias",
    descripcion: "Análisis detallado de ventas por día",
    icon: BarChart3,
    categoria: "ventas",
    frecuencia: "Diario",
  },
  {
    id: "productos-vendidos",
    nombre: "Productos Más Vendidos",
    descripcion: "Ranking de productos por cantidad y valor",
    icon: PieChart,
    categoria: "productos",
    frecuencia: "Semanal",
  },
  {
    id: "rendimiento-personal",
    nombre: "Rendimiento del Personal",
    descripcion: "Métricas de desempeño por empleado",
    icon: Users,
    categoria: "personal",
    frecuencia: "Mensual",
  },
  {
    id: "analisis-horarios",
    nombre: "Análisis de Horarios Pico",
    descripcion: "Distribución de ventas por horarios",
    icon: Clock,
    categoria: "operaciones",
    frecuencia: "Semanal",
  },
  {
    id: "estado-financiero",
    nombre: "Estado Financiero",
    descripcion: "Resumen de ingresos, gastos y utilidades",
    icon: DollarSign,
    categoria: "finanzas",
    frecuencia: "Mensual",
  },
  {
    id: "tendencias-ventas",
    nombre: "Tendencias de Ventas",
    descripcion: "Análisis de crecimiento y proyecciones",
    icon: TrendingUp,
    categoria: "analytics",
    frecuencia: "Mensual",
  },
]

const reportesGenerados = [
  {
    id: 1,
    nombre: "Ventas Diciembre 2024",
    tipo: "ventas-diarias",
    fechaGeneracion: "2024-12-24",
    periodo: "01/12/2024 - 24/12/2024",
    formato: "PDF",
    tamaño: "2.3 MB",
    estado: "completado",
  },
  {
    id: 2,
    nombre: "Productos Top Semana 51",
    tipo: "productos-vendidos",
    fechaGeneracion: "2024-12-23",
    periodo: "16/12/2024 - 22/12/2024",
    formato: "Excel",
    tamaño: "1.8 MB",
    estado: "completado",
  },
  {
    id: 3,
    nombre: "Personal Noviembre 2024",
    tipo: "rendimiento-personal",
    fechaGeneracion: "2024-12-01",
    periodo: "01/11/2024 - 30/11/2024",
    formato: "PDF",
    tamaño: "3.1 MB",
    estado: "completado",
  },
]

export default function ReportesAvanzados() {
  const [selectedTab, setSelectedTab] = useState("generar")
  const [selectedReporte, setSelectedReporte] = useState("")
  const [fechaInicio, setFechaInicio] = useState<Date>()
  const [fechaFin, setFechaFin] = useState<Date>()

  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      ventas: "bg-green-100 text-green-700",
      productos: "bg-blue-100 text-blue-700",
      personal: "bg-purple-100 text-purple-700",
      operaciones: "bg-orange-100 text-orange-700",
      finanzas: "bg-red-100 text-red-700",
      analytics: "bg-yellow-100 text-yellow-700",
    }
    return colores[categoria] || "bg-gray-100 text-gray-700"
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "completado":
        return <Badge className="bg-green-100 text-green-700">Completado</Badge>
      case "procesando":
        return <Badge className="bg-yellow-100 text-yellow-700">Procesando</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-700">Error</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes Avanzados</h1>
          <p className="text-muted-foreground">Reportes detallados y exportación de datos</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <FileText className="mr-2 h-4 w-4" />
          Programar Reporte
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Disponibles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesDisponibles.length}</div>
            <p className="text-xs text-muted-foreground">Tipos de reportes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generados Este Mes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportesGenerados.length}</div>
            <p className="text-xs text-muted-foreground">Reportes completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamaño Total</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2 MB</div>
            <p className="text-xs text-muted-foreground">Archivos generados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programados</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Reportes automáticos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generar">Generar Reporte</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="programados">Programados</TabsTrigger>
        </TabsList>

        <TabsContent value="generar" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Tipo de Reporte</CardTitle>
                <CardDescription>Elige el tipo de reporte que deseas generar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportesDisponibles.map((reporte) => (
                    <div
                      key={reporte.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedReporte === reporte.id ? "border-orange-500 bg-orange-50" : ""
                      }`}
                      onClick={() => setSelectedReporte(reporte.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <reporte.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">{reporte.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{reporte.descripcion}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={getCategoriaColor(reporte.categoria)}>{reporte.categoria}</Badge>
                          <span className="text-xs text-muted-foreground">{reporte.frecuencia}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Reporte</CardTitle>
                <CardDescription>Define los parámetros del reporte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha Inicio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fechaInicio ? fechaInicio.toLocaleDateString() : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={fechaInicio} onSelect={setFechaInicio} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Fecha Fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fechaFin ? fechaFin.toLocaleDateString() : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={fechaFin} onSelect={setFechaFin} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Formato de Exportación</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Filtros Adicionales</Label>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Configurar Filtros
                  </Button>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={!selectedReporte || !fechaInicio || !fechaFin}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generar Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <div className="space-y-4">
            {reportesGenerados.map((reporte) => (
              <Card key={reporte.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-lg">{reporte.nombre}</h3>
                        {getEstadoBadge(reporte.estado)}
                        <Badge variant="outline">{reporte.formato}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <strong>Periodo:</strong> {reporte.periodo}
                        </div>
                        <div>
                          <strong>Generado:</strong> {reporte.fechaGeneracion}
                        </div>
                        <div>
                          <strong>Tamaño:</strong> {reporte.tamaño}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Programados</CardTitle>
              <CardDescription>Reportes que se generan automáticamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Reporte Diario de Ventas</h3>
                    <p className="text-sm text-muted-foreground">Se genera automáticamente cada día a las 23:59</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Activo</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Reporte Semanal de Productos</h3>
                    <p className="text-sm text-muted-foreground">Se genera cada domingo a las 08:00</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Activo</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Reporte Mensual Financiero</h3>
                    <p className="text-sm text-muted-foreground">Se genera el primer día de cada mes</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Activo</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
