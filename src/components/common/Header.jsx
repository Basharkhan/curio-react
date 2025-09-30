import React, { use } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();    
    
    return (
            <>
                <nav className="bg-base-100 border-gray-200 dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary dark:text-white">
                            Curio
                        </span>
                        </a>

                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-base-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                
                                <li>
                                    <a
                                        href="/login"
                                        className="block py-2 px-3 text-base-100 bg-primary rounded-sm md:bg-transparent md:text-primary md:p-0 dark:text-white md:dark:text-secondary"
                                        aria-current="page"
                                    >
                                        Login
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/register"
                                        className="block py-2 px-3 text-text rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-secondary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Registration
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );

        // </>
        // <AppBar position="static">
        //     <Toolbar>
        //         <Typography
        //             variant='h6'
        //             component={Link}
        //             to={"/"}
        //             sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
        //         >
        //             Curio
        //         </Typography>

        //         {isAuthenticated() ? (
        //                 <Box>
        //                     <Typography>
        //                         Welcome {user?.fullName}
        //                     </Typography>
        //                     <Button>
        //                         Logout
        //                     </Button>
        //                 </Box>
        //             ) : (
        //                 <Box>
        //                     <Button color="inherit" component={Link} to="/login">
        //                         Login
        //                     </Button>
        //                     <Button color="inherit" component={Link} to="/register">
        //                         Register
        //                     </Button>
        //                 </Box>
        //             )}
        //     </Toolbar>
        // </AppBar>
    // )
}
