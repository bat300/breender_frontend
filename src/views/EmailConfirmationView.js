import React, { useEffect } from "react";

import { connect, useSelector } from "react-redux";
import EmailConfirmationComponent from "../components/EmailConfirmationComponent";

import { confirmEmail } from "../redux/actions";
/**
 * For having an internal scroll container
 * @param {props} props
 */
function EmailConfirmationView(props) {
  //const [message, setMessage] = React.useState("Confirming your email adress...");
  const confirmation = useSelector((state) => state.confirmation);

  function onMove() {
    props.history.push("/");
  }

  useEffect(() => {
    props.dispatch(
      confirmEmail(props.match.params.email, props.match.params.token)
    );
  }, []);

  return (
    <EmailConfirmationComponent confirmation={confirmation} onMove={onMove} />
  );
}
export default connect()(EmailConfirmationView);
