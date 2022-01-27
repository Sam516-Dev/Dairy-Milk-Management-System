import { FaEdit } from 'react-icons/fa'

import { Milktitle, MilkLabel, Milkp } from '../styled-componets/styles'

function MilkPerLitreApp() {
  return (
    <>
      <Milktitle> MILK PRICE PER LITRE</Milktitle>

      <MilkLabel>KSH.40</MilkLabel>
      <Milkp>
        Edit the price: <FaEdit size="0.8em" color="#008080" />
      </Milkp>
    </>
  )
}

export default MilkPerLitreApp
