import React, { use } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();    
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant='h6'
                    component={Link}
                    to={"/"}
                    sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
                >
                    Curio
                </Typography>

                {isAuthenticated() ? (
                        <Box>
                            <Typography>
                                Welcome {user?.fullName}
                            </Typography>
                            <Button>
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </Box>
                    )}
            </Toolbar>
        </AppBar>
    )
}
