module.exports = ({ title,level,ingredients,cuisine,dishType,image, duration,creator,
  }) => {
        if(!title)
            return {message: "Debe enviar el title", ok:false, status:422};
        if(!level)
            return {message: "Debe enviar el level", ok:false, status:422};
        if(!ingredients)
            return {message: "Debe enviar el ingredients", ok:false, status:422};
        if(!cuisine)
            return {message: "Debe enviar el cuisine", ok:false, status:422};
        if(!dishType)
            return {message: "Debe enviar el dishType", ok:false, status:422};
        if(!image)
            return {message: "Debe enviar el image", ok:false, status:422};
        if(!duration)
            return {message: "Debe enviar el duration", ok:false, status:422};
        if(!creator)
            return {message: "Debe enviar el creator", ok:false, status:422};
        
        return {message: "parametros correctos", ok:true, status:422};
  };