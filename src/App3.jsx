import { Suspense, lazy, useState  } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  AdjustmentsHorizontalIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import logo from "./assets/logo_3DMPviewer.svg";
import logoW from "./assets/logo_3DMPviewer_white.svg";
import controllermouse from "./assets/controllers_mouse.svg";
import controllerhand from "./assets/controllers_hand.svg";
import logoMP from "/MP_gris.svg";

const userNavigation = [
  { name: 'MP Lifts', href: 'http://www.mplifts.com' },
  { name: 'MP SERVICENTER', href: 'https://www.mp-servicenter.com/portal/' },
]

// Lazy load del componente Viewer (más pesado con Three.js)
const Viewer = lazy(() => import("./components/Viewer"));

// Fallback mientras se carga el Viewer
function ViewerLoader() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        fontSize: "16px",
        color: "#666",
        fontFamily: "system-ui",
      }}
    >
      Cargando visor 3D...
    </div>
  );
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function App3() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-white/70 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-1 flex w-full flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >


              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white/80 px-2 pb-4 ring-1 ring-white/80">
                <div className="relative flex h-16 shrink-0 items-center justify-between">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-14 w-auto"
                  />
                  <TransitionChild>
                    <div className="flex w-16 justify-center duration-300 ease-in-out data-closed:opacity-0">
                      <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon aria-hidden="true" className="size-6 text-red-600" />
                      </button>
                    </div>
                  </TransitionChild>
                </div>
                <nav className="relative flex flex-1 flex-col">
                    <div className={`px-2 pb-7.5 min-h-0 overflow-y-auto md:overflow-y-visible`}>
                      <p className="mb-2 text-[#BA0C2F] font-light text-xl">
                        Rutado mangueras maGO-Variador
                      </p>
                      <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                        <h3 className="text-red100 font-semibold mb-0.5">
                          Posición bancada: <span className="text-grey100">Derecha</span>
                        </h3>
                      </section>

                      <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                        <h3 className="text-red100 text-[16px] font-semibold mb-2.5">
                          Especificaciones
                        </h3>
                        <table className="w-full border-collapse text-[14px] text-grey100">
                          <tbody>
                            <tr className="border-b border-[#ddd]">
                              <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-amber-500 text-white">XMAQ_1</span></td>
                              <td className="py-1">Tensión máquina</td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                              <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-blue-600 text-white">XCMAQ</span></td>
                              <td className="py-1">Control de máquina</td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                              <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-emerald-500 text-white">XFR/XFR1</span></td>
                              <td className="py-1">Tensión freno</td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                              <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-fuchsia-500 text-white">XDB15</span></td>
                              <td className="py-1">Encoder</td>
                            </tr>
                            <tr className="border-b border-[#ddd]">
                              <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-red-600 text-white">XBR</span></td>
                              <td className="py-1">Resistencia de freno</td>
                            </tr>
                          </tbody>
                        </table>
                      </section>

                      <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                        <h3 className="text-red100 text-[16px] font-semibold mb-0.5">
                          Controles 3D
                        </h3>
                        <div className="flex justify-center p-2.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                            <img src={controllerhand} alt="controller hand" className="h-12" />
                        </div>
                      </section>

                      <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                        <h3 className="text-red100 text-[16px] font-semibold mb-0.5">
                          DOCUMENTACIÓN
                        </h3>
                        <div className="bg-white p-3.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                          <table className="w-full border-collapse text-[14px] text-grey100">
                            <tbody>
                              <tr className="border-b border-grey20">
                                <td className="py-0.5 font-semibold">Ficha técnica:</td>
                                <td className="py-0.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                  </svg>
                                </td>
                              </tr>
                              <tr className="border-b border-grey20">
                                <td className="py-0.5 font-semibold">Catálogo:</td>
                                <td className="py-0.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                  </svg>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </section>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white"
                      >
                        <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                        Settings
                      </a>
                    </div>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden bg-white ring-1 ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-84 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-2 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-12 w-auto"
              />
            </div>
            <nav className="relative flex flex-1 flex-col">
                <div className={`px-2 pb-7.5 min-h-0 overflow-y-auto md:overflow-y-visible`}>
                  <p className="mb-4 text-red100 font-light text-xl">
                    Rutado mangueras<br />maGO-Variador
                  </p>

                  <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                    <h3 className="text-red100 font-semibold mb-0.5">
                      Posición bancada: <span className="text-grey100">Derecha</span>
                    </h3>
                  </section>

                  <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                    <h3 className="text-red100 text-[16px] font-semibold mb-2.5">
                      Especificaciones
                    </h3>
                    <table className="w-full border-collapse text-[14px] text-grey100">
                      <tbody>
                        <tr className="border-b border-[#ddd]">
                          <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-amber-500 text-white">XMAQ_1</span></td>
                          <td className="py-1">Tensión máquina</td>
                        </tr>
                        <tr className="border-b border-[#ddd]">
                          <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-blue-600 text-white">XCMAQ</span></td>
                          <td className="py-1">Control de máquina</td>
                        </tr>
                        <tr className="border-b border-[#ddd]">
                          <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-emerald-500 text-white">XFR/XFR1</span></td>
                          <td className="py-1">Tensión freno</td>
                        </tr>
                        <tr className="border-b border-[#ddd]">
                          <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-fuchsia-500 text-white">XDB15</span></td>
                          <td className="py-1">Encoder</td>
                        </tr>
                        <tr className="border-b border-[#ddd]">
                          <td className="py-1 font-semibold"><span className="px-2 rounded-lg bg-red-600 text-white">XBR</span></td>
                          <td className="py-1">Resistencia de freno</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                    <h3 className="text-red100 text-[16px] font-semibold mb-0.5">
                      Controles 3D
                    </h3>
                    <div className="flex justify-center p-2.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                        <img src={controllermouse} alt="controller mouse" className="h-12" />
                    </div>
                  </section>

                  <section className="mb-1.5 bg-gray-100 p-2.75 rounded-[5px]">
                    <h3 className="text-red100 text-[16px] font-semibold mb-0.5">
                      DOCUMENTACIÓN
                    </h3>
                    <div className="bg-white p-3.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                        <table className="w-full border-collapse text-[14px] text-grey100">
                          <tbody>
                            <tr className="border-b border-grey20">
                              <td className="py-0.5 font-semibold">Ficha técnica:</td>
                              <td className="py-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                              </td>
                            </tr>
                            <tr className="border-b border-grey20">
                              <td className="py-0.5 font-semibold">Catálogo:</td>
                              <td className="py-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                  </section>
                </div>
                <div className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                    Settings
                  </a>
                </div>
            </nav>
          </div>
        </div>
        {/* Static main content */}
        <div className="lg:pl-84">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <AdjustmentsHorizontalIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

              <div className="flex w-full items-center justify-end gap-x-4 lg:gap-x-6">

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="relative flex items-center">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={logoMP}
                      className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                        Enlaces
                      </span>
                      <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          <main className="">
            <div className="px-1 lg:px-0 flex flex-col h-screen">
              {/* <Header /> */}
              <Suspense fallback={<ViewerLoader />}>
                <Viewer />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
