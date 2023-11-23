import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import {
  Divider,
  List,
  ListItemButton,
  Menu,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Logo from "../images/logo.png";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import carrinho from "../images/carrinho.png";
import boxes from "../images/boxes.png";
import papermoney from "../images/papermoney.png";
import extrato from "../images/extrato.png";
import cadastro from "../images/cadastro.png";
import { useNavigate } from "react-router-dom";
import logo4D from "../images/logo4D.png";

const settings = ["Editar perfil", "Sair"];

function EstLeftMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()

  const validaUserLogado = async () => {
    const userLogadoJSON = sessionStorage.getItem('UsuarioLogado');
    let userLogado = null;  // Move a declaração para este escopo

    if (userLogadoJSON) {
      userLogado = JSON.parse(userLogadoJSON);

      if (userLogado && userLogado.UsuarioID) {
        const botaoRegistro = document.getElementById('BotaoRegistro');
        const botaoLogin = document.getElementById('BotaoLogin');

        if (botaoRegistro && botaoLogin) {
          botaoRegistro.style.display = 'none';
          botaoLogin.style.display = 'none';
        }
      }
    }

    return userLogado;
  };

  React.useEffect(() => {
    const fetchUserName = async () => {
      const user = await validaUserLogado();  // Aguarde a função assíncrona

      if (user) {
        setUserName(user.UsuarioNome);  // Atualize o nome do usuário no estado
      }
    };

    fetchUserName();  // Chame a função para buscar o nome do usuário
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#136935",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [open1, setOpen1] = React.useState(true);
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = React.useState(true);
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const drawer = (
    <Box sx={{ zIndex: 10 }}>
      <Toolbar />
      {/* Sua lista aqui */}
      <List>
        <ListItemButton color="primary" onClick={handleClick1}>
          <ListItemIcon>
            <img src={carrinho} alt="png" width="27px" />
          </ListItemIcon>
          <ListItemText  primary="Comprar produtos" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <img src={papermoney} alt="png" width="20px" />
              <ListItemText  sx={{ pl: 2 }} primary="Comprar" onClick={() => navigate('/estabelecimento-saldo')}/>
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 2}} primary="Histórico de compra" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/*ESTOQUE DE ÓLEO*/}
        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            <img src={boxes} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Armazenar óleo" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }} onClick={() => navigate('/estabelecimento-estoque')}>
              <img src={cadastro} alt="png" width="20px" onClick={() => navigate('/estabelecimento-estoque')}/>
              <ListItemText sx={{ pl: 3 }} primary="Armazenar óleo" onClick={() => navigate('/estabelecimento-estoque')}/>
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Histórico de armazenamento" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  const deslogar = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ width: "100%", zIndex: 1001 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              aria-label="menu"
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" }, // Ícone de hambúrguer visível apenas em telas menores
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar
              alt="Meu Ícone"
              src={Logo}
              sx={{
                mr: 1,
                borderRadius: "0",
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GREENEAT
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'actor'}}>
              Acessado como: Estabelecimento
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: { xs: "block", md: "block" },
                mr: "5vh",
                alignSelf: "center",
              }}
            >
              {userName ? `Olá, ${userName}` : null}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="4desk" src={logo4D} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === 'Sair') {
                        deslogar()
                      } else if (setting === 'Editar perfil') {
                        navigate('/edicao-usuario-estabelecimento')
                      }
                    }}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav aria-label="menu">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Melhora o desempenho em dispositivos móveis.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 260,
              boxSizing: "border-box",
              zIndex: 100,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              width: 260,
              boxSizing: "border-box",
              height: "100vh", // Defina a altura desejada aqui
              marginTop: "0vh", // Espaçamento para o AppBar
              position: "fixed", // Mantém o Drawer fixo na posição
              zIndex: 100,
              boxShadow: 5,
              display: { xs: "none", md: "block" }, // Drawer visível apenas em telas maiores
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </ThemeProvider>
  );
}

export default EstLeftMenu;