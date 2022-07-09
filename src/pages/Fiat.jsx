import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Add from "../components/common/Add";
import FiatList from "../components/layout/fiat/FiatList";

const Fiat = () => {
  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_token")) {
      history("/login");
    }
  }, []);

  function redirectToAddFiatPage() {
    history("/addFiat");
  }

  return (
    <div>
      <div className="flex px-8 items-center">
        <h1 className="text-4xl">Fiats</h1>
        <Add title="Add Fiat" addFunction={redirectToAddFiatPage} />
      </div>
      <FiatList />
    </div>
  );
};

export default Fiat;
