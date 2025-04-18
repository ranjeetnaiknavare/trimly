"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, Star, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ServiceDetailModalProps {
  service: {
    id: string
    name: string
    description: string
    price: number
    duration: number
    popular?: boolean
    image?: string
    benefits?: string[]
    staffMembers?: Array<{
      id: string
      name: string
      rating: number
      specialization: string
      image: string
    }>
    reviews?: Array<{
      id: string
      userName: string
      rating: number
      comment: string
      date: string
    }>
  }
  onSelect?: (id: string) => void
}

export function ServiceDetailModal({ service, onSelect }: ServiceDetailModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border-rose-100 hover:bg-rose-100"
        onClick={() => setOpen(true)}
      >
        View Details
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{service.name}</span>
              {service.popular && (
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 text-xs">
                  Popular
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {service.image && (
            <div className="rounded-md overflow-hidden h-40 mb-4">
              <img
                src={service.image || `/placeholder.svg?height=160&width=320&query=${service.name}`}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{service.duration} min</span>
              </div>
              <span className="font-medium text-lg">₹{service.price}</span>
            </div>

            <p className="text-gray-700">{service.description}</p>

            {service.benefits && service.benefits.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Benefits</h4>
                <ul className="space-y-1">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.staffMembers && service.staffMembers.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Available Staff</h4>
                <div className="grid grid-cols-2 gap-2">
                  {service.staffMembers.map((staff) => (
                    <div key={staff.id} className="flex items-center p-2 border rounded-md">
                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                        <img
                          src={staff.image || `/placeholder.svg?height=32&width=32&query=person`}
                          alt={staff.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{staff.name}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs ml-1">{staff.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.reviews && service.reviews.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Customer Reviews</h4>
                <div className="space-y-2">
                  {service.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{review.userName}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs ml-1">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs mt-1">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onSelect && (
              <Button
                className="w-full bg-rose-600 hover:bg-rose-700"
                onClick={() => {
                  onSelect(service.id)
                  setOpen(false)
                }}
              >
                Select This Service
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
