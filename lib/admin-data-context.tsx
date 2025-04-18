"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { format } from "date-fns"

// Types for all admin data
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "blocked"
  bookings: number
  lastActive: string
  joinDate: string
  avatar?: string
}

export interface Business {
  id: string
  name: string
  owner: string
  email: string
  phone: string
  status: "active" | "pending" | "suspended"
  verified: boolean
  locations: number
  plan: "premium" | "standard" | "basic"
  joinDate: string
  avatar?: string
}

export interface Advertiser {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  status: "active" | "pending" | "suspended"
  verified: boolean
  activeAds: number
  totalSpend: string
  joinDate: string
  avatar?: string
}

export interface Booking {
  id: string
  customer: string
  customerEmail: string
  business: string
  service: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  amount: string
  paymentStatus: "paid" | "pending" | "refunded"
}

export interface Service {
  id: string
  name: string
  category: string
  description: string
  duration: string
  averagePrice: string
  businesses: number
  bookings: number
  status: "active" | "inactive"
}

export interface Coupon {
  id: string
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  status: "active" | "inactive" | "expired"
  usageLimit: number
  usageCount: number
  startDate: Date
  endDate: Date
  createdBy: string
  businessId: string | null
}

export interface Review {
  id: string
  customer: string
  business: string
  service: string
  rating: number
  comment: string
  date: string
  status: "published" | "pending" | "flagged"
  flagged: boolean
}

export interface Ad {
  id: string
  title: string
  description: string
  businessName: string
  advertiserId: string
  submittedDate: string
  startDate: string | null
  endDate: string | null
  duration: string
  status: "pending" | "active" | "rejected" | "completed"
  imageUrl: string
  targetUrl: string
  impressions: number
  clicks: number
  ctr: string
  rejectionReason?: string
  adSpend: string
}

// Context type
interface AdminDataContextType {
  // Customers
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "id">) => void
  updateCustomer: (customer: Customer) => void
  deleteCustomer: (id: string) => void

  // Businesses
  businesses: Business[]
  addBusiness: (business: Omit<Business, "id">) => void
  updateBusiness: (business: Business) => void
  deleteBusiness: (id: string) => void
  verifyBusiness: (id: string, verified: boolean) => void

  // Advertisers
  advertisers: Advertiser[]
  addAdvertiser: (advertiser: Omit<Advertiser, "id">) => void
  updateAdvertiser: (advertiser: Advertiser) => void
  deleteAdvertiser: (id: string) => void
  verifyAdvertiser: (id: string, verified: boolean) => void

  // Bookings
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id">) => void
  updateBooking: (booking: Booking) => void
  deleteBooking: (id: string) => void
  updateBookingStatus: (id: string, status: Booking["status"]) => void

  // Services
  services: Service[]
  addService: (service: Omit<Service, "id">) => void
  updateService: (service: Service) => void
  deleteService: (id: string) => void

  // Coupons
  coupons: Coupon[]
  addCoupon: (coupon: Omit<Coupon, "id">) => void
  updateCoupon: (coupon: Coupon) => void
  deleteCoupon: (id: string) => void

  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, "id">) => void
  updateReview: (review: Review) => void
  deleteReview: (id: string) => void
  updateReviewStatus: (id: string, status: Review["status"]) => void
  flagReview: (id: string, flagged: boolean) => void

  // Ads
  ads: Ad[]
  addAd: (ad: Omit<Ad, "id">) => void
  updateAd: (ad: Ad) => void
  deleteAd: (id: string) => void
  approveAd: (id: string) => void
  rejectAd: (id: string, reason: string) => void

  // Stats
  dashboardStats: {
    totalCustomers: number
    activeBusinesses: number
    activeAdvertisers: number
    bookingsToday: number
    pendingAds: number
    activeAds: number
    totalAdRevenue: string
  }
  couponStats: {
    totalCoupons: number
    activeCoupons: number
    totalRedemptions: number
    totalDiscountAmount: number
  }
  adStats: {
    totalAds: number
    pendingAds: number
    activeAds: number
    rejectedAds: number
    completedAds: number
    totalImpressions: number
    totalClicks: number
    averageCTR: string
    totalRevenue: string
  }

  // Notifications
  successMessage: string
  setSuccessMessage: (message: string) => void
  errorMessage: string
  setErrorMessage: (message: string) => void
}

