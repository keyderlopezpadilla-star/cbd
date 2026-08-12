import { describe, it, expect } from 'vitest'
import {
  getContrastRatio,
  meetsWCAG_AA,
  meetsWCAG_AA_LargeText,
  meetsWCAG_AAA,
  getWCAGConformance,
  generateAriaProps,
  generateA11yId,
  getAriaRole,
} from '@/lib/accessibility'

describe('getContrastRatio', () => {
  it('returns 21 for black on white', () => {
    const ratio = getContrastRatio('#000000', '#ffffff')
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('returns 1 for same colors', () => {
    const ratio = getContrastRatio('#ff0000', '#ff0000')
    expect(ratio).toBeCloseTo(1, 0)
  })

  it('handles 3-digit hex', () => {
    const ratio = getContrastRatio('#000', '#fff')
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('returns 0 for invalid color', () => {
    const ratio = getContrastRatio('invalid', '#ffffff')
    expect(ratio).toBe(0)
  })

  it('calculates mid-range ratios correctly', () => {
    // Gray on white should have moderate contrast
    const ratio = getContrastRatio('#767676', '#ffffff')
    expect(ratio).toBeGreaterThan(4)
    expect(ratio).toBeLessThan(6)
  })

  it('handles colors without hash prefix', () => {
    const ratio = getContrastRatio('000000', 'ffffff')
    expect(ratio).toBeCloseTo(21, 0)
  })
})

describe('meetsWCAG_AA', () => {
  it('returns true for ratios >= 4.5', () => {
    expect(meetsWCAG_AA(4.5)).toBe(true)
    expect(meetsWCAG_AA(7)).toBe(true)
    expect(meetsWCAG_AA(21)).toBe(true)
  })

  it('returns false for ratios < 4.5', () => {
    expect(meetsWCAG_AA(4.4)).toBe(false)
    expect(meetsWCAG_AA(3)).toBe(false)
    expect(meetsWCAG_AA(1)).toBe(false)
  })
})

describe('meetsWCAG_AA_LargeText', () => {
  it('returns true for ratios >= 3', () => {
    expect(meetsWCAG_AA_LargeText(3)).toBe(true)
    expect(meetsWCAG_AA_LargeText(4.5)).toBe(true)
  })

  it('returns false for ratios < 3', () => {
    expect(meetsWCAG_AA_LargeText(2.9)).toBe(false)
    expect(meetsWCAG_AA_LargeText(1)).toBe(false)
  })
})

describe('meetsWCAG_AAA', () => {
  it('returns true for ratios >= 7', () => {
    expect(meetsWCAG_AAA(7)).toBe(true)
    expect(meetsWCAG_AAA(21)).toBe(true)
  })

  it('returns false for ratios < 7', () => {
    expect(meetsWCAG_AAA(6.9)).toBe(false)
    expect(meetsWCAG_AAA(4.5)).toBe(false)
  })
})

describe('getWCAGConformance', () => {
  it('all pass for maximum contrast', () => {
    const result = getWCAGConformance(21)
    expect(result.normalText).toBe(true)
    expect(result.largeText).toBe(true)
    expect(result.normalTextAAA).toBe(true)
    expect(result.largeTextAAA).toBe(true)
    expect(result.uiComponent).toBe(true)
  })

  it('all fail for minimum contrast', () => {
    const result = getWCAGConformance(1)
    expect(result.normalText).toBe(false)
    expect(result.largeText).toBe(false)
    expect(result.normalTextAAA).toBe(false)
    expect(result.largeTextAAA).toBe(false)
    expect(result.uiComponent).toBe(false)
  })

  it('mid-range passes some criteria', () => {
    const result = getWCAGConformance(4.5)
    expect(result.normalText).toBe(true)
    expect(result.largeText).toBe(true)
    expect(result.normalTextAAA).toBe(false)
    expect(result.largeTextAAA).toBe(true)
    expect(result.uiComponent).toBe(true)
  })

  it('ratio of 3 passes large text and UI only', () => {
    const result = getWCAGConformance(3)
    expect(result.normalText).toBe(false)
    expect(result.largeText).toBe(true)
    expect(result.normalTextAAA).toBe(false)
    expect(result.uiComponent).toBe(true)
  })
})

describe('generateAriaProps', () => {
  it('generates expanded attribute', () => {
    const props = generateAriaProps({ expanded: true })
    expect(props['aria-expanded']).toBe(true)
  })

  it('generates multiple attributes', () => {
    const props = generateAriaProps({
      expanded: false,
      controls: 'menu-1',
      labelledBy: 'btn-1',
    })
    expect(props['aria-expanded']).toBe(false)
    expect(props['aria-controls']).toBe('menu-1')
    expect(props['aria-labelledby']).toBe('btn-1')
  })

  it('omits undefined values', () => {
    const props = generateAriaProps({ expanded: true })
    expect(Object.keys(props)).toHaveLength(1)
    expect(props['aria-selected']).toBeUndefined()
  })

  it('handles all config properties', () => {
    const props = generateAriaProps({
      expanded: true,
      selected: true,
      disabled: false,
      required: true,
      invalid: false,
      current: 'page',
      describedBy: 'desc-1',
      labelledBy: 'label-1',
      controls: 'ctrl-1',
      owns: 'own-1',
      live: 'polite',
      busy: false,
      roleDescription: 'Custom Widget',
      valueText: '50%',
      valueMin: 0,
      valueMax: 100,
      valueNow: 50,
      orientation: 'horizontal',
    })

    expect(props['aria-expanded']).toBe(true)
    expect(props['aria-selected']).toBe(true)
    expect(props['aria-disabled']).toBe(false)
    expect(props['aria-required']).toBe(true)
    expect(props['aria-invalid']).toBe(false)
    expect(props['aria-current']).toBe('page')
    expect(props['aria-describedby']).toBe('desc-1')
    expect(props['aria-labelledby']).toBe('label-1')
    expect(props['aria-controls']).toBe('ctrl-1')
    expect(props['aria-owns']).toBe('own-1')
    expect(props['aria-live']).toBe('polite')
    expect(props['aria-busy']).toBe(false)
    expect(props['aria-roledescription']).toBe('Custom Widget')
    expect(props['aria-valuetext']).toBe('50%')
    expect(props['aria-valuemin']).toBe(0)
    expect(props['aria-valuemax']).toBe(100)
    expect(props['aria-valuenow']).toBe(50)
    expect(props['aria-orientation']).toBe('horizontal')
  })

  it('returns empty object for empty config', () => {
    const props = generateAriaProps({})
    expect(Object.keys(props)).toHaveLength(0)
  })
})

describe('generateA11yId', () => {
  it('generates ID with prefix', () => {
    const id = generateA11yId('input')
    expect(id).toMatch(/^input-[a-z0-9]+$/)
  })

  it('generates unique IDs', () => {
    const id1 = generateA11yId('test')
    const id2 = generateA11yId('test')
    expect(id1).not.toBe(id2)
  })

  it('includes prefix in the ID', () => {
    const id = generateA11yId('error')
    expect(id.startsWith('error-')).toBe(true)
  })
})

describe('getAriaRole', () => {
  it('returns the role string', () => {
    expect(getAriaRole('menu')).toBe('menu')
    expect(getAriaRole('dialog')).toBe('dialog')
    expect(getAriaRole('navigation')).toBe('navigation')
    expect(getAriaRole('main')).toBe('main')
    expect(getAriaRole('alert')).toBe('alert')
    expect(getAriaRole('tab')).toBe('tab')
    expect(getAriaRole('tabpanel')).toBe('tabpanel')
  })
})
