import { FaEdit, FaUserAlt } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
// import  FaUserAlt from 'react-icons/ai'

// import {
//   FaUserAlt
// } from 'react-icons/lib/Fa';

// this component contains most of what
//we can call Styled Components
export const HomeIcon = styled(AiOutlineHome)`
  color: #008080;
  font-size: 40px;
  margin-left: 85px;
  margin-top: 10px;
  :hover {
    cursor: pointer;
  }
`

export const UserIcon = styled(FaUserAlt)`
  color: #008080;
  font-size: 40px;
  margin-left: 1200px;
  margin-top: 10px;
  :hover {
    cursor: pointer;
  }
`
//just addin the comments for recall
export const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #008080;
  margin-top: 0px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

export const Label = styled.label`
  color: white;
  font-size: 1.5em;
  background-color: #009999;
  width: 200px;
  margin-right: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  padding: -20px 0px;
`

// from here

export const Wrapper = styled.section`
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: auto;
  border-radius: 40px 40px 40px 40px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 100px;
  background-color: #009999;
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
  background-color: #009999;
  margin-top: -10px;
`

export const Input = styled.input`
  border-radius: 10px 10px 10px 10px;
  width: 300px;
  padding: 13px 30px;
  margin: 8px 0;
  font-size: 18px;
  border: 0;
  font-family: 'Roboto', sans-serif;
`

export const Buttondiv = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #009999;
  margin-left: 20px;
  height: 70;
`

export const Button = styled.button`
  border-radius: 10px;
  padding: 11px 30px;
  color: white;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  border-color: #fdda0d;
  tab-size: 0ch;
  width: 150px;
  cursor: pointer;
  margin-top: 0.6rem;
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
  margin-top: 55px;
  color: black;
  text-transform: uppercase;
`

export const NavbarLink = styled(Link)`
  font-size: 22px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  align-items: center;
  display: flex;
  font-weight: bold;
  display: inline;
  justify-content: center;
  margin-left: 125px;
  margin-top: 100px;
  color: #1c95a6;
`

//end of home page

//milk per litre styles
export const Milktitle = styled.h2`
  font-size: 2em;
  color: #008080;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align-last: center;
  margin-top: 100px;
`

export const MilkLabel = styled.label`
  color: #008080;
  font-size: 2em;
  text-align: center;
  margin-left: 590px;
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
