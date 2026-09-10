"use client";

import type { Locale } from "@/lib/catalog";

// Navigation is now handled by real links in MovieLibraryHome. Keep this no-op export
// only so any older import cannot intercept clicks or reopen the retired preview overlay.
export default function MovieLinkGuard({locale: _locale}:{locale:Locale}){
  return null;
}
