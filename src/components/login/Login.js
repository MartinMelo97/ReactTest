import React, {Component} from 'react'
import { Nombre } from './Nombre'
import axios from 'axios'
class Login extends Component {


    constructor(props){
        super(props)
        this.state = {
          correo: null,
          passw: null,
          productos: null
        }
      }
    
      componentDidMount = async() => {
        let productoPromise = await axios.get('http://localhost:8000/productos/')
        let [producto] = await Promise.all([productoPromise])
        await console.log(producto.data)
        await this.setState({
            productos: producto.data
        })
    }

    changeCorreo = (e) => {
        let email = e.target.value
        this.setState({
            correo: email
        })
    }

    changePass = (e) => {
        this.setState({
            passw: e.target.value
        })
    }
    pressed = (e) => {
        e.preventDefault();
        this.state.correo != null && this.state.passw != null ?
        alert("Tus datos son correctos")
        : alert("Te falta llenar un campo")
    }

    render(){
        return (
            <div>
                <h1>{this.state.correo}</h1>
                <h1>{this.state.passw}</h1>
                <input
                type="text"
                onChange={
                    (e) => this.changeCorreo(e)
                }
                placeholder="Anota tu coreo"
                />
                <input
                type="password"
                onChange={
                    (e) => this.changePass(e)
                }
                placeholder="Contraseña"
                />
                <button onClick={
                    (e) => this.pressed(e)
                }>Puchame</button>

                <Nombre email={this.state.correo} />

                {
                    this.state.productos ?
                        this.state.productos.length > 0 ?
                            this.state.productos.map((producto, index)=>(
                                <div className="producto" key={index}>
                                    <h3>{producto.nombre}</h3>
                                    <p>{producto.descripcion}</p>
                                    <p>${producto.precio}</p>
                                    <p>Stock: {producto.stock}</p>
                                </div>
                            ))
                        :null
                    : null
                }
            </div>
        )
    }
}

export default Login;

