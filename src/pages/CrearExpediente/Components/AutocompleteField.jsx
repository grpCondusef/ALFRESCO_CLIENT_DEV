import React, { useEffect } from 'react'
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { getInstitucionesFinancieras } from '../fetchCalls/getInstitucionesFinancieras';
import { CONDUSEF_TOKEN } from '../../../utils/constants'

export const AutocompleteField = ({setInstitucionSeleccionada}) => {

  const token = localStorage.getItem(CONDUSEF_TOKEN)
  const [data, setData] = useState([])
  const [institucionesFinancieras, setInstitucionesFinanancieras] = useState(data);
  const [value, setValue] = useState("");
  
  // IDs de las instituciones genéricas
  const institucionesGenericasIds = [100000, 100001, 100002, 100003, 100004];
  
  useEffect(() => {
    // Cuando se carguen los datos, ordenarlos para que las instituciones genéricas aparezcan primero
    getInstitucionesFinancieras(token, (data) => {
      // Separar las instituciones genéricas de las normales
      const genericas = data.filter(item => 
        institucionesGenericasIds.includes(item.institucionFinaciera_id)
      );
      const normales = data.filter(item => 
        !institucionesGenericasIds.includes(item.institucionFinaciera_id)
      );
      
      // Combinar ambas listas (primero las genéricas, luego las normales)
      const datosOrdenados = [...genericas, ...normales];
      setData(datosOrdenados);
    });
  }, [])
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setInstitucionesFinanancieras(filtrarPresidentes(value));
  }

  const filtrarPresidentes = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter((item) => {
      var textoCompleto = item.denominacion_social;

      if (textoCompleto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputValue)) {
        return item;
      }
    });

    return inputLength === 0 ? [] : filtrado;
  }

  const onSuggestionsClearRequested = () => {
    setInstitucionesFinanancieras([]);
  }

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.denominacion_social}`;
  }

  // Modificado para resaltar opciones genéricas
  const renderSuggestion = (suggestion) => {
    // Verificar si es una institución genérica
    const esGenerica = institucionesGenericasIds.includes(suggestion.institucionFinaciera_id);
    
    return (
      <div 
        className={`sugerencia ${esGenerica ? 'sugerencia-generica' : ''}`} 
        onClick={() => seleccionarInstitucionFinanciera(suggestion)}
      >
        {esGenerica ? '⭐ ' : ''}{suggestion.denominacion_social}
      </div>
    );
  }

  const seleccionarInstitucionFinanciera = (institucionFinanciera) => {
    setInstitucionSeleccionada(institucionFinanciera.institucionFinaciera_id);
  }

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  }

  const inputProps = {
    placeholder: "Selecciona una Institución Financiera",
    value,
    onChange
  };

  const eventEnter = (e) => {
    if (e.key == "Enter") {
      var split = e.target.value.split('-');
      var institucionFinanciera = {
        institucionFinanciera: split[0].trim(),
        pais: split[1] ? split[1].trim() : '',
      };
      seleccionarInstitucionFinanciera(institucionFinanciera);
    }
  }

  // Añadir estilos para las sugerencias genéricas
  const theme = {
    container: {
      position: 'relative'
    },
    suggestionsContainer: {
      // Se mantienen los estilos existentes
    },
    suggestion: {
      // Se mantienen los estilos existentes
    },
    suggestionHighlighted: {
      // Se mantienen los estilos existentes
    }
  };

  return (
    <div>
      <Autosuggest
        suggestions={institucionesFinancieras}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={eventEnter}
        theme={theme}
      />
    </div>
  )
}