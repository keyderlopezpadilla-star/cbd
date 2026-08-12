/**
 * Accessibility utility functions for WCAG 2.2 AA compliance.
 * Includes contrast ratio calculations, focus management, and ARIA attribute generation.
 */

/**
 * Converts a hex color string to RGB components
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # prefix if present
  const cleaned = hex.replace(/^#/, '')

  // Support both 3-digit and 6-digit hex
  let fullHex = cleaned
  if (cleaned.length === 3) {
    fullHex = cleaned
      .split('')
      .map((char) => char + char)
      .join('')
  }

  if (fullHex.length !== 6) return null

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
  if (!result) return null

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Calculates the relative luminance of a color per WCAG 2.2 spec
 * @see https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const srgb = c / 255
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculates the contrast ratio between two colors per WCAG 2.2.
 * Returns a value between 1 and 21.
 *
 * @param foreground - Foreground color in hex format (e.g., '#ffffff')
 * @param background - Background color in hex format (e.g., '#000000')
 * @returns Contrast ratio as a number (e.g., 21 for black on white)
 *
 * @example
 * ```ts
 * const ratio = getContrastRatio('#ffffff', '#000000') // 21
 * const ratio2 = getContrastRatio('#cbd-green', '#1a1a2e') // ~8.5
 * ```
 */
export function getContrastRatio(foreground: string, background: string): number {
  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)

  if (!fg || !bg) {
    console.warn('Invalid color format. Use hex format (e.g., #ffffff)')
    return 0
  }

  const fgLuminance = getRelativeLuminance(fg.r, fg.g, fg.b)
  const bgLuminance = getRelativeLuminance(bg.r, bg.g, bg.b)

  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * WCAG 2.2 AA conformance levels
 */
export interface WCAGConformance {
  /** Passes AA for normal text (4.5:1 ratio) */
  normalText: boolean
  /** Passes AA for large text (3:1 ratio) */
  largeText: boolean
  /** Passes AAA for normal text (7:1 ratio) */
  normalTextAAA: boolean
  /** Passes AAA for large text (4.5:1 ratio) */
  largeTextAAA: boolean
  /** Passes for UI components and graphical objects (3:1 ratio) */
  uiComponent: boolean
}

/**
 * Checks if a contrast ratio meets WCAG AA requirements for normal text.
 * Normal text requires a minimum ratio of 4.5:1.
 *
 * @param ratio - Contrast ratio to check
 * @returns Whether the ratio meets WCAG AA for normal text
 *
 * @example
 * ```ts
 * const ratio = getContrastRatio('#333', '#fff')
 * if (meetsWCAG_AA(ratio)) {
 *   // Color combination is accessible
 * }
 * ```
 */
export function meetsWCAG_AA(ratio: number): boolean {
  return ratio >= 4.5
}

/**
 * Checks if a contrast ratio meets WCAG AA for large text (3:1 ratio).
 * Large text is defined as 18pt+ or 14pt+ bold.
 */
export function meetsWCAG_AA_LargeText(ratio: number): boolean {
  return ratio >= 3
}

/**
 * Checks if a contrast ratio meets WCAG AAA requirements (7:1 ratio).
 */
export function meetsWCAG_AAA(ratio: number): boolean {
  return ratio >= 7
}

/**
 * Gets full WCAG conformance information for a contrast ratio
 */
export function getWCAGConformance(ratio: number): WCAGConformance {
  return {
    normalText: ratio >= 4.5,
    largeText: ratio >= 3,
    normalTextAAA: ratio >= 7,
    largeTextAAA: ratio >= 4.5,
    uiComponent: ratio >= 3,
  }
}

/**
 * Manages focus by moving it to a specific element.
 * Handles the case where the element is not naturally focusable.
 *
 * @param element - The DOM element to focus
 * @param options - Focus options (preventScroll, etc.)
 *
 * @example
 * ```ts
 * // Focus a heading after navigation
 * const heading = document.getElementById('page-title')
 * if (heading) manageFocus(heading)
 *
 * // Focus without scrolling
 * manageFocus(element, { preventScroll: true })
 * ```
 */
export function manageFocus(
  element: HTMLElement | null,
  options: FocusOptions = {}
): void {
  if (!element) return

  // Make the element focusable if it isn't already
  if (!element.hasAttribute('tabindex') && !isFocusable(element)) {
    element.setAttribute('tabindex', '-1')
    // Remove the tabindex after blur to avoid cluttering the tab order
    const handleBlur = () => {
      element.removeAttribute('tabindex')
      element.removeEventListener('blur', handleBlur)
    }
    element.addEventListener('blur', handleBlur)
  }

  element.focus(options)
}

/**
 * Checks if an element is naturally focusable (without tabindex)
 */
