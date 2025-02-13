import {
  Heart,
  Image,
  Stamp,
  PenTool,
  Paperclip,
  Palette,
  Sticker,
  Gift,
} from "lucide-react";

export const CARD_TEMPLATES = [
  {
    id: "notebook",
    name: "Notebook Love",
    preview: (
      <div className="relative bg-white rounded-lg p-4 border border-pink-200">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjQ0LCA2MywgOTQsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
        <Paperclip className="w-8 h-8 text-pink-400 mx-auto mb-2" />
        <div className="text-center text-sm font-mono">Notebook Love</div>
      </div>
    ),
    className: "bg-white notebook-paper",
    titleClass:
      "font-loveletter text-4xl text-[#E75480] tracking-tight uppercase mb-3",
    subtitleClass: "font-mono text-xl text-[#FF69B4] lowercase tracking-widest",
    contentClass: "font-mono text-lg text-gray-800 leading-relaxed",
  },
  {
    id: "scroll",
    name: "Vintage Scroll",
    preview: (
      <div className="relative">
        <div className="absolute inset-0 bg-[#F8E8E8] rounded-lg transform rotate-2"></div>
        <div className="absolute inset-0 bg-[#F5E0E0] rounded-lg transform -rotate-1"></div>
        <div className="relative bg-[#FFF9F9] rounded-lg p-4">
          <PenTool className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <div className="text-center text-sm font-script">Vintage Scroll</div>
        </div>
      </div>
    ),
    className: "scroll-paper bg-[#FFF9F9] relative",
    titleClass:
      "font-feather text-7xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
    subtitleClass:
      "font-script text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
    contentClass:
      "font-serif text-xl text-gray-800 relative z-10 bg-white/95 p-8 rounded-lg shadow-lg mt-8 backdrop-blur-sm",
    backgroundImage:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2574&auto=format&fit=crop",
    overlayStyle:
      "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/50 before:to-black/70 before:z-0",
  },
  {
    id: "postcard",
    name: "Love Postcard",
    preview: (
      <div className="relative bg-white rounded-lg p-4 border-2 border-dashed border-red-200">
        <Stamp className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <div className="text-center text-sm">Love Postcard</div>
      </div>
    ),
    className: "bg-white border-2 border-red-200 shadow-lg",
    titleClass: "font-rosalinda text-5xl text-red-600 tracking-wide",
    subtitleClass: "font-sans text-lg text-gray-600 uppercase tracking-widest",
    contentClass: "font-sans text-lg text-gray-700",
  },
  {
    id: "modern",
    name: "Modern Love",
    preview: (
      <div className="relative bg-gradient-to-br from-red-400 to-pink-500 rounded-lg p-4">
        <Heart className="w-8 h-8 text-white mx-auto mb-2" />
        <div className="text-center text-sm text-white">Modern Love</div>
      </div>
    ),
    className: "bg-gradient-to-br from-red-400 to-pink-500 text-white",
    titleClass: "font-oh-darling text-6xl font-bold tracking-tight",
    subtitleClass: "font-sans text-xl font-light tracking-wide",
    contentClass: "font-sans text-lg",
  },
  {
    id: "polaroid",
    name: "Photo Memory",
    preview: (
      <div className="relative bg-white rounded-lg p-4 shadow-md">
        <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <div className="text-center text-sm">Photo Memory</div>
      </div>
    ),
    className: "bg-white shadow-xl relative",
    titleClass:
      "font-rosalinda text-6xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
    subtitleClass:
      "font-script text-3xl text-white/90 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
    contentClass:
      "font-sans text-lg relative z-10 bg-white/95 p-8 rounded-lg shadow-lg mt-8 backdrop-blur-sm",
    backgroundImage:
      "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=2670&auto=format&fit=crop",
    overlayStyle:
      "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/30 before:to-black/60 before:z-0",
  },
  {
    id: "watercolor",
    name: "Watercolor Dreams",
    preview: (
      <div className="relative bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 rounded-lg p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0id2F0ZXJjb2xvciIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjQ0LCA2MywgOTQsIDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YXRlcmNvbG9yKSIvPjwvc3ZnPg==')]"></div>
        <Palette className="w-8 h-8 text-pink-400 mx-auto mb-2" />
        <div className="text-center text-sm">Watercolor Dreams</div>
      </div>
    ),
    className: "bg-gradient-to-br from-pink-100 via-red-50 to-pink-100",
    titleClass: "font-serif text-5xl text-pink-600 italic",
    subtitleClass: "font-serif text-2xl text-pink-400",
    contentClass: "font-serif text-lg text-gray-700",
  },
  {
    id: "cute",
    name: "Sweet Doodles",
    preview: (
      <div className="relative bg-white rounded-lg p-4 border-2 border-pink-200">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iaGVhcnRzIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjxwYXRoIGQ9Ik0yMCwxMCBDMjAsMCAwLDAgMCwxMCBDMCwyMCAyMCwzNSAyMCwzNSBDMjAsMzUgNDAsMjAgNDAsMTAgQzQwLDAgMjAsMCAyMCwxMCBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjQ0LCA2MywgOTQsIDAuMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNoZWFydHMpIi8+PC9zdmc+')]"></div>
        <Sticker className="w-8 h-8 text-pink-400 mx-auto mb-2" />
        <div className="text-center text-sm">Sweet Doodles</div>
      </div>
    ),
    className: "bg-white border-2 border-pink-200",
    titleClass: "font-sans text-4xl text-pink-500 font-bold",
    subtitleClass: "font-sans text-xl text-pink-400",
    contentClass: "font-sans text-lg text-gray-600",
  },
  {
    id: "chocolate",
    name: "Sweet Treats",
    preview: (
      <div className="relative bg-gradient-to-br from-[#4A332F] to-[#2C1810] rounded-lg p-4">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY2hvY29sYXRlIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2Nob2NvbGF0ZSkiLz48L3N2Zz4=')]"></div>
        <Gift className="w-8 h-8 text-[#D4A276] mx-auto mb-2" />
        <div className="text-center text-sm text-[#D4A276]">Sweet Treats</div>
      </div>
    ),
    className: "bg-gradient-to-br from-[#4A332F] to-[#2C1810] text-[#D4A276]",
    titleClass: "font-serif text-5xl font-bold",
    subtitleClass: "font-serif text-2xl",
    contentClass: "font-serif text-lg",
  },
];