// Initial data
const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    status: "active",
    bookings: 12,
    lastActive: "2 hours ago",
    joinDate: "15 Jan 2023",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    status: "active",
    bookings: 8,
    lastActive: "1 day ago",
    joinDate: "3 Mar 2023",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    status: "inactive",
    bookings: 3,
    lastActive: "2 weeks ago",
    joinDate: "12 Apr 2023",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "+91 65432 10987",
    status: "active",
    bookings: 15,
    lastActive: "5 hours ago",
    joinDate: "8 Feb 2023",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 54321 09876",
    status: "blocked",
    bookings: 1,
    lastActive: "1 month ago",
    joinDate: "20 May 2023",
  },
]

const initialBusinesses: Business[] = [
  {
    id: "1",
    name: "Serene Beauty Space",
    owner: "Anjali Mehta",
    email: "contact@serenebeauty.com",
    phone: "+91 98765 43210",
    status: "active",
    verified: true,
    locations: 2,
    plan: "premium",
    joinDate: "10 Jan 2023",
  },
  {
    id: "2",
    name: "Urban Grooming Space",
    owner: "Rajesh Kumar",
    email: "info@urbangrooming.com",
    phone: "+91 87654 32109",
    status: "active",
    verified: true,
    locations: 3,
    plan: "premium",
    joinDate: "5 Feb 2023",
  },
  {
    id: "3",
    name: "Elegant Beauty",
    owner: "Neha Singh",
    email: "hello@elegantbeauty.com",
    phone: "+91 76543 21098",
    status: "pending",
    verified: false,
    locations: 1,
    plan: "basic",
    joinDate: "20 Mar 2023",
  },
  {
    id: "4",
    name: "Style Studio",
    owner: "Vikram Malhotra",
    email: "contact@stylestudio.com",
    phone: "+91 65432 10987",
    status: "active",
    verified: true,
    locations: 1,
    plan: "standard",
    joinDate: "15 Apr 2023",
  },
  {
    id: "5",
    name: "Glamour Salon",
    owner: "Pooja Sharma",
    email: "info@glamoursalon.com",
    phone: "+91 54321 09876",
    status: "suspended",
    verified: true,
    locations: 2,
    plan: "premium",
    joinDate: "8 May 2023",
  },
]

const initialAdvertisers: Advertiser[] = [
  {
    id: "1",
    name: "Beauty Products Inc.",
    contactPerson: "Ravi Sharma",
    email: "ravi@beautyproducts.com",
    phone: "+91 98765 43210",
    status: "active",
    verified: true,
    activeAds: 5,
    totalSpend: "₹45,000",
    joinDate: "10 Jan 2023",
  },
  {
    id: "2",
    name: "Salon Supplies Co.",
    contactPerson: "Priya Patel",
    email: "priya@salonsupplies.com",
    phone: "+91 87654 32109",
    status: "active",
    verified: true,
    activeAds: 3,
    totalSpend: "₹32,500",
    joinDate: "5 Feb 2023",
  },
  {
    id: "3",
    name: "Grooming Essentials",
    contactPerson: "Amit Kumar",
    email: "amit@groomingessentials.com",
    phone: "+91 76543 21098",
    status: "pending",
    verified: false,
    activeAds: 0,
    totalSpend: "₹0",
    joinDate: "20 Mar 2023",
  },
  {
    id: "4",
    name: "Style Accessories",
    contactPerson: "Neha Gupta",
    email: "neha@styleaccessories.com",
    phone: "+91 65432 10987",
    status: "active",
    verified: true,
    activeAds: 2,
    totalSpend: "₹18,750",
    joinDate: "15 Apr 2023",
  },
  {
    id: "5",
    name: "Glamour Cosmetics",
    contactPerson: "Vikram Singh",
    email: "vikram@glamourcosmetics.com",
    phone: "+91 54321 09876",
    status: "suspended",
    verified: true,
    activeAds: 0,
    totalSpend: "₹27,300",
    joinDate: "8 May 2023",
  },
]

