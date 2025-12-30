"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountMenu from "@/components/layoutComponents/AccountMenu";
import { adminSidebarItemsList } from "@/configs/adminSidebarList";
import { customerSidebarItemsList } from "@/configs/customerSidebarList";
import { trainerSidebarItemsList } from "@/configs/trainerSidebarList";

import { usePathname } from "next/navigation";

import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

// --- MUI Style Definitions (Unchanged) ---
const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
// --- End MUI Style Definitions ---

// Helper function to capitalize the first letter
const capitalize = (s: string) => {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function MiniDrawerDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // 1. Get the current URL path
  const pathname = usePathname();

  // 2. Determine the user role based on the path prefix
  let role = "admin"; // Default to admin
  if (pathname.startsWith("/customer")) {
    role = "customer";
  } else if (pathname.startsWith("/trainer")) {
    role = "trainer";
  } else if (pathname.startsWith("/admin")) {
    role = "admin";
  }

  // 3. Select the appropriate sidebar list and dashboard title
  let sidebarItems = adminSidebarItemsList;
  const dashboardTitle = `${capitalize(role)} Dashboard`;

  switch (role) {
    case "customer":
      sidebarItems = customerSidebarItemsList;
      break;
    case "trainer":
      sidebarItems = trainerSidebarItemsList;
      break;
    case "admin":
    default:
      sidebarItems = adminSidebarItemsList;
      break;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-blue-600">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          {/* Use the dynamic dashboard title */}
          <Typography variant="h6" noWrap component="div">
            {dashboardTitle}
          </Typography>
          {/* Right side icons */}
          <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
            <IconButton color="inherit">
              <Badge color="error" badgeContent={1} max={10} showZero>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton> */}
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Link href="/">
            <Image
              src="/img/logoNoBG.png"
              width={150}
              height={150}
              alt="Logo"
            />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* 4. Map over the dynamically selected sidebarItems */}
          {sidebarItems.map(({ label, href, icon: Icon }) => (
            <ListItem key={label} disablePadding sx={{ display: "block" }}>
              <Tooltip
                title={!open ? label : label}
                placement="bottom"
                disableHoverListener={open}
              >
                <ListItemButton
                  component={Link}
                  href={href}
                  // Highlight the active item based on the current pathname
                  selected={pathname.includes(href)}
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={[
                      {
                        color: "black",
                        "&:hover": { color: "black" },
                      },
                      open ? { opacity: 1 } : { opacity: 0 },
                    ]}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>

      {/* Main content container */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <DrawerHeader /> {/* to push content below app bar */}
        {children}
      </Box>
    </Box>
  );
}
