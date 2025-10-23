export interface Image {
  _id: string
  _type: 'Image'
  imgBinary: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  auteur?: string
  oeuvre?: string
  date?: string // ISO datetime string
  lieu?: string
  description?: any[] // Portable Text blocks
}
