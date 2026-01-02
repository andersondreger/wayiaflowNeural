import axios from 'axios'

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'https://evo2.wayiaflow.com.br'
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || ''

const evolutionApi = axios.create({
  baseURL: EVOLUTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': EVOLUTION_API_KEY,
  },
})

export interface CreateInstanceParams {
  instanceName: string
  token?: string
  qrcode?: boolean
  number?: string
}

export interface InstanceInfo {
  instance: {
    instanceName: string
    status: string
  }
  hash?: {
    apikey: string
  }
  qrcode?: {
    code: string
    base64: string
  }
}

export interface ConnectionState {
  instance: string
  state: 'open' | 'close' | 'connecting'
}

export interface SendMessageParams {
  number: string
  text?: string
  mediaUrl?: string
}

// Criar instância
export async function createInstance(params: CreateInstanceParams): Promise<InstanceInfo> {
  try {
    const response = await evolutionApi.post('/instance/create', {
      instanceName: params.instanceName,
      token: params.token,
      qrcode: params.qrcode ?? true,
      number: params.number,
    })
    return response.data
  } catch (error: any) {
    console.error('Erro ao criar instância:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao criar instância')
  }
}

// Obter QR Code
export async function getQRCode(instanceName: string): Promise<{ code: string; base64: string }> {
  try {
    const response = await evolutionApi.get(`/instance/connect/${instanceName}`)
    return response.data.qrcode || response.data
  } catch (error: any) {
    console.error('Erro ao obter QR Code:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao obter QR Code')
  }
}

// Verificar status da conexão
export async function getConnectionState(instanceName: string): Promise<ConnectionState> {
  try {
    const response = await evolutionApi.get(`/instance/connectionState/${instanceName}`)
    return response.data
  } catch (error: any) {
    console.error('Erro ao verificar status:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao verificar status')
  }
}

// Deletar instância
export async function deleteInstance(instanceName: string): Promise<void> {
  try {
    await evolutionApi.delete(`/instance/delete/${instanceName}`)
  } catch (error: any) {
    console.error('Erro ao deletar instância:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao deletar instância')
  }
}

// Logout (desconectar)
export async function logoutInstance(instanceName: string): Promise<void> {
  try {
    await evolutionApi.delete(`/instance/logout/${instanceName}`)
  } catch (error: any) {
    console.error('Erro ao fazer logout:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao fazer logout')
  }
}

// Obter informações da instância
export async function getInstanceInfo(instanceName: string): Promise<any> {
  try {
    const response = await evolutionApi.get(`/instance/fetchInstances?instanceName=${instanceName}`)
    return response.data
  } catch (error: any) {
    console.error('Erro ao obter info da instância:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao obter informações')
  }
}

// Enviar mensagem
export async function sendMessage(
  instanceName: string,
  params: SendMessageParams
): Promise<any> {
  try {
    const response = await evolutionApi.post(`/message/sendText/${instanceName}`, {
      number: params.number,
      text: params.text,
    })
    return response.data
  } catch (error: any) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Erro ao enviar mensagem')
  }
}

// Listar conversas
export async function getChats(instanceName: string): Promise<any[]> {
  try {
    const response = await evolutionApi.get(`/chat/findChats/${instanceName}`)
    return response.data
  } catch (error: any) {
    console.error('Erro ao listar conversas:', error.response?.data || error.message)
    return []
  }
}

// Obter mensagens de um chat
export async function getMessages(instanceName: string, remoteJid: string): Promise<any[]> {
  try {
    const response = await evolutionApi.get(
      `/chat/findMessages/${instanceName}?remoteJid=${remoteJid}`
    )
    return response.data
  } catch (error: any) {
    console.error('Erro ao obter mensagens:', error.response?.data || error.message)
    return []
  }
}
