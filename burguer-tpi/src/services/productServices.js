import React from 'react'

export const productServices = async() => {
  return [
    {
      id: 1,
      name: "Hamburguesa Clásica",
      price: 8000,
      ditail: "Carne vacuna, lechuga, tomate y aderezo",
      img: "https://foodish-api.com/images/burger/burger50.jpg"
    },
    {
      id: 2,
      name: "Cheese Burguer",
      price: 9000,
      ditail: "Carne vacuna, chaddar y bacon",
      img: "https://foodish-api.com/images/burger/burger1.jpg"
    }
  ]
}
