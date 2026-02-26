import { Suspense, lazy, useState  } from "react";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import logo from "./assets/logo_3DMPviewer.svg";
import Header from "./components/Header";

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


export default function App2() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
return (
    <>
      <div>
        {/* Dynamic sidebar for mobile */}
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative flex h-full w-full flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >


              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="relative flex flex-col gap-y-5 bg-white px-2 pb-2 w-full h-full min-h-0">
                <div className="relative flex h-16 shrink-0 items-center justify-between ">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-8 w-auto"
                  />
                  <TransitionChild>
                    <div className="flex w-16 justify-center items-center duration-300 ease-in-out data-closed:opacity-0">
                      <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon aria-hidden="true" className="size-6 text-red" />
                      </button>
                    </div>
                  </TransitionChild>
                </div>
                <aside className="md:flex-none w-full bg-[#abf588] overflow-y-auto border-r border-[#ddd] md:border-b-0 border-b flex flex-col max-h-[50vh] md:flex md:flex-col">
                  {/* Contenido: oculto/visible en móvil según estado; siempre visible en desktop */}
                  <div className="flex-1 min-h-0 px-7.5 pb-7.5 overflow-y-auto">
                    <p className="mt-0 text-[#BA0C2F] font-light text-lg">
                      ESPECIFICACIONES TÉCNICAS
                    </p>
                    
                    <h2 className="mt-0 text-[#5B6770] text-[18px]">
                      Rutado mangueras<br /> maGO-Variador
                    </h2>

                    <section className="mb-7.5">
                      <h3 className="text-[#BA0C2F] font-semibold mb-2.5">
                        Características
                      </h3>
                      <ul className="leading-[1.8] text-[#5B6770] text-[14px]">
                        <li>Diseño profesional y moderno</li>
                        <li>Tecnología de última generación</li>
                      </ul>
                    </section>

                    <section className="mb-7.5">
                      <h3 className="text-[#BA0C2F] text-[16px] mb-2.5">
                        Especificaciones
                      </h3>
                      <table className="w-full border-collapse text-[14px] text-[#555]">
                        <tbody>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">XMAQ_1</td>
                            <td className="py-0.5">Tensión máquina</td>
                          </tr>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">XCMAQ</td>
                            <td className="py-0.5">Control de máquina</td>
                          </tr>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">XFR/XFR1</td>
                            <td className="py-0.5">Tensión freno</td>
                          </tr>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">XDB15</td>
                            <td className="py-0.5">Encoder</td>
                          </tr>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">XBR</td>
                            <td className="py-0.5">Resistencia de freno</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>

                    <section className="mb-7.5">
                      <h3 className="text-[#BA0C2F] text-[16px] mb-2.5">
                        Controles 3D
                      </h3>
                      <div className="bg-white p-3.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                        <p><strong>Orbitar:</strong> Click + Arrastrar</p>
                        <p><strong>Zoom:</strong> Rueda del ratón</p>
                        <p><strong>Panear:</strong> Click derecho + Arrastrar</p>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[#BA0C2F] text-[16px] mb-2.5">
                        DOCUMENTACIÓN
                      </h3>
                      <div className="bg-white p-3.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                        <table className="w-full border-collapse text-[14px] text-[#555]">
                        <tbody>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">Ficha técnica:</td>
                            <td className="py-0.5">download</td>
                          </tr>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">Catálogo:</td>
                            <td className="py-0.5">download</td>
                          </tr>
                          <tr className="border-b border-[#ddd]">
                            <td className="py-0.5 font-semibold">Planos:</td>
                            <td className="py-0.5">download</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </section>
                  </div>
                </aside>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-sm lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-2">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-8 w-auto"
              />
            </div>
            <aside className="md:flex-none w-full bg-[#abf588] md:overflow-y-auto border-r border-[#ddd] md:border-b-0 border-b flex flex-col max-h-[50vh] md:max-h-none md:flex md:flex-col">
 
              {/* Contenido: oculto/visible en móvil según estado; siempre visible en desktop */}
              <div className={`px-2 pb-7.5 min-h-0 overflow-y-auto md:overflow-y-visible`}>
                <p className="mt-0 text-[#BA0C2F] font-light text-lg">
                  ESPECIFICACIONES TÉCNICAS
                </p>
                <h2 className="mt-0 text-[#5B6770] text-[18px]">
                  Rutado mangueras<br /> maGO-Variador
                </h2>

                <section className="mb-7.5">
                  <h3 className="text-[#BA0C2F] font-semibold mb-2.5">
                    Características
                  </h3>
                  <ul className="leading-[1.8] text-[#5B6770] text-[14px]">
                    <li>Diseño profesional y moderno</li>
                    <li>Tecnología de última generación</li>
                  </ul>
                </section>

                <section className="mb-7.5">
                  <h3 className="text-[#BA0C2F] text-[16px] mb-2.5">
                    Especificaciones
                  </h3>
                  <table className="w-full border-collapse text-[14px] text-[#555]">
                    <tbody>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">XMAQ_1</td>
                        <td className="py-0.5">Tensión máquina</td>
                      </tr>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">XCMAQ</td>
                        <td className="py-0.5">Control de máquina</td>
                      </tr>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">XFR/XFR1</td>
                        <td className="py-0.5">Tensión freno</td>
                      </tr>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">XDB15</td>
                        <td className="py-0.5">Encoder</td>
                      </tr>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">XBR</td>
                        <td className="py-0.5">Resistencia de freno</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <section className="mb-7.5">
                  <h3 className="text-[#BA0C2F] text-[16px] mb-2.5">
                    Controles 3D
                  </h3>
                  <div className="bg-white p-3.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                    <p><strong>Orbitar:</strong> Click + Arrastrar</p>
                    <p><strong>Zoom:</strong> Rueda del ratón</p>
                    <p><strong>Panear:</strong> Click derecho + Arrastrar</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-[#BA0C2F] text-[16px] mb-2.5">
                    DOCUMENTACIÓN
                  </h3>
                  <div className="bg-white p-3.75 rounded-[5px] text-[13px] text-[#666] leading-[1.6]">
                    <table className="w-full border-collapse text-[14px] text-[#555]">
                    <tbody>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">Ficha técnica:</td>
                        <td className="py-0.5">download</td>
                      </tr>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">Catálogo:</td>
                        <td className="py-0.5">download</td>
                      </tr>
                      <tr className="border-b border-[#ddd]">
                        <td className="py-0.5 font-semibold">Planos:</td>
                        <td className="py-0.5">download</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-2 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">Data</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
              className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
            />
          </a>
        </div>

        <main className="lg:pl-72">
          <div className="px-0 sm:px-4 lg:px-1 flex flex-col h-screen">
            <Header />
            <Suspense fallback={<ViewerLoader />}>
              <Viewer />
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
