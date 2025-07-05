"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Users, Clock } from "lucide-react"
import axios from "axios"

interface Mesa {
  id: number
  numero: string
  ubicacion: string
  capacidad: string // Mantener como string ya que viene así del backend
  estado: "libre" | "ocupada" | "reservada"
  created_at: string
  updated_at: string
  // Campos adicionales para el frontend
  clientes?: number
  pedido?: string
  tiempo?: string
  kot?: number
}

const mesasData: Mesa[] = [
  {
    id: 1,
    numero: "M01",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "libre",
    created_at: "",
    updated_at: "",
    kot: 1,
  },
  {
    id: 2,
    numero: "M02",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "ocupada",
    created_at: "",
    updated_at: "",
    clientes: 3,
    kot: 1,
    tiempo: "25 min",
  },
  {
    id: 3,
    numero: "M03",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "libre",
    created_at: "",
    updated_at: "",
    kot: 1,
  },
  {
    id: 4,
    numero: "M04",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "reservada",
    created_at: "",
    updated_at: "",
    kot: 1,
  },
  {
    id: 5,
    numero: "M05",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "ocupada",
    created_at: "",
    updated_at: "",
    clientes: 4,
    kot: 1,
    tiempo: "15 min",
  },
  {
    id: 6,
    numero: "M06",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "libre",
    created_at: "",
    updated_at: "",
    kot: 1,
  },
  {
    id: 7,
    numero: "M07",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "ocupada",
    created_at: "",
    updated_at: "",
    clientes: 2,
    kot: 1,
    tiempo: "30 min",
  },
  {
    id: 8,
    numero: "M08",
    ubicacion: "primer-piso",
    capacidad: "4",
    estado: "libre",
    created_at: "",
    updated_at: "",
    kot: 1,
  },
]

// Remover la constante areas fija y agregar esta función
const getAreasFromMesas = (mesas: Mesa[]) => {
  const ubicaciones = [...new Set(mesas.map((mesa) => mesa.ubicacion))]
  return [
    { id: "todas", nombre: "Todas las Áreas" },
    ...ubicaciones.map((ubicacion) => ({
      id: ubicacion.toLowerCase().replace(/\s+/g, "-"),
      nombre: ubicacion,
    })),
  ]
}

