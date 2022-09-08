import { Usuario } from './usuario'

export class UsuariosLista {
  private lista: Usuario[] = []

  public agregar (usuario: Usuario): Usuario {
    this.lista.push(usuario)
    console.log(this.lista)
    return usuario
  }

  public actualizarNombre (id: string, nombre: string): void {
    for (const usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre
        break
      }
    }
    console.log('===== Actualizando usuario =====')
    console.log(this.lista)
  }

  public getLista (): Usuario[] {
    return this.lista
  }

  public getUsuario (id: string): Usuario|undefined {
    return this.lista.find(usuario => usuario.id === id)
  }

  public getUsuariosEnSala (sala: string): Usuario[] {
    return this.lista.filter(usuario => usuario.sala === sala)
  }

  public borrarUsuario (id: string): Usuario|undefined {
    const usuarioBorrado = this.getUsuario(id)

    this.lista = this.lista.filter(usuario => usuario.id !== id)
    console.log(this.lista)
    return usuarioBorrado
  }
}