const initialBookings: Booking[] = [
  {
    id: "BK-12345",
    customer: "Rahul Sharma",
    customerEmail: "rahul.sharma@example.com",
    business: "Serene Beauty Space",
    service: "Haircut & Styling",
    date: "15 Aug 2023",
    time: "10:30 AM",
    status: "completed",
    amount: "₹800",
    paymentStatus: "paid",
  },
  {
    id: "BK-12346",
    customer: "Priya Patel",
    customerEmail: "priya.patel@example.com",
    business: "Urban Grooming Space",
    service: "Facial Treatment",
    date: "16 Aug 2023",
    time: "2:00 PM",
    status: "upcoming",
    amount: "₹1,200",
    paymentStatus: "paid",
  },
  {
    id: "BK-12347",
    customer: "Amit Kumar",
    customerEmail: "amit.kumar@example.com",
    business: "Elegant Beauty",
    service: "Full Body Massage",
    date: "17 Aug 2023",
    time: "11:00 AM",
    status: "cancelled",
    amount: "₹1,500",
    paymentStatus: "refunded",
  },
  {
    id: "BK-12348",
    customer: "Sneha Gupta",
    customerEmail: "sneha.gupta@example.com",
    business: "Style Studio",
    service: "Manicure & Pedicure",
    date: "18 Aug 2023",
    time: "4:30 PM",
    status: "upcoming",
    amount: "₹600",
    paymentStatus: "pending",
  },
  {
    id: "BK-12349",
    customer: "Vikram Singh",
    customerEmail: "vikram.singh@example.com",
    business: "Glamour Salon",
    service: "Hair Coloring",
    date: "19 Aug 2023",
    time: "1:00 PM",
    status: "upcoming",
    amount: "₹1,800",
    paymentStatus: "paid",
  },
]

const initialServices: Service[] = [
  {
    id: "1",
    name: "Haircut & Styling",
    category: "Hair",
    description: "Professional haircut and styling service",
    duration: "45 min",
    averagePrice: "₹800",
    businesses: 120,
    bookings: 850,
    status: "active",
  },
  {
    id: "2",
    name: "Facial Treatment",
    category: "Skin",
    description: "Rejuvenating facial treatment for all skin types",
    duration: "60 min",
    averagePrice: "₹1,200",
    businesses: 95,
    bookings: 720,
    status: "active",
  },
  {
    id: "3",
    name: "Full Body Massage",
    category: "Massage",
    description: "Relaxing full body massage therapy",
    duration: "90 min",
    averagePrice: "₹1,500",
    businesses: 80,
    bookings: 650,
    status: "active",
  },
  {
    id: "4",
    name: "Manicure & Pedicure",
    category: "Nails",
    description: "Complete nail care for hands and feet",
    duration: "75 min",
    averagePrice: "₹600",
    businesses: 110,
    bookings: 580,
    status: "active",
  },
  {
    id: "5",
    name: "Hair Coloring",
    category: "Hair",
    description: "Professional hair coloring service",
    duration: "120 min",
    averagePrice: "₹1,800",
    businesses: 90,
    bookings: 520,
    status: "active",
  },
  {
    id: "6",
    name: "Beard Trimming",
    category: "Grooming",
    description: "Professional beard trimming and styling",
    duration: "30 min",
    averagePrice: "₹400",
    businesses: 75,
    bookings: 480,
    status: "active",
  },
  {
    id: "7",
    name: "Waxing",
    category: "Hair Removal",
    description: "Hair removal using wax",
    duration: "45 min",
    averagePrice: "₹700",
    businesses: 85,
    bookings: 510,
    status: "inactive",
  },
]

const initialCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off for new customers",
    discountType: "percentage",
    discountValue: 20,
    status: "active",
    usageLimit: 1000,
    usageCount: 456,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-12-31"),
    createdBy: "Admin",
    businessId: null,
  },
  {
    id: "2",
    code: "SUMMER25",
    description: "25% off summer special",
    discountType: "percentage",
    discountValue: 25,
    status: "active",
    usageLimit: 500,
    usageCount: 213,
    startDate: new Date("2023-05-15"),
    endDate: new Date("2023-08-31"),
    createdBy: "Admin",
    businessId: null,
  },
  {
    id: "3",
    code: "HAIRCUT100",
    description: "₹100 off on haircuts",
    discountType: "fixed",
    discountValue: 100,
    status: "active",
    usageLimit: 200,
    usageCount: 87,
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-09-30"),
    createdBy: "Serene Beauty Space",
    businessId: "1",
  },
  {
    id: "4",
    code: "FIRSTVISIT",
    description: "15% off on first visit",
    discountType: "percentage",
    discountValue: 15,
    status: "expired",
    usageLimit: 300,
    usageCount: 300,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-06-30"),
    createdBy: "Admin",
    businessId: null,
  },
  {
    id: "5",
    code: "LOYALTY10",
    description: "10% off for loyal customers",
    discountType: "percentage",
    discountValue: 10,
    status: "inactive",
    usageLimit: 0,
    usageCount: 0,
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-12-31"),
    createdBy: "Urban Grooming Space",
    businessId: "2",
  },
]

const initialReviews: Review[] = [
  {
    id: "1",
    customer: "Rahul Sharma",
    business: "Serene Beauty Space",
    service: "Haircut & Styling",
    rating: 5,
    comment: "Excellent service! The stylist was very professional and did a fantastic job with my haircut.",
    date: "15 Aug 2023",
    status: "published",
    flagged: false,
  },
  {
    id: "2",
    customer: "Priya Patel",
    business: "Urban Grooming Space",
    service: "Facial Treatment",
    rating: 4,
    comment: "Very good facial treatment. My skin feels refreshed and clean. Would recommend!",
    date: "16 Aug 2023",
    status: "published",
    flagged: false,
  },
  {
    id: "3",
    customer: "Amit Kumar",
    business: "Elegant Beauty",
    service: "Full Body Massage",
    rating: 2,
    comment: "The massage was okay but the room was too cold and the therapist was not very experienced.",
    date: "17 Aug 2023",
    status: "flagged",
    flagged: true,
  },
  {
    id: "4",
    customer: "Sneha Gupta",
    business: "Style Studio",
    service: "Manicure & Pedicure",
    rating: 5,
    comment: "Amazing experience! My nails look beautiful and the staff was very friendly.",
    date: "18 Aug 2023",
    status: "published",
    flagged: false,
  },
  {
    id: "5",
    customer: "Vikram Singh",
    business: "Glamour Salon",
    service: "Hair Coloring",
    rating: 1,
    comment: "Terrible experience! They completely messed up my hair color. Will never go back!",
    date: "19 Aug 2023",
    status: "pending",
    flagged: true,
  },
]

