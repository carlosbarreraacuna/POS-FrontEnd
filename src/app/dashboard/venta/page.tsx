"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Trash2,
  Plus,
  Minus,
  Search,
  ShoppingCart,
  Eye,
  ChevronRight,
  Receipt,
  Percent,
  FileText,
  Printer,
  User,
  Grid3X3,
  List,
} from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { useIsMobile } from "@/hooks/use-mobile"

// Tipos de datos
interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria_id: number
  categoria?: {
    id: number
    nombre: string
  }
  imagen: string | null
  disponible: boolean
  sku: string | null
}

interface CartItem extends Product {
  quantity: number
  nota?: string // Nota específica del producto
}

// Hook personalizado para detectar tablets
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType("mobile")
      } else if (width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return deviceType
}

export default function VentaDirecta() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "tarjeta">("efectivo")
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [orderNumber] = useState(33)
  const [customerName, setCustomerName] = useState("Cliente General")
  const [discount, setDiscount] = useState(0)
  const [tip, setTip] = useState(10)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [orderNote, setOrderNote] = useState<string>("")
  const [showNotesModal, setShowNotesModal] = useState(false)

  const isMobile = useIsMobile()
  const deviceType = useDeviceType()

  useEffect(() => {
    // Mostrar carrito por defecto en desktop y tablet landscape
    if (deviceType === "desktop" || (deviceType === "tablet" && window.innerWidth >= 1024)) {
      setIsCartVisible(true)
    } else {
      setIsCartVisible(false)
    }
  }, [deviceType])

  useEffect(() => {
    const token = localStorage.getItem("token")
    setLoading(true)

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/productos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Error al cargar los productos")
        setLoading(false)
      })
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = ["Todos"]
    products.forEach((product) => {
      if (product.categoria && !uniqueCategories.includes(product.categoria.nombre)) {
        uniqueCategories.push(product.categoria.nombre)
      }
    })
    return uniqueCategories
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => product.disponible)

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((product) => product.categoria?.nombre === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [products, selectedCategory, searchTerm])

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0)
    const discountAmount = subtotal * (discount / 100)
    const subtotalAfterDiscount = subtotal - discountAmount
    const iva = subtotalAfterDiscount * 0.19
    const tipAmount = subtotalAfterDiscount * (tip / 100)
    const total = subtotalAfterDiscount + iva + tipAmount

    return {
      subtotal,
      discountAmount,
      subtotalAfterDiscount,
      iva,
      tipAmount,
      total,
    }
  }, [cart, discount, tip])

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateProductNote = (productId: number, note: string) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, nota: note } : item)))
  }

  const clearCart = () => {
    setCart([])
    setDiscount(0)
    setSelectedTable("")
    setOrderNote("")
  }

  const handleKOT = () => {
    const orderData = {
      items: cart,
      mesa: selectedTable,
      nota: orderNote,
      cliente: customerName,
    }
    console.log("KOT Data:", orderData)
    alert(`KOT enviado a cocina - Mesa: ${selectedTable || "Sin mesa"}`)
  }

  const handleKOTPrint = () => {
    alert("KOT enviado a cocina e impreso")
  }

  const handleAccount = () => {
    alert("Cuenta generada")
  }

  const handleInvoiceAndPayment = () => {
    alert("Procesando factura y pago")
  }

  const handleInvoiceAndPrintReceipt = () => {
    const orderData = {
      items: cart,
      mesa: selectedTable,
      nota: orderNote,
      cliente: customerName,
      total: cartTotals.total,
    }
    console.log("Order Data:", orderData)
    alert(`Factura procesada - Mesa: ${selectedTable || "Sin mesa"} - Total: $${cartTotals.total.toFixed(2)}`)
    clearCart()
  }

  // Función para obtener el grid responsivo
  const getGridCols = () => {
    if (viewMode === "list") return "grid-cols-1"

    switch (deviceType) {
      case "mobile":
        return "grid-cols-2 sm:grid-cols-3"
      case "tablet":
        return "grid-cols-4 md:grid-cols-5"
      case "desktop":
        return isCartVisible
          ? "grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
          : "grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10"
      default:
        return "grid-cols-3"
    }
  }

  // Componente del carrito reutilizable
  const CartContent = () => (
    <div className="flex flex-col h-full">
      {/* Header del carrito */}
      <div className="p-3 md:p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 md:w-5 md:h-5" />
            <h2 className="text-base md:text-lg font-bold">Pedido #{orderNumber}</h2>
          </div>
          {deviceType === "desktop" && (
            <Button variant="ghost" size="sm" onClick={() => setIsCartVisible(false)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Información del cliente */}
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4" />
          <Select value={customerName} onValueChange={setCustomerName}>
            <SelectTrigger className="w-full text-xs md:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cliente General">Cliente General</SelectItem>
              <SelectItem value="Nestor Camelc">Nestor Camelc</SelectItem>
              <SelectItem value="María García">María García</SelectItem>
              <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Configuración de mesa */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs md:text-sm font-medium">Mesa:</span>
          <Select value={selectedTable || "Sin mesa"} onValueChange={setSelectedTable}>
            <SelectTrigger className="w-full text-xs md:text-sm">
              <SelectValue placeholder="Seleccionar mesa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sin mesa">Sin mesa</SelectItem>
              <SelectItem value="Mesa 1">Mesa 1</SelectItem>
              <SelectItem value="Mesa 2">Mesa 2</SelectItem>
              <SelectItem value="Mesa 3">Mesa 3</SelectItem>
              <SelectItem value="Mesa 4">Mesa 4</SelectItem>
              <SelectItem value="Mesa 5">Mesa 5</SelectItem>
              <SelectItem value="Mesa 6">Mesa 6</SelectItem>
              <SelectItem value="Mesa 7">Mesa 7</SelectItem>
              <SelectItem value="Mesa 8">Mesa 8</SelectItem>
              <SelectItem value="Mesa 9">Mesa 9</SelectItem>
              <SelectItem value="Mesa 10">Mesa 10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botón de Notas del Pedido */}
        <div className="mb-3">
          <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between text-xs md:text-sm bg-transparent">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Notas del Pedido</span>
                  {(orderNote || cart.some((item) => item.nota)) && (
                    <Badge variant="secondary" className="text-xs">
                      {[orderNote, ...cart.filter((item) => item.nota)].filter(Boolean).length}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Notas del Pedido #{orderNumber}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Nota general */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Nota general del pedido:</label>
                  <Input
                    placeholder="Agregar nota general..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* Notas por producto */}
                {cart.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-3 block">Notas por producto:</label>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 line-clamp-1">
                              {item.nombre} (x{item.quantity})
                            </span>
                            {item.nota && (
                              <Badge variant="secondary" className="text-xs">
                                Con nota
                              </Badge>
                            )}
                          </div>
                          <Input
                            placeholder={`Nota para ${item.nombre}...`}
                            value={item.nota || ""}
                            onChange={(e) => updateProductNote(item.id, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resumen de notas */}
                {(orderNote || cart.some((item) => item.nota)) && (
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-600 block mb-2">Resumen de notas:</span>
                    <div className="space-y-2">
                      {orderNote && (
                        <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                          <span className="font-medium">General:</span> {orderNote}
                        </div>
                      )}
                      {cart
                        .filter((item) => item.nota)
                        .map((item) => (
                          <div key={item.id} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                            <span className="font-medium">{item.nombre}:</span> {item.nota}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={() => setShowNotesModal(false)} size="sm">
                    Cerrar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Opciones de servicio */}
        <div className="flex gap-1 md:gap-2 text-xs">
          <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600 flex-1 lg:flex-none">
            Comer en el local
          </Button>
          <Button variant="outline" size="sm" className="flex-1 lg:flex-none bg-transparent">
            Entrega
          </Button>
          <Button variant="outline" size="sm" className="flex-1 lg:flex-none bg-transparent">
            Recoger
          </Button>
        </div>
      </div>

      {/* Lista de items del carrito */}
      <div className="flex-1 overflow-auto">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
            <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-50" />
            <p className="text-sm md:text-base">El carrito está vacío</p>
          </div>
        ) : (
          <div className="p-2">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-gray-500 border-b">
                  <TableHead className="text-left font-medium p-2">ARTÍCULO</TableHead>
                  <TableHead className="text-center font-medium w-16 p-1">CANT.</TableHead>
                  <TableHead className="text-center font-medium w-14 p-1">PRECIO</TableHead>
                  <TableHead className="text-center font-medium w-14 p-1">TOTAL</TableHead>
                  <TableHead className="text-center font-medium w-8 p-1"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-100">
                    <TableCell className="py-2 px-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-xs text-gray-900 line-clamp-2 leading-tight">
                          {item.nombre}
                        </span>
                        {item.nota && (
                          <div className="flex items-center gap-1 mt-1">
                            <FileText className="w-2 h-2 text-gray-400" />
                            <span className="text-xs text-gray-500">Nota</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-1">
                      <div className="flex items-center justify-center gap-0.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 p-0 rounded-full border-gray-300"
                        >
                          <Minus className="w-2 h-2" />
                        </Button>
                        <span className="w-6 text-center font-medium text-xs mx-0.5">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 p-0 rounded-full border-gray-300"
                        >
                          <Plus className="w-2 h-2" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-1 text-center">
                      <span className="text-xs font-medium">${item.precio.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-2 px-1 text-center">
                      <span className="text-xs font-bold">${(item.precio * item.quantity).toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-2 px-1 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Footer del carrito */}
      <div className="p-3 md:p-4 border-t bg-white space-y-3 md:space-y-4">
        {/* Descuento */}
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4" />
          <span className="text-xs md:text-sm">Descuento</span>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-12 md:w-16 h-6 md:h-8 text-xs"
            min="0"
            max="100"
          />
          <span className="text-xs">%</span>
        </div>

        {/* Totales */}
        <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cartTotals.subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Descuento ({discount}%)</span>
              <span>-${cartTotals.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>IVA (19%)</span>
            <span>${cartTotals.iva.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Propina ({tip}%)</span>
            <span>${cartTotals.tipAmount.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-sm md:text-lg">
            <span>Total</span>
            <span className="text-orange-600">${cartTotals.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Resumen de configuración */}
        {selectedTable && (
          <div className="p-2 bg-gray-50 rounded-md text-xs">
            <div className="flex justify-between">
              <span className="font-medium">Mesa:</span>
              <span>{selectedTable}</span>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleKOT} variant="outline" size="sm" className="text-xs bg-transparent">
              KOT
            </Button>
            <Button onClick={handleKOTPrint} variant="outline" size="sm" className="text-xs bg-transparent">
              <Printer className="w-3 h-3 mr-1" />
              KOT e Imprimir
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={handleAccount}
              variant="outline"
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
            >
              CUENTA
            </Button>
            <Button
              onClick={handleInvoiceAndPayment}
              variant="outline"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white text-xs"
            >
              Factura y Pago
            </Button>
            <Button onClick={handleInvoiceAndPrintReceipt} size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Facturar e Imprimir Recibo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen">
      {/* Panel de productos */}
      <div
        className={`transition-all duration-300 ${isCartVisible && deviceType === "desktop" ? "flex-1" : "w-full"} flex flex-col`}
      >
        <div className="p-2 md:p-4 border-b bg-white">
          {/* Buscador y controles */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Busca tu elemento del menú aquí"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>

            {/* Controles de vista para tablet y desktop */}
            {deviceType !== "mobile" && (
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Filtros de categoría */}
          <div className="flex gap-1 md:gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""
                } text-xs md:text-sm px-2 md:px-3`}
                size="sm"
              >
                {category === "Todos" ? "Todos" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de productos adaptable */}
        <div className="flex-1 overflow-auto p-2 md:p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-sm md:text-base">Cargando productos...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-red-500">
                <p className="text-sm md:text-base">{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-2" size="sm">
                  Reintentar
                </Button>
              </div>
            </div>
          ) : (
            <div className={`grid ${getGridCols()} gap-2 md:gap-3`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  {viewMode === "grid" ? (
                    <Card
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={
                            product.imagen
                              ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${product.imagen}`
                              : "/chef1.jpg"
                          }
                          alt={product.nombre}
                          fill
                          className="object-cover"
                        />
                        {/* Botón de vista previa */}
                        {deviceType !== "mobile" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute top-1 right-1 w-6 h-6 md:w-7 md:h-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm md:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-base md:text-lg">{product.nombre}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="aspect-video relative rounded-lg overflow-hidden">
                                  <Image
                                    src={
                                      product.imagen
                                        ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${product.imagen}`
                                        : "/chef2.jpg"
                                    }
                                    alt={product.nombre}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <p className="text-sm text-gray-600">{product.descripcion}</p>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">Precio:</span>
                                      <p className="text-orange-600 font-bold">${product.precio.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium">SKU:</span>
                                      <p>{product.sku || "N/A"}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium">Categoría:</span>
                                      <p>{product.categoria?.nombre || "Sin categoría"}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium">Disponible:</span>
                                      <p>{product.disponible ? "Sí" : "No"}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      <CardContent className="p-1 md:p-2">
                        <h3 className="font-medium text-xs md:text-sm text-center line-clamp-2 mb-1 min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center">
                          {product.nombre}
                        </h3>
                        <p className="text-center font-bold text-sm md:text-base text-orange-600">
                          ${product.precio.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    // Vista de lista para tablets
                    <Card
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 relative rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                product.imagen
                                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${product.imagen}`
                                  : "/chef1.jpg"
                              }
                              alt={product.nombre}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm md:text-base line-clamp-1">{product.nombre}</h3>
                            <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mt-1">{product.descripcion}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {product.categoria?.nombre}
                              </Badge>
                              <p className="font-bold text-sm md:text-base text-orange-600">
                                ${product.precio.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carrito adaptable según dispositivo */}
      {deviceType === "mobile" || (deviceType === "tablet" && window.innerWidth < 900) ? (
        <Sheet open={isCartVisible} onOpenChange={setIsCartVisible}>
          <SheetTrigger asChild>
            <Button className="fixed bottom-4 right-4 bg-orange-500 hover:bg-orange-600 rounded-full w-14 h-14 md:w-16 md:h-16 shadow-lg z-50">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full md:w-96 p-0">
            <CartContent />
          </SheetContent>
        </Sheet>
      ) : (
        <>
          {/* Botón flotante del carrito para desktop y tablet landscape */}
          {!isCartVisible && (
            <Button
              onClick={() => setIsCartVisible(true)}
              className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full w-14 h-14 shadow-lg z-50"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Button>
          )}

          {/* Panel del carrito para desktop y tablet landscape */}
          {isCartVisible && (
            <div className="w-80 lg:w-96 border-l bg-gray-50">
              <CartContent />
            </div>
          )}
        </>
      )}
    </div>
  )
}