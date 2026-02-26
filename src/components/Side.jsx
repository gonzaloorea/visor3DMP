import { useState } from "react";

export default function Side() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="md:flex-none md:w-87.5 w-full bg-[#f5f5f5] md:overflow-y-auto border-r border-[#ddd] md:border-b-0 border-b flex flex-col max-h-[50vh] md:max-h-none md:flex md:flex-col">
      {/* Header: botón desplegable en móvil, título estático en desktop */}
      <button
        className="flex-none w-full flex items-center justify-between px-7.5 py-4 md:cursor-default md:pointer-events-none"
        onClick={() => setOpen((v) => !v)}
      >
        <p className="mt-0 text-[#BA0C2F] font-light text-lg">
          ESPECIFICACIONES TÉCNICAS
        </p>
        <span className="md:hidden text-[#BA0C2F] text-xl">{open ? "▲" : "▼"}</span>
      </button>

      {/* Contenido: oculto/visible en móvil según estado; siempre visible en desktop */}
      <div className={`px-7.5 pb-7.5 min-h-0 overflow-y-auto md:overflow-y-visible md:block ${open ? "block" : "hidden"}`}>
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
  );
}
