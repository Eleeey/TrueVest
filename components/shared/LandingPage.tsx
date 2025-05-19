"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  Globe,
  Lock,
  Menu,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

// Custom hook for intersection observer
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return [ref, isInView]
}

// Animated counter component
const AnimatedCounter = ({ value, duration = 2000, decimals = 0, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView({ threshold: 0.3 })

  useEffect(() => {
    let start = 0
    const end = Number.parseInt(value.toString().replace(/[^\d.]/g, ""))

    if (!isInView) return

    // If no duration is provided, or the value is 0, set the count to the end value immediately
    if (duration === 0 || end === 0) {
      setCount(end)
      return
    }

    // Calculate the increment per frame
    const incrementTime = Math.abs(Math.floor(duration / end))

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => {
      clearInterval(timer)
    }
  }, [value, duration, isInView])

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {count.toLocaleString(undefined, { maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`border-b border-gray-800 fixed w-full z-10 transition-all duration-300 ${
          scrolled ? "bg-gray-900/95 backdrop-blur-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <TrendingUp className="h-8 w-8 text-blue-500 transition-transform duration-500 group-hover:scale-0" />
                  <TrendingUp className="h-8 w-8 text-blue-500 absolute top-0 left-0 transition-transform duration-500 scale-0 group-hover:scale-100 group-hover:rotate-[360deg]" />
                </div>
                <span className="ml-2 text-xl font-bold">SecureInvest</span>
              </Link>
              <div className="hidden md:flex md:ml-10 space-x-8">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors relative group">
                  How It Works
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="#performance" className="text-gray-300 hover:text-white transition-colors relative group">
                  Performance
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors relative group">
                  Testimonials
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="#faq" className="text-gray-300 hover:text-white transition-colors relative group">
                  FAQ
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <Button
                variant="outline"
                className="mr-4 bg-transparent border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:border-blue-500"
              >
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </div>
            <div className="flex md:hidden items-center">
              <button
                type="button"
                className="text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 border-b border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#performance"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Performance
              </Link>
              <Link
                href="#testimonials"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-800">
                <Button variant="outline" className="w-full mb-2 bg-transparent border-gray-700 hover:bg-gray-800">
                  Sign In
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 -left-20 w-60 h-60 bg-purple-900/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-900/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Smart Investing for the{" "}
              <span className="text-blue-500 relative">
                Digital Age
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/50"></span>
              </span>
            </h1>
            <motion.p variants={fadeIn} className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              Our advanced trading algorithms and expert financial team deliver consistent returns by identifying the
              best opportunities across global markets.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div variants={fadeInScale}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 group relative overflow-hidden">
                  <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center">
                    Start Investing Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
              <motion.div variants={fadeInScale}>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-700 hover:bg-gray-800 text-lg px-8 py-6 transition-all duration-300 hover:border-blue-500"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-8"
            >
              <motion.div variants={fadeIn} className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-300">Bank-Level Security</span>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-300">50,000+ Investors</span>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-300">Global Markets</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-12 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <motion.div variants={fadeInScale} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">
                <AnimatedCounter value="18.7" decimals={1} suffix="%" />
              </p>
              <p className="mt-2 text-gray-400">Avg. Annual Return</p>
            </motion.div>
            <motion.div variants={fadeInScale} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">
                <AnimatedCounter value="250" prefix="$" suffix="M+" />
              </p>
              <p className="mt-2 text-gray-400">Assets Under Management</p>
            </motion.div>
            <motion.div variants={fadeInScale} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">
                <AnimatedCounter value="50000" suffix="+" />
              </p>
              <p className="mt-2 text-gray-400">Active Investors</p>
            </motion.div>
            <motion.div variants={fadeInScale} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-500">24/7</p>
              <p className="mt-2 text-gray-400">Market Monitoring</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 -right-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose SecureInvest</h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with financial expertise to maximize your investment
              potential.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInScale}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4 transition-all duration-500 hover:bg-blue-900/40">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                  <p className="text-gray-400">
                    Our proprietary algorithms analyze market trends and identify profitable opportunities with
                    precision.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4 transition-all duration-500 hover:bg-blue-900/40">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Risk Management</h3>
                  <p className="text-gray-400">
                    Sophisticated risk assessment tools protect your capital while maximizing potential returns.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4 transition-all duration-500 hover:bg-blue-900/40">
                    <Globe className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Diversification</h3>
                  <p className="text-gray-400">
                    Access a diverse portfolio of assets across international markets for balanced growth.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4 transition-all duration-500 hover:bg-blue-900/40">
                    <Lock className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
                  <p className="text-gray-400">
                    Your investments and personal data are protected by enterprise-grade encryption and security
                    protocols.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4 transition-all duration-500 hover:bg-blue-900/40">
                    <DollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Low Fees</h3>
                  <p className="text-gray-400">
                    Competitive fee structure ensures more of your money goes toward growing your wealth.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4 transition-all duration-500 hover:bg-blue-900/40">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">24/7 Monitoring</h3>
                  <p className="text-gray-400">
                    Our systems continuously monitor markets to capitalize on opportunities at any time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Start growing your wealth in three simple steps
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={slideInLeft} className="relative">
              <div className="bg-gray-800 rounded-lg p-8 h-full border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Create Your Account</h3>
                <p className="text-gray-400">
                  Sign up in minutes with our streamlined onboarding process. Verify your identity and you're ready to
                  go.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative">
              <div className="bg-gray-800 rounded-lg p-8 h-full border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Fund Your Account</h3>
                <p className="text-gray-400">
                  Deposit funds using your preferred payment method. Start with as little as $100 to begin your
                  investment journey.
                </p>
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="relative">
              <div className="bg-gray-800 rounded-lg p-8 h-full border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Watch Your Money Grow</h3>
                <p className="text-gray-400">
                  Our expert system automatically invests your funds in optimal opportunities. Monitor your performance
                  in real-time.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInScale}
            className="text-center mt-12"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 group relative overflow-hidden">
              <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center">
                Start Investing Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Performance</h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Consistent returns through market expertise and technological innovation
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInScale}
            className="bg-gray-800 rounded-lg p-8 border border-gray-700 transition-all duration-500 hover:shadow-lg hover:shadow-blue-900/10"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Historical Performance</h3>
                <p className="text-gray-400 mb-6">
                  Our investment strategies have consistently outperformed market benchmarks, delivering reliable
                  returns even during volatile periods.
                </p>
                <div className="space-y-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">2022 Returns</span>
                      <span className="text-blue-500 font-bold">+16.8%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "68%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-blue-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">2021 Returns</span>
                      <span className="text-blue-500 font-bold">+22.3%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "89%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="bg-blue-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">2020 Returns</span>
                      <span className="text-blue-500 font-bold">+19.5%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="bg-blue-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">5-Year Average</span>
                      <span className="text-blue-500 font-bold">+18.7%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="bg-blue-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  *Past performance is not indicative of future results. Investment involves risk.
                </p>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInScale}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
              >
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-800 relative">
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <BarChart3 className="h-24 w-24 text-blue-500" />
                    </motion.div>
                    <span className="sr-only">Performance Chart</span>
                  </div>

                  {/* Animated chart lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
                    <motion.path
                      d="M0,25 Q10,20 20,30 T40,15 T60,25 T80,10 T100,20"
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.5)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    />
                    <motion.path
                      d="M0,30 Q15,35 30,20 T50,30 T70,15 T100,25"
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold">Portfolio Allocation</h4>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center"
                      >
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Stocks (40%)</span>
                      </motion.div>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center mt-2"
                      >
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Bonds (25%)</span>
                      </motion.div>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center mt-2"
                      >
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Real Estate (15%)</span>
                      </motion.div>
                    </div>
                    <div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center"
                      >
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Commodities (10%)</span>
                      </motion.div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex items-center mt-2"
                      >
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Crypto (5%)</span>
                      </motion.div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex items-center mt-2"
                      >
                        <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                        <span className="text-sm">Cash (5%)</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">What Our Investors Say</h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of satisfied investors who trust us with their financial future
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInScale} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="bg-gray-800 border-gray-700 h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    "I've been investing with SecureInvest for over 3 years now. Their platform is intuitive, and the
                    returns have consistently exceeded my expectations. The automated investment strategy has saved me
                    countless hours."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-xl font-bold">
                      JD
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">James Davidson</h4>
                      <p className="text-sm text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="bg-gray-800 border-gray-700 h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    "As someone who knows little about investing, SecureInvest has been a game-changer. Their platform
                    makes everything simple, and their customer service team is always ready to help. My portfolio has
                    grown 22% in just one year!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center text-xl font-bold">
                      SM
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Sarah Mitchell</h4>
                      <p className="text-sm text-gray-400">Marketing Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInScale} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="bg-gray-800 border-gray-700 h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    "I've tried several investment platforms, and SecureInvest stands out for its transparency and
                    performance. Their risk management approach has protected my investments during market downturns
                    while still delivering solid returns."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center text-xl font-bold">
                      RK
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Robert Kim</h4>
                      <p className="text-sm text-gray-400">Business Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-400">Find answers to common questions about our investment platform</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <h3 className="text-xl font-bold mb-2">How does SecureInvest work?</h3>
              <p className="text-gray-300">
                SecureInvest uses advanced algorithms and expert financial analysis to identify profitable investment
                opportunities across global markets. We automatically allocate your funds based on your risk profile and
                investment goals to maximize returns.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <h3 className="text-xl font-bold mb-2">What is the minimum investment amount?</h3>
              <p className="text-gray-300">
                You can start investing with as little as $100. This allows you to test our platform and see the results
                before committing larger amounts.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <h3 className="text-xl font-bold mb-2">How are my investments secured?</h3>
              <p className="text-gray-300">
                We implement bank-level security protocols, including 256-bit encryption, two-factor authentication, and
                regular security audits. Additionally, all accounts are insured up to $500,000 through our partnership
                with leading financial institutions.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <h3 className="text-xl font-bold mb-2">Can I withdraw my funds at any time?</h3>
              <p className="text-gray-300">
                Yes, you have full access to your funds at any time. Standard withdrawals are processed within 1-3
                business days, with no hidden fees or penalties.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <h3 className="text-xl font-bold mb-2">What fees does SecureInvest charge?</h3>
              <p className="text-gray-300">
                We charge a simple 1% annual management fee based on your account balance. There are no hidden fees,
                transaction costs, or withdrawal penalties.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-60 h-60 bg-blue-900/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-purple-900/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Growing Your Wealth?</h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of investors who are already benefiting from our advanced investment platform. Start with
              as little as $100 today.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center">
                  Access Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-gray-400"
            >
              Have questions?{" "}
              <Link href="#" className="text-blue-400 hover:underline">
                Contact our support team
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Investment Plans
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Retirement Accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax Strategies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    For Businesses
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Market Insights
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Investment Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-lg font-bold">SecureInvest</span>
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">© 2023 SecureInvest. All rights reserved.</div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
