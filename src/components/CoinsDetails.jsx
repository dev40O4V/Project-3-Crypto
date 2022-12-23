import { Alert, AlertIcon, Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import Loader from './Loader'
import NewChart from './Chart'

const CoinsDetails = () => {
  const params = useParams()
  const [coin, setcoin] = useState({})
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [currency, setcurrency] = useState("inr")
  const [days, setdays] = useState("24hr")
  const [chartArray, setchartArray] = useState([])

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {

    switch (key) {

      case "24h":

        setdays("24h")
        setloading(true)

        break;

      case "7d":

        setdays("7d")
        setloading(true)

        break;

      case "14d":

        setdays("14d")
        setloading(true)

        break;

      case "30d":

        setdays("30d")
        setloading(true)

        break;

      case "60d":

        setdays("60d")
        setloading(true)

        break;

      case "200d":

        setdays("200d")
        setloading(true)

        break;

      case "1y":

        setdays("365")
        setloading(true)

        break;

      case "max":

        setdays("max")
        setloading(true)

        break;





      default:

        setdays("24h")
        setloading(true)



        break;
    }

  }


  useEffect(() => {

    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setcoin(data)
        setchartArray(chartData.prices)
        setloading(false)






      } catch (error) {
        seterror(true);
        setloading(false);

      }


    }

    fetchCoin();

  }, [params.id, currency, days])

  if (error) {

    return (
      <Alert status='error' position={'fixed'} bottom={'4'} left={'50%'} transform={"translateX(-50%)"} w={"container.lg"}>

        <AlertIcon />

        <div> Error While Fetching Coin </div>

      </Alert>
    )

  }


  return (
    <Container maxW={"container.xl"}>

      {
        loading ? <Loader /> : (

          <>

            <Box w={"full"} borderWidth={1}> <NewChart arr={chartArray} currency={currencySymbol} days={days} /> </Box>

            <HStack p={'4'} overflowX={'auto'}>

              {
                btns.map((i) => (
                  <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>

              <Text fontSize={'small'} alignSelf={'center'} opacity={"0.7"}>

                Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}

              </Text>
              <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>


                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>

              </Stat>

              <Badge fontSize={"2xl"} bgColor={'blackAlpha.600'} color={'white'}> {`#${coin.market_cap_rank}`}

              </Badge>

              <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

              <Box width={"full"} p={'4'}>

                <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                <Item title={"All time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />

              </Box>

            </VStack>

          </>
        )
      }

    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={'50'} colorScheme={"teal"} w={'full'} />
    <HStack justifyContent={"space-evenly"} w={'full'}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}> 24H Range </Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
)

export default CoinsDetails
