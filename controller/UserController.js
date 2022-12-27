const {response} = require("express")
const res = require("express/lib/response")
const mysql = require("mysql")
const { pool } = require("../database/connection")


const userProduct= async(req,res=response) =>{   

    const {id}  = req.params
   
    const query = await  pool.query("SELECT * FROM productos  where productos.cod_prod=?",[id])
    
    const t = query.map(index=>{
        return index.cod_prod
    })

    const query2 = await  pool.query("SELECT * from detalle_prod_provee INNER JOIN proveedores ON detalle_prod_provee.id_provee = proveedores.cod_prov where detalle_prod_provee.id_prod =? ORDER BY costo_compra ASC   ",[t])

    res.status(201).json({
        ok:true,
        result:{
            query,
            query2
        }
    })

}

const userProvedor =async(req,res=response) =>{

    const {id}  = req.params

    const query = await  pool.query("SELECT * FROM proveedores  where proveedores.cod_prov=?",[id])

    const t = query.map(index =>{
        return index.cod_prov
    })

    const query2 = await  pool.query("SELECT * from detalle_prod_provee INNER JOIN productos ON detalle_prod_provee.id_prod = productos.cod_prod where detalle_prod_provee.id_provee =? ORDER BY costo_compra ASC ",[t])

    res.status(201).json({
        ok:true,
        query,
        query2
    })

}

const  inserProvedor =async(req,res=response) =>{

    const {namecompany,namecolaborador,lastname,address,phone,dia_visita,dia_entraga} =req.body

    const query1 = await  pool.query("SELECT MAX(cod_prov) as max FROM proveedores")
    
    const t  =query1.map(index  =>{
        return index.max
    })

    const num =parseInt(t)+1

    console.log(num)

    const data={
        cod_prov:num,
        nom_prov:namecompany,
        nom_colaborador:namecolaborador,
        apell_colaborador:lastname,
        direc:address,
        tel:phone,
        contraseña:"2313213321",
        dia_visita:dia_visita,
        dia_entrega:dia_entraga
    }

    const query2 =pool.query("INSERT INTO proveedores set ?", data,(err,customer) =>{
        console.log(customer)
    })

    console.log(query2)

    res.status(201).json({
        ok:true
    })

}


const inserProduct=async(req,res=response) =>{

    const {nameproduct,codebarra,imagen,precioventa,costo_compra,checked} = req.body

    const query1 = await  pool.query("SELECT MAX(cod_prod) as max FROM productos")
    
    const t  =query1.map(index  =>{
        return index.max
    })

    const num =parseInt(t)+1

    const data={
        cod_prod:num,
        nom_pro:nameproduct,
        codigo_barra:codebarra,
        imagen:imagen,
        precio_venta:precioventa
    }

    const query2 =pool.query("INSERT INTO productos set ?", data,(err,customer) =>{
        console.log(customer)
    })

    for(let i =0;i<checked.length;i++){
        const cos = costo_compra[i]
        const index  = checked[i]
        console.log(index)
        const to ={
            id_provee:index,
            id_prod:num,
            costo_compra:cos,
            costo_venta:precioventa
        }

    const query3 =pool.query("INSERT INTO detalle_prod_provee set ?", to,(err,customer) =>{
        console.log(customer)
    })

    }  
    
   
    res.status(201).json({
        ok:true
    })

}


const getProvedor=async(req,res=response) =>{

    const query = await pool.query("SELECT nom_prov, cod_prov FROM proveedores")
    
    res.status(201).json({
        ok:true,
        result:query
    })

}

const getProductos=async(req,res=response) =>{

   try {
    const query = await pool.query("SELECT * FROM Reservas")
    
    res.status(201).json({
        ok:true,
        result:query
    })
   } catch (error) {
        res.status(401).json({
            ok:false,
        })
   }

}

module.exports={userProduct,
                userProvedor,
                inserProvedor,
                inserProduct,
                getProvedor,
                getProductos}