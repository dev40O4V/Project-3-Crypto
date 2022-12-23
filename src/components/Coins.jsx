import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Alert, AlertIcon, Button, Container, HStack, Radio, RadioGroup,} from '@chakra-ui/react';
import Loader from './Loader';
import Coincards from "./Coincards";



const Coins = () => {

    const [coins, setcoins] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [page, setpage] = useState(1)
    const [currency, setcurrency] = useState("inr")

    const currencySymbol = 
    currency==="inr" ? "₹" : currency==="eur" ? "€" : "$";

    const changePage = (page) => {
        setpage(page);
        setloading(true);
    }

    const btns = new Array(132).fill(1)

    useEffect(() => {

        const fetchCoins = async () => {
          try {
            const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
            setcoins(data)
            setloading(false)
            
          } catch (error) {
            seterror(true);
            setloading(false);
            
          }
          
           
        }

        fetchCoins();

    }, [currency, page])


    if (error) {

        return (
            <Alert status='error' position={'fixed'} bottom={'4'} left={'50%'} transform={"translateX(-50%)"} w={"container.lg"}> 

            <AlertIcon />

            <div> Error While Fetching </div>
            
            </Alert>
        )
        
    }


    return (
        <Container maxW={"container.xl"}>

            {loading ? <Loader /> : (<>

            <RadioGroup> 
                <HStack spacing={'4'} onChange={(evt)=>{
                setcurrency(evt.target.value)
              }} p={'8'}>
                    <Radio value={'inr'}> ₹ INR  </Radio>
                    <Radio value={'usd'}> $ USD  </Radio>
                    <Radio value={'eur'}> € EUR  </Radio>
                </HStack>
            </RadioGroup>

                <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                    {
                        coins.map((i) => (

                            <Coincards id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol} 
                            />
                           

                        ))
                    }
                </HStack>


                <HStack w={"full"} overflowX={"auto"} p={'8'}>
                    {
                        btns.map((item, index)=>(

                            <Button bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}> {index + 1} </Button>

                        ))
                    }
                </HStack>




            </>)}
        </Container>
    )
}

export default Coins;



