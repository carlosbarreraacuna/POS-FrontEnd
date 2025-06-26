"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  ChefHat,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Menu,
} from "lucide-react"

export default function DashboardContent() {
  const { toggleSidebar, state } = useSidebar()

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header mejorado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {state === "collapsed" && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Principal</h1>
            <p className="text-muted-foreground">
              Resumen general del restaurante -{" "}
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sistema Activo
          </Badge>
        </div>
      </div>

      {/* Métricas principales - Responsive mejorado */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Día</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> vs ayer
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">5</span> en cocina
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesas Ocupadas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/24</div>
            <p className="text-xs text-muted-foreground">75% ocupación</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-2 min</span> vs promedio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sección de alertas y estado - Layout mejorado */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Estado de Cocina
            </CardTitle>
            <CardDescription>Pedidos en preparación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Mesa 12 - Orden #1234</p>
                  <p className="text-sm text-muted-foreground truncate">2x Bandeja Paisa, 1x Sancocho</p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 ml-2 shrink-0">
                  8 min
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Mesa 7 - Orden #1235</p>
                  <p className="text-sm text-muted-foreground truncate">1x Ajiaco, 2x Arepa con Queso</p>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700 ml-2 shrink-0">
                  3 min
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Mesa 3 - Orden #1233</p>
                  <p className="text-sm text-muted-foreground truncate">3x Cazuela de Mariscos</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 ml-2 shrink-0">
                  Listo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-red-700">Stock Bajo</p>
                  <p className="text-xs text-red-600">Pollo: 2kg restantes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-yellow-700">Tiempo Excedido</p>
                  <p className="text-xs text-yellow-600">Mesa 15 - 25 min</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Users className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-blue-700">Reserva Próxima</p>
                  <p className="text-xs text-blue-600">Mesa 20 - 19:30</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accesos rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
          <CardDescription>Funciones más utilizadas del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-200">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">Nuevo Pedido</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-200">
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Ver Mesas</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-200">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Reportes</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-200">
              <Users className="h-6 w-6" />
              <span className="text-sm">Clientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
