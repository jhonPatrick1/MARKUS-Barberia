"use client";

import { useState } from "react";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    sede: "",
    barbero: "",
    servicio: "",
    fecha: "",
    hora: ""
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  if (!isOpen) return null;

  // Datos
  const sedes = ["Pueblo Libre", "Cercado de Lima"];
  const barberos = ["Marcos", "Sebastián", "Yeampier", "Jesús", "Cualquiera"];
  const servicios = [
    // Básicos
    "Corte Básico - S/ 35.00",
    "Corte Degradado - S/ 35.00",
    "Ritual Barba - S/ 30.00",
    "Facial Express - S/ 20.00",
    "Facial Premium - S/ 90.00",
    // Combos
    "Corte + Barba - S/ 60.00",
    "Corte + Barba + Facial - S/ 80.00",
    // Color
    "Camuflaje de Canas - S/ 30.00",
    "Mechas - S/ 200.00",
    "Platinado - S/ 250.00",
    // Otros
    "Ondulación - S/ 185.00",
    "Alisado - S/ 185.00",
    "Cejas / Diseños - S/ 10.00",
    "Hidratación Capilar - S/ 15.00"
  ];
  const horarios = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

  // Calendario Lógica
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const prefixDays = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...prefixDays, ...days];
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const sendToWhatsApp = () => {
    const text = `Hola Markus, quiero reservar:%0A📍 Sede: ${selection.sede}%0A✂️ Barbero: ${selection.barbero}%0A💈 Servicio: ${selection.servicio}%0A📅 Fecha: ${selection.fecha} a las ${selection.hora}`;
    window.open(`https://wa.me/51917876813?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Fondo oscuro detrás del modal */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>

      {/* CONTENEDOR PRINCIPAL: Aquí está el truco del estilo Markus Original */}
      <div className="relative flex w-full max-w-5xl h-[600px] rounded-xl shadow-2xl overflow-hidden bg-white">
        
        {/* === LADO IZQUIERDO: BARRA NEGRA (Premium) === */}
        <div className="w-1/3 md:w-1/4 bg-neutral-900 text-white p-8 hidden md:block">
          <div className="mb-10">
            <h3 className="font-heading text-2xl font-bold tracking-tighter">MARKUS</h3>
          </div>
          
          <ul className="space-y-8">
            {["Ubicación", "Personal", "Servicios", "Fecha y Hora"].map((label, idx) => (
              <li key={idx} className={`flex items-center gap-4 text-sm font-medium transition-all ${step === idx + 1 ? 'text-white' : 'text-neutral-500'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${step === idx + 1 ? 'bg-white text-black border-white' : 'border-neutral-700 bg-transparent text-neutral-500'}`}>
                  {idx + 1}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
          
          {/* Decoración abajo */}
          <div className="absolute bottom-8 left-8 text-neutral-600 text-xs">
            © 2026 Markus Barber
          </div>
        </div>

        {/* === LADO DERECHO: FONDO BLANCO (Frescura y Claridad) === */}
        <div className="flex-1 bg-white text-black p-8 md:p-10 flex flex-col overflow-y-auto relative">
          
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors font-bold text-xl">✕</button>

          <div className="flex-1 max-w-2xl mx-auto w-full pt-4">
            
            {/* PASO 1: SEDE (Estilo Tarjeta Limpia) */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-2 text-black">Selecciona una sede</h2>
                <p className="text-gray-500 mb-8">Elige dónde quieres vivir la experiencia.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sedes.map((sede) => (
                    <button key={sede} onClick={() => setSelection({ ...selection, sede })} 
                      className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg group
                      ${selection.sede === sede 
                        ? 'border-black bg-neutral-50 shadow-md' 
                        : 'border-gray-100 bg-white hover:border-gray-300'
                      }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${selection.sede === sede ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>📍</div>
                      <span className="block font-bold text-lg">{sede}</span>
                      <span className="text-sm text-gray-400">Lima, Perú</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 2: BARBERO (Estilo Círculos/Perfiles) */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-2 text-black">Elige a tu barbero</h2>
                <p className="text-gray-500 mb-8">Profesionales expertos a tu disposición.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {barberos.map((barbero) => (
                    <button key={barbero} onClick={() => setSelection({ ...selection, barbero })} 
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-md
                      ${selection.barbero === barbero ? 'border-black bg-neutral-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${selection.barbero === barbero ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {barbero.charAt(0)}
                      </div>
                      <span className="font-bold text-sm">{barbero}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 3: SERVICIOS (Lista Limpia) */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-2 text-black">Servicios</h2>
                <p className="text-gray-500 mb-8">Calidad y estilo garantizado.</p>
                
                <div className="space-y-3">
                  {servicios.map((servicio) => (
                    <button key={servicio} onClick={() => setSelection({ ...selection, servicio })} 
                      className={`w-full p-5 rounded-xl border-2 text-left flex justify-between items-center transition-all hover:shadow-md
                      ${selection.servicio === servicio ? 'border-black bg-neutral-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                      <span className="font-bold">{servicio.split('-')[0]}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${selection.servicio === servicio ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {servicio.split('-')[1] || 'S/ --'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 4: CALENDARIO (Estilo Calendly Limpio) */}
            {step === 4 && (
              <div className="animate-fade-in h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-6 text-black">Fecha y Hora</h2>
                
                <div className="flex flex-col md:flex-row gap-8 h-full">
                  {/* Calendario Limpio */}
                  <div className="flex-1">
                    <div className="text-center mb-4 font-bold text-lg uppercase tracking-wider border-b pb-2">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </div>
                    <div className="grid grid-cols-7 text-center mb-2 text-xs text-gray-400 font-bold">
                      <div>D</div><div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((day, i) => {
                        if (!day) return <div key={i}></div>;
                        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isSelected = selection.fecha === dateStr;
                        return (
                          <button key={i} onClick={() => setSelection({ ...selection, fecha: dateStr })}
                            className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all
                              ${isSelected ? 'bg-black text-white shadow-lg transform scale-110' : 'text-gray-600 hover:bg-gray-100'}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horarios Limpios */}
                  <div className="flex-1 border-l pl-0 md:pl-8 overflow-y-auto">
                     <div className="text-sm font-bold text-gray-400 mb-4 uppercase">Horarios</div>
                     <div className="grid grid-cols-2 gap-3">
                        {horarios.map((hora) => (
                           <button key={hora} onClick={() => setSelection({ ...selection, hora })}
                              className={`py-2 px-4 rounded-lg text-sm border font-medium transition-all
                              ${selection.hora === hora ? 'border-black bg-black text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                           >
                              {hora}
                           </button>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Botones */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={handleBack} className="text-gray-500 hover:text-black font-medium text-sm px-4">Atrás</button>
            ) : <div></div>}

            {step < 4 ? (
              <button 
                onClick={handleNext}
                disabled={(step === 1 && !selection.sede) || (step === 2 && !selection.barbero) || (step === 3 && !selection.servicio)}
                className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
              >
                Siguiente
              </button>
            ) : (
              <button 
                onClick={sendToWhatsApp}
                disabled={!selection.fecha || !selection.hora}
                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-green-500 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                Confirmar Reserva <span>📱</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}