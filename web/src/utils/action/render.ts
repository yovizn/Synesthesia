import { API_BASE_URL } from '@/configs/env'

const renderImage = {
  webp: (payload: string) => `${API_BASE_URL}/images/webp/${payload}`,
  png: (payload: string) => `${API_BASE_URL}/images/png/${payload}`,
}

export { renderImage }
