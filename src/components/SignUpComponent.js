import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  usersignUpRoot: {
    margin: "auto",
  },
  signUpPaper: {
    width: "500px",
    padding: theme.spacing(2),
  },
  signUpRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
    "&:first-child": {
      paddingTop: theme.spacing(0),
    },
  },
  signUpButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  signUpButton: {
    marginLeft: theme.spacing(1),
  },
}));

const provincesAndCities = {
  bavaria: [
    "Munich",
    "Nuremberg",
    "Augsburg",
    "Regensburg",
    "Ingolstadt",
    "Würzburg",
  ],
  "lower-saxony": [
    "Hanover",
    "Braunschweig",
    "Oldenburg",
    "Osnabrück",
    "Wolfsburg",
    "Göttingen",
  ],
  "baden-wuerttemberg": [
    "Stuttgart",
    "Karlsruhe",
    "Mannheim",
    "Freiburg im Breisgau",
    "Heidelberg",
    "Ulm",
  ],
  "north-rhine-westphalia": [
    "Cologne",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Duisburg",
    "Bochum",
  ],
};

/**
 * For register new users
 * @param {props} props
 */
function SignUpComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [registerError, setRegisterError] = React.useState("");

  //let province = null;
  let options = null;

  if (province) {
    options = provincesAndCities[province].map((elem) => (
      <MenuItem key={elem} value={elem}>
        {elem}
      </MenuItem>
    ));
  }

  useEffect(() => {
    if (props.user.error) {
      setRegisterError(props.user.error);
    } else {
      setRegisterError("");
    }
  }, [props.user]);

  const onRegister = (e) => {
    e.preventDefault();
    props.onRegister(email, username, password, city, isAdmin);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setRegisterError("");
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterError("");
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setRegisterError("");
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
    setRegisterError("");
  };

  const onChangeProvince = (e) => {
    setProvince(e.target.value);
    setRegisterError("");
  };

  const onBlurPassword = (e) => {
    if (password !== "" && password2 !== "") {
      if (password !== password2) {
        setRegisterError("Passwords do not match.");
      } else {
        setRegisterError("");
      }
    }
  };

  return (
    <div className={classes.usersignUpRoot}>
      <Paper className={classes.signUpPaper} component="form">
        <div className={classes.signUpRow}>
          <Typography variant="h4" align="center">
            Welcome to the Breender App!
          </Typography>
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={onChangePassword}
            error={registerError !== ""}
            onBlur={onBlurPassword}
            type="password"
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Repeat Password"
            fullWidth
            value={password2}
            onChange={onChangePassword2}
            error={registerError !== ""}
            onBlur={onBlurPassword}
            type="password"
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.signUpRow}>
              <InputLabel>State/Province</InputLabel>
              <Select
                label="State/Province"
                value={province}
                onChange={onChangeProvince}
              >
                <MenuItem value={"bavaria"}>Bavaria</MenuItem>
                <MenuItem value={"lower-saxony"}>Lower Saxony</MenuItem>
                <MenuItem value={"baden-wuerttemberg"}>
                  Baden-Württemberg
                </MenuItem>
                <MenuItem value={"north-rhine-westphalia"}>
                  North Rhine-Westphalia
                </MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.signUpRow}>
              <InputLabel>City</InputLabel>
              <Select label="City" value={city} onChange={onChangeCity}>
                {options}
              </Select>
            </div>
          </Grid>
        </Grid>

        <div className={classes.signUpRow}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                color="primary"
              />
            }
            label="Is Admin"
          />
        </div>
        {registerError !== "" ? (
          <div className={classes.signUpRow}>
            <Typography color="error">{registerError}</Typography>
          </div>
        ) : null}
        <div className={classes.signUpRow + " " + classes.signUpButtons}>
          <Button className={classes.signUpButton} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            className={classes.signUpButton}
            variant="contained"
            color="primary"
            onClick={onRegister}
            disabled={
              username === "" ||
              password === "" ||
              password2 === "" ||
              registerError !== "" ||
              password !== password2
            }
            type="submit"
          >
            Register
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpComponent;