const initialAds: Ad[] = [
  {
    id: "AD-12345",
    title: "Summer Special Discount",
    description: "Get 20% off on all premium grooming services this summer. Limited time offer!",
    businessName: "Urban Grooming Space",
    advertiserId: "1",
    submittedDate: "2023-07-15",
    startDate: "2023-07-18",
    endDate: "2023-07-25",
    duration: "7 days",
    status: "active",
    imageUrl: "/abstract-geometric-shapes.png",
    targetUrl: "https://example.com/summer-special",
    impressions: 1245,
    clicks: 87,
    ctr: "6.99%",
    adSpend: "₹999",
  },
  {
    id: "AD-12346",
    title: "New Customer Offer",
    description: "First-time customers get a complimentary hair spa with any service booking.",
    businessName: "Serene Beauty Space",
    advertiserId: "2",
    submittedDate: "2023-07-14",
    startDate: null,
    endDate: null,
    duration: "30 days",
    status: "pending",
    imageUrl: "/colorful-abstract-shapes.png",
    targetUrl: "https://example.com/new-customer",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    adSpend: "₹2,999",
  },
  {
    id: "AD-12347",
    title: "Weekend Special",
    description: "Book any service on weekends and get 15% off on your bill.",
    businessName: "Elegant Beauty Space",
    advertiserId: "3",
    submittedDate: "2023-07-10",
    startDate: "2023-07-12",
    endDate: "2023-07-19",
    duration: "7 days",
    status: "completed",
    imageUrl: "/abstract-purple-swirl.png",
    targetUrl: "https://example.com/weekend-special",
    impressions: 876,
    clicks: 54,
    ctr: "6.16%",
    adSpend: "₹999",
  },
  {
    id: "AD-12348",
    title: "Flash Sale",
    description: "24-hour flash sale! Book now and get 30% off on all services.",
    businessName: "Urban Chic Salon",
    advertiserId: "4",
    submittedDate: "2023-07-08",
    startDate: null,
    endDate: null,
    duration: "1 day",
    status: "rejected",
    imageUrl: "/night-sky-stars.png",
    targetUrl: "https://example.com/flash-sale",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    rejectionReason: "Image quality does not meet our standards. Please upload a higher resolution image.",
    adSpend: "₹199",
  },
  {
    id: "AD-12349",
    title: "Premium Package Deal",
    description: "Book our premium package and get a free gift worth ₹500.",
    businessName: "Style Studio",
    advertiserId: "5",
    submittedDate: "2023-07-16",
    startDate: null,
    endDate: null,
    duration: "14 days",
    status: "pending",
    imageUrl: "/abstract-purple-swirl.png",
    targetUrl: "https://example.com/premium-package",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    adSpend: "₹1,499",
  },
]

// Create context
const AdminDataContext = createContext<AdminDataContextType>({
  // Customers
  customers: [],
  addCustomer: () => {},
  updateCustomer: () => {},
  deleteCustomer: () => {},

  // Businesses
  businesses: [],
  addBusiness: () => {},
  updateBusiness: () => {},
  deleteBusiness: () => {},
  verifyBusiness: () => {},

  // Advertisers
  advertisers: [],
  addAdvertiser: () => {},
  updateAdvertiser: () => {},
  deleteAdvertiser: () => {},
  verifyAdvertiser: () => {},

  // Bookings
  bookings: [],
  addBooking: () => {},
  updateBooking: () => {},
  deleteBooking: () => {},
  updateBookingStatus: () => {},

  // Services
  services: [],
  addService: () => {},
  updateService: () => {},
  deleteService: () => {},

  // Coupons
  coupons: [],
  addCoupon: () => {},
  updateCoupon: () => {},
  deleteCoupon: () => {},

  // Reviews
  reviews: [],
  addReview: () => {},
  updateReview: () => {},
  deleteReview: () => {},
  updateReviewStatus: () => {},
  flagReview: () => {},

  // Ads
  ads: [],
  addAd: () => {},
  updateAd: () => {},
  deleteAd: () => {},
  approveAd: () => {},
  rejectAd: () => {},

  // Stats
  dashboardStats: {
    totalCustomers: 0,
    activeBusinesses: 0,
    activeAdvertisers: 0,
    bookingsToday: 0,
    pendingAds: 0,
    activeAds: 0,
    totalAdRevenue: "",
  },
  couponStats: {
    totalCoupons: 0,
    activeCoupons: 0,
    totalRedemptions: 0,
    totalDiscountAmount: 0,
  },
  adStats: {
    totalAds: 0,
    pendingAds: 0,
    activeAds: 0,
    rejectedAds: 0,
    completedAds: 0,
    totalImpressions: 0,
    totalClicks: 0,
    averageCTR: "",
    totalRevenue: "",
  },

  // Notifications
  successMessage: "",
  setSuccessMessage: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
})

