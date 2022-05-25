import { Button, Card, CardContent, CardHeader, Container, FormGroup, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getUsuario } from "../../api/api";
import { User } from "../../shared/shareddtypes";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '60%',
            height: '60%',
            marginTop: '10%',
            marginLeft: '30%',
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10),
            width: '70%',
            height: ''
        },
    })
);
const LogInPassword = () => {
    const classes = useStyles();

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    async function iniciarSesion() {
        let usuario = (await getUsuario(nombreUsuario, contraseña));
        if (usuario == null) {
            // el usuario NO se ha encontrado
            alert('Credenciales inválidas. El nombre de usuario o la contraseña no son correctos.');
        } else {
            // el usuario SÍ se ha encontrado
            let parsedUsuario: User = (usuario as unknown as Array<User>)[0];
            // guardamos al usuario en sesión
            sessionStorage.setItem('user', parsedUsuario.nombreUsuario);
            // redirigimos a inicio
            window.location.href = window.location.protocol + '//' + window.location.host + '/';
        }
    }

    return (
        <>
            <form className={classes.container} noValidate autoComplete="on">
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="LogIn" />
                    <CardContent>
                        <Container fixed>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    id="nombreUsuario"
                                    label="Nombre de Usuario"
                                    placeholder="Nombre de Usuario"
                                    type="email"
                                    onChange={(e) => setNombreUsuario(e.target.value)}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    id="contraseña"
                                    label="Contraseña"
                                    placeholder="Constraseña"
                                    type="password"
                                    onChange={(e) => setContraseña(e.target.value)}>
                                </TextField>
                            </FormGroup>
                        </Container>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={iniciarSesion}
                            variant="contained"
                            size="large"
                            color="primary"
                            className={classes.loginBtn}
                            data-testid="addUser"
                        >
                            LogIn
                        </Button>
                    </CardActions>
                    <Typography variant="body1" component="p" id="help">
                        <Link href="https://inrupt.net/register" margin={'10%'}> ¿No tienes una cuenta? Regístrate</Link>
                    </Typography>
                </Card>
            </form>
        </>
    );
}
export default LogInPassword;