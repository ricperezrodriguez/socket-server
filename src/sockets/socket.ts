import socketIO, { Socket } from 'socket.io'
import { Usuario } from '../classes/usuario'
import { UsuariosLista } from '../classes/usuarios-lista'
import { PayloadConfigurarUsuario, PayloadMensaje } from '../types'

// se podría hacer con el patron singleton
export const usuariosConectados = new UsuariosLista()

export const conectarCliente = (cliente: Socket): void => {
  const usuario = new Usuario(cliente.id)
  usuariosConectados.agregar(usuario)
}

export const desconectar = (cliente: Socket): void => {
  cliente.on('disconnect', () => {
    usuariosConectados.borrarUsuario(cliente.id)
    console.log(`Cliente ${cliente.id} DESCONECTADO`)
  })
}

export const mensaje = (cliente: Socket, io: socketIO.Server): void => {
  cliente.on('mensaje', (payload: PayloadMensaje) => {
    console.log('mensaje recibido', payload)

    io.emit('mensaje-nuevo', payload)
  })
}

export const configurarUsuario = (cliente: Socket, io: socketIO.Server): void => {
  cliente.on('configurar-usuario', (payload: PayloadConfigurarUsuario, callback: Function) => {
    usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
    // eslint-disable-next-line node/no-callback-literal
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre}, configurado`
    })
  })
}
