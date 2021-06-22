import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import { confirmEmail } from "../redux/actions";
/**
 * For having an internal scroll container
 * @param {props} props
 */
function EmailConfirmationView(props) {
    //const [message, setMessage] = React.useState("Confirming your email adress...");

  useEffect(() => {
    confirmEmail(props.match.params.email, props.match.params.token);
  }, [props]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Button variant="contained">Default</Button>
      </Grid>
      <Grid item xs={3}>
        <h1>Your email is being confirmed...</h1>
        <LinearProgress />
      </Grid>

    </Grid>
    
  );
}
export default EmailConfirmationView;
