import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import { BioContainer, BioDesc, BioImg, BioName, BioButton, ButtonsContainer } from "./styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BioButton
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        active={
          bioActiva.id === nombre
        }
      >
        {nombre}
      </BioButton>
    ));
  };

  return (
     <BioContainer>
      <ButtonsContainer>{crearBotones()}</ButtonsContainer>
      <div>
        <div>
          <BioImg
            src={bioActiva.image}
            alt={bioActiva.nombre}
          />
        </div>
        <div>
          <BioName >{bioActiva.nombre}</BioName>
          <BioDesc>{bioActiva.descripcion}</BioDesc>
        </div>
      </div>
      </BioContainer>
  );
};

export default Bio;
