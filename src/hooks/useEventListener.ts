import { useEffect, useRef } from 'react'

export const useEventListener = (
  eventName: string,
  handler: Function,
  element: Document | Window | HTMLElement = window,
  options?: AddEventListenerOptions
) => {
  const savedHandler = useRef<Function>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element?.addEventListener
    if (!isSupported) {
      return
    }

    const eventListener = (event: Event) => savedHandler.current!(event)

    element.addEventListener(eventName, eventListener, {
      passive: options?.passive,
    })

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
