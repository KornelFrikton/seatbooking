import theater from "./theatre.jpg";
import "./App.css";
import Input from "./components/input/input";
import { useEffect, useState } from "react";

function App() {
  const [percent, setPercent] = useState(20);
  const [booked, setBooked] = useState(2);
  const [calculate, setCalculate] = useState(false);
  const [finalMoney, setFinalMoney] = useState(0);
  const [finalZone, setFinalZone] = useState("");
  const [finalSeats, setFinalSeats] = useState(0);
  const [bookedRow, setBookedRow] = useState();
  const [bookedSeat, setBookedSeat] = useState([]);

  let data = require("./components/teather/teather.json");

  useEffect(() => {
    if (calculate) {
      const newData = { ...data };
      const reservedId = [];
      const reservedNumber = Math.round((percent / 100) * 217);

      //-----Generating random reserved seats
      while (reservedId.length < reservedNumber) {
        let reserved = Math.floor(Math.random() * 217);
        if (reservedId.indexOf(reserved) === -1) reservedId.push(reserved);
      }
      reservedId.sort(function (a, b) {
        return a - b;
      });

      for (let i = 0; i < reservedId.length; i++) {
        if (reservedId[i] < 140) {
          for (let j = 0; j < newData.auditorium.rows.length; j++) {
            newData.auditorium.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 139 && reservedId[i] < 177) {
          for (let j = 0; j < newData.balconymid.rows.length; j++) {
            newData.balconymid.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 176 && reservedId[i] < 185) {
          for (let j = 0; j < newData.balconyleft.rows.length; j++) {
            newData.balconyleft.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 184 && reservedId[i] < 193) {
          for (let j = 0; j < newData.balconyright.rows.length; j++) {
            newData.balconyright.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 192 && reservedId[i] < 199) {
          for (let j = 0; j < newData.boxleft1.rows.length; j++) {
            newData.boxleft1.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 198 && reservedId[i] < 205) {
          for (let j = 0; j < newData.boxleft2.rows.length; j++) {
            newData.boxleft2.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 204 && reservedId[i] < 211) {
          for (let j = 0; j < newData.boxright1.rows.length; j++) {
            newData.boxright1.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        } else if (reservedId[i] > 210 && reservedId[i] < 217) {
          for (let j = 0; j < newData.boxright2.rows.length; j++) {
            newData.boxright2.rows[j].seats.find((item) => {
              if (item.id === reservedId[i]) {
                return (item.isreserved = true);
              }
            });
          }
        }
      }

      //-----Collecting free seats
      const freeSeatsId = [];
      for (let k = 0; k < 217; k++) {
        if (reservedId.indexOf(k) === -1) {
          freeSeatsId.push(k);
        }
      }

      //------Auditorium: Free seats in the same row
      const optionAud = [];
      for (let a = 0; a < freeSeatsId.length; a++) {
        if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
          for (let b = 0; b < newData.auditorium.rows.length; b++) {
            if (
              newData.auditorium.rows[b].seats.some(
                (item) => item.id === freeSeatsId[a]
              ) &&
              newData.auditorium.rows[b].seats.some(
                (item) => item.id === freeSeatsId[a + booked - 1]
              )
            ) {
              optionAud.push([freeSeatsId[a]]);
            }
          }
        }
      }

      //-----Auditorium: Generating series for free seat
      let seriesAud = optionAud;
      for (let k = 0; k < optionAud.length; k++) {
        for (let h = 1; h < booked; h++) {
          seriesAud[k].push(parseInt(optionAud[[k]]) + h);
        }
      }

      //------Balcony mid: Free seats in the same row
      const optionBalMid = [];
      for (let a = 0; a < freeSeatsId.length; a++) {
        if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
          for (let b = 0; b < newData.balconymid.rows.length; b++) {
            if (
              newData.balconymid.rows[b].seats.some(
                (item) => item.id === freeSeatsId[a]
              ) &&
              newData.balconymid.rows[b].seats.some(
                (item) => item.id === freeSeatsId[a + booked - 1]
              )
            ) {
              optionBalMid.push([freeSeatsId[a]]);
            }
          }
        }
      }

      //-----Balcony Mid: Generating series for free seat
      let seriesBalMid = optionBalMid;
      for (let k = 0; k < optionBalMid.length; k++) {
        for (let h = 1; h < booked; h++) {
          seriesBalMid[k].push(parseInt(optionBalMid[[k]]) + h);
        }
      }

      //-----Auditorium: Collecting prices
      let priceAud = [];
      for (let c = 0; c < seriesAud.length; c++) {
        let sumPriceAud = 0;
        newData.auditorium.rows.find((e) =>
          e.seats.find((item) => {
            for (let z = 0; z < booked; z++) {
              if (seriesAud[c][z] === item.id) {
                sumPriceAud = sumPriceAud + item.value;
              }
            }
          })
        );
        priceAud.push(sumPriceAud);
      }

      //-----Auditorium: Max price
      let maxPriceAud = Math.max(...priceAud);
      setFinalMoney(maxPriceAud);
      setFinalZone("Auditorium");

      const maxPriceAudId = [];
      let idx = priceAud.indexOf(maxPriceAud);
      while (idx !== -1) {
        maxPriceAudId.push(idx);
        idx = priceAud.indexOf(maxPriceAud, idx + 1);
      }

      let bestSeatsAud = [];
      if (maxPriceAudId.length > 1) {
        for (let g = 0; g < maxPriceAudId.length; g++) {
          bestSeatsAud.push(seriesAud[maxPriceAudId[g]]);
        }
      } else {
        bestSeatsAud = seriesAud[maxPriceAudId[0]];
        setFinalSeats(bestSeatsAud);
      }

      //-----Auditorium: Comparing the best seats in the row
      if (bestSeatsAud !== undefined && Array.isArray(bestSeatsAud[1])) {
        for (let p = 1; p < bestSeatsAud.length; p++) {
          for (let s = 0; s < newData.auditorium.rows.length; s++) {
            if (
              newData.auditorium.rows[s].seats.some(
                (item) => item.id === bestSeatsAud[0][0]
              ) &&
              newData.auditorium.rows[s].seats.some(
                (item) => item.id === bestSeatsAud[p][0]
              )
            ) {
              let firstMidElement =
                bestSeatsAud[0][Math.round((bestSeatsAud[0].length - 1) / 2)];
              let nextMidElement =
                bestSeatsAud[p][Math.round((bestSeatsAud[0].length - 1) / 2)];
              let rowMidElement = newData.auditorium.rows[s].seats.find(
                (item) => {
                  if (
                    item.number ===
                    Math.round(
                      (newData.auditorium.rows[s].seats.length + 1) / 2
                    )
                  ) {
                    return item.id;
                  }
                }
              );

              if (
                Math.abs(rowMidElement.id - firstMidElement) >
                Math.abs(rowMidElement.id - nextMidElement)
              ) {
                [bestSeatsAud[0], bestSeatsAud[p]] = [
                  bestSeatsAud[p],
                  bestSeatsAud[0],
                ];
                s--;
              }
            }
          }
        }
        bestSeatsAud = bestSeatsAud[0];
        setFinalSeats(bestSeatsAud);
      }

      //-----Balcony Mid: Collecting prices
      let priceBalMid = [];
      for (let c = 0; c < seriesBalMid.length; c++) {
        let sumPriceBalMid = 0;
        newData.balconymid.rows.find((e) =>
          e.seats.find((item) => {
            for (let z = 0; z < booked; z++) {
              if (seriesBalMid[c][z] === item.id) {
                sumPriceBalMid = sumPriceBalMid + item.value;
              }
            }
          })
        );
        priceBalMid.push(sumPriceBalMid);
      }

      //-----Balcony Mid: Max price
      let maxPriceBalMid = Math.max(...priceBalMid);
      if (maxPriceAud < maxPriceBalMid) {
        const maxPriceBalMidId = [];
        let idxb = priceBalMid.indexOf(maxPriceBalMid);
        while (idxb !== -1) {
          maxPriceBalMidId.push(idxb);
          idxb = priceBalMid.indexOf(maxPriceBalMid, idxb + 1);
        }

        let bestSeatsBalMid = [];
        if (maxPriceBalMidId.length > 1) {
          for (let g = 0; g < maxPriceBalMidId.length; g++) {
            bestSeatsBalMid.push(seriesBalMid[maxPriceBalMidId[g]]);
          }
        } else {
          bestSeatsBalMid = seriesBalMid[maxPriceBalMidId[0]];
          setFinalSeats(bestSeatsBalMid);
        }

        if (Array.isArray(bestSeatsBalMid[1])) {
          for (let p = 1; p < bestSeatsBalMid.length; p++) {
            for (let s = 0; s < newData.balconymid.rows.length; s++) {
              if (
                newData.balconymid.rows[s].seats.some(
                  (item) => item.id === bestSeatsBalMid[0][0]
                ) &&
                newData.balconymid.rows[s].seats.some(
                  (item) => item.id === bestSeatsBalMid[p][0]
                )
              ) {
                let firstMidElement =
                  bestSeatsBalMid[0][
                    Math.round((bestSeatsBalMid[0].length - 1) / 2)
                  ];
                let nextMidElement =
                  bestSeatsBalMid[p][
                    Math.round((bestSeatsBalMid[0].length - 1) / 2)
                  ];
                let rowMidElement = newData.balconymid.rows[s].seats.find(
                  (item) => {
                    if (
                      item.number ===
                      Math.round(
                        (newData.balconymid.rows[s].seats.length + 1) / 2
                      )
                    ) {
                      return item.id;
                    }
                  }
                );

                if (
                  Math.abs(rowMidElement.id - firstMidElement) >
                  Math.abs(rowMidElement.id - nextMidElement)
                ) {
                  [bestSeatsBalMid[0], bestSeatsBalMid[p]] = [
                    bestSeatsBalMid[p],
                    bestSeatsBalMid[0],
                  ];
                  s--;
                }
              }
            }
          }
          bestSeatsBalMid = bestSeatsBalMid[0];
          setFinalSeats(bestSeatsBalMid);
        }
        setFinalMoney(maxPriceBalMid);
        setFinalZone("Balcony Mid");
      }

      //-----Balcony left & right
      if (booked < 5) {
        //-----Balcony left:  Free seats in the same row
        const optionBalLeft = [];
        for (let a = 0; a < freeSeatsId.length; a++) {
          if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
            for (let b = 0; b < newData.balconyleft.rows.length; b++) {
              if (
                newData.balconyleft.rows[b].seats.some(
                  (item) => item.id === freeSeatsId[a]
                ) &&
                newData.balconyleft.rows[b].seats.some(
                  (item) => item.id === freeSeatsId[a + booked - 1]
                )
              ) {
                optionBalLeft.push([freeSeatsId[a]]);
              }
            }
          }
        }

        //-----Balcony left: Generating series for free seat
        let seriesBalLeft = optionBalLeft;
        for (let k = 0; k < optionBalLeft.length; k++) {
          for (let h = 1; h < booked; h++) {
            seriesBalLeft[k].push(parseInt(optionBalLeft[[k]]) + h);
          }
        }

        //-----Balcony left: Collecting prices
        let priceBalLeft = [];
        for (let c = 0; c < seriesBalLeft.length; c++) {
          let sumPriceBalLeft = 0;
          newData.balconyleft.rows.find((e) =>
            e.seats.find((item) => {
              for (let z = 0; z < booked; z++) {
                if (seriesBalLeft[c][z] === item.id) {
                  sumPriceBalLeft = sumPriceBalLeft + item.value;
                }
              }
            })
          );
          priceBalLeft.push(sumPriceBalLeft);
        }

        //-----Balcony left: Max price
        let maxPriceBalLeft = Math.max(...priceBalLeft);
        const maxPriceBalLeftId = [];
        let idxl = priceBalLeft.indexOf(maxPriceBalLeft);
        while (idxl !== -1) {
          maxPriceBalLeftId.push(idxl);
          idxl = priceBalLeft.indexOf(maxPriceBalLeft, idxl + 1);
        }

        let bestSeatsBalLeft = [];
        bestSeatsBalLeft = seriesBalLeft[maxPriceBalLeftId[0]];

        if (maxPriceBalLeft > maxPriceAud && maxPriceBalLeft > maxPriceBalMid) {
          setFinalMoney(maxPriceBalLeft);
          setFinalZone("Balcony Left");
          setFinalSeats(bestSeatsBalLeft);
        }

        //-----Balcony right: Free seats in the same row
        const optionBalRight = [];
        for (let a = 0; a < freeSeatsId.length; a++) {
          if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
            for (let b = 0; b < newData.balconyright.rows.length; b++) {
              if (
                newData.balconyright.rows[b].seats.some(
                  (item) => item.id === freeSeatsId[a]
                ) &&
                newData.balconyright.rows[b].seats.some(
                  (item) => item.id === freeSeatsId[a + booked - 1]
                )
              ) {
                optionBalRight.push([freeSeatsId[a]]);
              }
            }
          }
        }

        //-----Balcony right: Generating series for free seat
        let seriesBalRight = optionBalRight;
        for (let k = 0; k < optionBalRight.length; k++) {
          for (let h = 1; h < booked; h++) {
            seriesBalRight[k].push(parseInt(optionBalRight[[k]]) + h);
          }
        }

        //-----Balcony right: Collecting prices
        let priceBalRight = [];
        for (let c = 0; c < seriesBalRight.length; c++) {
          let sumPriceBalRight = 0;
          newData.balconyright.rows.find((e) =>
            e.seats.find((item) => {
              for (let z = 0; z < booked; z++) {
                if (seriesBalRight[c][z] === item.id) {
                  sumPriceBalRight = sumPriceBalRight + item.value;
                }
              }
            })
          );
          priceBalRight.push(sumPriceBalRight);
        }

        //-----Balcony right: Max price
        let maxPriceBalRight = Math.max(...priceBalRight);
        const maxPriceBalRightId = [];
        let idxbalcright = priceBalRight.indexOf(maxPriceBalRight);
        while (idxbalcright !== -1) {
          maxPriceBalRightId.push(idxbalcright);
          idxbalcright = priceBalRight.indexOf(
            maxPriceBalRight,
            idxbalcright + 1
          );
        }

        let bestSeatsBalRight = [];
        bestSeatsBalRight = seriesBalRight[maxPriceBalRightId[0]];
        
        if (
          maxPriceBalRight > maxPriceAud &&
          maxPriceBalRight > maxPriceBalMid &&
          maxPriceBalRight > maxPriceBalLeft
        ) {
          setFinalMoney(maxPriceBalRight);
          setFinalZone("Balcony Right");
          setFinalSeats(bestSeatsBalRight);
        }

        //-----Box left & right
        if (booked < 4) {
          //-----Box left1:  Free seats in the same row
          const optionBoxLeft1 = [];
          for (let a = 0; a < freeSeatsId.length; a++) {
            if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
              for (let b = 0; b < newData.boxleft1.rows.length; b++) {
                if (
                  newData.boxleft1.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a]
                  ) &&
                  newData.boxleft1.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a + booked - 1]
                  )
                ) {
                  optionBoxLeft1.push([freeSeatsId[a]]);
                }
              }
            }
          }
        
          //-----Box left1: Generating series for free seat
          let seriesBoxLeft1 = optionBoxLeft1;
          for (let k = 0; k < optionBoxLeft1.length; k++) {
            for (let h = 1; h < booked; h++) {
              seriesBoxLeft1[k].push(parseInt(optionBoxLeft1[[k]]) + h);
            }
          }

          //-----Box left1: Collecting prices
          let priceBoxLeft1 = [];
          for (let c = 0; c < seriesBoxLeft1.length; c++) {
            let sumPriceBoxLeft1 = 0;
            newData.boxleft1.rows.find((e) =>
              e.seats.find((item) => {
                for (let z = 0; z < booked; z++) {
                  if (seriesBoxLeft1[c][z] === item.id) {
                    sumPriceBoxLeft1 = sumPriceBoxLeft1 + item.value;
                  }
                }
              })
            );
            priceBoxLeft1.push(sumPriceBoxLeft1);
          }
          
          //-----Box left1: Max price
          let maxPriceBoxLeft1 = Math.max(...priceBoxLeft1);
          const maxPriceBoxLeft1Id = [];
          let idxl = priceBoxLeft1.indexOf(maxPriceBoxLeft1);
          while (idxl !== -1) {
            maxPriceBoxLeft1Id.push(idxl);
            idxl = priceBoxLeft1.indexOf(maxPriceBoxLeft1, idxl + 1);
          }
          
          let bestSeatsBoxLeft1 = [];
          bestSeatsBoxLeft1 = seriesBoxLeft1[maxPriceBoxLeft1Id[0]];

          if (
            maxPriceBoxLeft1 > maxPriceAud &&
            maxPriceBoxLeft1 > maxPriceBalMid &&
            maxPriceBoxLeft1 > maxPriceBalLeft &&
            maxPriceBoxLeft1 > maxPriceBalRight
          ) {
            setFinalMoney(maxPriceBoxLeft1);
            setFinalZone("Box Left1");
            setFinalSeats(bestSeatsBoxLeft1);
          }

          //-----Box right1:  Free seats in the same row
          const optionBoxRight1 = [];
          for (let a = 0; a < freeSeatsId.length; a++) {
            if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
              for (let b = 0; b < newData.boxright1.rows.length; b++) {
                if (
                  newData.boxright1.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a]
                  ) &&
                  newData.boxright1.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a + booked - 1]
                  )
                ) {
                  optionBoxRight1.push([freeSeatsId[a]]);
                }
              }
            }
          }

          //-----Box right1: Generating series for free seat
          let seriesBoxRight1 = optionBoxRight1;
          for (let k = 0; k < optionBoxRight1.length; k++) {
            for (let h = 1; h < booked; h++) {
              seriesBoxRight1[k].push(parseInt(optionBoxRight1[[k]]) + h);
            }
          }

          //-----Box right1: Collecting prices
          let priceBoxRight1 = [];
          for (let c = 0; c < seriesBoxRight1.length; c++) {
            let sumPriceBoxRight1 = 0;
            newData.boxright1.rows.find((e) =>
              e.seats.find((item) => {
                for (let z = 0; z < booked; z++) {
                  if (seriesBoxRight1[c][z] === item.id) {
                    sumPriceBoxRight1 = sumPriceBoxRight1 + item.value;
                  }
                }
              })
            );
            priceBoxRight1.push(sumPriceBoxRight1);
          }

          //-----Box right1: Max price
          let maxPriceBoxRight1 = Math.max(...priceBoxRight1);
          const maxPriceBoxRight1Id = [];
          let idxr1 = priceBoxRight1.indexOf(maxPriceBoxRight1);
          while (idxr1 !== -1) {
            maxPriceBoxRight1Id.push(idxr1);
            idxr1 = priceBoxRight1.indexOf(maxPriceBoxRight1, idxr1 + 1);
          }

          let bestSeatsBoxRight1 = [];
          bestSeatsBoxRight1 = seriesBoxRight1[maxPriceBoxRight1Id[0]];

          if (
            maxPriceBoxRight1 > maxPriceAud &&
            maxPriceBoxRight1 > maxPriceBalMid &&
            maxPriceBoxRight1 > maxPriceBalLeft &&
            maxPriceBoxRight1 > maxPriceBalRight &&
            maxPriceBoxRight1 > maxPriceBoxLeft1
          ) {
            setFinalMoney(maxPriceBoxRight1);
            setFinalZone("Box Right1");
            setFinalSeats(bestSeatsBoxRight1);
          }

          //-----Box left2:  Free seats in the same row
          const optionBoxLeft2 = [];
          for (let a = 0; a < freeSeatsId.length; a++) {
            if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
              for (let b = 0; b < newData.boxleft2.rows.length; b++) {
                if (
                  newData.boxleft2.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a]
                  ) &&
                  newData.boxleft2.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a + booked - 1]
                  )
                ) {
                  optionBoxLeft2.push([freeSeatsId[a]]);
                }
              }
            }
          }

          //-----Box left2: Generating series for free seat
          let seriesBoxLeft2 = optionBoxLeft2;
          for (let k = 0; k < optionBoxLeft2.length; k++) {
            for (let h = 1; h < booked; h++) {
              seriesBoxLeft2[k].push(parseInt(optionBoxLeft2[[k]]) + h);
            }
          }

          //-----Box left2: Collecting prices
          let priceBoxLeft2 = [];
          for (let c = 0; c < seriesBoxLeft2.length; c++) {
            let sumPriceBoxLeft2 = 0;
            newData.boxleft2.rows.find((e) =>
              e.seats.find((item) => {
                for (let z = 0; z < booked; z++) {
                  if (seriesBoxLeft2[c][z] === item.id) {
                    sumPriceBoxLeft2 = sumPriceBoxLeft2 + item.value;
                  }
                }
              })
            );
            priceBoxLeft2.push(sumPriceBoxLeft2);
          }

          //-----Box left2: Max price
          let maxPriceBoxLeft2 = Math.max(...priceBoxLeft2);
          const maxPriceBoxLeft2Id = [];
          let idxl2 = priceBoxLeft2.indexOf(maxPriceBoxLeft2);
          while (idxl2 !== -1) {
            maxPriceBoxLeft2Id.push(idxl2);
            idxl2 = priceBoxLeft2.indexOf(maxPriceBoxLeft2, idxl2 + 1);
          }

          let bestSeatsBoxLeft2 = [];
          bestSeatsBoxLeft2 = seriesBoxLeft2[maxPriceBoxLeft2Id[0]];

          if (
            maxPriceBoxLeft2 > maxPriceAud &&
            maxPriceBoxLeft2 > maxPriceBalMid &&
            maxPriceBoxLeft2 > maxPriceBalLeft &&
            maxPriceBoxLeft2 > maxPriceBalRight &&
            maxPriceBoxLeft2 > maxPriceBoxLeft1 &&
            maxPriceBoxLeft2 > maxPriceBoxRight1
          ) {
            setFinalMoney(maxPriceBoxLeft2);
            setFinalZone("Box Left2");
            setFinalSeats(bestSeatsBoxLeft2);
          }

          //-----Box right2:  Free seats in the same row
          const optionBoxRight2 = [];
          for (let a = 0; a < freeSeatsId.length; a++) {
            if (freeSeatsId[a + booked - 1] - freeSeatsId[a] === booked - 1) {
              for (let b = 0; b < newData.boxright2.rows.length; b++) {
                if (
                  newData.boxright2.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a]
                  ) &&
                  newData.boxright2.rows[b].seats.some(
                    (item) => item.id === freeSeatsId[a + booked - 1]
                  )
                ) {
                  optionBoxRight2.push([freeSeatsId[a]]);
                }
              }
            }
          }

          //-----Box right2: Generating series for free seat
          let seriesBoxRight2 = optionBoxRight2;
          for (let k = 0; k < optionBoxRight2.length; k++) {
            for (let h = 1; h < booked; h++) {
              seriesBoxRight2[k].push(parseInt(optionBoxRight2[[k]]) + h);
            }
          }

          //-----Box right2: Collecting prices
          let priceBoxRight2 = [];
          for (let c = 0; c < seriesBoxRight2.length; c++) {
            let sumPriceBoxRight2 = 0;
            newData.boxright2.rows.find((e) =>
              e.seats.find((item) => {
                for (let z = 0; z < booked; z++) {
                  if (seriesBoxRight2[c][z] === item.id) {
                    sumPriceBoxRight2 = sumPriceBoxRight2 + item.value;
                  }
                }
              })
            );
            priceBoxRight2.push(sumPriceBoxRight2);
          }

          //-----Box right2: Max price
          let maxPriceBoxRight2 = Math.max(...priceBoxRight2);
          const maxPriceBoxRight2Id = [];
          let idxr2 = priceBoxRight2.indexOf(maxPriceBoxRight2);
          while (idxr2 !== -1) {
            maxPriceBoxRight2Id.push(idxr2);
            idxr2 = priceBoxRight2.indexOf(maxPriceBoxRight2, idxr2 + 1);
          }

          let bestSeatsBoxRight2 = [];
          bestSeatsBoxRight2 = seriesBoxRight2[maxPriceBoxRight2Id[0]];

          if (
            maxPriceBoxRight2 > maxPriceAud &&
            maxPriceBoxRight2 > maxPriceBalMid &&
            maxPriceBoxRight2 > maxPriceBalLeft &&
            maxPriceBoxRight2 > maxPriceBalRight &&
            maxPriceBoxRight2 > maxPriceBoxLeft1 &&
            maxPriceBoxRight2 > maxPriceBoxRight1 &&
            maxPriceBoxRight2 > maxPriceBoxLeft2
          ) {
            setFinalMoney(maxPriceBoxRight2);
            setFinalZone("Box Right2");
            setFinalSeats(bestSeatsBoxRight2);
          }
        }
      }
    }
    setCalculate(false);
  });

  useEffect(() => {
    let bestSeats = [];
    const newData = { ...data };

    if (finalSeats === undefined) {
      setFinalMoney(0);
      setFinalZone("Sorry, there is no available seats!");
      setBookedRow("Sorry, there is no available seats!");
      return setBookedSeat("Sorry, there is no available seats!");
    }

    if (finalZone === "Auditorium") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.auditorium.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Balcony Mid") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.balconymid.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Balcony Left") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.balconyleft.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Balcony Right") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.balconyright.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Box Left1") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.boxleft1.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Box Right1") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.boxright1.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Box Left2") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.boxleft2.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }

    if (finalZone === "Box Right2") {
      for (let q = 0; q < finalSeats.length; q++) {
        newData.boxright2.rows.find((item) =>
          item.seats.find((e) => {
            if (e.id === finalSeats[q]) {
              bestSeats.push(e.number + ", ");
              return item;
            }
            setBookedRow(item.rownumber);
          })
        );
        setBookedSeat(bestSeats);
      }
    }
  }, [finalSeats, finalZone]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="theater">
          <img src={theater} className="picture" alt="Theater" />
        </div>
        <Input
          percent={percent}
          booked={booked}
          handlePercent={setPercent}
          handleBooking={setBooked}
          setForm={setCalculate}
        />
        <div>Sum: {finalMoney} Ft</div>
        <div>Zone: {finalZone}</div>
        <div>Row: {bookedRow} </div>
        <div>Number of the seat: {bookedSeat} </div>
      </header>
    </div>
  );
}

export default App;