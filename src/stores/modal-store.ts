"use client";

import { useSyncExternalStore } from "react";

type ModalState = {
  isCalendlyOpen: boolean;
};

let state: ModalState = {
  isCalendlyOpen: false,
};

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function setCalendlyOpen(open: boolean) {
  if (state.isCalendlyOpen === open) return;
  state = { ...state, isCalendlyOpen: open };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function useModalStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