export default function GestionMesas() {
  const [mesas, setMesas] = useState<Mesa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [areaActiva, setAreaActiva] = useState("todas")
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("todas")
  const [showAddMesa, setShowAddMesa] = useState(false)
  const [showEditMesa, setShowEditMesa] = useState(false)
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null)
  const [newMesa, setNewMesa] = useState({
    numero: "",
    area: "primer-piso", // Esto se mapea a ubicacion
    capacidad: 4,
  })

  // Actualizar el estado de areas para que sea dinámico
  const [areas, setAreas] = useState([{ id: "todas", nombre: "Todas las Áreas" }])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "libre":
        return "border-green-200 bg-green-50"
      case "ocupada":
        return "border-blue-200 bg-blue-50"
      case "reservada":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "libre":
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      case "ocupada":
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      case "reservada":
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    }
  }

  const mesasFiltradas = mesas.filter((mesa) => {
    const areaId = mesa.ubicacion.toLowerCase().replace(/\s+/g, "-")
    const filtroArea = areaActiva === "todas" || areaId === areaActiva
    const filtroEstado = filtroDisponibilidad === "todas" || mesa.estado === filtroDisponibilidad
    return filtroArea && filtroEstado
  })

  const mesasPorArea = areas.reduce(
    (acc, area) => {
      if (area.id === "todas") return acc
      acc[area.id] = mesasFiltradas.filter((mesa) => {
        const areaId = mesa.ubicacion.toLowerCase().replace(/\s+/g, "-")
        return areaId === area.id
      })
      return acc
    },
    {} as Record<string, Mesa[]>,
  )

  // Función para cargar mesas desde la API
  const cargarMesas = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/mesas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Convertir capacidad a number para uso interno pero mantener string para API
      const mesasConCapacidadNumerica = response.data.map((mesa: Mesa) => ({
        ...mesa,
        capacidadNumerica: Number.parseInt(mesa.capacidad), // Para uso interno
      }))

      setMesas(mesasConCapacidadNumerica)

      // Generar áreas dinámicamente
      const areasGeneradas = getAreasFromMesas(response.data)
      setAreas(areasGeneradas)

      setError(null)
    } catch (err) {
      console.error(err)
      setError("Error al cargar las mesas")
    } finally {
      setLoading(false)
    }
  }

  // Función para agregar mesa
  const handleAddMesa = async () => {
    try {
      const token = localStorage.getItem("token")
      const mesaData = {
        numero: newMesa.numero,
        ubicacion: newMesa.area, // Usar el nombre completo de la ubicación
        capacidad: newMesa.capacidad.toString(),
        estado: "libre",
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/mesas`, mesaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMesas([...mesas, response.data])
      setNewMesa({ numero: "", area: areas.find((a) => a.id !== "todas")?.[0]?.nombre || "Interior", capacidad: 4 })
      setShowAddMesa(false)

      // Recargar para actualizar áreas si es necesario
      cargarMesas()
    } catch (err) {
      console.error(err)
      setError("Error al agregar la mesa")
    }
  }

  // Función para editar mesa
  const handleEditMesa = async () => {
    if (!selectedMesa) return

    try {
      const token = localStorage.getItem("token")
      const mesaData = {
        numero: selectedMesa.numero,
        ubicacion: selectedMesa.ubicacion,
        capacidad: selectedMesa.capacidad.toString(),
        estado: selectedMesa.estado,
      }

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/mesas/${selectedMesa.id}`, mesaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMesas(mesas.map((mesa) => (mesa.id === selectedMesa.id ? response.data : mesa)))
      setShowEditMesa(false)
      setSelectedMesa(null)
    } catch (err) {
      console.error(err)
      setError("Error al actualizar la mesa")
    }
  }

  // Función para cambiar estado de mesa
  const handleEstadoChange = async (mesaId: number, nuevoEstado: Mesa["estado"]) => {
    try {
      const token = localStorage.getItem("token")
      const mesa = mesas.find((m) => m.id === mesaId)
      if (!mesa) return

      const mesaData = {
        ...mesa,
        estado: nuevoEstado,
        capacidad: mesa.capacidad.toString(),
      }

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/mesas/${mesaId}`, mesaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMesas(mesas.map((mesa) => (mesa.id === mesaId ? response.data : mesa)))
    } catch (err) {
      console.error(err)
      setError("Error al cambiar el estado de la mesa")
    }
  }

  useEffect(() => {
    cargarMesas()
  }, [])

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vista de Mesa</h1>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filtroDisponibilidad} onValueChange={setFiltroDisponibilidad}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por Disponibilidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="libre">Libre</SelectItem>
              <SelectItem value="ocupada">Ocupada</SelectItem>
              <SelectItem value="reservada">Reservada</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={showAddMesa} onOpenChange={setShowAddMesa}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Mesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Mesa</DialogTitle>
                <DialogDescription>Configura los detalles de la nueva mesa</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="numero">Número de Mesa</Label>
                  <Input
                    id="numero"
                    value={newMesa.numero}
                    onChange={(e) => setNewMesa({ ...newMesa, numero: e.target.value })}
                    placeholder="Ej: M09"
                  />
                </div>
                <div>
                  <Label htmlFor="area">Área</Label>
                  <Select value={newMesa.area} onValueChange={(value) => setNewMesa({ ...newMesa, area: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {areas
                        .filter((area) => area.id !== "todas")
                        .map((area) => (
                          <SelectItem key={area.id} value={area.nombre}>
                            {area.nombre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="capacidad">Capacidad</Label>
                  <Input
                    id="capacidad"
                    type="number"
                    value={newMesa.capacidad}
                    onChange={(e) => setNewMesa({ ...newMesa, capacidad: Number.parseInt(e.target.value) })}
                    min="1"
                    max="12"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddMesa(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddMesa} className="bg-orange-500 hover:bg-orange-600">
                    Agregar Mesa
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs de Áreas */}
      <div className="flex gap-2">
        {areas.map((area) => (
          <Button
            key={area.id}
            variant={areaActiva === area.id ? "default" : "outline"}
            onClick={() => setAreaActiva(area.id)}
            className={
              areaActiva === area.id
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-white hover:bg-gray-50 text-gray-700"
            }
          >
            {area.nombre}
          </Button>
        ))}
      </div>

      {/* Contenido de Mesas */}
      <div className="space-y-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p>Cargando mesas...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-red-500">
              <p>{error}</p>
              <Button onClick={cargarMesas} className="mt-2">
                Reintentar
              </Button>
            </div>
          </div>
        ) : areaActiva === "todas" ? (
          // Mostrar todas las áreas
          areas
            .filter((area) => area.id !== "todas")
            .map((area) => (
              <div key={area.id} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {area.nombre} {mesasPorArea[area.id]?.length || 0} Mesa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mesasPorArea[area.id]?.map((mesa) => (
                    <Card key={mesa.id} className={`${getEstadoColor(mesa.estado)} border-2 relative`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-center flex-1">
                            <h3 className="text-xl font-bold text-blue-600 mb-1">{mesa.numero}</h3>
                            <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                              <Users className="w-4 h-4" />
                              <span>{Number.parseInt(mesa.capacidad)} Asiento(s)</span>
                            </div>
                            {mesa.estado === "ocupada" && mesa.clientes && (
                              <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                                <span>{mesa.clientes} Cliente(s)</span>
                              </div>
                            )}
                            {mesa.kot !== undefined && <div className="text-sm text-gray-600 mb-3">{mesa.kot} KOT</div>}
                            {mesa.tiempo && (
                              <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-3">
                                <Clock className="w-4 h-4" />
                                <span>{mesa.tiempo}</span>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 w-6 h-6 p-0"
                            onClick={() => {
                              setSelectedMesa(mesa)
                              setShowEditMesa(true)
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                            Mostrar Pedido
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                            Nuevo KOT
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
        ) : (
          // Mostrar área específica
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {areas.find((a) => a.id === areaActiva)?.nombre} {mesasFiltradas.length} Mesa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mesasFiltradas.map((mesa) => (
                <Card key={mesa.id} className={`${getEstadoColor(mesa.estado)} border-2 relative`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-center flex-1">
                        <h3 className="text-xl font-bold text-blue-600 mb-1">{mesa.numero}</h3>
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                          <Users className="w-4 h-4" />
                          <span>{Number.parseInt(mesa.capacidad)} Asiento(s)</span>
                        </div>
                        {mesa.estado === "ocupada" && mesa.clientes && (
                          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                            <span>{mesa.clientes} Cliente(s)</span>
                          </div>
                        )}
                        {mesa.kot !== undefined && <div className="text-sm text-gray-600 mb-3">{mesa.kot} KOT</div>}
                        {mesa.tiempo && (
                          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-3">
                            <Clock className="w-4 h-4" />
                            <span>{mesa.tiempo}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 w-6 h-6 p-0"
                        onClick={() => {
                          setSelectedMesa(mesa)
                          setShowEditMesa(true)
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        Mostrar Pedido
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        Nuevo KOT
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-end gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Libre</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Ocupada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Reservada</span>
        </div>
      </div>

      {/* Modal de Edición */}
      <Dialog open={showEditMesa} onOpenChange={setShowEditMesa}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Mesa {selectedMesa?.numero}</DialogTitle>
            <DialogDescription>Modifica los detalles y estado de la mesa</DialogDescription>
          </DialogHeader>
          {selectedMesa && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-numero">Número de Mesa</Label>
                <Input
                  id="edit-numero"
                  value={selectedMesa.numero}
                  onChange={(e) => setSelectedMesa({ ...selectedMesa, numero: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-capacidad">Capacidad</Label>
                <Input
                  id="edit-capacidad"
                  type="number"
                  value={Number.parseInt(selectedMesa.capacidad)}
                  onChange={(e) => setSelectedMesa({ ...selectedMesa, capacidad: e.target.value })}
                  min="1"
                  max="12"
                />
              </div>
              <div>
                <Label htmlFor="edit-estado">Estado</Label>
                <Select
                  value={selectedMesa.estado}
                  onValueChange={(value: Mesa["estado"]) => setSelectedMesa({ ...selectedMesa, estado: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="libre">Libre</SelectItem>
                    <SelectItem value="ocupada">Ocupada</SelectItem>
                    <SelectItem value="reservada">Reservada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-ubicacion">Ubicación</Label>
                <Select
                  value={selectedMesa.ubicacion}
                  onValueChange={(value) => setSelectedMesa({ ...selectedMesa, ubicacion: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areas
                      .filter((area) => area.id !== "todas")
                      .map((area) => (
                        <SelectItem key={area.id} value={area.nombre}>
                          {area.nombre}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedMesa.estado === "ocupada" && (
                <div>
                  <Label htmlFor="edit-clientes">Número de Clientes</Label>
                  <Input
                    id="edit-clientes"
                    type="number"
                    value={selectedMesa.clientes || 0}
                    onChange={(e) => setSelectedMesa({ ...selectedMesa, clientes: Number.parseInt(e.target.value) })}
                    min="1"
                    max={Number.parseInt(selectedMesa.capacidad)}
                  />
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditMesa(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEditMesa} className="bg-orange-500 hover:bg-orange-600">
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
