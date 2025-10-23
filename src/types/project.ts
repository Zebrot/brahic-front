import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface Project {
  _id: string
  _type: 'Project'
  name: string
  code: string
  type?: string
  locality?: string
  coordinates?: string
  date?: string 
  statut?: 'en_cours' | 'termine' | 'suspendu'
  client?: string
  surface?: number
  budget?: number
  mandat?: string
  equipe?: string[]
  description?: any[] // Portable Text blocks
  images: SanityImageSource[]
}
