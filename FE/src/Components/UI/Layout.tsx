import { NavLink, Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { setToken } from "../../Store/auth";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const pages = [
  { path: "/", name: "dashboard" },
  { name: "Admin", path: "/admin" },
];

const Layout: React.FC = () => {
  return (
    <main>
      <ResponsiveAppBar />
      <Outlet />
    </main>
  );
};

export default Layout;

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const { token } = useSelector((state: RootState) => state.auth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };
  const setttignd = [
    {
      name: "logout",
      onclick: logout,
    },
    {
      name: "Dashboard",
      onclick: () => naviagate("/"),
    },
    {
      name: "Admin",
      onclick: () => naviagate("/admin"),
    },
  ];

  React.useEffect(() => {
    if (!token) {
      const lt = localStorage.getItem("auth");
      if (lt) {
        dispatch(setToken(lt));
      }
    }
  });

  console.log("token", token);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 900,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CRUD MERN
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CRUD MERN
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: "auto",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  to={page.path}
                  className={({ isActive }) =>
                    `nav-list ${isActive ? "focust" : ""}`
                  }
                >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    marginLeft: "auto",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  {[
                    { name: "login", path: "/auth/login" },
                    { name: "register", path: "/auth/signin" },
                  ].map((page) => (
                    <Button
                      key={page.name}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <NavLink
                        className={({ isActive }) =>
                          `nav-list ${isActive ? "focust" : ""}`
                        }
                        to={page.path}
                      >
                        {page.name}
                      </NavLink>
                    </Button>
                  ))}
                </Box>
                <Box
                  sx={{
                    marginLeft: "auto",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <IconButton onClick={toggleDrawer(true)} color="inherit">
                    <MenuIcon />
                  </IconButton>
                </Box>
              </>
            )}
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
              {setttignd.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    setting.onclick();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Drawer
              anchor={"right"}
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>hiii</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
