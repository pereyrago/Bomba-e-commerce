import React, {useState} from "react";
import s from "./../../../styles/SobreNosotros.module.css";

function SobreNosotros() {

  let clickeado;
  const setter = (henry) => {
    clickeado && clickeado.click()    
    if(clickeado &&clickeado.id === henry.target.id){
      return 'hola'
    }
    return clickeado=henry.target    
  }

  return (
    <div>
      <div className={s.container}>
        <p className={s.about}>
          Este es un proyecto e-commerce realizado para Henry. Basado en las
          tecnologías React, JavaScript, Express, Redux y Sequelize. La tienda
          está orientada a la venta de artículos relacionados con el arte, desde
          obras de autor hasta insumos para el artista.
        </p>
      </div>
      <div className={s.grupo}>
        <div className="column">
          <button
            id='lean'
            onClick={(e)=> setter(e) }
            className={`btn btn-primary ${s.miembro}`}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample1"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Leandro Masmut
          </button>

          <div className="collapse" id="collapseExample1">
            <div className={`card card-body ${s.card}`}>
            <div className={s.img}></div>
              Un pequeño resumen sobre Lean
              <a
                href="https://www.linkedin.com/in/leandro-sebastian-masmut-766433140/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/leandromasmut" target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>

        <div className="column">
          <button
            id='estefi'
            onClick={(e)=> setter(e) }
            className={`btn btn-primary ${s.miembro}`}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample2"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Estefania Bonessa
          </button>

          <div className="collapse" id="collapseExample2">
            <div className={`card card-body ${s.card}`}>
            <div className={s.img2}></div>
              De escenógrafa a web Developer
              <a
                href="https://www.linkedin.com/in/estefania-bonessa-67188293/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/EstefiBonessa" target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>

        <div className="column">
          <button
            className={`btn btn-primary ${s.miembro}`}
            id='regina'
            onClick={(e)=> setter(e) }
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample3"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Regina de Gasperis
          </button>

          <div className="collapse" id="collapseExample3">
            <div className={`card card-body ${s.card}`}>
            <div className={s.img3}></div>
              Un pequeño resumen sobre Regi
              <a
                href="https://www.linkedin.com/in/regidegasperis/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/rdegasperis" target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>

        <div className="column">
          <button
            id='juanca'
            onClick={(e)=> setter(e) }
            className={`btn btn-primary ${s.miembro}`}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample4"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Juan Carlos Andreychuk
          </button>

          <div className="collapse" id="collapseExample4">
            <div className={`card card-body ${s.card}`}>
            <div className={s.img4}></div>
              Un pequeño resumen sobre Juanca
              <a
                href="https://www.linkedin.com/in/juan-carlos-andreychuk-931576143/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/jcandrey" target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>

        <div className="column">
          <button
            id='gabi'
            onClick={(e)=> setter(e) }
            className={`btn btn-primary ${s.miembro}`}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample6"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Gabriel Pereyra
          </button>

          <div className="collapse" id="collapseExample6">
            <div className={`card card-body ${s.card}`}>
            <div className={s.img5}></div>
              Un pequeño resumen sobre Gabi
              <a
                href="https://www.linkedin.com/in/gabi-pereyra/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/pereyrago" target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>

        <div className="column">
          <button
            id='pancho'
            onClick={(e)=> setter(e) }
            className={`btn btn-primary ${s.miembro}`}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample7"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Francisco Fuentes
          </button>

          <div className={`collapse ${s.card}`} id="collapseExample7">
            <div className={`card card-body ${s.card}`}>
            <div className={s.img6}></div>
              Un pequeño resumen sobre Pancho
              <a
                href="https://www.linkedin.com/in/francisco-fuentes-7753a41ba/"
                target="_blank"
              >
                LinkedIn
              </a>
              <a href="https://github.com/Nariboy" target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreNosotros;

{
  /*<p>
  
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-target
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>*/
}
