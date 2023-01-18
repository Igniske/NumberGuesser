import React from "react";
import { useState } from "react";

/* <div className="App w-full h-screen bg-purple-600"> */

function NumberGuess(){
    
    const [game, setGame] = useState(false)
    const [valor, setValor] =useState(0)
    const [valorOculto, setValorOculto] =useState(null)
    const [resultados, setResultados] = useState("")
    const [intentos, setIntentos] = useState(0)
    const [win, setWin] = useState(false)

    

    const gameOn = (e) =>{
        e.preventDefault()
        setValorOculto(Math.floor(Math.random() * 1000) + 1)
        setGame(true)
        setWin(false)
        setIntentos(0)
        setResultados("")
    }

    const handleChange = (e)=>{
        
        if(!/[0-9]/.test(e.target.value) === true){
            e.target.value = ""
        }else{
            setValor(e.target.value)
        }
        
        if(e.target.value === ""){
            setValor(0)
        }

    }

    const handleClick = (e) =>{
        e.preventDefault()
        if(valor < 1 || valor > 1000){
            alert("introduzca un numero valido")
            return ""
        } 
        setIntentos(intentos => intentos + 1)
            if(valor == valorOculto){
                resultado(1)
            }else{
                (valor > valorOculto ? resultado(2) : resultado(3))
            }
    }

    function resultado(num){
       let retorno = ""
        if(num === 1){
            retorno = <p className="pt-8 text-lg font-medium">Correcto! <span className="font-semibold underline">{valor}</span> es el numero oculto, ganaste! Lo has logrado en {intentos + 1} intentos!</p>
            setWin(true)
            setValor(0)
        } else if(num === 2){
            retorno = <p>El numero oculto es menor a <span className="font-semibold underline">{valor}</span></p>
        } else{
            retorno = <p>El numero oculto es mayor a <span className="font-semibold underline">{valor}</span></p>
        }
        
        if(resultados.length > 12){
            resultados.shift()
        }

        setResultados([...resultados, retorno])
        return <div className="bg-purple-600 w-full h-8">{resultados.map((res, index) => <div className="m-2" key={index}>{res}</div>)}</div>  
    }

    

    const inicio = <div className="mt-24 flex justify-center items-center h-full">
                <div className="border-2 border-black h-min w-2/3">
                    <p className="text-xl pt-24 pb-8 pr-4 pl-4">En este juego tendras que adivinar un numero entre el 1 al 1000. Cada intento te dara una pista indicando si el numero es mayor o menor a la cifra indicada.</p>
                    <button className="border-2 border-black bg-white w-32 mt-8 mb-16" onClick={gameOn}>Empezar!</button>
                </div>
        </div>;

    const juego = <div>
        <div className="block">
            <input type="text" onChange={handleChange} className="text-center w-32 h-16 m-4 border-8 border-black"/>
        </div>
            {win === false ? <button className="bg-gray-200 mb-4 h-8 w-16 border-2 border-black" onClick={handleClick}>Probar!</button> : ""}

        <div>{resultados}</div>
        <div>
            <p className="text-lg p-4">Intentos: {intentos}</p>
        </div>
        <div>{(win === true ? <button className="bg-gray-200 mb-4 text-xl h-8 font-medium w-24 border-2 border-black" onClick={()=>setGame(false) }>Reiniciar</button> : "")}</div>
    </div>
    
    
    return(<div className="h-min">
        <h2 className="text-4xl pt-8 mb-8 font-serif text-white font-medium">Juego de adivinar el numero!</h2>

        {(game === false ? inicio : juego)}

        

        
    </div>)
}

export default NumberGuess;
