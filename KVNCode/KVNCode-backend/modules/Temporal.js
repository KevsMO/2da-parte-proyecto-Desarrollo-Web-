// let proyectosTemp;

    // usuario.find(
    //     {
    //         _id: mongoose.Types.ObjectId(req.params.idUsuario),
    //         "carpetas._id" : mongoose.Types.ObjectId(req.params.idCarpeta)
    //     },
    //     {"carpetas.proyectos.$":true}
    // )        
    // .then(result=>{
    //     proyectosTemp = result[0].carpetas[0].proyectos;
    //     console.log(proyectosTemp);
    // })
    // .catch(error=>{
    //     res.send(error);
    //     res.end();
    // });

    
    
    
    
    // usuario.update(
    //     {
    //         _id: mongoose.Types.ObjectId(req.params.idUsuario),
    //         "carpetas._id": mongoose.Types.ObjectId(req.params.idCarpeta)
    //     },
    //     {
    //         $push:{
    //             "carpetas.$":{
    //                 proyectos: proyectosTemp
    //             }
    //         }
    //     }
    // )
    // .then(result=>{
    //     res.send(result);
    //     res.end();
    // })
    // .catch(error=>{
    //     res.send(error);
    //     res.end();
    // });