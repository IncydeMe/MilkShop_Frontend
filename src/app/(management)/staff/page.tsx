import React from 'react'

export default function StaffHomePage() {
  const randomQuote = [
    "Nếu bạn muốn đạt được điều gì đó mà bạn chưa từng có, bạn phải chuẩn bị để làm điều mà bạn chưa từng làm.",
    "Hãy làm việc một cách thông minh, không phải làm việc nhiều.",
    "Không có gì là không thể.",
    "Hãy kiên nhẫn, thành công sẽ đến với bạn.",
    "Hãy cố gắng hết mình, thành công sẽ đến với bạn."
  ]

  const randomIndex = Math.floor(Math.random() * randomQuote.length)

  return (
    <section>
        <section className='flex flex-col gap-4 pb-4'>
            <h1 className='text-[32px] font-bold'>Chào mừng quay trở lại</h1>
        </section>
        <section className='text-[24px] font-semibold'>
            <h3>Theo dõi thông số của tháng này</h3>
        </section>
    </section>
  )
}
