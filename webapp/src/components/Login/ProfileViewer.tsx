import { useSession, CombinedDataProvider, Image, LogoutButton, Text, ThingProvider, ThingContext, DatasetContext } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, CardHeader, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import Nav from '../Fragments/Nav';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getSolidDataset, getStringNoLocale, getThing, getUrl, Thing } from "@inrupt/solid-client";
import { useEffect, useState } from "react";
import { Address } from "../../shared/shareddtypes";

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

async function getDireccion(webId: string): Promise<Address> {
  let perfilURI = webId.split("#")[0];
  let dataSet = await getSolidDataset(perfilURI);
  let perfil = getThing(dataSet, webId);
  let hasAddress = getUrl(perfil as Thing, VCARD.hasAddress) as string;
  let addressUsuario = await getThing(dataSet, hasAddress);

  return {
    calle:  getStringNoLocale(addressUsuario as Thing, VCARD.street_address) as string,
    localidad:  getStringNoLocale(addressUsuario as Thing, VCARD.locality) as string,
    codigoPostal: getStringNoLocale(addressUsuario as Thing, VCARD.postal_code) as string,
    region: getStringNoLocale(addressUsuario as Thing, VCARD.region) as string,
    pais: getStringNoLocale(addressUsuario as Thing, VCARD.country_name) as string
  };
}

function direccionToString(direccion: Address) {
  let direccionFinal = "Calle: " + direccion.calle + ", Localidad: " + direccion.localidad + ", Código Postal: " + direccion.codigoPostal + ", Región: " + direccion.region + ", País: " + direccion.pais;
  return direccionFinal;
}

const ProfileViewer = () => {
  const classes = useStyles();
  const { session } = useSession();
  const { webId } = session.info;
  // const direccion = async()=>await getDireccion(webId);

  const [ addresses, setAddresses] = useState({
    calle: '',
    localidad: '',
    codigoPostal: '',
    region: '',
    pais: ''
  } as Address);
  console.log(addresses);

  useEffect(() => {
    const loadAddresses = async () => setAddresses(await getDireccion(session.info.webId!!));
    loadAddresses();
  }, [setAddresses, session.info.webId]);


  return (
    <><Nav />
      <form className={classes.container} noValidate autoComplete="on">
        <Container fixed>
          {session.info.webId ? (
            <CombinedDataProvider
              datasetUrl={session.info.webId}
              thingUrl={session.info.webId}>
              <Card className={classes.card}>
                <CardHeader className={classes.header} title="User" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Text property={FOAF.name.iri.value} />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
                    <Text property={VCARD.organization_name.iri.value} />
                  </Typography>
                </CardContent>
                <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
                  {/* <ThingProvider
                    thing={VCARD.hasAddress}>
                    <Text id="direction" property={VCARD.street_address.iri.value} />
                    <Text id="direction" property={VCARD.region.iri.value} />
                  </ThingProvider> */}
                  {direccionToString(addresses)}
                </CardActionArea>
              </Card>
            </CombinedDataProvider>
          ) : null}
          <LogoutButton>
            <Button style={{ marginTop: 20 }} variant="contained" color="primary" href="/FormLogIn">
              Logout
            </Button>
          </LogoutButton>

        </Container>
      </form></>
  );
}

export default ProfileViewer
