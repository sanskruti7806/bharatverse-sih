"use client";

import { useGameStore } from "@/store/gameState";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Play, Link2, Sparkles } from "lucide-react";

const createCustomIcon = (iconStr: string, name: string, isPlaced: boolean) => {
  return L.divIcon({
    className: 'custom-leaflet-icon bg-transparent border-0',
    html: `
      <div class="flex flex-col items-center justify-end group transition-transform duration-300 ${isPlaced ? 'scale-100' : 'scale-90 hover:scale-110'} cursor-pointer">
        <div class="w-16 h-16 ${isPlaced ? 'bg-gradient-to-tr from-gold-700 via-gold-500 to-yellow-200 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b-[6px] border-r-[6px] border-gold-900 border-l border-t border-white/50' : 'bg-black/50 border-2 border-dashed border-gold-500/60 shadow-inner backdrop-blur-sm'} rounded-xl flex items-center justify-center text-3xl relative">
          ${isPlaced ? iconStr : '<span class="text-gold-500 text-2xl font-light">+</span>'}
        </div>
        ${isPlaced ? `<div class="bg-earth-900/95 text-gold-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded mt-2 border border-gold-500/50 shadow-xl whitespace-nowrap transition-colors">${name}</div>` : `<div class="bg-black/80 text-parchment-300 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${name}</div>`}
      </div>
    `,
    iconSize: [80, 100],
    iconAnchor: [40, 100], 
  });
};

export default function LivingBoard() {
  const { placedNodes, inventory, placeNode, markPlaced, connections, addConnection, updateDNA } = useGameStore();
  const [selectedSlot, setSelectedSlot] = useState<{lat: number, lng: number} | null>(null);
  const [selectedPlacedNode, setSelectedPlacedNode] = useState<any>(null);
  const [connectingNode, setConnectingNode] = useState<any>(null);
  const [sangamSuccess, setSangamSuccess] = useState<any>(null);

  // Exact Real-World Lat/Lng Coordinates
  const slots = [
    { id: 'magadha', name: 'Magadha Region', lat: 25.1333, lng: 85.4419, accepts: 'monument' }, // Nalanda
    { id: 'trade', name: 'Northern Route', lat: 23.4833, lng: 77.7333, accepts: 'trade' }       // Sanchi
  ];

  const handlePlace = (slotId: string, item: any) => {
    const slot = slots.find(s => s.id === slotId);
    if (slot && item.category === slot.accepts) {
      placeNode({ id: item.id, name: item.name, type: item.category as any, lat: slot.lat, lng: slot.lng, description: "" });
      markPlaced(item.id);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      {/* Real Zoomable GIS Map via Leaflet */}
      <MapContainer 
        center={[22.5, 79.0]} // Center of India
        zoom={5} 
        minZoom={4}
        maxZoom={12}
        className="w-full h-full bg-[#111111]" // Dark canvas
        zoomControl={false}
      >
        {/* Standard OpenStreetMap - 100% Free, NO API KEY REQUIRED. Styled into dark mode via CSS */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          className="map-tiles-dark-theme"
        />

        <style jsx global>{`
          .map-tiles-dark-theme {
            filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
          }
        `}</style>

        {slots.map(slot => {
          const isOccupied = placedNodes.find(n => n.lat === slot.lat && n.lng === slot.lng);
          if (isOccupied) return null;
          return (
            <Marker 
              key={slot.id} 
              position={[slot.lat, slot.lng]} 
              icon={createCustomIcon('', slot.name, false)}
              eventHandlers={{
                click: () => setSelectedSlot({lat: slot.lat, lng: slot.lng}),
              }}
            />
          );
        })}

        {/* Render Connections (Sangam) */}
        {connections.map(conn => {
          const fromNode = placedNodes.find(n => n.id === conn.from);
          const toNode = placedNodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          return (
            <Polyline 
              key={conn.id} 
              positions={[[fromNode.lat, fromNode.lng], [toNode.lat, toNode.lng]]} 
              pathOptions={{ color: '#D4AF37', weight: 4, dashArray: '8, 8', className: 'animate-[pulse_2s_infinite]' }}
            />
          );
        })}

        {placedNodes.map((node) => (
          <Marker 
            key={node.id} 
            position={[node.lat, node.lng]} 
            icon={createCustomIcon(node.type === 'monument' ? '🏛️' : '🗺️', node.name, true)}
            eventHandlers={{
              click: () => {
                if (connectingNode) {
                  if (connectingNode.id !== node.id) {
                    // Create Sangam Connection
                    addConnection({
                      id: `conn_${Date.now()}`,
                      from: connectingNode.id,
                      to: node.id,
                      name: `Sangam: ${connectingNode.name} & ${node.name}`
                    });
                    updateDNA('history', 30);
                    updateDNA('strategy', 20);
                    setSangamSuccess({ from: connectingNode, to: node });
                    setConnectingNode(null);
                  }
                } else {
                  setSelectedPlacedNode(node);
                }
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Connecting Mode Banner */}
      {connectingNode && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[400] bg-earth-900/90 backdrop-blur-md border-2 border-gold-500 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-4 animate-bounce">
          <Link2 className="text-gold-500 w-6 h-6 animate-pulse" />
          <div>
            <div className="text-gold-100 font-bold uppercase tracking-widest text-xs mb-1">Forming Sangam</div>
            <div className="text-parchment-200 text-sm">Select another node to connect with <strong>{connectingNode.name}</strong></div>
          </div>
          <button 
            onClick={() => setConnectingNode(null)}
            className="ml-4 px-4 py-2 bg-earth-800 hover:bg-earth-700 border border-gold-500/30 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Starting Quest Call-to-Action (Overlay) */}
      {!placedNodes.find(n => n.id === 'nalanda_token') && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2 z-[400] flex flex-col items-center pointer-events-none">
          <Link href="/quest/nalanda">
            <div className="w-20 h-20 bg-blue-500/40 border-2 border-blue-400 rounded-full flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] cursor-pointer hover:bg-blue-500/60 shadow-[0_0_40px_rgba(59,130,246,0.7)] backdrop-blur-md pointer-events-auto transition-transform hover:scale-105">
              <Play className="text-white w-10 h-10 ml-1" fill="currentColor" />
            </div>
          </Link>
          <div className="bg-blue-950/95 backdrop-blur-md text-blue-100 text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mt-4 border border-blue-500/50 shadow-2xl pointer-events-auto">
            Start Quest: Explore Magadha
          </div>
        </div>
      )}

      {/* Placement UI Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/70 z-[500] flex items-center justify-center backdrop-blur-sm" onClick={() => setSelectedSlot(null)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-parchment-100 p-8 rounded-3xl border-2 border-gold-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-md w-full relative overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-5 pointer-events-none"></div>
            <h3 className="font-serif text-3xl text-earth-900 mb-2 relative z-10">Build Your Bharat</h3>
            <p className="text-earth-600 mb-8 text-sm relative z-10 font-medium">Select an item from your Heritage Chest to physically construct it at this real-world location.</p>
            
            <div className="space-y-4 relative z-10 max-h-[300px] overflow-y-auto pr-2">
              {inventory.filter(i => !i.isPlaced).map(item => (
                <button 
                  key={item.id}
                  onClick={() => handlePlace(slots.find(s => s.lat === selectedSlot.lat && s.lng === selectedSlot.lng)?.id || '', item)}
                  className="w-full flex items-center gap-5 p-4 bg-white border-2 border-parchment-300 hover:border-gold-500 rounded-2xl text-left shadow-sm hover:shadow-md transition-all group"
                >
                  <span className="text-4xl bg-parchment-200 p-3 rounded-xl group-hover:bg-gold-100 transition-colors">{item.icon}</span>
                  <div>
                    <div className="font-bold text-earth-900 text-xl leading-tight mb-1">{item.name}</div>
                    <div className="text-xs font-bold uppercase text-earth-500 tracking-[0.2em] group-hover:text-gold-600">{item.category}</div>
                  </div>
                </button>
              ))}
              {inventory.filter(i => !i.isPlaced).length === 0 && (
                <div className="text-center p-8 bg-earth-100 text-earth-600 rounded-2xl text-sm border-2 border-dashed border-earth-300 font-medium">
                  No compatible items in your chest. <br/><br/>Complete quests to unlock more heritage pieces!
                </div>
              )}
            </div>
            
            <button className="mt-8 w-full text-center text-sm font-bold text-earth-500 uppercase tracking-[0.2em] hover:text-earth-900 relative z-10" onClick={() => setSelectedSlot(null)}>
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      {/* Placed Node Info Modal */}
      {selectedPlacedNode && (
        <div className="fixed inset-0 bg-black/70 z-[500] flex items-center justify-center backdrop-blur-sm" onClick={() => setSelectedPlacedNode(null)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-parchment-100 p-10 rounded-3xl border-2 border-gold-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-lg w-full relative overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-5 pointer-events-none"></div>
            <h3 className="font-serif text-4xl text-earth-900 mb-2 relative z-10">{selectedPlacedNode.name}</h3>
            <p className="text-earth-600 mb-6 text-xs relative z-10 uppercase tracking-[0.2em] font-bold">Uncovered {selectedPlacedNode.type}</p>
            
            <div className="space-y-6 relative z-10">
              <p className="text-earth-800 leading-relaxed font-medium bg-parchment-200 p-5 rounded-2xl border border-parchment-300">
                This heritage element is now permanently part of your Living Board. It physically occupies its exact historical coordinates and influences your Heritage DNA.
              </p>
              
              <div className="flex gap-4 mt-8">
                <Link href={selectedPlacedNode.id.includes('nalanda') ? '/quest/nalanda' : '#'} className="flex-1 block">
                  <button className="w-full py-4 bg-gold-500 text-earth-900 font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 uppercase tracking-widest text-xs border border-gold-400">
                    Re-Enter Location
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    setConnectingNode(selectedPlacedNode);
                    setSelectedPlacedNode(null);
                  }}
                  className="flex-1 py-4 bg-white border-2 border-parchment-300 text-earth-800 font-bold rounded-xl shadow-sm hover:border-gold-500 hover:bg-gold-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" /> Form Connection
                </button>
              </div>
            </div>
            
            <button className="mt-8 w-full text-center text-sm font-bold text-earth-500 uppercase tracking-[0.2em] hover:text-earth-900 relative z-10" onClick={() => setSelectedPlacedNode(null)}>
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Sangam Success Modal */}
      {sangamSuccess && (
        <div className="fixed inset-0 bg-black/80 z-[600] flex items-center justify-center backdrop-blur-sm" onClick={() => setSangamSuccess(null)}>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }} 
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="bg-gradient-to-br from-earth-900 to-black p-10 rounded-3xl border-4 border-gold-500 shadow-[0_0_80px_rgba(212,175,55,0.6)] max-w-lg w-full relative overflow-hidden flex flex-col items-center text-center" 
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[url('/mandala.svg')] opacity-20 animate-[spin_40s_linear_infinite] pointer-events-none"></div>
            
            <Sparkles className="w-20 h-20 text-gold-500 mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,1)]" />
            
            <h3 className="font-serif text-5xl text-gold-400 mb-2 relative z-10">Sangam Formed</h3>
            <p className="text-gold-200/80 mb-8 text-xs relative z-10 uppercase tracking-[0.3em] font-bold">New Cultural Connection</p>
            
            <div className="relative z-10 w-full">
              <p className="text-white text-lg leading-relaxed font-medium mb-6">
                You have successfully connected <strong className="text-gold-400">{sangamSuccess.from.name}</strong> and <strong className="text-gold-400">{sangamSuccess.to.name}</strong>.
              </p>
              
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 mb-8">
                <div className="text-gold-300 font-bold uppercase tracking-widest text-xs mb-3">Heritage DNA Evolved</div>
                <div className="flex justify-center gap-8">
                  <div className="flex flex-col items-center"><span className="text-3xl font-serif text-white">+30</span><span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">History</span></div>
                  <div className="flex flex-col items-center"><span className="text-3xl font-serif text-white">+20</span><span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Strategy</span></div>
                </div>
              </div>
              
              <button 
                className="w-full py-4 bg-gold-500 text-earth-900 font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:bg-gold-400 transition-all uppercase tracking-widest text-sm"
                onClick={() => setSangamSuccess(null)}
              >
                Continue Building
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
