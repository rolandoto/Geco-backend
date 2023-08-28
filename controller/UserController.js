const {response} = require("express")
const res = require("express/lib/response")
const { pool } = require("../database/connection")

const UploadFile = async(req, res=response) =>{  

    const  {id} =  req.body
  
    try {
  
      const files = req.files;
  
      if (!files || files.length !== 2) {
        return res.status(401).json({
          ok: false,
          msg: 'Debe seleccionar dos imágenes',
        });
      }
  
      const rutaAdelante = 'https://geco-backend-production.up.railway.app/public/' + files[0].filename;
      const rutaAtras = 'https://geco-backend-production.up.railway.app/public/' + files[1].filename;
  
      let data = {
        Foto_documento_adelante: rutaAdelante,
        Foto_documento_atras: rutaAtras,
      };
      
      await pool.query(
        'UPDATE web_checking SET ? WHERE ID_Reserva = ?',
        [data, id],
        (err, customer) => {
          if (err) {
            return res.status(401).json({
              ok: false,
              msg: 'Error al actualizar datos',
            });
          } else {
            return res.status(201).json({
              ok: true,
            });
          }
        }
      );
  
    } catch (error) {
      console.log(error)
      res.status(401).json({
        ok:false
      })
    }
  }
  
  module.exports ={
    UploadFile
  }