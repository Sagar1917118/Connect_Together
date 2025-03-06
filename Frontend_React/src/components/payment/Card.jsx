import React from 'react'


const Card = ({amount,img,checkoutHandler}) => {
  return (
    <div>
      <VStack>
            <Image src={img}  objectFit></Image>
            <Text>{amount}</Text>
            <Button onClick={()=>{checkoutHandler(amount)}}></Button>
      </VStack>
    </div>
  )
}

export default Card
