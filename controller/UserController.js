const {response} = require("express")
const res = require("express/lib/response")
const { pool } = require("../database/connection")
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const uuid = require('uuid');
const sharp = require("sharp");

// Generar un único ID


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



  const UploalPopUp = async(req, res=response) =>{  

  
    try {
  
      const files = req.files;
  
      if (!files || files.length !== 1) {
        return res.status(401).json({
          ok: false,
          msg: 'Debe seleccionar dos imágenes',
        });
      }
  
      const rutaPopUp = 'https://geco-backend-production.up.railway.app/public/' + files[0].filename;
    
      let data = {
        Img_description: rutaPopUp,
      };
      
      await pool.query(
        'UPDATE PopUpPms SET ? WHERE ID = 1',
        [data],
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


  const UploadCartPresent = async (req, res = response) => {
    const { Username,ID_Reserva } = req.body;

    const text = "";
  
    try {
      const canvasWidth = 800;
      const canvasHeight = 800;
  
      const uniqueId = uuid.v4();
  
      // Crear un lienzo
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext("2d");
  
      // Ruta de la imagen base desde Imgur
      const imageUrl =
        "https://github.com/rolandoto/image-pms/blob/main/Tarjeta%20Bienvenida%20Hue%CC%81sped%20sin%20nombre.png?raw=true"; // Reemplaza con la URL proporcionada por Imgur
  
      // Texto a superponer
  
      // Cargar la imagen base
      const image = await loadImage(imageUrl);
  
      // Dibujar la imagen en el lienzo

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Configurar el texto
      ctx.fillStyle = '#007cff';
      ctx.fillRect(0, 0, 640, 480);
      ctx.font = '20px sans-serif, segoe-ui-emoji'; // Cambié la fuente a Arial
      ctx.fillText('ds', 250, 250);  // Coordenadas donde se superpondrá el texto
    
      // Convertir el lienzo a una imagen
      const editedImageBuffer = canvas.toBuffer('image/jpeg');
    
      // Guardar la imagen en un archivo
      fs.writeFileSync(`./public/present-image${uniqueId}.jpg`, editedImageBuffer);

      const imageCarPresents = `https://geco-backend-production.up.railway.app/public/present-image${uniqueId}.jpg`;
  
      let data = {
        cart_present: imageCarPresents,
      };

      await pool.query(
        'UPDATE web_checking SET ? WHERE ID_Reserva = ?',
        [data, ID_Reserva],
        (err, customer) => {
          if (err) {
            return res.status(401).json({
              ok: false,
              msg: 'Error al actualizar datos',
            });
          } else {
            return res.status(201).json({
              ok: true,
              imageCarPresents
            });
          }
        }
      );
      
    
      return res.status(201).json({
        ok:true
      })
      
    } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: 'Error en la función UploadCartPresent',
      });
    }
  };
  

  
  module.exports ={
    UploadFile,
    UploalPopUp,
    UploadCartPresent
  }