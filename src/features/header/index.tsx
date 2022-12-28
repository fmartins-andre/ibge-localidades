import styled from "@emotion/styled"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"

export default function Header() {
  return (
    <AppBar component="nav">
      <Container>
        <Toolbar>
          <LogoWrapper />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const LogoWrapper = styled.div`
  background-image: url("/logo-ibge.png");
  width: 201px;
  height: 66px;
`

