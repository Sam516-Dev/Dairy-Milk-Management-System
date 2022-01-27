import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: black;
  margin-top: 50px;
`

export const Label = styled.label`
  color: white;
  font-size: 1.5em;
  width: 200px;
  margin-right: 70px;
`

// from here

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* margin-right: 60px; */
`

export const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 100px;
`

export const Input = styled.input`
  width: fit-content;
  height: fit-content;
  padding: 11px 100px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 15px;
`

export const Buttondiv = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  height: 70;
`

export const Button = styled.button`
  /* max-width: 100%; */
  padding: 11px 30px;
  color: white;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  width: 150px;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  /* margin-left: 50px; */
  background-color: #fdda0d;
`

//home page
export const Tablerow = styled.header`
  display: inline;
  font-weight: bold;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin: 10px;
`

export const Hometitle = styled.h2`
  font-size: 2em;
  color: blue;
  text-align: left;
  padding-left: 45px;
`
export const Homediv = styled.div`
  margin-top: 100px;
  color: #008080;

  text-transform: uppercase;
`

export const NavbarLink = styled(Link)`
  font-size: 22px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  align-items: center;
  font-weight: bold;
  display: inline;

  margin-left: 200px;
  margin-top: 100px;
  color: #008080;
`

//end of home page

//milk per litre styles
export const Milktitle = styled.h2`
  font-size: 2.5em;
  color: #008080;
  text-align-last: center;
  margin-top: 100px;
`

export const MilkLabel = styled.label`
  color: #008080;
  font-size: 2em;
  text-align: center;
  margin-left: 620px;
  font-weight: bold;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

export const Milkp = styled.p`
  color: #008080;
  font-size: 1.5em;
  text-align: center;
  text-decoration-line: underline;
`
