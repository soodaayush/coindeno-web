import { useState, useEffect } from "react";

import FiatService from "../../../api/services/Fiat";
import Loading from "../../common/Loading";
import FiatListItem from "./FiatListItem";
import FiatVerticalListItem from "./FiatVerticalListItem";

const FiatList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFiats, setLoadedFiats] = useState([]);

  function Sum(obj, prop) {
    let total = 0;

    for (let i = 0, _len = obj.length; i < _len; i++) {
      total += obj[i][prop];
    }

    return total;
  }

  useEffect(() => {
    FiatService.getInstance()
      .getFiats()
      .then((data) => {
        setIsLoading(false);
        const Fiats = [];

        for (const key in data) {
          const Fiat = {
            id: key,
            amount: parseFloat(data[key].amount),
            dateTime: data[key].dateTime,
            from: data[key].from,
            to: data[key].to,
            status: data[key].status,
            reference: data[key].reference,
            currency: data[key].currency,
            notes: data[key].notes,
          };

          Fiats.push(Fiat);
        }

        Fiats.sort((a, b) => {
          return new Date(b.dateTime) - new Date(a.dateTime);
        });

        setLoadedFiats(Fiats);
      });
  }, []);

  function deleteFiat(id) {
    if (window.confirm("Are you sure you want to delete this Fiat?")) {
      FiatService.getInstance()
        .deleteFiat(id)
        .then(() => {
          let remainingFiats = loadedFiats.filter((t) => t.id !== id);
          setLoadedFiats(remainingFiats);
        });
    }
  }

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-8">
      {windowDimension.winWidth > 900 && (
        <table className="w-full my-5">
          <thead className="dark:bg-gray-700 bg-gray-300">
            <tr className="border-2 dark:border-gray-700 border-gray-300">
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date/Time</th>
              <th>Reference#</th>
              <th>Notes</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {loadedFiats.map((fiat, index) => (
              <FiatListItem
                key={fiat.id}
                index={index}
                data={fiat}
                onDelete={deleteFiat}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="dark:bg-gray-900">
              <td></td>
              <td></td>
              <td className="text-center font-bold">
                <span className="inline-block text-right w-5/12">TOTAL:</span>
              </td>
              <td className="text-center font-bold">
                <span className="inline-block text-center w-5/12">
                  {new Intl.NumberFormat("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(Sum(loadedFiats, "amount"))}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      {windowDimension.winWidth <= 900 && (
        <div>
          <table>
            {loadedFiats.map((fiat, index) => (
              <FiatVerticalListItem
                key={fiat.id}
                index={index}
                data={fiat}
                onDelete={deleteFiat}
              />
            ))}
          </table>
          <div className="w-full my-5 font-bold">
            <p className="text-right w-full">
              TOTAL:{" "}
              {new Intl.NumberFormat("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(Sum(loadedFiats, "amount"))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiatList;