// Provider component
export function AdminDataProvider({ children }: { children: ReactNode }) {
  // State for all data
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses)
  const [advertisers, setAdvertisers] = useState<Advertiser[]>(initialAdvertisers)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [ads, setAds] = useState<Ad[]>(initialAds)

  // Notifications
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  // Calculate stats
  const dashboardStats = {
    totalCustomers: customers.length,
    activeBusinesses: businesses.filter((b) => b.status === "active").length,
    activeAdvertisers: advertisers.filter((a) => a.status === "active").length,
    bookingsToday: bookings.filter((b) => b.date === format(new Date(), "dd MMM yyyy")).length,
    pendingAds: ads.filter((a) => a.status === "pending").length,
    activeAds: ads.filter((a) => a.status === "active").length,
    totalAdRevenue: "₹78,500",
  }

  const couponStats = {
    totalCoupons: coupons.length,
    activeCoupons: coupons.filter((c) => c.status === "active").length,
    totalRedemptions: coupons.reduce((sum, coupon) => sum + coupon.usageCount, 0),
    totalDiscountAmount: 128750, // Mock value
  }

  const adStats = {
    totalAds: ads.length,
    pendingAds: ads.filter((a) => a.status === "pending").length,
    activeAds: ads.filter((a) => a.status === "active").length,
    rejectedAds: ads.filter((a) => a.status === "rejected").length,
    completedAds: ads.filter((a) => a.status === "completed").length,
    totalImpressions: ads.reduce((sum, ad) => sum + ad.impressions, 0),
    totalClicks: ads.reduce((sum, ad) => sum + ad.clicks, 0),
    averageCTR: "6.58%",
    totalRevenue: "₹78,500",
  }

  // Customer functions
  const addCustomer = (customer: Omit<Customer, "id">) => {
    const newId = (customers.length + 1).toString()
    setCustomers([...customers, { ...customer, id: newId }])
    setSuccessMessage(`Customer ${customer.name} has been added successfully`)
  }

  const updateCustomer = (customer: Customer) => {
    setCustomers(customers.map((c) => (c.id === customer.id ? customer : c)))
    setSuccessMessage(`Customer ${customer.name} has been updated successfully`)
  }

  const deleteCustomer = (id: string) => {
    const customerToDelete = customers.find((c) => c.id === id)
    if (!customerToDelete) {
      setErrorMessage("Customer not found")
      return
    }

    setCustomers(customers.filter((c) => c.id !== id))
    setSuccessMessage(`Customer ${customerToDelete.name} has been deleted successfully`)
  }

  // Business functions
  const addBusiness = (business: Omit<Business, "id">) => {
    const newId = (businesses.length + 1).toString()
    setBusinesses([...businesses, { ...business, id: newId }])
    setSuccessMessage(`Business ${business.name} has been added successfully`)
  }

  const updateBusiness = (business: Business) => {
    setBusinesses(businesses.map((b) => (b.id === business.id ? business : b)))
    setSuccessMessage(`Business ${business.name} has been updated successfully`)
  }

  const deleteBusiness = (id: string) => {
    const businessToDelete = businesses.find((b) => b.id === id)
    if (!businessToDelete) {
      setErrorMessage("Business not found")
      return
    }

    setBusinesses(businesses.filter((b) => b.id !== id))
    setSuccessMessage(`Business ${businessToDelete.name} has been deleted successfully`)
  }

  const verifyBusiness = (id: string, verified: boolean) => {
    const updatedBusinesses = businesses.map((b) => (b.id === id ? { ...b, verified } : b))

    const business = updatedBusinesses.find((b) => b.id === id)
    if (business) {
      setSuccessMessage(`Business ${business.name} has been ${verified ? "verified" : "unverified"} successfully`)
    }

    setBusinesses(updatedBusinesses)
  }

  // Advertiser functions
  const addAdvertiser = (advertiser: Omit<Advertiser, "id">) => {
    const newId = (advertisers.length + 1).toString()
    setAdvertisers([...advertisers, { ...advertiser, id: newId }])
    setSuccessMessage(`Advertiser ${advertiser.name} has been added successfully`)
  }

  const updateAdvertiser = (advertiser: Advertiser) => {
    setAdvertisers(advertisers.map((a) => (a.id === advertiser.id ? advertiser : a)))
    setSuccessMessage(`Advertiser ${advertiser.name} has been updated successfully`)
  }

  const deleteAdvertiser = (id: string) => {
    const advertiserToDelete = advertisers.find((a) => a.id === id)
    if (!advertiserToDelete) {
      setErrorMessage("Advertiser not found")
      return
    }

    setAdvertisers(advertisers.filter((a) => a.id !== id))
    setSuccessMessage(`Advertiser ${advertiserToDelete.name} has been deleted successfully`)
  }

  const verifyAdvertiser = (id: string, verified: boolean) => {
    const updatedAdvertisers = advertisers.map((a) => (a.id === id ? { ...a, verified } : a))

    const advertiser = updatedAdvertisers.find((a) => a.id === id)
    if (advertiser) {
      setSuccessMessage(`Advertiser ${advertiser.name} has been ${verified ? "verified" : "unverified"} successfully`)
    }

    setAdvertisers(updatedAdvertisers)
  }

  // Booking functions
  const addBooking = (booking: Omit<Booking, "id">) => {
    const newId = `BK-${Math.floor(10000 + Math.random() * 90000)}`
    setBookings([...bookings, { ...booking, id: newId }])
    setSuccessMessage(`Booking ${newId} has been added successfully`)
  }

  const updateBooking = (booking: Booking) => {
    setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)))
    setSuccessMessage(`Booking ${booking.id} has been updated successfully`)
  }

  const deleteBooking = (id: string) => {
    const bookingToDelete = bookings.find((b) => b.id === id)
    if (!bookingToDelete) {
      setErrorMessage("Booking not found")
      return
    }

    setBookings(bookings.filter((b) => b.id !== id))
    setSuccessMessage(`Booking ${id} has been deleted successfully`)
  }

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    const updatedBookings = bookings.map((b) => (b.id === id ? { ...b, status } : b))

    setBookings(updatedBookings)
    setSuccessMessage(`Booking ${id} status has been updated to ${status}`)
  }

  // Service functions
  const addService = (service: Omit<Service, "id">) => {
    const newId = (services.length + 1).toString()
    setServices([...services, { ...service, id: newId }])
    setSuccessMessage(`Service ${service.name} has been added successfully`)
  }

  const updateService = (service: Service) => {
    setServices(services.map((s) => (s.id === service.id ? service : s)))
    setSuccessMessage(`Service ${service.name} has been updated successfully`)
  }

  const deleteService = (id: string) => {
    const serviceToDelete = services.find((s) => s.id === id)
    if (!serviceToDelete) {
      setErrorMessage("Service not found")
      return
    }

    setServices(services.filter((s) => s.id !== id))
    setSuccessMessage(`Service ${serviceToDelete.name} has been deleted successfully`)
  }

  // Coupon functions
  const addCoupon = (coupon: Omit<Coupon, "id">) => {
    const newId = (coupons.length + 1).toString()
    setCoupons([...coupons, { ...coupon, id: newId }])
    setSuccessMessage(`Coupon ${coupon.code} has been added successfully`)
  }

  const updateCoupon = (coupon: Coupon) => {
    setCoupons(coupons.map((c) => (c.id === coupon.id ? coupon : c)))
    setSuccessMessage(`Coupon ${coupon.code} has been updated successfully`)
  }

  const deleteCoupon = (id: string) => {
    const couponToDelete = coupons.find((c) => c.id === id)
    if (!couponToDelete) {
      setErrorMessage("Coupon not found")
      return
    }

    setCoupons(coupons.filter((c) => c.id !== id))
    setSuccessMessage(`Coupon ${couponToDelete.code} has been deleted successfully`)
  }

  // Review functions
  const addReview = (review: Omit<Review, "id">) => {
    const newId = (reviews.length + 1).toString()
    setReviews([...reviews, { ...review, id: newId }])
    setSuccessMessage(`Review has been added successfully`)
  }

  const updateReview = (review: Review) => {
    setReviews(reviews.map((r) => (r.id === review.id ? review : r)))
    setSuccessMessage(`Review has been updated successfully`)
  }

  const deleteReview = (id: string) => {
    const reviewToDelete = reviews.find((r) => r.id === id)
    if (!reviewToDelete) {
      setErrorMessage("Review not found")
      return
    }

    setReviews(reviews.filter((r) => r.id !== id))
    setSuccessMessage(`Review has been deleted successfully`)
  }

  const updateReviewStatus = (id: string, status: Review["status"]) => {
    const updatedReviews = reviews.map((r) => (r.id === id ? { ...r, status } : r))

    setReviews(updatedReviews)
    setSuccessMessage(`Review status has been updated to ${status}`)
  }

  const flagReview = (id: string, flagged: boolean) => {
    const updatedReviews = reviews.map((r) =>
      r.id === id ? { ...r, flagged, status: flagged ? "flagged" : "pending" } : r,
    )

    setReviews(updatedReviews)
    setSuccessMessage(`Review has been ${flagged ? "flagged" : "unflagged"} successfully`)
  }

  // Ad functions
  const addAd = (ad: Omit<Ad, "id">) => {
    const newId = `AD-${Math.floor(10000 + Math.random() * 90000)}`
    setAds([...ads, { ...ad, id: newId }])
    setSuccessMessage(`Ad "${ad.title}" has been added successfully`)
  }

  const updateAd = (ad: Ad) => {
    setAds(ads.map((a) => (a.id === ad.id ? ad : a)))
    setSuccessMessage(`Ad "${ad.title}" has been updated successfully`)
  }

  const deleteAd = (id: string) => {
    const adToDelete = ads.find((a) => a.id === id)
    if (!adToDelete) {
      setErrorMessage("Ad not found")
      return
    }

    setAds(ads.filter((a) => a.id !== id))
    setSuccessMessage(`Ad "${adToDelete.title}" has been deleted successfully`)
  }

  const approveAd = (id: string) => {
    const today = format(new Date(), "yyyy-MM-dd")
    const adToApprove = ads.find((a) => a.id === id)

    if (!adToApprove) {
      setErrorMessage("Ad not found")
      return
    }

    let endDate: string | null = null
    if (adToApprove.duration === "1 day") {
      endDate = today
    } else if (adToApprove.duration === "7 days") {
      const endDateObj = new Date()
      endDateObj.setDate(endDateObj.getDate() + 7)
      endDate = format(endDateObj, "yyyy-MM-dd")
    } else if (adToApprove.duration === "14 days") {
      const endDateObj = new Date()
      endDateObj.setDate(endDateObj.getDate() + 14)
      endDate = format(endDateObj, "yyyy-MM-dd")
    } else if (adToApprove.duration === "30 days") {
      const endDateObj = new Date()
      endDateObj.setDate(endDateObj.getDate() + 30)
      endDate = format(endDateObj, "yyyy-MM-dd")
    }

    const updatedAds = ads.map((a) => (a.id === id ? { ...a, status: "active", startDate: today, endDate } : a))

    setAds(updatedAds)
    setSuccessMessage(`Ad "${adToApprove.title}" has been approved successfully`)
  }

  const rejectAd = (id: string, reason: string) => {
    const adToReject = ads.find((a) => a.id === id)

    if (!adToReject) {
      setErrorMessage("Ad not found")
      return
    }

    const updatedAds = ads.map((a) => (a.id === id ? { ...a, status: "rejected", rejectionReason: reason } : a))

    setAds(updatedAds)
    setSuccessMessage(`Ad "${adToReject.title}" has been rejected successfully`)
  }

  return (
    <AdminDataContext.Provider
      value={{
        // Customers
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,

        // Businesses
        businesses,
        addBusiness,
        updateBusiness,
        deleteBusiness,
        verifyBusiness,

        // Advertisers
        advertisers,
        addAdvertiser,
        updateAdvertiser,
        deleteAdvertiser,
        verifyAdvertiser,

        // Bookings
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
        updateBookingStatus,

        // Services
        services,
        addService,
        updateService,
        deleteService,

        // Coupons
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,

        // Reviews
        reviews,
        addReview,
        updateReview,
        deleteReview,
        updateReviewStatus,
        flagReview,

        // Ads
        ads,
        addAd,
        updateAd,
        deleteAd,
        approveAd,
        rejectAd,

        // Stats
        dashboardStats,
        couponStats,
        adStats,

        // Notifications
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

// Hook for using the context
export const useAdminData = () => useContext(AdminDataContext)
