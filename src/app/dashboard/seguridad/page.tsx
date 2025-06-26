"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle, Lock, Database, Activity, Download, RefreshCw, Eye } from "lucide-react"

const logsActividad = [
  {
    id: 1,
    usuario: "María García",
    accion: "Inicio de sesión",
    ip: "192.168.1.100",
    fecha: "2024-12-24 14:30:25",
    estado: "exitoso",
    detalles: "Login desde navegador Chrome",
  },
  {
    id: 2,
    usuario: "Carlos López",
    accion: "Creación de pedido",
    ip: "192.168.1.101",
    fecha: "2024-12-24 14:25:10",
    estado: "exitoso",
    detalles: "Pedido #1234 creado para Mesa 12",
  },
  {
    id: 3,
    usuario: "Sistema",
    accion: "Backup automático",
    ip: "localhost",
    fecha: "2024-12-24 14:00:00",
    estado: "exitoso",
    detalles: "Backup diario completado (2.3GB)",
  },
  {
    id: 4,
    usuario: "Desconocido",
    accion: "Intento de login",
    ip: "203.45.67.89",
    fecha: "2024-12-24 13:45:33",
    estado: "fallido",
    detalles: "Credenciales incorrectas - usuario: admin",
  },
  {
    id: 5,
    usuario: "Ana Rodríguez",
    accion: "Modificación de usuario",
    ip: "192.168.1.102",
    fecha: "2024-12-24 13:30:15",
    estado: "exitoso",
    detalles: "Actualización de permisos usuario Luis Martínez",
  },
]

const estadisticasSeguridad = {
  loginExitosos: 45,
  loginFallidos: 3,
  sesionesActivas: 8,
  ultimoBackup: "2024-12-24 14:00:00",
  tamaño: "2.3 GB",
  intentosBloqueo: 2,
}

const backups = [
  {
    id: 1,
    fecha: "2024-12-24 14:00:00",
    tipo: "Automático",
    tamaño: "2.3 GB",
    estado: "completado",
    ubicacion: "Servidor Local",
  },
  {
    id: 2,
    fecha: "2024-12-23 14:00:00",
    tipo: "Automático",
    tamaño: "2.1 GB",
    estado: "completado",
    ubicacion: "Servidor Local",
  },
  {
    id: 3,
    fecha: "2024-12-22 14:00:00",
    tipo: "Manual",
    tamaño: "2.0 GB",
    estado: "completado",
    ubicacion: "Nube",
  },
]

export default function SeguridadAuditoria() {
  const [selectedTab, setSelectedTab] = useState("logs")

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "exitoso":
        return <Badge className="bg-green-100 text-green-700">Exitoso</Badge>
      case "fallido":
        return <Badge className="bg-red-100 text-red-700">Fallido</Badge>
      case "completado":
        return <Badge className="bg-blue-100 text-blue-700">Completado</Badge>
      case "en_proceso":
        return <Badge className="bg-yellow-100 text-yellow-700">En Proceso</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const getIconoAccion = (accion: string) => {
    if (accion.includes("login") || accion.includes("sesión")) {
      return <Lock className="h-4 w-4 text-blue-500" />
    }
    if (accion.includes("backup") || accion.includes("Backup")) {
      return <Database className="h-4 w-4 text-green-500" />
    }
    return <Activity className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seguridad y Auditoría</h1>
          <p className="text-muted-foreground">Logs de actividad, seguridad y backup de datos</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Logs
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Backup Manual
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logins Exitosos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticasSeguridad.loginExitosos}</div>
            <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intentos Fallidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{estadisticasSeguridad.loginFallidos}</div>
            <p className="text-xs text-muted-foreground">{estadisticasSeguridad.intentosBloqueo} IPs bloqueadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Activas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasSeguridad.sesionesActivas}</div>
            <p className="text-xs text-muted-foreground">Usuarios conectados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Backup</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticasSeguridad.tamaño}</div>
            <p className="text-xs text-muted-foreground">{estadisticasSeguridad.ultimoBackup}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Logs de Actividad</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="monitoreo">Monitoreo</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Actividad</CardTitle>
              <CardDescription>Historial detallado de todas las acciones del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logsActividad.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getIconoAccion(log.accion)}
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{log.usuario.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{log.accion}</h3>
                          {getEstadoBadge(log.estado)}
                        </div>
                        <p className="text-sm text-muted-foreground">{log.detalles}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Usuario: {log.usuario}</span>
                          <span>IP: {log.ip}</span>
                          <span>{log.fecha}</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Seguridad</CardTitle>
                <CardDescription>Evaluación general de la seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Nivel de Seguridad</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Firewall Activo</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activo</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">SSL/TLS Configurado</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activo</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">2FA Opcional</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">Mejorable</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Backups Automáticos</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activo</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenazas Detectadas</CardTitle>
                <CardDescription>Intentos de acceso no autorizado y actividad sospechosa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-700">Intento de Fuerza Bruta</p>
                        <p className="text-xs text-red-600">IP: 203.45.67.89 - 3 intentos</p>
                      </div>
                    </div>
                    <Badge variant="destructive">Bloqueado</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium text-yellow-700">Acceso desde IP Nueva</p>
                        <p className="text-xs text-yellow-600">Usuario: Carlos López</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">Monitoreando</Badge>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No hay más amenazas detectadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Backups</CardTitle>
              <CardDescription>Historial y configuración de copias de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Database className="h-5 w-5 text-blue-500" />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">Backup {backup.tipo}</h3>
                          {getEstadoBadge(backup.estado)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{backup.fecha}</span>
                          <span>{backup.tamaño}</span>
                          <span>{backup.ubicacion}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restaurar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-700 mb-2">Configuración de Backup Automático</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">Frecuencia:</span> Diario a las 14:00
                  </div>
                  <div>
                    <span className="text-blue-600">Retención:</span> 30 días
                  </div>
                  <div>
                    <span className="text-blue-600">Ubicación:</span> Servidor Local + Nube
                  </div>
                  <div>
                    <span className="text-blue-600">Compresión:</span> Habilitada
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoreo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento del Sistema</CardTitle>
                <CardDescription>Métricas en tiempo real del servidor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">CPU</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Memoria RAM</span>
                      <span className="text-sm text-muted-foreground">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Disco</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Red</span>
                      <span className="text-sm text-muted-foreground">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Servicios</CardTitle>
                <CardDescription>Disponibilidad de servicios críticos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Base de Datos</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Servidor Web</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">API</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Sistema de Pagos</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Online</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
