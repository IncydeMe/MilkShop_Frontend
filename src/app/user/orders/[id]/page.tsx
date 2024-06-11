import React from 'react'

function UserOrderDetailsPage({params}: {params: {id: string}}) {
  return (
    <main>
       <h1>Thông tin chi tiết đơn hàng: {params.id} </h1> 
    </main>
  )
}

export default UserOrderDetailsPage
