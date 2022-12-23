import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import img from '../assest/btc6.png'
import {motion} from 'framer-motion'

const Home = () => {
  return (
   <Box w={'full'} bgColor={"blackAlpha.600"} h={"85vh"}>

    <motion.div style={{
      height: "70vh"

    }}

    animate={{
      translateY: "20px",
    }}

    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"


    }}
    
    >

    <Image w={"full"} h={'full'} objectFit={"contain"} src={img} ></Image> 

    </motion.div>

    

    <Text fontSize={"6xl"} textAlign={"center"} textTransform={"uppercase"} color={"whiteAlpha.700"}  >  Crypto Trading  </Text>

   </Box>
  )
}

export default Home
