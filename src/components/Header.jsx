'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown, Moon, Sun, Search, Bell, User } from 'lucide-react';
export default function Header() {
  const [text, setText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: 'Welcome to our platform!',
      isNew: true,
    },
    {
      id: 2,
      text: 'Check out our new features',
      isNew: true,
    },
    {
      id: 3,
      text: 'Your profile is 80% complete',
      isNew: false,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);
  const fullText = 'Welcome to Next.js PWA';
  const navItems = [
    {
      label: 'Features',
      href: '#features',
    },
    {
      label: 'Pricing',
      href: '#pricing',
    },
    {
      label: 'Documentation',
      href: '#docs',
    },
    {
      label: 'Resources',
      children: [
        {
          label: 'Blog',
          href: '/blog',
        },
        {
          label: 'Community',
          href: '/community',
        },
        {
          label: 'Support',
          href: '/support',
        },
      ],
    },
  ];
  const profileMenuItems = [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Billing',
      href: '/billing',
    },
    {
      label: 'Help',
      href: '/help',
    },
    {
      label: 'Sign Out',
      href: '/signout',
    },
  ];
  return (
    <header
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 md:px-8"
      data-oid="54-79.p"
    >
      {/* Add floating navigation */}
      <motion.nav
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-900/80"
        data-oid="30aqn.v"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-oid="4ms6e:x">
          <div className="flex h-16 items-center justify-between" data-oid="1__hoi:">
            <div className="flex items-center" data-oid="7opqwii">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent"
                data-oid="2496kso"
              >
                Logo
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-8 md:flex" data-oid="fn04wyz">
              {navItems.map((item, index) =>
                item.children ? (
                  <div key={index} className="group relative" data-oid="tgqf0a9">
                    <button
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                      data-oid="oto3zy6"
                    >
                      <span data-oid="51t0:zf">{item.label}</span>
                      <ChevronDown className="h-4 w-4" data-oid="6v77wl7" />
                    </button>
                    <div
                      className="invisible absolute left-0 top-full mt-2 w-48 rounded-lg bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:bg-gray-800"
                      data-oid="c-wprix"
                    >
                      {item.children.map((child, childIndex) => (
                        <a
                          key={childIndex}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          data-oid="ac2g1j8"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    data-oid="k8m0wul"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>

            <div className="flex items-center space-x-4" data-oid="9t:zq0i">
              {/* Search Bar */}
              <div className="relative" data-oid="k2a:dr1">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  data-oid="169y4sa"
                >
                  <Search className="h-5 w-5" data-oid="o7f9982" />
                </motion.button>
                <AnimatePresence data-oid="smcp41j">
                  {isSearchOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      className="absolute right-0 mt-2 w-72 rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800"
                      data-oid="pnnjzvy"
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        autoFocus
                        data-oid="7t3ai77"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <div className="relative" data-oid=".won020">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  data-oid="dia0s39"
                >
                  <Bell className="h-5 w-5" data-oid="bjcq0ca" />
                  {notifications.some((n) => n.isNew) && (
                    <span
                      className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
                      data-oid="e32udhf"
                    />
                  )}
                </motion.button>
                <AnimatePresence data-oid="hz-np8k">
                  {showNotifications && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                      }}
                      className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-xl dark:bg-gray-800"
                      data-oid="xbj6-e9"
                    >
                      <div
                        className="border-b border-gray-200 p-4 dark:border-gray-700"
                        data-oid="9j--1rj"
                      >
                        <h3 className="text-lg font-semibold" data-oid="bgz3bc:">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto" data-oid="1-iibuu">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="border-b border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                            data-oid="211kg:a"
                          >
                            <p
                              className="text-sm text-gray-600 dark:text-gray-300"
                              data-oid="y:-ifg-"
                            >
                              {notification.text}
                            </p>
                            {notification.isNew && (
                              <span
                                className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                data-oid="8m-1oqv"
                              >
                                New
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Menu */}
              <div className="relative" data-oid="fpmx3ie">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  data-oid=":hejqyy"
                >
                  <User className="h-5 w-5" data-oid="_:t0qtz" />
                </motion.button>
                <AnimatePresence data-oid="1q9llee">
                  {isProfileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                      }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-xl dark:bg-gray-800"
                      data-oid="7ru5730"
                    >
                      {profileMenuItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          data-oid="qp7bby3"
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                onClick={() => setIsDark(!isDark)}
                className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                data-oid="b.l39tf"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" data-oid="ix9ucrp" />
                ) : (
                  <Moon className="h-5 w-5" data-oid="63q-8mn" />
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300 md:hidden"
                data-oid="sctitss"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" data-oid="w2x_u7m" />
                ) : (
                  <Menu className="h-6 w-6" data-oid="i0w9m.v" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence data-oid="8g81ula">
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: '100%',
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: '100%',
            }}
            transition={{
              type: 'spring',
              damping: 25,
            }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white shadow-2xl dark:bg-gray-900 md:hidden"
            data-oid="t0j1:gq"
          >
            <div className="p-6" data-oid="-kdj3_j">
              <div className="mb-8 flex items-center justify-between" data-oid="s73t5:n">
                <span
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent"
                  data-oid="9zvq:lj"
                >
                  Menu
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  data-oid="s2.xgab"
                >
                  <X className="h-6 w-6" data-oid="jc8s6:t" />
                </button>
              </div>
              <nav className="space-y-6" data-oid="sx4o0kc">
                {navItems.map((item, index) => (
                  <div key={index} data-oid="3.t6i3h">
                    {item.children ? (
                      <div className="space-y-4" data-oid="e41:ln9">
                        <span
                          className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                          data-oid="h90dirp"
                        >
                          {item.label}
                        </span>
                        <div className="ml-4 space-y-2" data-oid=":jww.vu">
                          {item.children.map((child, childIndex) => (
                            <a
                              key={childIndex}
                              href={child.href}
                              className="block text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                              onClick={() => setIsMenuOpen(false)}
                              data-oid="gmfzk78"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="block text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                        onClick={() => setIsMenuOpen(false)}
                        data-oid="wtfj9b6"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Background Elements */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30"
        data-oid="_2v0czi"
      />
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        data-oid="-e-l5zp"
      />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden" data-oid="2:aerh3">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -left-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl dark:from-blue-500/10 dark:to-purple-500/10"
          data-oid="bd.6jtb"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl dark:from-purple-500/10 dark:to-pink-500/10"
          data-oid=":_b8ljm"
        />
      </div>

      <div className="relative mx-auto max-w-5xl" data-oid="qdnn1p5">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="space-y-10 text-center"
          data-oid="_qcgm1t"
        >
          <motion.div
            initial={{
              scale: 0.95,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative"
            data-oid="2tev9wc"
          >
            <div
              className="absolute -inset-x-20 -inset-y-10 rounded-[100px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-[0.15] blur-2xl transition duration-1000 group-hover:opacity-100"
              data-oid="ws-j09y"
            />
            <h1
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text py-2 text-6xl font-bold text-transparent drop-shadow-sm md:text-8xl"
              data-oid="gpyl1ay"
            >
              {text}
              <span className="animate-blink ml-1" data-oid="uuv0ck4">
                |
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="mx-auto max-w-3xl text-2xl font-light leading-relaxed text-gray-600 dark:text-gray-300 md:text-3xl"
            data-oid="rysij.u"
          >
            A modern web application built with Next.js and React, designed for optimal performance
            and user experience
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="mt-16 flex flex-col justify-center gap-8 sm:flex-row"
            data-oid="x3cmhhl"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 text-xl font-medium text-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              data-oid="cwp4e58"
            >
              <div
                className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                data-oid="9bfme88"
              />
              <div
                className="absolute inset-0 origin-left scale-x-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-500 group-hover:scale-x-100"
                data-oid="tqh1eal"
              />
              <span className="relative flex items-center justify-center gap-3" data-oid="k6bvqx.">
                Get Started
                <ArrowRight
                  className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
                  data-oid="qco8lky"
                />
              </span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white px-10 py-5 text-xl font-medium shadow-lg transition-all duration-200 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800"
              data-oid="7bwm8ar"
            >
              <div
                className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:group-hover:opacity-20"
                data-oid="fai.4dn"
              />
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600"
                data-oid=":zziwgi"
              >
                Learn More
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