function isFocusable(element: HTMLElement): boolean {
  const focusableTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']
  if (focusableTags.includes(element.tagName)) return true
  if (element.hasAttribute('contenteditable')) return true
  if (element.hasAttribute('tabindex')) return true
  return false
}

/**
 * Configuration for generating ARIA properties
 */
export interface AriaConfig {
  /** Whether the element is expanded (for dropdowns, accordions) */
  expanded?: boolean
  /** Whether the element is selected */
  selected?: boolean
  /** Whether the element is disabled */
  disabled?: boolean
  /** Whether the element is required */
  required?: boolean
  /** Whether the element has an error */
  invalid?: boolean
  /** The current value or position */
  current?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean
  /** Description for the element */
  describedBy?: string
  /** Label for the element */
  labelledBy?: string
  /** Controls relationship */
  controls?: string
  /** Owns relationship */
  owns?: string
  /** Live region politeness */
  live?: 'polite' | 'assertive' | 'off'
  /** Whether the element is busy/loading */
  busy?: boolean
  /** Role description */
  roleDescription?: string
  /** Value text for sliders/progress */
  valueText?: string
  /** Minimum value */
  valueMin?: number
  /** Maximum value */
  valueMax?: number
  /** Current value */
  valueNow?: number
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Generated ARIA attributes object
 */
export type AriaProps = Record<string, string | boolean | number | undefined>

/**
 * Generates a set of ARIA properties based on a configuration object.
 * Useful for consistently applying ARIA attributes to custom components.
 *
 * @param config - Configuration object describing the element's state
 * @returns Object of aria-* attributes ready to spread onto an element
 *
 * @example
 * ```tsx
 * const ariaProps = generateAriaProps({
 *   expanded: isOpen,
 *   controls: 'dropdown-menu',
 *   labelledBy: 'menu-button-label',
 * })
 *
 * return <button {...ariaProps}>Menu</button>
 * // Renders: <button aria-expanded="true" aria-controls="dropdown-menu" aria-labelledby="menu-button-label">
 * ```
 */
export function generateAriaProps(config: AriaConfig): AriaProps {
  const props: AriaProps = {}

  if (config.expanded !== undefined) {
    props['aria-expanded'] = config.expanded
  }

  if (config.selected !== undefined) {
    props['aria-selected'] = config.selected
  }

  if (config.disabled !== undefined) {
    props['aria-disabled'] = config.disabled
  }

  if (config.required !== undefined) {
    props['aria-required'] = config.required
  }

  if (config.invalid !== undefined) {
    props['aria-invalid'] = config.invalid
  }

  if (config.current !== undefined) {
    props['aria-current'] = config.current
  }

  if (config.describedBy) {
    props['aria-describedby'] = config.describedBy
  }

  if (config.labelledBy) {
    props['aria-labelledby'] = config.labelledBy
  }

  if (config.controls) {
    props['aria-controls'] = config.controls
  }

  if (config.owns) {
    props['aria-owns'] = config.owns
  }

  if (config.live) {
    props['aria-live'] = config.live
  }

  if (config.busy !== undefined) {
    props['aria-busy'] = config.busy
  }

  if (config.roleDescription) {
    props['aria-roledescription'] = config.roleDescription
  }

  if (config.valueText) {
    props['aria-valuetext'] = config.valueText
  }

  if (config.valueMin !== undefined) {
    props['aria-valuemin'] = config.valueMin
  }

  if (config.valueMax !== undefined) {
    props['aria-valuemax'] = config.valueMax
  }

  if (config.valueNow !== undefined) {
    props['aria-valuenow'] = config.valueNow
  }

  if (config.orientation) {
    props['aria-orientation'] = config.orientation
  }

  return props
}

/**
 * Generates a unique ID for accessibility relationships.
 * Useful for connecting labels, descriptions, and errors to form controls.
 *
 * @param prefix - Prefix for the generated ID
 * @returns A unique ID string
 *
 * @example
 * ```ts
 * const inputId = generateA11yId('input')    // 'input-a1b2c3d4'
 * const errorId = generateA11yId('error')    // 'error-e5f6g7h8'
 * ```
 */
export function generateA11yId(prefix: string): string {
  const random = Math.random().toString(36).substring(2, 10)
  return `${prefix}-${random}`
}

/**
 * Returns the appropriate ARIA role for common UI patterns.
 * Helper for ensuring correct roles are applied.
 */
export function getAriaRole(
  pattern:
    | 'menu'
    | 'menuitem'
    | 'tab'
    | 'tabpanel'
    | 'dialog'
    | 'alert'
    | 'status'
    | 'navigation'
    | 'search'
    | 'complementary'
    | 'contentinfo'
    | 'banner'
    | 'main'
    | 'region'
): string {
  return pattern
}
