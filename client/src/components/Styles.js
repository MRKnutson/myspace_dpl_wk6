import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const LinkButton = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: #c2c2c2;
  }
`

export const SpacedButton = styled(Button)`
  margin: 10px;
`
export const RaisedCard = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`