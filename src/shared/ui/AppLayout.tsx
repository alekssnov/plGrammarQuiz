import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from "@mui/material";
import HomeRounded from "@mui/icons-material/HomeRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";

const navItems = [
    { label: "Home", value: "/", icon: <HomeRounded /> },
    { label: "Test", value: "/test", icon: <QuizRounded /> },
    { label: "Settings", value: "/settings", icon: <SettingsRounded /> },
];

export function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Чтобы /results не подсвечивал Test, делаем простое правило:
    const current =
        navItems.find((x) => x.value === location.pathname)?.value ?? "/";

    return (
        <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
            <AppBar position="sticky" color="default" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        PL Quiz
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 2, flex: 1, width: "100%" }} maxWidth="sm">
                <Outlet />
            </Container>

            <Paper elevation={8} sx={{ position: "sticky", bottom: 0 }}>
                <BottomNavigation
                    value={current}
                    onChange={(_, value) => navigate(value)}
                    showLabels
                >
                    {navItems.map((item) => (
                        <BottomNavigationAction
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            icon={item.icon}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
