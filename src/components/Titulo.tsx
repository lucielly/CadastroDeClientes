export default function Titulo(props) {
    return ( // px-7 py-2 -> padding no eixo X e padding no eixo y 
                     // text-2xl -> aumentar o texto 
       <div className="flex flex-col justify-center">
           <h1 className="px-5 py-2 text-2xl"> 
               {props.children}
           </h1>
           <hr className="border-2 border-purple-500"></hr>
       </div>
    )
}